<?xml version="1.0" encoding="UTF-8"?> <jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"> <jsp:directive.page buffer="32kb" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"/> <jsp:output omit-xml-declaration="yes"/> <script data-dojo-config="async:0,parseOnLoad:true,isDebug:false,locale:'en'" src="./CDEJ/jscript/dojotk/dojo/dojo.js" type="text/javascript">// script content</script> <script type="text/javascript">
  <jsp:scriptlet>curam.util.client.jsp.JspUtil.outputJSModulePaths(pageContext);</jsp:scriptlet>
  </script> <script src="./CDEJ/jscript/cdej-cm.js" type="text/javascript">// script content</script> <script src="./CDEJ/jscript/cdej.js" type="text/javascript">// script content</script> <script type="text/javascript">
    <![CDATA[
     require(["curam/core-uim"]);
     var parentWindow = window.opener || (window.dialogArguments ? window.dialogArguments[0] : null);
     if (parentWindow) {
       var href = window.location.href.replace(/o3frame=modal/g,"").replace(/\?&/g,"?").replace(/&&/g, "&");
       href = curam.util.updateCtx(href);
       if(href.indexOf("?") == href.length - 1) {
         href = href.substring(0, href.length -1);
       }
       parentWindow.curam.util.redirectWindow(href);
       window.close();
     }
     ]]>
   </script> </jsp:root>