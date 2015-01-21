<?xml version="1.0" encoding="UTF-8"?>
<!--  BEGIN, CR00124475, KR -->
<!-- Copyright (c) 2007-2008 Curam Software Ltd.                            -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam Software. -->
<!--  END, CR00124475 -->
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page"
	xmlns:curam="http://www.curamsoftware.com/curam" version="2.0">
	<jsp:directive.page buffer="32kb"
		contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" />
	<jsp:text>
		<![CDATA[<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">]]>
	</jsp:text>
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
	<script type="text/javascript">
        function autoSubmit() {
          document.getElementById("loginform").submit();
        }
  </script>
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
	</head>
	<body class="${classDirection} logonBody" style="visibility: hidden;" onload="autoSubmit()">
	<form id="loginform" name="loginform" action="j_security_check" method="post">
		<!-- BEGIN, CR00246200, FM -->
		<input type="hidden" name="j_username" value="publicprovider"/>
		<!-- END, CR00246200 -->
		<input type="hidden" name="j_password" value="password"/>
		 <!--  BEGIN, CR00124475, KR -->
		<input type="hidden" name="user_type" value="CPMEXTERNALNONSECURE"/>
		<!--  END, CR00124475 -->
	</form>
	</body>
	</html>
</jsp:root>