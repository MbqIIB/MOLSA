<?xml version="1.0" encoding="UTF-8"?>
<!--
Copyright (c) 2002-2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Interactive
Technology Design, Ltd. ("Confidential Information"). You shall not disclose
such Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.

$Id$
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:curam="http://www.curamsoftware.com/curam"
                xmlns:jsp="http://java.sun.com/JSP/Page">
  <xsl:output method="xml" indent="no" omit-xml-declaration="yes"/>

  <xsl:template match="/">
    <jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0">
      <jsp:directive.page isELIgnored="false" />
      <!-- <jsp:output omit-xml-declaration="yes" /> -->
      <xsl:apply-templates select="PAGE" mode="page-footer"/>
    </jsp:root>
  </xsl:template>

  <xsl:template match="PAGE" mode="page-footer">
    <div id="footer">
      <!--<p>This is the footer</p>-->
      <!-- put footer HTML content here -->
    </div>
  </xsl:template>

</xsl:stylesheet>