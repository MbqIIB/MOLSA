<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2003-2004 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <xsl:param name="draft.mode" select="'no'"/>

  <xsl:param name="section.autolabel" select="1"/>
  <xsl:param name="section.label.includes.component.label" select="1"/>
  <xsl:param name="autotoc.label.separator" select="' '"/>

  <xsl:param name="use.extensions" select="1"/>

  <xsl:param name="admon.graphics" select="1"/>
  <xsl:param name="admon.graphics.path" select="'../images/'"/>
  <xsl:param name="admon.graphics.extension" select="'.gif'"/>

  <xsl:param name="shade.verbatim" select="1"/>

  <xsl:param name="l10n.gentext.language" select="'en'" />

  <xsl:param name="generate.index" select="0" />

  <xsl:param name="formal.title.placement">
figure after
example after
table after
  </xsl:param>

</xsl:stylesheet>
