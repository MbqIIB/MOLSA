<?xml version="1.0" encoding="UTF-8"?>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page"
  xmlns:curam="http://www.curamsoftware.com/curam"
  version="2.0">
  <jsp:directive.page buffer="32kb" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" />
  <jsp:output omit-xml-declaration="yes" />
  <jsp:text>
    <![CDATA[<!DOCTYPE html>]]>
  </jsp:text>
<!-- NetWeaver cannot find the resources required in this file unless the abolute path is  defined. -->
<jsp:scriptlet>pageContext.setAttribute("path1", request.getContextPath());</jsp:scriptlet>
  <html dir="ltr" lang = "en">
    <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
      </meta>
      <link href="${pageScope.path1}/themes/v6/css/v6_login.css" media="screen" rel="stylesheet" type="text/css" />
      <link href="${pageScope.path1}/CDEJ/css/custom.css" media="screen" rel="stylesheet" type="text/css" />
      <jsp:text><![CDATA[<!--[if IE 8]>]]></jsp:text>
        <link rel="stylesheet" href="${pageScope.path1}/themes/v6/css/v6_cc_IE8.css"/>
      <jsp:text><![CDATA[<![endif]-->]]></jsp:text>
       <script type="text/javascript">
        function window_onload() {
          document.getElementById('logout-button').focus();
          return true;
        }
      </script>
      <title><jsp:scriptlet><![CDATA[out.print(
            curam.omega3.util.CDEJResources.getProperty(
              "curam.omega3.i18n.Logon",
              "Logout.title"));]]></jsp:scriptlet></title>
    </head>
    <body class="logon logout" 
          onload="return window_onload()"
          dir="ltr"> 
        <jsp:scriptlet>
          <![CDATA[out.print("<div id=\"app-banner\" role=\"banner\""
                + "aria-label=\"" + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.banner.landmark")
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
                + "aria-label=\"" + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.main.landmark")
                + "\" />");]]>
         </jsp:scriptlet>
            <h2 class="login-welcome">
              <jsp:scriptlet>
                <![CDATA[out.print(curam.omega3.util.CDEJResources.getProperty(
                  "curam.omega3.i18n.Logon",
                  "Logout.message1"));]]>
                </jsp:scriptlet>
            </h2>
            <p class="message2">
              <jsp:scriptlet><![CDATA[out.print(
              curam.omega3.util.CDEJResources.getProperty(
              "curam.omega3.i18n.Logon",
              "Logout.message2"));]]>
              </jsp:scriptlet>
            </p>
            <form id="logout" name="logout" action="servlet/ApplicationController" method="post">
              <jsp:scriptlet><![CDATA[
                 out.print("<input tabindex=\"-1\" title=\"" 
                 + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logout.Button.title.submit") + "\""
                 + "  value=\""
                 + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logout.Button.submit") + "\""
                 + " name=\"j_logout\" type=\"submit\" class=\"submit\" />");
                 ]]></jsp:scriptlet>
              <input type="hidden" name="logoutExitPage" value="" />
            </form>     
            <jsp:scriptlet><![CDATA[
             out.print("<a href=\"#\" tabIndex=\"1\" id=\"logout-button\" title=\"" 
             + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logout.Button.title.submit") + "\""
             + " class=\"ac\" onMouseDown=\"this.className='ac selected'\" onMouseOut=\"this.className='ac'\""
             + "onMouseUp=\"this.className='ac';\" onClick=\"document.logout.submit();\" >");
             ]]></jsp:scriptlet>
           <span class="login-left-corner" >
             <span class="login-right-corner">
               <span class="login-middle">
                  <jsp:scriptlet><![CDATA[
                   out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", 
                              "Logout.Button.submit"));
                 ]]></jsp:scriptlet></span>
             </span>
           </span>
           <jsp:scriptlet><![CDATA[out.print("</a>");]]></jsp:scriptlet>
           <span class="filler">&amp;nbsp;&amp;nbsp;&amp;nbsp;</span>
           <jsp:scriptlet><![CDATA[
               out.print("<a tabindex=\"2\" title=\"" 
               + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logout.Button.title.cancel") + "\""
               + " class=\"ac\" onMouseDown=\"this.className='ac selected'\" onMouseOut=\"this.className='ac'\""
               + "onMouseUp=\"this.className='ac';\" href=\"AppController.do\" >");
               ]]></jsp:scriptlet>
             <span class="login-left-corner">
               <span class="login-right-corner">
                 <span class="login-middle">
                   <jsp:scriptlet><![CDATA[
                     out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", 
                                "Logout.Button.cancel"));
                   ]]></jsp:scriptlet></span>
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