<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2004 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xi="http://www.w3.org/2003/XInclude">
  <!--
  Stylesheet to create an Ant "includesfile" from the XInclude elements of
  the input file, a DocBook XML book. The output properties are configured
  from the Ant script to ensure the correct encoding is used.
  -->
  <xsl:template match="/">
    <xsl:apply-templates select="//xi:include" />
  </xsl:template>

  <!--
  Outputs the file name an adds a new line.
  -->
  <xsl:template match="xi:include">
    <xsl:value-of select="@href" />
    <xsl:text>
</xsl:text>
  </xsl:template>

</xsl:stylesheet>
