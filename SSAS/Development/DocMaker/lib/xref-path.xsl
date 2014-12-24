<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2003-2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:import href="normalizer.xsl"/>

  <!--
  Creates a (hopefully) unique ID for a DocBook element by concatenating
  the normalized text of title elements and separating them by "." characters.
  For example, if the section element titled "Introduction" contained in a
  chapter element titled "Important Concepts" is passed in, the result will
  be "important-concepts.introduction". The book title is ignored.
  -->
  <xsl:template match="node()" mode="xref-path">
    <xsl:for-each select="ancestor-or-self::*
                            [title and not(self::book or self::dm-part)]">
      <xsl:apply-templates select="title" mode="normalize-text"/>
      <xsl:if test="position() != last()">
        <xsl:text>.</xsl:text>
      </xsl:if>
    </xsl:for-each>
  </xsl:template>

</xsl:stylesheet>
