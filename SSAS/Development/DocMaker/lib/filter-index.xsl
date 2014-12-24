<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2004-2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!--
  Stylesheet to flatten the content into a format suitable for indexing
  the eventual HTML Help output.
  -->

  <xsl:output indent="no" method="xml" encoding="ISO-8859-1"/>

  <!--
  Copy the document and flatten the content except for the book, chapter,
  appendix, and top-level section elements. Only the text of the remaining
  content is preserved. The title text is added to its parent as an
  attribute and the "id" attribute is preserved. The title text is also
  flattened along with the rest of the content so that it can be searched.
  -->
  <xsl:template match="book
                       | chapter | appendix
                       | chapter/section | appendix/section">
    <xsl:copy>
      <xsl:if test="title">
        <xsl:variable name="title-value">
          <xsl:apply-templates select="title/node()" />
        </xsl:variable>
        <xsl:attribute name="dm-title">
          <xsl:value-of select="normalize-space($title-value)" />
        </xsl:attribute>
      </xsl:if>
      <!-- The title content gets copied again here. -->
      <xsl:apply-templates select="@id | node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="@id">
    <xsl:copy />
  </xsl:template>

  <xsl:template match="*">
    <xsl:apply-templates select="node()"/>
  </xsl:template>

  <xsl:template match="text()">
    <xsl:copy-of select="." />
  </xsl:template>

  <!--
  Strip out this content.
  -->
  <xsl:template match="bookinfo
                       | comment()
                       | processing-instruction()" />

</xsl:stylesheet>
