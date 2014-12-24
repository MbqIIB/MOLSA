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
                xmlns:fo="http://www.w3.org/1999/XSL/Format"
                version="1.0">

  <!--
  Override to make the footnote mark smaller (but not too small). The
  original uses 90% of the parent font. This is too big in the main
  text (90% of the body font size), but about right in the footnote
  (90% of 0.8 * body font size, i.e., the footnote font size). This
  override just makes them both use 90% of the footnote font size.
  -->
  <xsl:template name="format.footnote.mark">
    <xsl:param name="mark" select="'?'"/>
    <fo:inline font-size="{concat('0.9 * ', $footnote.font.size)}">
      <xsl:choose>
        <xsl:when test="$fop.extensions != 0">
          <xsl:attribute name="vertical-align">super</xsl:attribute>
        </xsl:when>
        <xsl:otherwise>
          <xsl:attribute name="baseline-shift">super</xsl:attribute>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:copy-of select="$mark"/>
    </fo:inline>
  </xsl:template>

  <!--
  Customized to number footnotes from the start of the respective chapter
  or appendix, not from the start of the book. The distinction between
  table footnotes and other footnotes has been discarded, as has the support
  for the use of footnote symbols instead of numbers.
  -->
  <xsl:template match="footnote" mode="footnote.number">
    <xsl:number level="any" from="chapter | appendix" format="1"/>
  </xsl:template>

  <!--
  Format footnotes as links to the endnotes, not as formal fo:footnote
  elements. The distinction between table footnotes and normal footnotes
  has been discarded.
  -->
  <xsl:template match="footnote">
    <fo:inline keep-with-previous.within-line="always">
      <fo:basic-link internal-destination="{generate-id(.)}">
        <xsl:call-template name="format.footnote.mark">
          <xsl:with-param name="mark">
            <xsl:apply-templates select="." mode="footnote.number"/>
          </xsl:with-param>
        </xsl:call-template>
      </fo:basic-link>
    </fo:inline>
  </xsl:template>

  <!--
  New template to handle endnotes. Called from the chapter or appendix
  template.
  -->
  <xsl:template name="insert.endnotes">
    <xsl:variable name="footnotes" select="descendant::footnote" />

    <xsl:if test="count($footnotes) &gt; 0">
      <fo:block break-before="page">
        <fo:block xsl:use-attribute-sets="section.title.properties">
          <fo:block xsl:use-attribute-sets="section.title.level1.properties">
            <xsl:call-template name="gentext">
              <xsl:with-param name="key" select="'Endnotes'"/>
            </xsl:call-template>
          </fo:block>
        </fo:block>
        <xsl:apply-templates select="$footnotes" mode="endnote" />
      </fo:block>
    </xsl:if>
  </xsl:template>

  <!--
  Inserts the text of a footnote but displays it as an endnote. There is a
  default template that adds the footnote mark to the first paragraph in the
  footnote. All that has to be done here is to mark the block with the
  correct ID value for the link to work correctly.
  -->
  <xsl:template match="footnote" mode="endnote">
    <fo:block id="{generate-id(.)}">
      <xsl:apply-templates />
    </fo:block>
  </xsl:template>

</xsl:stylesheet>
