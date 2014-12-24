/* Copyright IBM Corp. 2010-2013 All Rights Reserved.                    */

CKEDITOR.plugins.add( 'sametimeemoticons',
{
	init : function( editor )
	{
           editor.config.smiley_path = this.path + 'images/';

           editor.config.smiley_images = [
              'EmoticonHappy.gif',
              'EmoticonLaugh.gif',
              'EmoticonWink.gif',
              'EmoticonBigSmile.gif',
              'EmoticonCool.gif',
              'EmoticonAngry.gif',
              'EmoticonConfused.gif',
              'EmoticonEyebrow.gif',
              'EmoticonSad.gif',
              'EmoticonShy.gif',
              'EmoticonGoofy.gif',
              'EmoticonSurprised.gif',
              'EmoticonTongue.gif',
              'EmoticonLightbulb.gif',
              'EmoticonThumbsUp.gif',
              'EmoticonThumbsDown.gif',
              'EmoticonAngel.gif',
              'EmoticonCrying.gif',
              'EmoticonHysterical.gif'
           ];

			var lang = editor.lang.ibm.emoticon;
           editor.config.smiley_descriptions = [
				lang.smile,
				lang.laughing,
				lang.wink,
				lang.grin,
				lang.cool,
				lang.angry,
				lang.half,
				lang.eyebrow,
				lang.frown,
				lang.shy,
				lang.goofy,
				lang.oops,
				lang.tongue,
				lang.idea,
				lang.yes,
				lang.no,
				lang.angel,
				lang.crying,
				lang.laughroll,
           ];
	}
} );
