<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2006 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<!--
Extracts some basic information from a Clover XML-format code coverage report
and creates a properties file that can be included by Ant.
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output encoding="ISO-8859-1" method="text" />

  <xsl:template match="/">
    <xsl:apply-templates select="coverage/project[1]/metrics" />
  </xsl:template>

  <xsl:template match="metrics">
    <xsl:text>coverage.pass.rate=</xsl:text>
    <xsl:value-of
      select="format-number(@coveredelements div @elements, '##.#%')" />
    <xsl:text>&#xa;</xsl:text>

    <xsl:text>coverage.fail.rate=</xsl:text>
    <xsl:value-of
      select="format-number((@elements - @coveredelements) div @elements,
                            '##.#%')" />
    <xsl:text>&#xa;</xsl:text>
  </xsl:template>

</xsl:stylesheet>
