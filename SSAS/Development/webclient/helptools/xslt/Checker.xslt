<?xml version="1.0" encoding="UTF-8"?>
<!-- 
Copyright (c) 2005 Curam Software Ltd.  All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information").  You shall not
disclose such Confidential Information and shall use it only in accordance
with the terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
  <xsl:output
    encoding="ISO-8859-1"
    indent="yes"
    method="html"
  />
  <xsl:param name="CLIENT_DIR"/>


  <xsl:template match="/">
    <xsl:element name="frameset">
      <xsl:attribute name="rows">50%,*</xsl:attribute>


      <xsl:element name="frame">
        <xsl:attribute name="name">page_preview</xsl:attribute>
        <xsl:attribute name="scrolling">YES</xsl:attribute>
        <xsl:attribute name="src">
          <xsl:value-of select="concat($CLIENT_DIR, '/WebContent/Previews/', PAGE/@PAGE_ID, '.html')"/>
        </xsl:attribute>
      </xsl:element>


      <xsl:element name="frame">
        <xsl:attribute name="name">help_preview</xsl:attribute>
        <xsl:attribute name="scrolling">YES</xsl:attribute>
        <xsl:attribute name="src">
          <xsl:value-of select="concat($CLIENT_DIR, '/build/help/html/', PAGE/@PAGE_ID, '.html')"/>
        </xsl:attribute>
      </xsl:element>
    </xsl:element>
  </xsl:template>


  <xsl:template match="text()"/>


</xsl:stylesheet>