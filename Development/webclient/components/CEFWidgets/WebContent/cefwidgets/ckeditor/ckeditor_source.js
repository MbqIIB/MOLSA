/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
				
Portions Copyright IBM Corp., 2009-2013.
*/

// Compressed version of core/ckeditor_base.js. See original for instructions.
/*jsl:ignore*/
if(!window.CKEDITOR)window.CKEDITOR=(function(){var a={timestamp:'',version:'3.6.6.5',revision:'20130730-1211',rnd:Math.floor(Math.random()*900)+100,_:{},status:'unloaded',basePath:(function(){var d=window.CKEDITOR_BASEPATH||'';if(!d){var e=document.getElementsByTagName('script');for(var f=0;f<e.length;f++){var g=e[f].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);if(g){d=g[1];break;}}}if(d.indexOf(':/')==-1)if(d.indexOf('/')===0)d=location.href.match(/^.*?:\/\/[^\/]*/)[0]+d;else d=location.href.match(/^[^\?]*\/(?:)/)[0]+d;if(!d)throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';return d;})(),getUrl:function(d){if(d.indexOf(':/')==-1&&d.indexOf('/')!==0)d=this.basePath+d;if(this.timestamp&&d.charAt(d.length-1)!='/'&&!/[&?]t=/.test(d))d+=(d.indexOf('?')>=0?'&':'?')+'t='+this.timestamp;return d;}},b=window.CKEDITOR_GETURL;if(b){var c=a.getUrl;a.getUrl=function(d){return b.call(a,d)||c.call(a,d);};}return a;})();
/*jsl:end*/

// Uncomment the following line to have a new timestamp generated for each
// request, having clear cache load of the editor code.
// CKEDITOR.timestamp = ( new Date() ).valueOf();

if ( CKEDITOR.loader )
	CKEDITOR.loader.load( 'core/ckeditor' );
else
{
	// Set the script name to be loaded by the loader.
	CKEDITOR._autoLoad = 'core/ckeditor';

	// Include the loader script.
	if ( document.body && (!document.readyState || document.readyState == 'complete') )
	{
		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = CKEDITOR.getUrl( '_source/core/loader.js' );
		document.body.appendChild( script );
	}
	else
	{
		document.write(
			'<script type="text/javascript" src="' + CKEDITOR.getUrl( '_source/core/loader.js' ) + '"></script>' );
	}
}


if (CKEDITOR) {
	// Set up CKEDITOR.ibm namespace for all things IBM
	if (CKEDITOR.ibm === undefined) {
		CKEDITOR.ibm = {};
	}

	// Add api namespace to CKEDITOR.ibm
	CKEDITOR.ibm.api = {};

	// Wrap CKEDITOR.dom.range for cross window invocations in IE
	CKEDITOR.ibm.api.newDomRange = function (document) {
		return new CKEDITOR.dom.range(document);
	};

	//Wrap CKEDITOR.dom.element for cross window invocations in IE
	CKEDITOR.ibm.api.newDomElement = function (element) {
		return new CKEDITOR.dom.element(element);
	};

	//Wrap CKEDITOR.dom.walker for cross window invocations in IE
	CKEDITOR.ibm.api.newDomWalker = function (range) {
		return new CKEDITOR.dom.walker(range);
	};
}
