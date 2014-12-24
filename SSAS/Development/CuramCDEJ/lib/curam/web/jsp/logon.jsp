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
  <html dir="ltr" lang = "en" >
    <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
      </meta>
      <link href="${pageScope.path1}/themes/v6/css/v6_login.css" media="screen" rel="stylesheet" type="text/css" />
      <jsp:text><![CDATA[<!--[if IE]>]]></jsp:text>
        <link rel="stylesheet" href="${pageScope.path1}/themes/v6/css/v6_cc_IE.css"/>
      <jsp:text><![CDATA[<![endif]-->]]></jsp:text>
      <jsp:text><![CDATA[<!--[if IE 8]>]]></jsp:text>
        <link rel="stylesheet" href="${pageScope.path1}/themes/v6/css/v6_cc_IE8.css"/>
      <jsp:text><![CDATA[<![endif]-->]]></jsp:text>
      <jsp:text><![CDATA[<!--[if !IE]>]]></jsp:text>
        <link rel="stylesheet" type="text/css" media="all"
              href="${pageScope.path1}/themes/v6/css/v6_cc_notIE.css"/>
      <jsp:text>~<![CDATA[<![endif]-->]]></jsp:text>
      <link href="${pageScope.path1}/CDEJ/css/custom.css" media="screen" rel="stylesheet" type="text/css" />
      <!--
        Prevent this page from displaying in a dialog. Close the dialog and sent the 
        parent to the log on screen. 
      -->
      <jsp:include page="no-dialog.jsp"/>
      <script type="text/javascript" src="${pageScope.path1}/CDEJ/jscript/curam/util/Logon.js">//script content</script>
      <script type="text/javascript">
        curam.util.Logon.ensureFullPageLogon();
        function window_onload() {
          document.loginform.j_username.focus();
          return true;
        }
      </script>
      <title><jsp:scriptlet><![CDATA[out.print(
            curam.omega3.util.CDEJResources.getProperty(
              "curam.omega3.i18n.Logon",
              "Logon.title"));]]></jsp:scriptlet></title>
    </head>
    <body class="logon" 
          onload="return window_onload()">
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
                <![CDATA[out.print("<img  alt=\"" 
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
                  "Logon.welcome"));]]>
                </jsp:scriptlet>
            </h2>
            <h3 class="login-note">
              <jsp:scriptlet><![CDATA[out.print(
              curam.omega3.util.CDEJResources.getProperty(
              "curam.omega3.i18n.Logon",
              "Logon.instruction"));]]>
              </jsp:scriptlet>
            </h3>
            <form id="loginform" name="loginform" action="j_security_check" method="post">
               <label for="j_username">
                 <jsp:scriptlet>
                   <![CDATA[out.print(
                     curam.omega3.util.CDEJResources.getProperty(
                     "curam.omega3.i18n.Logon",
                     "Logon.username"));]]>
                 </jsp:scriptlet>
               </label>
               <br />
               <jsp:scriptlet>
                 <![CDATA[
                   out.print("<input title=\"" 
                   + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.username.title") + "\""
                   + " name=\"j_username\" type=\"text\" id=\"j_username\" tabindex=\"1\" />");
                 ]]>
               </jsp:scriptlet>
              <br />
               <label for="j_password">                            
                 <jsp:scriptlet>
                   <![CDATA[out.print(
                     curam.omega3.util.CDEJResources.getProperty(
                     "curam.omega3.i18n.Logon",
                     "Logon.password"));]]>
                 </jsp:scriptlet>
               </label>  
               <br />
               <jsp:scriptlet>
                 <![CDATA[out.print("<input title=\"" 
                   + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.password.title") + "\""
                   + " name=\"j_password\" type=\"password\" id=\"j_password\" tabindex=\"2\" autocomplete=\"off\"/>");
                   ]]>
                </jsp:scriptlet>
             
                <jsp:scriptlet>
                  <![CDATA[out.print("<input tabindex=\"-1\" title=\"" 
                    + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.Button.title") + "\""
                    + "  value=\""
                    + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.Button.value") + "\""
                    + " name=\"action\" type=\"submit\" class=\"submit\" />");
                  ]]>
                </jsp:scriptlet>
             </form>   
             <p>
             <jsp:scriptlet>
                   <![CDATA[out.print(
                     curam.omega3.util.CDEJResources.getProperty(
                     "curam.omega3.i18n.Logon",
                     "Logon.note"));]]>
                 </jsp:scriptlet>  
             </p> 
             <br/>
            <jsp:scriptlet><![CDATA[
            out.print("<a href=\"#\" tabindex=\"3\" title=\"" 
            + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", "Logon.Button.title") + "\""
            + " class=\"ac\" onMouseDown=\"this.className='ac selected'\" onMouseOut=\"this.className='ac'\""
            + "onMouseUp=\"this.className='ac';\" onClick=\"document.loginform.submit();\" >");
            ]]></jsp:scriptlet>
            <span class="login-left-corner" >
              <span class="login-right-corner">
                <span class="login-middle">
                   <jsp:scriptlet><![CDATA[
                    out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.Logon", 
                               "Logon.Button.value"));
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