/* Copyright IBM Corp. 2010-2013 All Rights Reserved.                    */

CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,
{
	image : function(dialogDefinition, editor)
	{

		var dialog = dialogDefinition.dialog;
		if ('image' !== dialog.getName())
		{
			return;
		}

		/* The dialog's dimensions are set in the skin's skin.js */

		var infoTab = dialogDefinition.getContents('info');
		var urlField = infoTab.get('txtUrl');
		var browseBtn = infoTab.get('browse');
		var altField = infoTab.get('txtAlt');
		var widthField = infoTab.get('txtWidth');
		var heightField = infoTab.get('txtHeight');
		var borderField = infoTab.get('txtBorder');
		var hspaceField = infoTab.get('txtHSpace');
		var vspaceField = infoTab.get('txtVSpace');
		var alignField = infoTab.get('cmbAlign');
		var lockResetButtons = infoTab.elements[2].children[0].children[0].children[1];
		var previewField = infoTab.elements[2].children[1].children[0];

		//workaround for cksource ticket #8971
		if(CKEDITOR.env.ie && CKEDITOR.env.version < 9){
			altField.inputStyle = 'width:350px';
		}

		//if the dialog tab contains any required fields we must re-add the '* Required' label that was already added in customdialogs/plugin.js
		var requiredLabel = infoTab.get('requiredLabel') ? infoTab.get('requiredLabel') : {type: 'html', html: ''};

		var lang = editor.lang.ibm.image;
		if (lang && lang.previewText)
		{
			var sampleText = lang.previewText + ' ';
			sampleText += sampleText;
			sampleText += sampleText;
			sampleText += sampleText;
			sampleText += sampleText;
			previewField.html = previewField.html.replace(/Lorem.*mauris\./, sampleText);
		}

		previewField.style = 'width 100%';
		browseBtn.style = '';

		/* The width of the preview field is determined by the
		ImagePreviewBox CSS in the skin's dialog.css file. */

		widthField.width = null;
		widthField.labelLayout = null;
		heightField.width = null;
		heightField.labelLayout = null;
		borderField.width = null;
		borderField.labelLayout = null;
		hspaceField.width = null;
		hspaceField.labelLayout = null;
		vspaceField.width = null;
		vspaceField.labelLayout = null;
		alignField.style = this.styleWidth100Pc;
		alignField.labelLayout = null;

		lockResetButtons.style = 'margin-top:17px;width:' + (CKEDITOR.env.hc ? '90px' : '20px') + ';height:50px;';
		hasBrowseButton = (editor.config.filebrowserBrowseUrl || editor.config.filebrowserImageBrowseUrl);

		/* If the browse button is to be removed update the focus tab order to allow Lock Ratio and
		   Reset Size button to get focus after the Height field. */
		if (!hasBrowseButton)
		{
			dialog.on('load', function(eventInfo)
				{
					var focusList = eventInfo.sender._.focusList;
					var hspaceFocusable = focusList[4];
					hspaceFocusable.focusIndex = 6;
					focusList[4] = focusList[5];	// Move Lock Ratio after Height
					focusList[4].focusIndex = 4;
					focusList[5] = focusList[6];	// Move Reset Size
					focusList[5].focusIndex = 5;
					focusList[6] = hspaceFocusable;
				}, null, null, 15);
		}

		infoTab.style = 'width:100%'; //Overwrite the height 100%;
		infoTab.elements =
		[
			{
				type: 'hbox',
				widths: (hasBrowseButton ? ['80%', '20%'] : ['100%']),
				children: (hasBrowseButton ? [urlField, browseBtn] : [urlField])
			},
			{
				type: 'hbox',
				children: [altField]
			},
			{
				type: 'hbox',
				children: [widthField, heightField]
			},
			{
				type: 'hbox',
				children: [hspaceField, vspaceField]
			},
			{
				type: 'hbox',
				children: [alignField, borderField]
			},
			{
				type: 'hbox',
				widths: ['5%','95%'],
				children: [lockResetButtons, previewField]
			},
			requiredLabel
		];

		var linkTab = dialogDefinition.getContents('Link');
		linkTab.padding = null;
		urlField = linkTab.get('txtUrl');
		var browseBtn = linkTab.get('browse');
		var targetField = linkTab.get('cmbTarget');

		//if the dialog tab contains any required fields we must re-add the '* Required' label that was already added in customdialogs/plugin.js
		var requiredLabelLinkTab = linkTab.get('requiredLabel') ? linkTab.get('requiredLabel') : {type: 'html', html: ''};

		browseBtn.style = '';

		linkTab.elements =
		[
			{
				type: 'hbox',
				widths: (hasBrowseButton ? ['80%', '20%'] : ['100%']),
				children: (hasBrowseButton ? [urlField, browseBtn] : [urlField])
			},
			{
				type : 'hbox',
				children : [targetField]
			},
			requiredLabelLinkTab
		];

		dialogDefinition.removeContents('advanced');

		var uploadTab = dialogDefinition.getContents('Upload');
		var fileInputField = uploadTab.get('upload');
		fileInputField.label = lang.fileUpload;
	}
}, true );
