/* Copyright IBM Corp. 2010-2013 All Rights Reserved.                    */

(function()
{

	var includesElementNodes = false;

	//Determine whether the 'Display Text' field should be enabled or not
	function containsElementNodes(ranges) {

		includesElementNodes = false;		//reset includesElementNodes

		//if the start node is an element, use the element itself for the comparison, else use it's parent
		var startElement = (ranges[0].startContainer instanceof CKEDITOR.dom.element) ? ranges[0].startContainer : ranges[0].startContainer.getParent();
		var endElement = (ranges[0].endContainer instanceof CKEDITOR.dom.element) ? ranges[0].endContainer : ranges[0].endContainer.getParent();

		if (!startElement.equals(endElement)){		//we know the selection contains element nodes
			includesElementNodes = true;
		}else{
			includesElementNodes = hasChildElementNodes(ranges[0]);		//the end node is contained within the start node but there may be other child element nodes
		}

		return includesElementNodes;
	}

	//the element may have child nodes which span the entire anchor - find the inner most one
	function findInnerElement (element) {

		// if the argument is an element check if its children expand the entire element i.e. it's child count is 1
		//e.g. <strong><em>text goes here</em></strong> should return either <em> or a text node depending on how many text nodes the text is spread across
		if (element instanceof CKEDITOR.dom.element && element.getChildCount() == 1) {
			return findInnerElement(element.getFirst());
		}else {
			return element;
		}
	}

	//Note: style.apply ignores child anchor nodes so here we store a reference to them so that we can update their href and target manually after the style is applied to the rest of the selection
	function findChildAnchors (elements) {

		var anchorNodes = new Array();

		if (elements instanceof CKEDITOR.dom.range) {

			var walker = new CKEDITOR.dom.walker(elements);

			// The walker evaluator function tells the walker what nodes to pause at. Here we are walking anchor nodes.
			walker.evaluator = function(node) {	return (node.type === CKEDITOR.NODE_ELEMENT && node.$.nodeName == 'A')};
			walker.breakOnFalse = false;		//we need to search all nodes in the range

			while (walker.next()) {	//an anchor node is found
				anchorNodes.push(walker.current);
			}

			/* The walker removes the selection in some browsers so we need to re-select the elements.  This is not required in IE though - if we re-select the elements in IE, the selection is wiped and selection.getSelectedText() which we use to populate the Display Text field will return ''. Note this IE issue only happens the first time the page is loaded and only occurs with some selections e.g. selection across multiple paragraphs - Ref: RTC defect #18393
			*/
			if (!CKEDITOR.env.ie)
				elements.select();
		}
		return anchorNodes;
	}


	// Determines if the element or range contains element nodes.
    function hasChildElementNodes (elements) {

		var result = false;

		// if the argument is an element check if any of its children are element nodes.
		if (elements instanceof CKEDITOR.dom.element) {
			var children = elements.getChildren();
			for (var i = children.count(); i--; ) {


				if (children.getItem(i).type === CKEDITOR.NODE_ELEMENT) {
					result = true;
					break;
				}
			}

		// if the agrument is a range use a dom walker to check for element nodes.
		} else if (elements instanceof CKEDITOR.dom.range) {

			var walker = new CKEDITOR.dom.walker(elements);

			// The walker evaluator function tells the walker what nodes to pause at. Here we are walking element nodes.
			walker.evaluator = function(node) {	return (node.type === CKEDITOR.NODE_ELEMENT) };
			walker.breakOnFalse = true;

			// We only need to find the first node.
			if (walker.next()) {
				result = true;
			}

			/* The walker removes the selection in some browsers so we need to re-select the elements.  This is not required in IE though - if we re-select the elements in IE, the selection is wiped and selection.getSelectedText() which we use to populate the Display Text field will return ''. Note this IE issue only happens the first time the page is loaded and only occurs with some selections e.g. selection across multiple paragraphs - Ref: RTC defect #18393
			*/
			if (!CKEDITOR.env.ie)
				elements.select();

		}

		return result;
    }

	//after the new anchor has been applied the range may have identical child nodes i.e. anchor nodes with all the same attributes. Merge them to tidy up the DOM
	function mergeIdenticalAnchorNodes (elements) {

		if (elements instanceof CKEDITOR.dom.range) {

			var walker = new CKEDITOR.dom.walker(elements);

			// The walker evaluator function tells the walker what nodes to pause at. Here we are walking anchor nodes.
			walker.evaluator = function(node) {	return (node.type === CKEDITOR.NODE_ELEMENT && node.$.nodeName == 'A')};
			walker.breakOnFalse = false;		//we need to search all nodes in the range

			while (walker.next()) {	//an anchor node is found
				walker.current.mergeSiblings();	//merge identical sibling anchor nodes
			}
		}
	}

	//function to traverse the document and find anchor links - taken from parseLink() in  plugins/link/dialogs/link.js
	function getAnchors (editor){

		// Find out whether we have any anchors in the editor.
		var anchors = [],
			item;

		// For some browsers we set contenteditable="false" on anchors, making document.anchors not to include them, so we must traverse the links manually (#7893).
		if ( CKEDITOR.plugins.link.emptyAnchorFix )
		{
			var links = editor.document.getElementsByTag( 'a' );
			for ( var i = 0, count = links.count(); i < count; i++ )
			{
				item = links.getItem( i );
				if ( item.data( 'cke-saved-name' ) || item.hasAttribute( 'name' ) )
					anchors.push( { name : item.data( 'cke-saved-name' ) || item.getAttribute( 'name' ), id : item.getAttribute( 'id' ) } );
			}
		}
		else
		{
			var anchorList = new CKEDITOR.dom.nodeList( editor.document.$.anchors );
			for ( var i = 0, count = anchorList.count(); i < count; i++ )
			{
				item = anchorList.getItem( i );
				anchors[ i ] = { name : item.getAttribute( 'name' ), id : item.getAttribute( 'id' ) };
			}
		}

		if ( CKEDITOR.plugins.link.fakeAnchor )
		{
			var imgs = editor.document.getElementsByTag( 'img' );
			for ( i = 0, count = imgs.count(); i < count; i++ )
			{
				if ( ( item = CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, imgs.getItem( i ) ) ) )
					anchors.push( { name : item.getAttribute( 'name' ), id : item.getAttribute( 'id' ) } );
			}
		}

		return anchors;
	}


	CKEDITOR.plugins.add('urllink', {
		requires: ['link'],

		init: function(editor) {

			// Override the link command to use the urllink dialog.
			editor.addCommand('link', new CKEDITOR.dialogCommand('urllink'));
			CKEDITOR.dialog.add('urllink', this.path + 'dialogs/urllink.js');

			//add a bookmark command which will also use the urllink dialog
			editor.addCommand('bookmark', new CKEDITOR.dialogCommand('bookmark'));
			CKEDITOR.dialog.add('bookmark', this.path + 'dialogs/urllink.js');

			editor.ui.addButton( 'Bookmark',
			{
				label : editor.lang.ibm.anchor.title,
				command : 'bookmark'
			} );

			// Do not use 'Edit Link' as the toolbar menu item label.
			if (editor.addMenuItems) {
				var linkMenuItem = editor.getMenuItem('link');
				if (typeof linkMenuItem === 'object') {
					linkMenuItem.label = editor.lang.link.menu;
				}
			}

			(function() {
				var regexStr = "(^|\\s|>|&nbsp;*)" // the URL must be at the start of the string, or be preceded with a whitespace, or after a html tag.
							+ "(" // capture to $2
							+ "((https?|ftps?|news|mailto):|www\\.|w3\\.)" // protocol, www or w3
							+ "([\\w/\\#~:.?+=%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]|&amp;)+?" // one or more valid chars take little as possible
							+ ")"
							+ "(?=" // lookahead for the end of the url
							+ "[.:?\\-\\),;!\\]'\"]*" // punct
							+ "(?:[^\\w/\\#~:.?+=&%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]"// invalid character
							+ "|&nbsp;" // non-breaking space entity
							+ "|$)" // or end of string
							+ ")";

				//IE doesn't convert w3 links automatically - we need to cover this usecase
				var regexStrIE = "(^|\\s|>|&nbsp;*)" // the URL must be at the start of the string, or be preceded with a whitespace, or after a html tag.
							+ "(" // capture to $2
							+ "(w3\\.)" // w3
							+ "([\\w/\\#~:.?+=%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]|&amp;)+?" // one or more valid chars take little as possible
							+ ")"
							+ "(?=" // lookahead for the end of the url
							+ "[.:?\\-\\),;!\\]'\"]*" // punct
							+ "(?:[^\\w/\\#~:.?+=&%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]"// invalid character
							+ "|&nbsp;" // non-breaking space entity
							+ "|$)" // or end of string
							+ ")";

				var urlRegexp = new RegExp(regexStr, 'gi');
				var urlRegexpIE = new RegExp(regexStrIE, 'gi');

				var linkConverter = function(evt) {

					// Convert pasted URLs into HTML links. IE already converts pasted links.

					var data = evt.data,
						html = data.html,
						link = '', start = 0, end = 0,
						result;

					if (CKEDITOR.env.ie) {
						result = urlRegexpIE.exec(html);
					}else{
						result = urlRegexp.exec(html);
					}
					while (result) {

						// Create the link to insert into the pasted content.
						link = result[2].replace(/^((www|w3)\..+)/, 'http://$1');
						link = link.replace(/&amp;/g, '&');
						link = link.replace(/"/g, '&quot;');			//encode " or it will not be recognised as part of the URL
						link = '<a href="' + link + '">' + result[2] + '</a>';

						// replace the URL with the link.
						start = result.index + result[1].length;
						end = result.index + result[0].length;
						html = html.substring(0, start) + link + html.substring(end);

						// Search for the next URL starting at the end of the inserted link.
						if (CKEDITOR.env.ie) {
							urlRegexpIE.lastIndex = (result.index + link.length);
							result = urlRegexpIE.exec(html);
						} else {
						urlRegexp.lastIndex = (result.index + link.length);
						result = urlRegexp.exec(html);
						}
					}

					data.html = html;
				};

				editor.addCommand('insertLink',
					{

						/* Inserts a new link at the current selection
						  * attributes is an object containing:
						  *	attributes[ 'href' ] - the href for the link (required)
						  *	attributes['target'] - a target for the link. Supported values are '' and '_blank', not supported for anchor links
						  *	attributes['text'] - the display text for the link
						  * attributes['xxx'] where xxx is any other attribute you wish to provide on the inserted link
						  */
						exec : function( editor, attributes)
						{
							var anchorRegex = /^#/,		//starts with #
								isAnchor;

							if (!attributes['href'])
								return;

							isAnchor = anchorRegex.test(attributes['href']);
							attributes['data-cke-saved-href'] = attributes['href'];

							if (!attributes['text'])
								attributes['text'] = attributes['href'];

							var selection = editor.getSelection(),
							ranges = selection.getRanges( true );


							//if the range is collapsed includesElementNodes should always be false. This needs to be set explicitly here because containsELementNodes() is not called for collapsed ranges.
							//Therefore if the previous call to containsELementNodes returned true, then includesElementNodes would be true here even for a collapsed range and the text for the new link would not be inserted into the editor.
							if(ranges[0].collapsed)	{
								includesElementNodes = false;
							} else if (attributes['src'] != 'urllink') {	//if this command has not been called by the urllink dialog, check whether to overwrite the selected content or not i.e. does the selection contain element nodes
								containsElementNodes(ranges);
							}
							delete attributes['src'];

							if ( ranges.length == 1  && !includesElementNodes)
							{
								if(!ranges[0].collapsed){
									ranges[0].deleteContents(false);		//delete the text that was previously selected in the editor
								}

								//insert the new text value from the Display Text field - we need to replace white-spaces with \u00A0 so that browsers don't collapse multiple white spaces to just one space.
								var text = new CKEDITOR.dom.text( attributes[ 'text' ].replace(/ /g,'\u00A0'), editor.document );
								ranges[0].insertNode( text );
								ranges[0].selectNodeContents( text );
								selection.selectRanges( ranges );
							}

							delete attributes['text'];		//remove text attribute before applying other attributes

							//Store a reference to any pre-existing anchor nodes so that we can update their href and target values after the styles have been applied.
							var childAnchors = findChildAnchors(ranges[0]);

							if(isAnchor){
								delete attributes['target'];		//don't support target for anchors
							} else {
								var newTarget = attributes['target'];
								if (attributes['target'] == ''){delete attributes['target'];	}	//the target attribute should only be applied if it has a value
							}

							var style = new CKEDITOR.style( { element : 'a', attributes : attributes } );
							style.type = CKEDITOR.STYLE_INLINE;		// need to override... dunno why.
							style.apply( editor.document );

							//Update the href and target values of any pre-existing anchors within the selection
							for (var i = 0; i<childAnchors.length; i++){
								childAnchors[i].setAttribute('href', attributes['href']);
								if(childAnchors[i].hasAttribute('data-cke-saved-href')){
									childAnchors[i].setAttribute('data-cke-saved-href', attributes['href']);
								}

								if(isAnchor && childAnchors[i].hasAttribute('target')){	//always remove target from anchors (usecase: changing an existing url link with a target to an anchor link)
									childAnchors[i].removeAttribute('target');
								}else if(!isAnchor){		//only set a target for internal url links, not anchors
									if (childAnchors[i].hasAttribute('target') && newTarget == ''){
										childAnchors[i].removeAttribute('target');
									}else if (newTarget != ''){
										childAnchors[i].setAttribute('target', newTarget);
									}
								}
							}
							//The merge is working incorrectly in some cases (see RTC defect #19103). This is due to a mal-formed DOM structure (cksource ticket #8368)
							//mergeIdenticalAnchorNodes(ranges[0]);		//merge identical anchor nodes together

						}
					} );

				editor.on('paste', linkConverter);
			})();
		},

		containsElementNodes : containsElementNodes,
		findInnerElement : findInnerElement,
		findChildAnchors : findChildAnchors,
		hasChildElementNodes : hasChildElementNodes,
		mergeIdenticalAnchorNodes : mergeIdenticalAnchorNodes,
		includesElementNodes : includesElementNodes,
		getAnchors : getAnchors

	});

})();
