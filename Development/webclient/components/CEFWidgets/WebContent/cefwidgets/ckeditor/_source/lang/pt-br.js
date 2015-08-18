/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the English
 *		language. This is the base file for all translations.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
// NLS_ENCODING=UTF-8
// NLS_MESSAGEFORMAT_NONE
// G11N GA UI

CKEDITOR.lang["pt-br"] =
{
	/**
	 * The language reading direction. Possible values are "rtl" for
	 * Right-To-Left languages (like Arabic) and "ltr" for Left-To-Right
	 * languages (like English).
	 * @default "ltr"
	 */
	dir : "ltr",

	/*
	 * Screenreader titles. Please note that screenreaders are not always capable
	 * of reading non-English words. So be careful while translating it.
	 */
	editorTitle : "Rich text editor, %1, pressione ALT 0 para obter ajuda.",
	editorHelp : "",

	// ARIA descriptions.
	toolbars	: "Barras de ferramentas do editor",
	editor	: "Editor de Rich Text",

	// Toolbar buttons without dialogs.
	source			: "Origem",
	newPage			: "Nova Página",
	save			: "Salvar",
	preview			: "Visualizar:",
	cut				: "Recortar",
	copy			: "Copiar",
	paste			: "Colar",
	print			: "Imprimir",
	underline		: "Sublinhado",
	bold			: "Negrito",
	italic			: "Itálico",
	selectAll		: "Selecionar Todos",
	removeFormat	: "Remover Formato",
	strike			: "Tachado",
	subscript		: "Subscrito",
	superscript		: "Sobrescrito",
	horizontalrule	: "Inserir Linha Horizontal",
	pagebreak		: "Inserir Quebra de Página",
	pagebreakAlt		: "Quebra de Página",
	unlink			: "Remove Link",
	undo			: "Desfazer",
	redo			: "Refazer",

	// Common messages and labels.
	common :
	{
		browseServer	: "Servidor de Navegador:",
		url				: "URL:",
		protocol		: "Protocol:",
		upload			: "Upload:",
		uploadSubmit	: "Enviar para o Servidor",
		image			: "Inserir Imagem",
		flash			: "Inserir Flash Movie",
		form			: "Inserir Formulário",
		checkbox		: "Inserir Caixa de Seleção",
		radio			: "Inserir Botão de Opções",
		textField		: "Inserir Campo de Texto",
		textarea		: "Inserir Área de Texto",
		hiddenField		: "Inserir Campo Oculto",
		button			: "Inserir Botão",
		select			: "Inserir Campo de Seleção",
		imageButton		: "Inserir Botão de Imagem",
		notSet			: "<não defindo>",
		id				: "Id:",
		name			: "Nome:",
		langDir			: "Direção de Idioma:",
		langDirLtr		: "Da Esquerda para Direita",
		langDirRtl		: "Da Direita para Esquerda",
		langCode		: "Código de Idioma:",
		longDescr		: "URL de Descrição Detalhada:",
		cssClass		: "Classes de folha de estilo:",
		advisoryTitle	: "Título do Conselheiro:",
		cssStyle		: "Estilo:",
		ok				: "OK",
		cancel			: "Cancelar",
		close : "Fechar",
		preview			: "Visualizar:",
		generalTab		: "Geral",
		advancedTab		: "Avançado",
		validateNumberFailed	: "Este valor não é um número.",
		confirmNewPage	: "Quaisquer alterações não salvas feitas neste conteúdo serão perdidas. Tem certeza de que deseja carregar uma nova página?",
		confirmCancel	: "Algumas das opções foram alteradas. Tem certeza de que deseja fechar o diálogo?",
		options : "Opções",
		target			: "Destino:",
		targetNew		: "Nova Janela (_blank)",
		targetTop		: "Janela Superior (_top)",
		targetSelf		: "Mesma Janela (_self)",
		targetParent	: "Janela-Pai (_parent)",
		langDirLTR		: "Da Esquerda para Direita",
		langDirRTL		: "Da Direita para Esquerda",
		styles			: "Estilo:",
		cssClasses		: "Classes de Folha de Estilo:",
		width			: "Largura:",
		height			: "Altura:",
		align			: "Alinhar:",
		alignLeft		: "Esquerda",
		alignRight		: "Direita",
		alignCenter		: "Centro",
		alignTop		: "Parte Superior",
		alignMiddle		: "Meio",
		alignBottom		: "Parte Inferior",
		invalidHeight	: "A altura deve ser um número inteiro positivo.",
		invalidWidth	: "A largura deve ser um número inteiro positivo.",
		invalidCssLength	: "O valor especificado para o campo '%1' deve ser um número positivo com ou sem uma unidade de medida CSS válida (px, %, in, cm, mm, em, ex, pt ou pc).",
		invalidHtmlLength	: "O valor especificado para o campo '%1' deve ser um número positivo com ou sem uma unidade de medida HTML válida (px ou %).",
		invalidInlineStyle	: "O valor especificado para o estilo sequencial deve consistir em uma ou mais tuplas com o formato \"name : value\", separadas por ponto-e-vírgula.",
		cssLengthTooltip	: "Insira um número para um valor em pixels ou um número com uma unidade CSS válida (px, %, in, cm, mm, em, ex, pt ou pc).",

		// Put the voice-only part of the label in the span.
		unavailable		: "%1<span class=\"cke_accessibility\">, indisponível</span>"
	},

	contextmenu :
	{
		options : "Menu de Opções de Contexto"
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: "Inserir Caractere Especial",
		title		: "Caractere Especial",
		options : "Opção de caractere especial"
	},

	// Link dialog.
	link :
	{
		toolbar		: "Link da URL",
		other 		: "<outro>",
		menu		: "Editar Link",
		title		: "Link",
		info		: "Informações do Link",
		target		: "Destino",
		upload		: "Carregar:",
		advanced	: "Avançado",
		type		: "Tipo de Link:",
		toUrl		: "URL",
		toAnchor	: "Link à âncora no texto",
		toEmail		: "E-mail",
		targetFrame	: "<quadro>",
		targetPopup	: "<janela popup>",
		targetFrameName	: "Nome do Quadro de Destino:",
		targetPopupName	: "Nome da Janela Pop-Up:",
		popupFeatures	: "Recursos da Janela Pop-Up:",
		popupResizable	: "Reajustável",
		popupStatusBar	: "Barra de Status",
		popupLocationBar	: "Barra de Localidade",
		popupToolbar	: "Barra de Ferramentas",
		popupMenuBar	: "Barra de Menus",
		popupFullScreen	: "Tela Inteira (IE)",
		popupScrollBars	: "Barras de Rolagem",
		popupDependent	: "Dependente (Netscape)",
		popupLeft		: "Posição à Esquerda",
		popupTop		: "Posição Superior",
		id				: "Id:",
		langDir			: "Direção de Idioma:",
		langDirLTR		: "Da Esquerda para Direita",
		langDirRTL		: "Da Direita para Esquerda",
		acccessKey		: "Tecla de Acesso:",
		name			: "Nome:",
		langCode		: "Código de Idioma:",
		tabIndex		: "Índice de Guia:",
		advisoryTitle	: "Título do Conselheiro:",
		advisoryContentType	: "Tipo de Conteúdo Conselheiro:",
		cssClasses		: "Classes de folha de estilo:",
		charset			: "Charset de Recurso Vinculado:",
		styles			: "Estilo:",
		rel			: "Relação",
		selectAnchor	: "Selecionar uma Âncora",
		anchorName		: "Por Nome de Âncora",
		anchorId		: "Por Id de Elemento",
		emailAddress	: "Endereço de E-Mail",
		emailSubject	: "Assunto de Mensagem",
		emailBody		: "Corpo da Mensagem",
		noAnchors		: "Nenhum marcador disponível no documento. Clique no ícone 'Inserir Marcador de Documento' na barra de ferramentas para incluir um.",
		noUrl			: "Digite a URL do link",
		noEmail			: "Digite o endereço de e-mail"
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: "Inserir Marcador de Documento",
		menu		: "Editar Marcador de Documento",
		title		: "Marcador de Documento",
		name		: "Nome:",
		errorName	: "Insira um nome para o marcador de documento",
		remove		: "Remover Marcador de Documento"
	},

	// List style dialog
	list:
	{
		numberedTitle		: "Propriedades da lista de números",
		bulletedTitle		: "Propriedades da Lista com Marcadores",
		type				: "Estilo da lista:",
		start				: "Início:",
		validateStartNumber				:"O número inicial da lista deve ser um número inteiro.",
		circle				: "Círculo",
		disc				: "Disco",
		square				: "Quadrado",
		none				: "Nenhum",
		notset				: "<não defindo>",
		armenian			: "Numeração armênia",
		georgian			: "Numeração georgiana (an, ban, gan, etc.)",
		lowerRoman			: "Romana Minúscula (i, ii, iii, iv, v, etc.)",
		upperRoman			: "Romana Maiúscula (I, II, III, IV, V, etc.)",
		lowerAlpha			: "Alfabética Minúscula (a, b, c, d, e, etc.)",
		upperAlpha			: "Alfabética Maiúscula (A, B, C, D, E, etc.)",
		lowerGreek			: "Grega Minúscula (alfa, beta, gama, etc.)",
		decimal				: "Decimal (1, 2, 3, etc.)",
		decimalLeadingZero	: "Decimal com zero à esquerda (01, 02, 03, etc.)"
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: "Localizar e Substituir",
		find				: "Localizar",
		replace				: "Substituir",
		findWhat			: "Localizar:",
		replaceWith			: "Substituir por:",
		notFoundMsg			: "O texto especificado não foi localizado.",
		findOptions			: "Localizar Opções",
		matchCase			: "Coincidir maiúscula/minúscula",
		matchWord			: "Coincidir a palavra completa",
		matchCyclic			: "Coincidir cíclico",
		replaceAll			: "Substituir Todos",
		replaceSuccessMsg	: "%1 ocorrência(s) substituída(s)."
	},

	// Table Dialog
	table :
	{
		toolbar		: "Inserir Tabela",
		title		: "Tabela",
		menu		: "Propriedades da Tabela",
		deleteTable	: "Excluir Tabela",
		rows		: "Linhas:",
		columns		: "Colunas:",
		border		: "Tamanho de Borda:",
		widthPx		: "pixels",
		widthPc		: "percentual",
		widthUnit	: "Unidade de largura:",
		cellSpace	: "Espaçamento de célula:",
		cellPad		: "Preenchimento de célula:",
		caption		: "Legenda:",
		summary		: "Resumo:",
		headers		: "Cabeçalhos:",
		headersNone		: "Nenhum",
		headersColumn	: "Primeira Coluna",
		headersRow		: "Primeira Linha",
		headersBoth		: "Ambos",
		invalidRows		: "O número de linhas deve ser um número inteiro maior que zero.",
		invalidCols		: "O número de colunas deve ser um número inteiro maior que zero.",
		invalidBorder	: "O tamanho da borda deve ser um número positivo.",
		invalidWidth	: "A largura da tabela deve ser um número positivo.",
		invalidHeight	: "A altura da tabela deve ser um número positivo.",
		invalidCellSpacing	: "O espaçamento da célula deve ser um número positivo.",
		invalidCellPadding	: "O preenchimento da célula deve ser um número positivo.",

		cell :
		{
			menu			: "Célula",
			insertBefore	: "Inserir Célula Antes",
			insertAfter		: "Inserir Célula Depois",
			deleteCell		: "Excluir Células",
			merge			: "Mesclar Células",
			mergeRight		: "Mesclar à Direita",
			mergeDown		: "Mesclar Abaixo",
			splitHorizontal	: "Dividir Célula Horizontalmente",
			splitVertical	: "Dividir Célula Verticalmente",
			title			: "Propriedades da Célula",
			cellType		: "Tipo de célula:",
			rowSpan			: "Amplitude das linhas:",
			colSpan			: "Amplitude das colunas:",
			wordWrap		: "Quebra automática de linha:",
			hAlign			: "Alinhamento horizontal:",
			vAlign			: "Alinhamento vertical:",
			alignBaseline	: "Linha de Base",
			bgColor			: "Cor do Segundo Plano:",
			borderColor		: "Cor da borda:",
			data			: "Dados",
			header			: "Cabeçalho",
			yes				: "SIM",
			no				: "Não",
			invalidWidth	: "A largura da célula deve ser um número positivo.",
			invalidHeight	: "A altura da célula deve ser um número positivo.",
			invalidRowSpan	: "A amplitude das linhas deve ser um número inteiro positivo.",
			invalidColSpan	: "A amplitude das colunas deve ser um número inteiro positivo.",
			chooseColor 	: "Mais Cores..."
		},

		row :
		{
			menu			: "Linha",
			insertBefore	: "Inserir Linha Antes",
			insertAfter		: "Inserir Linha Depois",
			deleteRow		: "Excluir Linhas"
		},

		column :
		{
			menu			: "Coluna",
			insertBefore	: "Inserir Coluna Antes",
			insertAfter		: "Inserir Coluna Depois",
			deleteColumn	: "Excluir Colunas"
		}
	},

	// Button Dialog.
	button :
	{
		title		: "Propriedades do Botão",
		text		: "Texto (Valor):",
		type		: "Tipo:",
		typeBtn		: "Botão",
		typeSbm		: "Submeter",
		typeRst		: "Reconfigurar"
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : "Propriedades da Caixa de Seleção",
		radioTitle	: "Propriedades do Botão de Opções",
		value		: "Valor:",
		selected	: "Selecionado"
	},

	// Form Dialog.
	form :
	{
		title		: "Inserir Formulário",
		menu		: "Propriedades do Formulário",
		action		: "Ação:",
		method		: "Método:",
		encoding	: "Codificação:"
	},

	// Select Field Dialog.
	select :
	{
		title		: "Selecionar Propriedades do Campo",
		selectInfo	: "Selecionar Informação",
		opAvail		: "Opções Disponíveis",
		value		: "Valor:",
		size		: "79 49 136 8",
		lines		: "linhas",
		chkMulti	: "Permitir seleções múltiplas",
		opText		: "Texto:",
		opValue		: "Valor:",
		btnAdd		: "Incluir",
		btnModify	: "Modificar",
		btnUp		: "Para cima",
		btnDown		: "Para baixo",
		btnSetValue : "Configurar como valor selecionado",
		btnDelete	: "Excluir"
	},

	// Textarea Dialog.
	textarea :
	{
		title		: "Propriedades da Área de Texto",
		cols		: "Colunas:",
		rows		: "Linhas:"
	},

	// Text Field Dialog.
	textfield :
	{
		title		: "Propriedades do Campo de Texto",
		name		: "Nome:",
		value		: "Valor:",
		charWidth	: "Largura de Caractere:",
		maxChars	: "Máximo de Caracteres:",
		type		: "Tipo:",
		typeText	: "Texto",
		typePass	: "Senha"
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: "Propriedades do Campo Oculto",
		name	: "Nome:",
		value	: "Valor:"
	},

	// Image Dialog.
	image :
	{
		title		: "Imagem",
		titleButton	: "Propriedades do Botão de Imagem",
		menu		: "Propriedades de Imagem",
		infoTab	: "Informações de Imagem",
		btnUpload	: "Fazer upload da imagem",
		upload	: "Carregar",
		alt		: "Texto alternativo:",
		lockRatio	: "Bloquear Proporção",
		resetSize	: "Reconfigurar Tamanho",
		border	: "Moldura:",
		hSpace	: "Espaço horizontal:",
		vSpace	: "Espaço vertical:",
		alertUrl	: "Digite a URL da imagem",
		linkTab	: "Link",
		button2Img	: "Deseja transformar o botão de imagem selecionado em uma imagem simples?",
		img2Button	: "Deseja transformar a imagem selecionada em um botão de imagem?",
		urlMissing : "A URL de origem da imagem está ausente.",
		validateBorder : "A borda deve ser um número inteiro positivo.",
		validateHSpace : "O espaço horizontal deve ser um número inteiro positivo.",
		validateVSpace : "O espaço vertical deve ser um número inteiro positivo."
	},

	// Flash Dialog
	flash :
	{
		properties		: "Atualizar Propriedades",
		propertiesTab	: "Propriedades",
		title		: "Flash",
		chkPlay		: "Reprodução automática",
		chkLoop		: "Loop",
		chkMenu		: "Ativar menu de atualização",
		chkFull		: "Permitir tela inteira",
 		scale		: "Escala:",
		scaleAll		: "Mostrar tudo",
		scaleNoBorder	: "Sem Borda",
		scaleFit		: "Ajuste Exato",
		access			: "Acesso de script:",
		accessAlways	: "Sempre",
		accessSameDomain	: "Mesmo domínio",
		accessNever	: "Nunca",
		alignAbsBottom: "Abs Inferior",
		alignAbsMiddle: "Abs no Meio",
		alignBaseline	: "Linha de Base",
		alignTextTop	: "Parte Superior do Texto",
		quality		: "Qualidade:",
		qualityBest	: "Melhor",
		qualityHigh	: "Alta",
		qualityAutoHigh	: "Alta Automática",
		qualityMedium	: "Média",
		qualityAutoLow	: "Baixa Automática",
		qualityLow	: "Baixa",
		windowModeWindow	: "Janela",
		windowModeOpaque	: "Opaco",
		windowModeTransparent	: "Transparente",
		windowMode	: "Modo de Janela:",
		flashvars	: "Variáveis:",
		bgcolor	: "Cor do Segundo Plano:",
		hSpace	: "Espaço horizontal:",
		vSpace	: "Espaço vertical:",
		validateSrc : "A URL não deve estar vazia.",
		validateHSpace : "O espaço horizontal deve ser um número inteiro positivo.",
		validateVSpace : "O espaço vertical deve ser um número inteiro positivo."
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: "Verificação Ortográfica",
		title			: "Verificação ortográfica",
		notAvailable	: "O serviço está indisponível no momento.",
		errorLoading	: "Erro ao carregar o host do serviço de aplicativo: %s.",
		notInDic		: "Não consta no dicionário",
		changeTo		: "Alterar para",
		btnIgnore		: "Ignorar",
		btnIgnoreAll	: "Ignorar Todos",
		btnReplace		: "Substituir",
		btnReplaceAll	: "Substituir Todos",
		btnUndo			: "Desfazer",
		noSuggestions	: "- Sem sugestões -",
		progress		: "Verificação ortográfica em andamento...",
		noMispell		: "Verificação ortográfica concluída: Nenhum erro de ortografia localizado",
		noChanges		: "Verificação ortográfica concluída: Nenhuma palavra alterada",
		oneChange		: "Verificação ortográfica concluída: Uma palavra alterada",
		manyChanges		: "Verificação ortográfica concluída: %1 de palavras alteradas",
		ieSpellDownload	: "Verificador ortográfico não instalado. Deseja fazer o download dele agora?"
	},

	smiley :
	{
		toolbar	: "Inserir Emoticon",
		title	: "Emoticons",
		options : "Opções de emoticon"
	},

	elementsPath :
	{
		eleLabel : "Caminho de elementos",
		eleTitle : "%1 elemento"
	},

	numberedlist : "Lista Numerada",
	bulletedlist : "Lista com marcadores",
	indent : "Aumentar Recuo",
	outdent : "Reduzir Recuo",

	justify :
	{
		left : "Alinhar à Esquerda",
		center : "Alinhar no Centro",
		right : "Alinhar à Direita",
		block : "Alinhar Justificado"
	},

	blockquote : "Citação de Bloco",

	clipboard :
	{
		title		: "Colar",
		cutError	: "As configurações de segurança do navegador evitam o recorte automático. Em vez disso, use Ctrl+X em seu teclado.",
		copyError	: "As configurações de segurança do navegador evitam a cópia automática. Em vez disso, use Ctrl+C em seu teclado.",
		pasteMsg	: "Pressione Ctrl+V (Cmd+V em MAC) para colar abaixo.",
		securityMsg	: "A segurança do navegador bloqueia a colagem direta da área de transferência.",
		pasteArea	: "Área de Colagem"
	},

	pastefromword :
	{
		confirmCleanup	: "O texto que deseja colar parece ter sido copiado do Word. Deseja limpá-lo antes de colar?",
		toolbar			: "Colar Especial",
		title			: "Colar Especial",
		error			: "Não foi possível limpar os dados colados devido a um erro interno"
	},

	pasteText :
	{
		button	: "Colar como texto simples",
		title	: "Colar como Texto Simples"
	},

	templates :
	{
		button 			: "Modelos",
		title : "Modelos de Conteúdo",
		options : "Opções de Modelos",
		insertOption: "Substituir conteúdos reais",
		selectPromptMsg: "Selecione o modelo para abrir no editor",
		emptyListMsg : "(Nenhum modelo definido)"
	},

	showBlocks : "Mostrar Blocos",

	stylesCombo :
	{
		label		: "Estilos",
		panelTitle 	: "Estilos",
		panelTitle1	: "Estilos de Bloco",
		panelTitle2	: "Estilos Sequenciais",
		panelTitle3	: "Estilos de Objeto"
	},

	format :
	{
		label		: "Formatar",
		panelTitle	: "Formato de Parágrafo",

		tag_p		: "Normal",
		tag_pre		: "Formatado",
		tag_address	: "Endereço",
		tag_h1		: "Título 1",
		tag_h2		: "Título 2",
		tag_h3		: "Título 3",
		tag_h4		: "Título 4",
		tag_h5		: "Título 5",
		tag_h6		: "Título 6",
		tag_div		: "Normal (DIV)"
	},

	div :
	{
		title				: "Criar Contêiner Div",
		toolbar				: "Criar Contêiner Div",
		cssClassInputLabel	: "Classes de Folha de Estilo",
		styleSelectLabel	: "Estilo",
		IdInputLabel		: "ID",
		languageCodeInputLabel	: " Código de Idioma",
		inlineStyleInputLabel	: "Estilo Sequencial",
		advisoryTitleInputLabel	: "Título de Conselheiro",
		langDirLabel		: "Direção de Idioma",
		langDirLTRLabel		: "Da Esquerda para Direita (LTR)",
		langDirRTLLabel		: "Da Direita para Esquerda (RTL)",
		edit				: "Editar Div",
		remove				: "Remover Div"
  	},

	iframe :
	{
		title		: "Propriedades IFrame",
		toolbar		: "Inserir IFrame",
		noUrl		: "Digite a URL do iframe",
		scrolling	: "Ativar barras de rolagem",
		border		: "Mostrar borda do quadro"
	},

	font :
	{
		label		: "Fonte",
		voiceLabel	: "Fonte",
		panelTitle	: "Nome da Fonte"
	},

	fontSize :
	{
		label		: "Tamanho",
		voiceLabel	: "Tamanho da Fonte",
		panelTitle	: "Tamanho da Fonte"
	},

	colorButton :
	{
		textColorTitle	: "Cor do Texto",
		bgColorTitle	: "Cor do Segundo Plano",
		panelTitle		: "Cores",
		auto			: "Automático",
		more			: "Mais Cores..."
	},

	colors :
	{
		"000" : "Preto",
		"800000" : "Castanho",
		"8B4513" : "Camurça",
		"2F4F4F" : "Cinza Ardósia Escuro",
		"008080" : "Azul Esverdeado",
		"000080" : "Azul Marinho",
		"4B0082" : "Índigo",
		"696969" : "Cinza Escuro",
		"B22222" : "Tijolo",
		"A52A2A" : "Marrom",
		"DAA520" : "Golden Rod",
		"006400" : "Verde escuro",
		"40E0D0" : "Turquesa",
		"0000CD" : "Azul Médio",
		"800080" : "Roxo",
		"808080" : "Cinza",
		"F00" : "Vermelho",
		"FF8C00" : "Laranja Escuro",
		"FFD700" : "Ouro",
		"008000" : "Verde",
		"0FF" : "Ciano",
		"00F" : "Azul",
		"EE82EE" : "Violeta",
		"A9A9A9" : "Cinza Opaco",
		"FFA07A" : "Salmão Claro",
		"FFA500" : "Laranja",
		"FFFF00" : "Amarelo",
		"00FF00" : "Verde-Limão",
		"AFEEEE" : "Turquesa Claro",
		"ADD8E6" : "Azul Claro",
		"DDA0DD" : "Ameixa",
		"D3D3D3" : "Cinza Claro",
		"FFF0F5" : "Lavanda Claro",
		"FAEBD7" : "Branco Clássico",
		"FFFFE0" : "Amarelo Claro",
		"F0FFF0" : "Melão",
		"F0FFFF" : "Azul celeste",
		"F0F8FF" : "Azul Aço",
		"E6E6FA" : "Lavanda",
		"FFF" : "Branco"
	},

	scayt :
	{
		title			: "Verificação Ortográfica Durante Digitação",
		opera_title		: "Não suportado por Opera",
		enable			: "Ativar SCAYT",
		disable			: "Desativar SCAYT",
		about			: "Sobre SCAYT",
		toggle			: "Alternar SCAYT",
		options			: "Opções",
		langs			: "Idiomas",
		moreSuggestions	: "Mais Sugestões",
		ignore			: "Ignorar",
		ignoreAll		: "Ignorar Todos",
		addWord			: "Incluir Palavra",
		emptyDic		: "O nome do dicionário não deve estar vazio.",

		optionsTab		: "Opções",
		allCaps			: "Ignorar Todas Palavras em Caixa Alta",
		ignoreDomainNames : "Ignorar Nomes de Domínios",
		mixedCase		: "Ignorar palavras compostas por letras maiúsculas e minúsculas",
		mixedWithDigits	: "Ignorar Palavras com Números",

		languagesTab	: "Idiomas",

		dictionariesTab	: "Dicionários",
		dic_field_name	: "Nome do dicionário",
		dic_create		: "Criar",
		dic_restore		: "Restaurar",
		dic_delete		: "Excluir",
		dic_rename		: "Renomear",
		dic_info		: "Inicialmente, o Dicionário do Usuário é armazenado em um Cookie. Entretanto, Cookies são limitados no tamanho. Quando o Dicionário do Usuário cresce até um ponto em que não pode mais ser armazenado em um Cookie, o dicionário pode ser armazenado em nosso servidor. Para armazenar seu dicionário pessoal em nosso servidor, você deve especificar um nome para seu dicionário. Se você já tiver um dicionário armazenado, digite o nome dele e clique no botão Restaurar.",

		aboutTab		: "Sobre"
	},

	about :
	{
		title		: "Sobre o CKEditor",
		dlgTitle	: "Sobre o CKEditor",
		help	: "Verificar $1 para obter ajuda.",
		userGuide : "Guia do Usuário do CKEditor",
		moreInfo	: "Para obter informações sobre licença, visite nosso Web site:",
		copy		: "Copyright &copy; $1. Todos os direitos reservados."
	},

	maximize : "Maximizar",
	minimize : "Minimizar",

	fakeobjects :
	{
		anchor	: "Âncora",
		flash	: "Atualizar Animação",
		iframe		: "IFrame",
		hiddenfield	: "Campo Oculto",
		unknown	: "Objeto Desconhecido"
	},

	resize : "Arraste para redimensionar",

	colordialog :
	{
		title		: "Selecionar Cor",
		options	:	"Opções de cor",
		highlight	: "Realçar",
		selected	: "Cor selecionada",
		clear		: "Limpar"
	},

	toolbarCollapse	: "Reduzir a Barra de Ferramentas",
	toolbarExpand	: "Expandir a Barra de Ferramentas",

	toolbarGroups :
	{
		document : "Documento",
		clipboard : "Área de transferência/Desfazer",
		editing : "Edição",
		forms : "Formulários",
		basicstyles : "Estilos Básicos",
		paragraph : "Parágrafo",
		links : "Links",
		insert : "Inserir",
		styles : "Estilos",
		colors : "Cores",
		tools : "Ferramentas"
	},

	bidi :
	{
		ltr : "Direção do texto da esquerda para a direita",
		rtl : "Direção do texto da direita para a esquerda"
	},

	docprops :
	{
		label : "Propriedades do Documento",
		title : "Propriedades do Documento",
		design : "Design",
		meta : "Meta Tags",
		chooseColor : "Escolher",
		other : "Outro...",
		docTitle :	"Título da página",
		charset : 	"Codificação de Conjunto de Caracteres",
		charsetOther : "Outra Codificação de Conjunto de Caracteres",
		charsetASCII : "ASCII",
		charsetCE : "Europeu Central",
		charsetCT : "Chinês Tradicional (Big5)",
		charsetCR : "Cirílico",
		charsetGR : "Grego",
		charsetJP : "Japonês",
		charsetKR : "Coreano",
		charsetTR : "Turco",
		charsetUN : "Unicode (UTF-8)",
		charsetWE : "Europeu Ocidental",
		docType : "Título de Tipo de Documento",
		docTypeOther : "Outro Título de Tipo de Documento",
		xhtmlDec : "Incluir Declarações XHTML",
		bgColor : "Cor do Segundo Plano",
		bgImage : "URL da Imagem de Plano de Fundo",
		bgFixed : "Plano de Fundo Sem Rolagem (Fixo)",
		txtColor : "Cor do Texto",
		margin : "Margens da Página",
		marginTop : "Parte Superior",
		marginLeft : "Esquerda",
		marginRight : "Direita",
		marginBottom : "Parte Inferior",
		metaKeywords : "Palavras-chave de Indexação de Documento (separadas por vírgula)",
		metaDescription : "Descrição do Documento",
		metaAuthor : "Autor",
		metaCopyright : "Copyright",
		previewHtml : "<p>Este é um <strong>texto de amostra</strong>. Você está usando o <a href=\"javascript:void(0)\">CKEditor</a>.</p>"
	},

	ibm :
	{

		common :
		{
			widthIn	: "polegadas",
			widthCm	: "centímetros",
			widthMm	: "milímetros",
			widthEm	: "em",
			widthEx	: "ex",
			widthPt	: "pontos",
			widthPc	: "picas",
			required : "Obrigatória"
		},
		table :
		{
			createTable : 'Inserir Tabela',
			heightUnit	: "Unidade de altura:",
			insertMultipleRows : "Inserir Linhas",
			insertMultipleCols : "Inserir Colunas",
			noOfRows : "Número de Linhas:",
			noOfCols : "Número de Colunas:",
			insertPosition : "Posição:",
			insertBefore : "Antes",
			insertAfter : "Após",
			selectTable : "Selecionar Tabela",
			selectRow : "Selecionar Linha",
			columnTitle : "Largura da Coluna",
			colProps : "Propriedades da Coluna",
			invalidColumnWidth	: "A largura da coluna deve ser um número positivo.",
			fixedColWidths : "Larguras de coluna fixas"
		},
		cell :
		{
			title : "Célula"
		},
		colordialog :
		{
			currentColor	: "Cor atual"
		},
		emoticon :
		{
			angel		: "Anjo",
			angry		: "Zangado",
			cool		: "Legal",
			crying		: "Chorando",
			eyebrow		: "Sobrancelha",
			frown		: "Franzindo as Sobrancelhas",
			goofy		: "Bobo",
			grin		: "Sorriso Largo",
			half		: "Confuso",
			idea		: "Ideia",
			laughing	: "Rindo",
			laughroll	: "Rindo muito",
			no			: "Não",
			oops		: "Opa",
			shy			: "Tímido",
			smile		: "Sorrindo",
			tongue		: "Língua",
			wink		: "Piscar",
			yes			: "SIM"
		},

		menu :
		{
			link	: "Inserir Link",
			list	: "Lista",
			paste	: "Colar",
			action	: "Ação",
			align	: "Alinhar",
			emoticon: "Emoticon"
		},

		iframe :
		{
			title	: "IFrame"
		},

		list:
		{
			numberedTitle		: "Lista Numerada",
			bulletedTitle		: "Lista com marcadores",
			description			: "As configurações serão aplicadas ao nível da lista atual",
			fontsize			: "Tamanho da fonte:"
		},

		// Anchor dialog
		anchor :
		{
			description	: "Digite um nome de marcador descritivo, como 'Seção 1.2'. Depois de inserir o marcador, clique no ícone 'Link' ou 'Link do Documento' para vincular a ele.",
			title		: "Link de Marcador do Documento",
			linkTo		: "Vincular a:"
		},

		urllink :
		{
			title : "Link da URL",
			linkText : "Texto do Link:",
			selectAnchor: "Selecionar uma Âncora:",
			nourl: "Insira uma URL no campo de texto.",
			urlhelp: "Digite ou cole uma URL para abrir quando os usuários clicarem neste link, por exemplo http://www.example.com.",
			displaytxthelp: "Digite a exibição de texto para o link.",
			openinnew : "Abrir link na nova janela"
		},

		spellchecker :
		{
			title : "Verificação Ortográfica",
			replace : "Substituir:",
			suggesstion : "Sugestões:",
			withLabel : "Com:",
			replaceButton : "Substituir",
			replaceallButton:"Substituir Todos",
			skipButton:"Ignorar",
			skipallButton: "Ignorar Todos",
			undochanges: "Desfazer Alterações",
			complete: "Verificação Ortográfica Concluída",
			problem: "Problema ao recuperar dados XML",
			addDictionary: "Incluir ao Dicionário",
			editDictionary: "Editar Dicionário"
		},

		status :
		{
			keystrokeForHelp: "Pressione ALT 0 para obter ajuda"
		},

		linkdialog :
		{
			label : "Diálogo de Link"
		},

		imagedatauri :
		{
			error : "A colagem de imagens não é atualmente suportada. Em vez disso, use a opção da barra de ferramentas \'Inserir Imagem\'."
		},

		image :
		{
			previewText : "O texto fluirá em torno da imagem que estiver adicionando como neste exemplo.",
			fileUpload : "Selecionar um arquivo de imagem do seu computador:"
		}
	}

};
