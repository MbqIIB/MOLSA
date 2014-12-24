<?xml version="1.0" encoding="UTF-8"?> <jsp:root xmlns:c="http://java.sun.com/jsp/jstl/core" xmlns:curam="http://www.curamsoftware.com/curam" xmlns:cing="http://www.curamsoftware.com/curam/jde/client/curam-ng" xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"> <jsp:directive.page contentType="text/html; charset=UTF-8" errorPage="/en/CuramErrorPage.do" isErrorPage="false" language="java" pageEncoding="UTF-8"/> <jsp:directive.page import="curam.util.client.jsp.JspUtil"/> <jsp:output omit-xml-declaration="yes"/> <jsp:text><![CDATA[<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">]]></jsp:text> <curam:userPreferences/> <html lang="${htmlLanguage}"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <jsp:scriptlet> <![CDATA[ pageContext.setAttribute("o3__serverURL", JspUtil.getServerRootURL()); ]]> </jsp:scriptlet> <link rel="stylesheet" type="text/css" media="screen, print" href="${pageScope.o3__serverURL}themes/v6/css/help-style.css"/> <link rel="stylesheet" href="${pageScope.o3__serverURL}CDEJ/jscript/dojotk/dijit/themes/soria/soria.css"/> <jsp:text><![CDATA[<!--[if IE 8]>]]></jsp:text> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_cc_IE8.css"/> <jsp:text><![CDATA[<![endif]-->]]></jsp:text> <jsp:text><![CDATA[<!--[if IE 9]>]]></jsp:text> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_cc_IE9.css"/> <jsp:text><![CDATA[<![endif]-->]]></jsp:text> <jsp:scriptlet> if ("true".equals(pageContext.getAttribute("highContrastMode"))){ pageContext.setAttribute("highContrastClassName", "high-contrast"); </jsp:scriptlet> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_high_contrast.css"/> <jsp:scriptlet>}</jsp:scriptlet> <script data-dojo-config="async:0,parseOnLoad:true,isDebug:false" src="${pageScope.o3__serverURL}CDEJ/jscript/dojotk/dojo/dojo.js" type="text/javascript">// script content</script> <script src="${pageScope.o3__serverURL}CDEJ/jscript/dojotk/dijit/dijit.js" type="text/javascript">// script content</script> <script type="text/javascript">
	        <jsp:scriptlet>curam.util.client.jsp.JspUtil.outputJSModulePaths(pageContext);</jsp:scriptlet>
          var jsPageID="help";
        </script> <script type="text/javascript" src="${pageScope.o3__serverURL}CDEJ/jscript/cdej.js">// script content</script> <script type="text/javascript" src="${pageScope.o3__serverURL}CDEJ/jscript/cdej-cm.js">// script content</script> <script type="text/javascript">
			  	require(["curam/core-uim", "curam/dialog", "curam/util/onLoad"]);
          <jsp:text>var jsBaseURL = curam.util.retrieveBaseURL();</jsp:text> 
          <jsp:text>var jsScreenContext = new curam.util.ScreenContext();</jsp:text>
          jsScreenContext.setContext('MODAL');
          curam.dialog.initModal('help');

          // register publisher for the page height information
          curam.util.onLoad.addPublisher(function(context) {
            context.height = curam.util.getPageHeight();
            context.title = "Help";
          });

          dojo.addOnLoad(function() {
              curam.util.onLoad.execute();
              dojo.removeClass(dojo.body(), "hidden");
          });
        </script> <title><jsp:scriptlet><![CDATA[out.print(curam.omega3.util.CDEJResources.getProperty("help.page.title"));]]></jsp:scriptlet></title> </head> <body id="help" class="DefaultApp basic modal en soria" lang="${htmlLanguage}"> <cing:page pageID="Help"> <cing:component style="curam-util-client::online-help"/> </cing:page> </body> </html> </jsp:root>