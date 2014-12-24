<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:exslt="http://exslt.org/common"
                extension-element-prefixes="exslt"
                version="1.0">

  <!--
  Customization to support faster chunking. Because the original stylesheet
  customized other templates and then used "xsl:apply-imports", this stylesheet
  has to completely re-implement the original (as far as necessary) and then
  dispense with all of the original code. It is not possible to correctly
  define imports, includes and new templates to accommodate the existing
  set-up.
  -->

  <!--
  The chunks are identified and stored as a sequence of "chunk" elements with
  an "id" attribute set to the generated ID of the corresponding element in the
  content that should be chunked. This data is then used to determine the
  sequence of chunks and the links between them.
  -->
  <xsl:variable name="chunk.hierarchy">
    <xsl:apply-templates select="/*" mode="find.chunks"/>
  </xsl:variable>

  <xsl:variable name="chunks" select="exslt:node-set($chunk.hierarchy)"/>

  <xsl:key name="gen-id" match="*" use="generate-id()"/>

  <!--
  Changed so that the "chunk" elements are not nested but appear in document
  order. This is the same order in which they can then be navigated.
  -->
  <xsl:template match="*" mode="find.chunks">
    <xsl:variable name="is-chunk">
      <xsl:call-template name="chunk"/>
    </xsl:variable>

    <xsl:if test="$is-chunk != '0'">
      <chunk id="{generate-id()}" />
    </xsl:if>
    <xsl:apply-templates select="*" mode="find.chunks" />
  </xsl:template>

  <!--
  Changed to use the new chunk hierarchy and dispense with parameters that
  control chunking.
  -->
  <xsl:template name="process-chunk-element">
    <xsl:param name="content">
      <xsl:apply-imports/>
    </xsl:param>

    <xsl:variable name="gen-id" select="generate-id()"/>
    <xsl:variable name="this-chunk" select="$chunks/chunk[@id = $gen-id]"/>
    <xsl:call-template name="process-chunk">
      <xsl:with-param name="prev"
          select="key('gen-id', $this-chunk/preceding-sibling::chunk[1]/@id)"/>
      <xsl:with-param name="next"
          select="key('gen-id', $this-chunk/following-sibling::chunk[1]/@id)"/>
      <xsl:with-param name="content" select="$content"/>
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="process-chunk">
    <xsl:param name="prev" select="."/>
    <xsl:param name="next" select="."/>
    <xsl:param name="content">
      <xsl:apply-imports/>
    </xsl:param>

    <xsl:call-template name="write.chunk">
      <xsl:with-param name="filename">
        <xsl:call-template name="make-relative-filename">
          <xsl:with-param name="base.dir" select="$base.dir"/>
          <xsl:with-param name="base.name">
            <xsl:apply-templates mode="chunk-filename" select="."/>
          </xsl:with-param>
        </xsl:call-template>      
      </xsl:with-param>
      <xsl:with-param name="content">
        <xsl:call-template name="chunk-element-content">
          <xsl:with-param name="prev" select="$prev"/>
          <xsl:with-param name="next" select="$next"/>
          <xsl:with-param name="content" select="$content"/>
        </xsl:call-template>
      </xsl:with-param>
      <xsl:with-param name="quiet" select="$chunk.quietly"/>
    </xsl:call-template>
  </xsl:template>

  <!--
  There is no easy way to make the above customizations to the original
  "chunk-code.xsl" file without discarding that file completely, as the
  imported templates get confused, so these templates are re-implemented and
  simplified to support the above.
  -->
  <xsl:template match="set | book | part | preface | chapter | appendix
                       | article | reference | refentry
                       | book/glossary | article/glossary | part/glossary
                       | book/bibliography | article/bibliography | colophon">
    <xsl:call-template name="process-chunk-element"/>
  </xsl:template>

  <xsl:template match="section | sect1 | sect2 | sect3 | sect4 | sect5">
    <xsl:variable name="is-chunk">
      <xsl:call-template name="chunk"/>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$is-chunk = '0'">
        <xsl:apply-imports/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="process-chunk-element"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="setindex | book/index | article/index">
    <xsl:if test="$generate.index != '0' or count(*) &gt; 0">
      <xsl:call-template name="process-chunk-element"/>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
