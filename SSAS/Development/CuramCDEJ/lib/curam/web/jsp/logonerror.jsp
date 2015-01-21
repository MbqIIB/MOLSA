<?xml version="1.0" encoding="UTF-8"?>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page"
  xmlns:curam="http://www.curamsoftware.com/curam"
  version="2.0">
  <jsp:directive.page buffer="32kb" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" />
  <jsp:output omit-xml-declaration="yes" />
  <!-- <jsp:scriptlet>session.invalidate();</jsp:scriptlet> -->
  <jsp:text>
    <![CDATA[<!DOCTYPE html>]]>
  </jsp:text>
<!-- NetWeaver cannot find the resources required in this file unless the abolute path is  defined. -->
<jsp:scriptlet>pageContext.setAttribute("path1", request.getContextPath());</jsp:scriptlet>
<jsp:directive.page import="java.util.Locale" />
<jsp:scriptlet>
  Locale locale = request.getLocale();
  String language = locale.toString();
  pageContext.setAttribute("htmlLanguage", language);
  if(language.startsWith("ar")
    || language.startsWith("he")
    || language.startsWith("iw")) {
    pageContext.setAttribute("htmlDirection", "rtl");
    pageContext.setAttribute("classDirection", "rtl");
  } else {
    pageContext.setAttribute("htmlDirection", "ltr");
    pageContext.setAttribute("classDirection", "");
  }
</jsp:scriptlet>
  <html lang="${htmlLanguage}" dir="${htmlDirection}" class="${classDirection}">
    <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
      </meta>
      <link href="${pageScope.path1}/themes/v6/css/v6_login.css" media="screen" rel="stylesheet" type="text/css" />
      <jsp:scriptlet>
        if(pageContext.getAttribute("htmlDirection").equals("rtl")) {
          </jsp:scriptlet>
          <link href="${pageScope.path1}/themes/v6_rtl/css/v6_rtl_login.css" media="screen" rel="stylesheet" type="text/css" />
          <jsp:scriptlet>
        }
      </jsp:scriptlet>
      <link href="${pageScope.path1}/CDEJ/css/custom.css" media="screen" rel="stylesheet" type="text/css" />
      <jsp:text><![CDATA[<!--[if IE 8]>]]></jsp:text>
        <link rel="stylesheet" href="${pageScope.path1}/themes/v6/css/v6_cc_IE8.css"/>
      <jsp:text><![CDATA[<![endif]-->]]></jsp:text>
      <script type="text/javascript">
        function window_onload() {
          document.getElementById('try-button').focus();
          return true;
        }
      </script>
      <title><jsp:scriptlet><![CDATA[out.print(
            curam.omega3.util.CDEJResources.getProperty(
              "curam.omega3.i18n.Logon",
              "LogonError.title"));]]></jsp:scriptlet></title>
    </head>
    <body class="${classDirection} logonerror logon" 
          onload="return window_onload()"
          dir="${htmlDirection}">  
       <jsp:scriptlet>
          <![CDATA[out.print("<div id=\"app-banner\" role=\"banner\""
                + " aria-label=\"" + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.banner.landmark")
                + "\" />");]]>
         </jsp:scriptlet>
           <div class="left-box">
             <h1 class="title"><jsp:scriptlet>
                <![CDATA[out.print(curam.omega3.util.CDEJResources.getProperty(
                  "curam.omega3.i18n.Logon",
                  "Logon.banner.product.name"));]]>
                </jsp:scriptlet></h1>
           </div>
           <div class="right-box">
             <div class="logo">        
                <jsp:scriptlet>
                <![CDATA[out.print("<img alt=\"" 
                + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.banner.logo.alt")
                + "\" src=\"" + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.banner.logo")
                + "\" />");]]>
                </jsp:scriptlet>
             </div>
           </div>
        <jsp:scriptlet><![CDATA[out.print("</div>");]]></jsp:scriptlet>     
        <jsp:scriptlet>
          <![CDATA[out.print("<div class=\"login-content\" role=\"main\""
                + " aria-label=\"" + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.banner.landmark")
                + "\" />");]]>
         </jsp:scriptlet>
            <h2 class="login-welcome">
              <jsp:scriptlet>
                <![CDATA[out.print(curam.omega3.util.CDEJResources.getProperty(
                  "curam.omega3.i18n.Logon",
                  "LogonError.error"));]]>
                </jsp:scriptlet>
            </h2>
            <p class="message1">
              <jsp:scriptlet><![CDATA[out.print(
                curam.omega3.util.CDEJResources.getProperty(
                "curam.omega3.i18n.Logon",
                "LogonError.message"));]]></jsp:scriptlet>
            </p>     
          <jsp:scriptlet>
            <![CDATA[out.print("<a href=\".\" class=\"ac\" id=\"try-button\" title=\"" 
            + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "LogonError.tryAgain.title")
            + "\" onMouseDown=\"this.className='ac selected'\" onMouseOut=\"this.className='ac'\" tabindex=\"1\""
            + " onMouseUp=\"this.className='ac';\" >");]]>
          </jsp:scriptlet>
              <span class="login-left-corner" >
                <span class="login-right-corner">
                  <span class="login-middle">
                     <jsp:scriptlet>
                       <![CDATA[out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon","LogonError.tryAgain"));]]>
                     </jsp:scriptlet>
                   </span>
                </span>
              </span>
           <jsp:scriptlet><![CDATA[out.print("</a>");]]></jsp:scriptlet>
           <p class="copyright">
             <jsp:scriptlet>
               <![CDATA[out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon","Logon.copyright.message"));]]>
             </jsp:scriptlet>
          </p>
        <jsp:scriptlet><![CDATA[out.print("</div>");]]></jsp:scriptlet>
    </body>
  </html>
</jsp:root>
