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
                xmlns:exslt="http://exslt.org/common"
                extension-element-prefixes="exslt"
                version="1.0">

  <xsl:import href="../../docbook-xsl/html/chunk.xsl"/>
  <xsl:import href="../common/param.xsl"/>
  <xsl:import href="../common/perform.xsl"/>

  <!-- General settings. -->
  <xsl:param name="tablecolumns.extension" select="1"/>
  <xsl:param name="chunk.quietly" select="1" />
  <xsl:param name="chunk.first.sections" select="1" />
  <xsl:param name="ignore.image.scaling" select="1"/>

  <!-- Until SVG is converted during build.... -->
  <xsl:param name="use.embed.for.svg" select="1"/>

  <!-- Magic Navigation bar stuff in Mozilla and Opera! -->
  <xsl:param name="html.extra.head.links" select="1"/>

  <xsl:param name="navig.graphics" select="1"/>
  <xsl:param name="navig.graphics.path" select="'../images/'"/>
  <xsl:param name="navig.graphics.extension" select="'.gif'"/>

  <!--
  Customised templates for generated text (titles, xrefs, etc.).
  Numbering formats have the "." after the number removed.
  X-ref titles have no quotes.
  -->
  <xsl:param name="local.l10n.xml" select="document('../common/l10n.xml')"/>

  <!--
  Generate a TOC for a book and add the "Table of Contents" title
  to that TOC. Generate an untitled TOC for each chapter or appendix.
  -->
  <xsl:param name="generate.toc">
book      toc,title
chapter   toc
appendix  toc
</xsl:param>

  <!--
  Make the title font italic in cross-references (this is already done by
  default for chapter and appendix titles).
  -->
  <xsl:template match="section | example | figure | table
                       | note | tip | important | warning
                       | variablelist | orderedlist | itemizedlist"
                mode="insert.title.markup">
    <xsl:param name="purpose"/>
    <xsl:param name="xrefstyle"/>
    <xsl:param name="title"/>

    <xsl:choose>
      <xsl:when test="$purpose = 'xref' and titleabbrev">
        <xsl:apply-templates select="." mode="titleabbrev.markup"/>
      </xsl:when>
      <xsl:when test="$purpose = 'xref'">
        <i>
          <xsl:copy-of select="$title"/>
        </i>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="$title"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Customized to support context-sensitive hyperlinks. This takes advantage of
  the fact that the original template has both a "match" and a "name"
  attribute and that the "match" is the only way it is used. Here, a check
  for a type of "topicname" is made and then the original template is called,
  rather than try to rewrite the original, as it is very long. It would be
  nice to use xsl:apply-imports, but the parameter prevents it from working.

  Unlike the HTML Help output, here, the link text is inserted but is not made
  into a hyperlink, as the Help Applet is not available to resolve the link.
  -->
  <xsl:template match="olink">
    <xsl:param name="target.database" />

    <xsl:choose>
      <xsl:when test="@type = 'topicname'">
        <xsl:apply-templates />
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="olink">
          <xsl:with-param name="target.database" select="$target.database" />
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Customization to support faster chunking.
  -->
  <xsl:param name="chunk.fast" select="1"/>
  <xsl:param name="use.id.as.filename" select="1"/>
  <xsl:variable name="chunk.hierarchy">
    <xsl:apply-templates select="/*" mode="find.chunks"/>
  </xsl:variable>
  <xsl:variable name="chunks" select="exslt:node-set($chunk.hierarchy)//div"/>

  <xsl:template name="process-chunk-element">
    <xsl:variable name="genid" select="generate-id()"/>
    <xsl:variable name="div" select="$chunks[@id=$genid]"/>
    <xsl:variable name="prevdiv"
      select="($div/preceding-sibling::div
               | $div/preceding::div|$div/parent::div)[last()]"/>
    <xsl:variable name="prev" select="key('genid', $prevdiv/@id)"/>
    <xsl:variable name="nextdiv"
      select="($div/following-sibling::div
               |$div/following::div|$div/div)[1]"/>
    <xsl:variable name="next" select="key('genid', $nextdiv/@id)"/>

    <xsl:choose>
      <xsl:when test="$onechunk != 0 and parent::*">
        <xsl:apply-imports/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="process-chunk">
          <xsl:with-param name="prev" select="$prev"/>
          <xsl:with-param name="next" select="$next"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Disabling this because it is slow and redundant.
  -->
  <xsl:template name="dbhtml-dir" />
  
</xsl:stylesheet>
