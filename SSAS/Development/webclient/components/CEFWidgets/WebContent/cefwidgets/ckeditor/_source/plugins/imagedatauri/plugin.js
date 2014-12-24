/* Copyright IBM Corp. 2011-2013 All Rights Reserved.                    */

CKEDITOR.plugins.add('imagedatauri', {

	init : function(editor)	{

		var imgRexExp = /<img[^>]*>/i;

		if (editor.config.ibmFilterPastedDataUriImage){

			// Add a paste event listener to remove data uri images from pasted content
			editor.on('paste', function(evt) {

				var isDataURIImageRegex = /<img.*src=["']data:image\/[^>]*>/gi,
					_html = evt.data.html;

				if (isDataURIImageRegex.test(_html)){

					var dataUriImages = _html.match(isDataURIImageRegex);

					for (var i=0; i<dataUriImages.length; i++){
						_html = _html.replace(dataUriImages[i], '')
					}
					alert(editor.lang.ibm.imagedatauri.error);
					evt.data.html = _html;
				}
			});

			// Add a contentDom event listener to register a drop event each time the document is recreated
			editor.on('contentDom', function(evt) {

				editor.document.on('dragover', function (evt) {

					//the drop event will not fire unless the default behaviour of the dragover event is cancelled
					if (CKEDITOR.env.webkit && imgRexExp.test(evt.data.$.dataTransfer.getData('text/html')))
						evt.data.$.preventDefault();

				});

				// Add a drop event listener to cancel the drop event if the content contains data uri images
				editor.document.on('drop', function (evt) {

					if (evt.data.$.dataTransfer.files.length > 0 || imgRexExp.test(evt.data.$.dataTransfer.getData('text/html')))
						alert(editor.lang.ibm.imagedatauri.error);
						evt.data.$.preventDefault();

				});
			});
		}
	}
});
