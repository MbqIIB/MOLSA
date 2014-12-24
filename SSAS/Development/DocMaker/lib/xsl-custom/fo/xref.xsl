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
  Make the auto-generated number in the titles appear in the alternative
  colour (but not in cross-references).
  -->
  <xsl:template match="example|figure|table" mode="insert.label.markup">
    <xsl:param name="purpose"/>
    <xsl:param name="xrefstyle"/>
    <xsl:param name="label"/>

    <xsl:choose>
      <xsl:when test="$purpose = 'xref'">
        <xsl:copy-of select="$label"/>
      </xsl:when>
      <xsl:otherwise>
        <fo:inline color="{$alt.colour.dark}">
          <xsl:copy-of select="$label"/>
        </fo:inline>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

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
        <fo:inline font-style="italic">
          <xsl:apply-templates select="." mode="titleabbrev.markup"/>
        </fo:inline>
      </xsl:when>
      <xsl:when test="$purpose = 'xref'">
        <fo:inline font-style="italic">
          <xsl:copy-of select="$title"/>
        </fo:inline>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="$title"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Customized to support external cross-references (context-sensitive help
  links), but only to insert the link text and not make them real hyperlinks,
  as they would not work without the Help Applet.
  -->
  <xsl:template match="olink">
    <xsl:param name="target.database"
               select="document($target.database.document, /)"/>

    <xsl:choose>
      <xsl:when test="@type = 'topicname'">
        <xsl:apply-templates />
      </xsl:when>
      <xsl:otherwise>
        <!-- Olink that points to internal id can be a link -->
        <xsl:variable name="linkend">
          <xsl:choose>
            <xsl:when test="@targetdoc and not(@targetptr)" >
              <xsl:message>Olink missing @targetptr attribute value</xsl:message>
            </xsl:when>
            <xsl:when test="not(@targetdoc) and @targetptr" >
              <xsl:message>Olink missing @targetdoc attribute value</xsl:message>
            </xsl:when>
            <xsl:when test="@targetdoc and @targetptr">
              <xsl:if test="$current.docid = @targetdoc">
                <xsl:if test="id(@targetptr)">
                  <xsl:value-of select="@targetptr"/>
                </xsl:if>
              </xsl:if>
            </xsl:when>
          </xsl:choose>
        </xsl:variable>

        <xsl:choose>
          <xsl:when test="$linkend != ''">
            <fo:basic-link internal-destination="{$linkend}"
                         xsl:use-attribute-sets="xref.properties">
              <xsl:call-template name="olink.hottext">
                <xsl:with-param name="target.database"
                                select="$target.database"/>
              </xsl:call-template>
            </fo:basic-link>
          </xsl:when>
          <xsl:otherwise>
            <xsl:call-template name="olink.hottext">
              <xsl:with-param name="target.database"
                              select="$target.database"/>
            </xsl:call-template>

            <!-- Append other document title if appropriate -->
            <xsl:if test="@targetdoc and @targetptr and $olink.doctitle != 0
                          and $current.docid != ''
                          and $current.docid != @targetdoc">
              <xsl:variable name="doctitle">
                <xsl:variable name="seek.targetdoc" select="@targetdoc"/>
                <xsl:for-each select="$target.database" >
                  <xsl:value-of select="key('targetdoc-key',
                                            $seek.targetdoc)/div[1]/ttl" />
                </xsl:for-each>
              </xsl:variable>
              <xsl:if test="$doctitle != ''">
                <xsl:text> (</xsl:text>
                <xsl:value-of select="$doctitle"/>
                <xsl:text>)</xsl:text>
              </xsl:if>
            </xsl:if>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

</xsl:stylesheet>
