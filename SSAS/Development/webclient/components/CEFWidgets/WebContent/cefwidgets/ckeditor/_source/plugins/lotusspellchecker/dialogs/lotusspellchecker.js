/* Copyright IBM Corp. 2010-2013 All Rights Reserved.                    */

(function()
{
	/**
	 * Retrieves spelling suggestions from the server for misspelt words.
	 *  The server should return the following json object for the misspelt words 'telehone' & 'matearials'
	 * [{"suggestions":["telephone","telethon"], "originalWord":"telehone"},{"suggestions":["materials","material's"], "originalWord":"matearials"}]
	 *  Also, this plugin supports XTAF spellchecker service. The XTAF spellchecker service returns the following json object for the misspelt words 'telehone' & 'matearials'
	 * {"result":[{"endIndex":8,"autoCorrectReplacement":null,"beginIndex":0,"word":"telehone","suggestions":["telephone","telephony","telephones","telephoner","telephoned"]},{"endIndex":19,"autoCorrectReplacement":null,"beginIndex":9,"word":"matearials","suggestions":["materials","material's","material"]}]}
	 */
	function SpellChecker(editor)
	{
		var config = editor.config.lotusSpellChecker;
		if (config.service == 'XTAF')
		{
			this.service = config.service;
			this.restUrl = config.restUrl
					+ '/' + config.lang
					+ '?'
					+ 'suggestions=' + config.suggestions
					+ '&autoCorrect=false'
					+ '&text=';
			this.wordSeparator = ' ';
			config.preventCache = false;
			this.originalWordKey = 'word';
		}
		else
		{
			this.restUrl = config.restUrl + '?delimiter=,&format=' + config.format
					+ '&language=' + config.lang + '&suggestions=' + config.suggestions
					+ '&searchString=';
			this.wordSeparator = ',';
			this.originalWordKey = 'originalWord';
		}

        // Provide a query string parameter to pervent caching, if required.
        this._getCacheParam = function()
            {
                return (config.preventCache ?
                            function() { return '&timestamp=' + new Date().getTime(); }
                        :   function() { return ''; });
            }();

		this.maxLength = 900; // limit the length of the request url.
		this.words = '';
		this.ignoreWords = '';
		this.misspellings = [];
	}

	SpellChecker.prototype =
	{
		// Gets a pattern string for RegExp used to search word in wordlist.
		getFindWordRegExpPattern: function(word)
		{
			return '(?:^|' + this.wordSeparator + ')'
				+ word
				+ '(?=' + this.wordSeparator + '|$)';
		},

		// Adds a word to check. Returns true if the word was added, false if no more words can be added.
		addWord: function(word)
		{
			if (this.words.length >= this.maxLength)
				return false;

			if (!new RegExp(this.getFindWordRegExpPattern(word)).test(this.words))
				this.words += (word + this.wordSeparator);

			return true;
		},

		addIgnoreWord: function(word)
		{
			if (!new RegExp(this.getFindWordRegExpPattern(word)).test(this.ignoreWords))
				this.ignoreWords += (word + this.wordSeparator);
		},

		// Remove all the added words, allowing more to be added and checked.
		removeWords: function()
		{
			this.words = '';
			this.misspellings = [];
			delete this.misspeltWords;
		},

		// Spellchecks the list of added words.
		check: function()
		{
			if (this.words.length > 0)
			{
				if (this.ignoreWords.length > 0)
				{
					var removeRegex = new RegExp(this.getFindWordRegExpPattern(this.ignoreWords.replace(/\s*(,| )\s*/g, '|' )), 'g');
					this.words = this.words.replace(removeRegex, '');
				}

				var url = this.restUrl + this.words + this._getCacheParam();
				try
				{
					var data = CKEDITOR.ajax.load(url);
					if (data === null)
						return -1;

					if (typeof JSON !== 'undefined' && JSON.parse)
						this.misspellings = JSON.parse(data);
					else
						this.misspellings = eval('('+data+')');

					if (this.misspellings && this.misspellings.result)
					{
						this.misspellings = this.misspellings.result;
					}
					if (this.misspellings && this.misspellings.items)
					{
						this.misspellings = this.misspellings.items;
					}
				}
				catch(e)
				{
					return -1;
				}
			}
			return this.misspellings.length;
		},

		// Gets an array of words that were misspelt.
		getMisspeltWords: function()
		{
			if (typeof this.misspeltWords === 'undefined')
			{
				this.misspeltWords = [];
				for (var i = 0, n = this.misspellings.length; i < n; i++)
						this.misspeltWords.push(this.misspellings[i][this.originalWordKey]);
			}
			return this.misspeltWords;
		},

		// Get the word suggestions for the specified misspelt word.
		getSuggestions: function(word)
		{
			for (var i = 0, n = this.misspellings.length; i < n; i++){
				if (this.misspellings[i][this.originalWordKey] === word)
					return this.misspellings[i];
			}
			return new Array();
		}
	};


	/**
	 * Walks the specified CKEDITOR.dom.range word by word.
	 */
	function WordWalker(editor, rangeToWalk)
	{
		this.editor = editor;
		this.reset(rangeToWalk);
		this.nonLetterRegex = /[\^\$\.\*\+\?\=\!\:\|\\\/\(\)\[\]\{\}@#~"£%&_<>0-9]/;
	}

	WordWalker.prototype =
	{
		// Determines if a node has text.
		hasText: function(node)
		{
			return (node.type == CKEDITOR.NODE_TEXT && node.getText().search(/\b/) != -1);
		},

		// Gets a range that contains the entire content area.
		getContentRange: function()
		{
			var body = this.editor.document.getBody();
			var range = new CKEDITOR.dom.range();
			range.setStartAt(body, CKEDITOR.POSITION_AFTER_START);
			range.setEndAt(body, CKEDITOR.POSITION_AFTER_END);
			return range;
		},

		isWord: function(word)
		{
			return (!this.nonLetterRegex.test(word));
		},

		// Determines if the current node has more words.
		hasNodeMoreWords: function()
		{
			if (!this.textNode)
				return false;
			else
				return ((this.end !== this.lastIndex) && (this.textNode.getText().substr(this.end).search(/\b/) !== -1));
		},

		// Moves to the next word in the current node.
		moveToNextWord: function()
		{
			if (!this.hasNodeMoreWords())
				return false;

			var text = this.textNode.getText();
			this.start = text.substr(this.end).search(/\b/) + this.end;

			//Search for punctuation, or not, only if followed by a space. (don't find in a word).
			this.end = text.substr(this.start).search(/[\!'"£#\$%&\(\)\*\+,-\.\/\:;<\=>\?@\[\]\^\_\{\|\}~]*(?=\s)/);
			if (this.end === -1)
				this.end = this.lastIndex;
			else
				this.end += this.start;

			if (this.isWord(this.getWord()))
				return true;
			else
				return this.next();
		},

		// Moves to the next word.
		next: function()
		{
			// Already at the end of the range, no more words available.
			if (this.textNode === null)
				return false;

			if (!this.moveToNextWord())
			{
				this.textNode = this.walker.next.call(this.walker);

				//Stop searching if at the end of the document.
				if (!this.textNode || this.walker._.end)
					return false;

				this.lastIndex = this.textNode.getText().search(/\w\W*$/) + 1;
				this.firstIndex = this.textNode.getText().search(/\b/);

				this.end = this.firstIndex;
				return this.moveToNextWord();
			}

			return true;
		},

		// Get the current word.
		getWord: function()
		{
			if (!this.textNode)
				return null;
			else
				return this.textNode.getText().substring(this.start, this.end);
		},

		// Get a cursor object that contains location info for the current word.
		getCursor: function()
		{
			return {
				textNode: this.textNode,
				start: this.start,
				end: this.end,
				word: this.getWord()
			}
		},

		// Get the range that the walker has walked. inclusive includes the current word.
		getTraversedRange: function(inclusive)
		{
			var range = new CKEDITOR.dom.range(this.editor.document);
			range.setStart(this.walker.range.startContainer, this.walker.range.startOffset);

			if (this.textNode)
				range.setEnd(this.textNode, (inclusive ? this.end : this.start));
			else
				range.setEnd(this.walker.range.endContainer, this.walker.range.endOffset);

			return range;
		},

		// Reset the word walker to walk the specified range.
		reset: function(rangeToWalk)
		{
			// If no range was supplyed walk the entire content area.
			if (typeof rangeToWalk === 'undefined')
				rangeToWalk = this.getContentRange();

			this.walker = new CKEDITOR.dom.walker(rangeToWalk);
			this.walker.evaluator = this.hasText;
			this.walker.breakOnFalse = true;

			if (this.textNode)
				delete this.textNode
		}
	};



	/**
  	 * Walks a CKEDITOR.dom.range finding words to update.
	 */
	function WordUpdater(editor, searchWords, updateRange)
	{
		this.editor = editor;
		this.searchWords = searchWords.join(',');
		this.walker = new WordWalker(editor, updateRange);
		this.range = this.walker.walker.range;

		// Style object for highlighting the current word.
		var config = editor.config.lotusSpellChecker

		if (typeof config.highlight === 'undefined')
		{
			config.highlight = {element: 'span', styles: {'background-color': 'yellow', 'color': 'black'}};
		}

		/* Do not overwrite any existing background or foreground colour styles. */
		this.highlightStyle = new CKEDITOR.style(
								CKEDITOR.tools.extend({fullMatch: true, childRule: function(){ return false; }},
								config.highlight));
	}

	WordUpdater.prototype =
	{
		// Get a range that contains the current word.
		getWordRange: function()
		{
			var cursor = this.walker.getCursor()
			var range = new CKEDITOR.dom.range(this.editor.document);
			range.setStart(cursor.textNode, cursor.start);
			range.setEnd(cursor.textNode, cursor.end);
			return range;
		},

		// Update the word walker to walk the specified range.
		updateWalker: function(range)
		{
			this.walker.reset(range);
			this.walker.next();
		},

		// Move to the next word that is in the list of search words.
		next: function()
		{
			while (this.walker.next())
			{
				if (this.searchWords.search(new RegExp('(?:^|,)' + this.walker.getWord() + '(?=,|$)')) !== -1)
					return true;
			}
			return false;
		},

		// Get the current word.
		getWord: function()
		{
			return this.walker.getWord();
		},

		// recalculate the endoffset - it may have changed from the original endOffset because highlighting words adds spans to the range contents, therefore increasing the childCount of endContainer
		setEndOffset: function()
		{
			if (this.range.endContainer.type == CKEDITOR.NODE_TEXT) {
				this.range.endOffset = this.range.endContainer.getLength();
				return;
			}
			for (var i = 0; i < this.range.endContainer.getChildCount(); i++ ){
				if(this.range.endContainer.getChild(i).equals(this.origEndNode)){
					this.range.endOffset = i;
					break;
				}
			}
		},

		// Get the end node of the range to traverse.
		getEndNode: function(resetEndOffset)
		{

			if (resetEndOffset)
				this.setEndOffset();		//make sure the endOffset still points to the original endNode

			if (this.range.endContainer.type == CKEDITOR.NODE_TEXT)
				return this.range.endContainer;

			if (this.range.endContainer.getChildCount() > this.range.endOffset)
				return this.range.endContainer.getChild(this.range.endOffset);
			else
			{
				var node = this.range.endContainer.getLast();
				if (0 < node.getChildCount())
					node = node.getLast();

				return node;
			}
		},

		//keep a reference to the end node in the original range before any processing occurs
		getOriginalEndNode: function()
		{
			this.origEndNode = this.getEndNode(false);
		},

		// Highlight the current word.
		highlight: function()
		{
			// Remove the previous highlight if there's one.
			this.removeHighlight();
			var endNode = this.getEndNode(true);

			// Apply the highlight.
			var wordRange = this.getWordRange();
			this.highlightStyle.applyToRange(wordRange);
			this.highlightRange = wordRange;

			// Scroll the editor to the highlighted area.
			var element = wordRange.startContainer;
			if ( element.type != CKEDITOR.NODE_ELEMENT )
				element = element.getParent();
			element.scrollIntoView();

			// The highlight added a span element, update the range.
			var nextRange = new CKEDITOR.dom.range(this.editor.document);
			nextRange.setStartBefore(wordRange.startContainer.getChild(wordRange.startOffset));
			nextRange.setEndAfter(endNode);
			this.updateWalker(nextRange);
		},

		// Remove the highlight from the current word.
		removeHighlight: function()
		{
			if (this.highlightRange)
			{
				this.highlightStyle.removeFromRange(this.highlightRange);
				this.highlightRange = null;
			}
			//Don't have to update the range as the span is replaced with the child text node.
		},

		// Update the current word with the specified value.
		updateWord: function(value)
		{
			var range = this.getWordRange();
			var endNode = this.getEndNode(true);

			// Replace the word.
			var text = this.editor.document.createText(value);
			range.deleteContents();
			range.insertNode(text);

			// Text nodes have been inserted, update the range.
			var nextRange = new CKEDITOR.dom.range(this.editor.document);
			nextRange.setStartBefore(text);
			nextRange.setEndAfter(endNode);
			this.updateWalker(nextRange);
		},

		updateAll: function(word, replacement)
		{
			var wordRange = this.getWordRange();
			var endNode = this.getEndNode(true);

			//Walk the entire content range.
			var updater = new WordUpdater(this.editor, [word]);
			while (updater.next())
			{
				updater.getOriginalEndNode();		//keep a reference to the end node in the original range
				updater.updateWord(replacement);
			}

			// Text nodes have been inserted, update the range.
			var nextRange = new CKEDITOR.dom.range(this.editor.document);
			nextRange.setStart(wordRange.startContainer, wordRange.startOffset);
			nextRange.setEndAfter(endNode);
			this.walker.reset(nextRange);
		}
	};


	CKEDITOR.dialog.add('lotusspellchecker', function(editor)
	{
		var wordWalker = null;
		var spellChecker = null;
		var updater = null;
		var snapshot = null;

		function hasMisspellings()
		{
			while (wordWalker.next())
			{
				if (!spellChecker.addWord(wordWalker.getWord()))
				{
					var result = spellChecker.check();
					if (result === 0)
						spellChecker.removeWords();
					else
						return result;
				}
			}
			return spellChecker.check();
		}

		return {
			title: editor.lang.ibm.spellchecker.title,
			minWidth: 375,
			minHeight: 160,
			onLoad : function()
			{

				var me = this;
				var updateFields = function()
				{
					var result = hasMisspellings();
					if (result > 0)
					{
						updater = new WordUpdater(editor, spellChecker.getMisspeltWords(), wordWalker.getTraversedRange(false));
						if (updater.next())
						{
							updater.getOriginalEndNode();		//keep a reference to the end node in the original range
							me.setupContent(spellChecker.getSuggestions(updater.getWord()));
							return;
						}
					}
					else if (result === -1)
						alert(editor.lang.ibm.spellchecker.problem);
					else
					{
						alert(editor.lang.ibm.spellchecker.complete);
						me.getButton('cancel').click();
						updater = null;
						wordWalker = null;
						spellchecker = null;
					}
				};


				this.moveToNextMisspeltWord = function()
				{
					updater.removeHighlight();
					if (updater.next())
					{
						this.setupContent(spellChecker.getSuggestions(updater.getWord()));
						return;
					}

					// Reset the wordwalker to the next range to spellcheck.
					var nextRange = new CKEDITOR.dom.range(editor.document);
					nextRange.setStartAt(updater.getEndNode(true), CKEDITOR.POSITION_BEFORE_START);
					nextRange.setEndAt(editor.document.getBody(), CKEDITOR.POSITION_BEFORE_END);
					wordWalker.reset(nextRange);

					spellChecker.removeWords();
					updateFields();
				};

				this.initialize = function()
				{
					wordWalker = new WordWalker(editor);
					spellChecker = new SpellChecker(editor);
					updater = null;
					updateFields();
				};


			},
			onCancel : function()
			{
				if (updater)
					updater.removeHighlight();
			},
			onHide: function()
			{
				this.getContentElement('info', 'selSuggestion').clear();
				if (!editor.config.disableNativeSpellChecker)
					editor.document.getBody().setAttribute('spellcheck', 'true');
			},
			onShow : function() {
				if (!editor.config.disableNativeSpellChecker)
					editor.document.getBody().setAttribute('spellcheck', 'false');
				snapshot = editor.getData();
				editor.fire( 'saveSnapshot' );

				//Merge adjacent text nodes in editor contents so that the correct words are checked for misspellings (Ref: RTC #39678)
				var body = editor.document.getBody();
				var range = new CKEDITOR.dom.range();
				range.setStartAt(body, CKEDITOR.POSITION_AFTER_START);
				range.setEndAt(body, CKEDITOR.POSITION_AFTER_END);

				//unlock the selection as the editor contents is going to change
				var selection = editor.getSelection();
				if (selection)
					selection.unlock();

				//Walk the body to merge adjacent text nodes
				var bodyWalker = new CKEDITOR.dom.walker(range, editor.document);
				bodyWalker.evaluator = function(node) {return (node.type === CKEDITOR.NODE_TEXT)};
				bodyWalker.breakOnFalse = false;		//search all nodes in the range
				while (bodyWalker.next()) {
					//if this text node is directly preceded by another text node, merge them
					if (bodyWalker.current.getPrevious() &&  bodyWalker.current.getPrevious().type === CKEDITOR.NODE_TEXT){
						bodyWalker.current.$.nodeValue = bodyWalker.current.getPrevious().getText() + bodyWalker.current.getText();
						bodyWalker.current.getPrevious().remove(); 		//remove the previous text node
					}
				}

				this.initialize();
			},
			contents :
			[
				{
					id : 'info',
					title : 'Spell Check',
					padding : 0,
					elements :
					[
						{
							type : 'hbox',
							padding : 0,
							widths : ['80%','20%'],
							children :
							[
							 	{
							 		type : 'vbox',
							 		padding : 0,
							 		style : editor.lang.dir === 'ltr' ? 'margin-right: 10px' : 'margin-left: 10px',
							 		children :
							 		[
							 		 	{
							 		 		type : 'text',
							 		 		id : 'replaceItem',
							 		 		label : editor.lang.ibm.spellchecker.replace,
							 		 		isChanged : false,
							 		 		tabIndex : 1,
							 		 		setup : function(misspeltWord)
							 		 		{
							 		 			updater.highlight();
							 		 			this.setValue(misspeltWord[spellChecker.originalWordKey]);
							 		 			this.focus();
							 		 		}
							 		 	},
							 		 	{
							 		 		type : 'text',
							 		 		id : 'withItem',
							 		 		label : editor.lang.ibm.spellchecker.withLabel,
							 		 		'default' : '',
							 		 		isChanged : false,
							 		 		tabIndex : 1,
							 		 		setup : function(misspeltWord)
							 		 		{
												if (misspeltWord && misspeltWord.suggestions && misspeltWord.suggestions.length > 0)
												{
													this.setValue(misspeltWord.suggestions[0]);
												}
												else
												{
													this.setValue('');
												}
							 		 		},
											onChange : function()
									 		{
												var replaceButton = this.getDialog().getContentElement('info', 'replaceButton');
												var replaceAllButton = this.getDialog().getContentElement('info', 'replaceallButton');
									 			if (this.getValue() == '') {

													//add cke_disabled class to the a tags
													replaceButton.disable();
													replaceAllButton.disable();

													//add cke_disabled class to the span tags - workaround for https://dev.ckeditor.com/ticket/8677
													if(replaceButton.getElement().getChildCount() > 0 && replaceButton.getElement().getChild(0).getName() == 'span')
														replaceButton.getElement().getChild(0).addClass('cke_disabled');

													if(replaceAllButton.getElement().getChildCount() > 0 && replaceAllButton.getElement().getChild(0).getName() == 'span')
														replaceAllButton.getElement().getChild(0).addClass('cke_disabled');

									 			}else {
													//remove cke_disabled class from the a tags
													replaceButton.enable();
													replaceAllButton.enable();

													//remove cke_disabled class from the span tags - workaround for https://dev.ckeditor.com/ticket/8677
													if(replaceButton.getElement().getChildCount() > 0 && replaceButton.getElement().getChild(0).getName() == 'span')
														replaceButton.getElement().getChild(0).removeClass('cke_disabled');

													if(replaceAllButton.getElement().getChildCount() > 0 && replaceAllButton.getElement().getChild(0).getName() == 'span')
														replaceAllButton.getElement().getChild(0).removeClass('cke_disabled');
												}
									 		}
							 		 	},
							 		 	{
							 		 		type : 'select',
							 		 		id : 'selSuggestion',
							 		 		items : [],
							 		 		label : editor.lang.ibm.spellchecker.suggesstion,
							 		 		isChanged : false,
							 		 		tabIndex : 1,
											size : editor.config.lotusSpellChecker.suggestions,
											style : 'width : 100%; height: 100px;',
											onLoad : function()
											{
												if(CKEDITOR.env.ie && CKEDITOR.env.ie7Compat ){		//add extra space for IE Compat Mode ref RTC defect #38921
													var height = parseInt(this.getElement().getStyle('height'), 10);
													this.getElement().getParent().setStyle("height", height+20+"px");		//td element
												}
											},
									 		onChange : function()
									 		{
									 			if (this.getValue().length > 0) {
									 				this.getDialog().setValueOf('info', 'withItem', this.getValue());
									 			}
									 		},
									 		setup : function(misspeltWord)
									 		{
									 			this.clear();
									 			if (!misspeltWord || !misspeltWord.suggestions || misspeltWord.suggestions.length === 0)
												{
													this.disable();
									 				return;
												}

												this.enable();
									 			var words = misspeltWord.suggestions;
									 			for (var i = 0, n = words.length; i < n; i++)
									 			{
									 				this.add(words[i]);
									 			}

												/* Highlight the first item in the list. It will be the default value for withItem. */
												this.getInputElement().$.options[0].selected = 'selected';
									 		}
							 		 	}
							 		]
							 	},
							 	{
							 		type : 'vbox',
							 		style : 'margin-top: 3px',
							 		children :
							 		[
							 		 	{
							 		 		type : 'button',
											align: 'left',
											style: 'display:block;',
											id: 'replaceButton',
											label : editor.lang.ibm.spellchecker.replaceButton,
											onClick : function()
											{
												//do nothing if the button is disabled
												if (this.getElement().hasClass('cke_disabled'))
													return;

												if (!updater)
													return;

												updater.updateWord(this.getDialog().getValueOf('info', 'withItem'));
												this.getDialog().moveToNextMisspeltWord();
											}
							 		 	},
							 		 	{
							 		 		type : 'button',
											align : 'left',
											style: 'margin-top:10px;display: block;',
											id: 'replaceallButton',
											label : editor.lang.ibm.spellchecker.replaceallButton,
											onClick : function()
											{
												//do nothing if the button is disabled
												if (this.getElement().hasClass('cke_disabled'))
													return;

												if (!updater)
													return;

												var dialog = this.getDialog();
												updater.updateAll(dialog.getValueOf('info', 'replaceItem'), dialog.getValueOf('info', 'withItem'));
												dialog.moveToNextMisspeltWord();
											}
							 		 	},
							 		 	{
							 		 		type : 'button',
											align : 'left',
											style: 'margin-top:10px;display:block;',
							 		 		id : 'skipButton',
											label : editor.lang.ibm.spellchecker.skipButton,
											onClick : function()
											{
												if (!updater)
													return;

												this.getDialog().moveToNextMisspeltWord();
											}
							 		 	},
							 		 	{
							 		 		type : 'button',
											align: 'left',
											style: 'margin-top:10px;display:block;',
							 		 		id : 'skipallButton',
											label : editor.lang.ibm.spellchecker.skipallButton,
											onClick : function()
											{
												if (!updater)
													return;

												var dialog = this.getDialog();
												var word = updater.getWord();
												spellChecker.addIgnoreWord(word);

												var removeRegex = new RegExp('(?:^|,)(?:' + word + ')(?=,|$)' , 'g');
												updater.searchWords = updater.searchWords.replace(removeRegex, '');
												dialog.moveToNextMisspeltWord();
											}
							 		 	}
							 		]
							 	}
							]
						}
					]
				}
			],
			buttons : [ CKEDITOR.dialog.cancelButton ]
		};

	});
})();
