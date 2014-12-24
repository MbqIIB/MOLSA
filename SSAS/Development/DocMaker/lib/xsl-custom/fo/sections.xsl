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
  Set common and specific properties for the section titles. The
  "section.title.properties" are applied to the block that contains
  the title block, markers, etc.
  -->
  <xsl:attribute-set name="section.title.properties">
    <xsl:attribute name="font-family">
      <xsl:value-of select="$title.fontset"/>
    </xsl:attribute>
    <xsl:attribute name="font-weight">bold</xsl:attribute>
    <xsl:attribute name="font-style">normal</xsl:attribute>
    <xsl:attribute name="keep-with-next.within-column">always</xsl:attribute>
    <xsl:attribute name="space-before.optimum">0pt</xsl:attribute>
    <xsl:attribute name="space-before.minimum">0pt</xsl:attribute>
    <xsl:attribute name="space-before.maximum">0pt</xsl:attribute>
    <xsl:attribute name="space-after.optimum">5pt</xsl:attribute>
    <xsl:attribute name="space-after.minimum">5pt</xsl:attribute>
    <xsl:attribute name="space-after.maximum">5pt</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="section.title.level1.properties">
    <xsl:attribute name="font-size">
      <xsl:value-of select="$body.font.master * 1.333"/>
      <xsl:text>pt</xsl:text>
    </xsl:attribute>
    <xsl:attribute name="space-before">16pt</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="section.title.level2.properties">
    <xsl:attribute name="font-size">
      <xsl:value-of select="$body.font.master * 1.166"/>
      <xsl:text>pt</xsl:text>
    </xsl:attribute>
    <xsl:attribute name="space-before">12pt</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="section.title.level3.properties">
    <xsl:attribute name="font-size">
      <xsl:value-of select="$body.font.master"/>
      <xsl:text>pt</xsl:text>
    </xsl:attribute>
    <xsl:attribute name="space-before">12pt</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="section.title.level4.properties">
    <xsl:attribute name="font-size">
      <xsl:value-of select="$body.font.master"/>
      <xsl:text>pt</xsl:text>
    </xsl:attribute>
    <xsl:attribute name="space-before">12pt</xsl:attribute>
  </xsl:attribute-set>

  <!--
  Customized to restrict the number of section levels that are numbered
  and to align the section numbers correctly. The "title" parameter is
  the marked-up title, etc. The context is the section's title element.
  -->
  <xsl:template name="section.heading">
    <xsl:param name="level" select="1"/>
    <xsl:param name="marker" select="1"/>
    <xsl:param name="title"/>
    <xsl:param name="titleabbrev"/>

    <xsl:variable name="content">
      <xsl:call-template name="section.heading.layout">
        <xsl:with-param name="level" select="$level" />
      </xsl:call-template>
    </xsl:variable>

    <fo:block xsl:use-attribute-sets="section.title.properties">
      <xsl:if test="$marker != 0">
        <fo:marker marker-class-name="section.head.marker">
          <xsl:value-of select="$title"/>
        </fo:marker>
      </xsl:if>
      <xsl:choose>
        <xsl:when test="$level=1">
          <fo:block xsl:use-attribute-sets="section.title.level1.properties">
            <xsl:copy-of select="$content" />
          </fo:block>
        </xsl:when>
        <xsl:when test="$level=2">
          <fo:block xsl:use-attribute-sets="section.title.level2.properties">
            <xsl:copy-of select="$content" />
          </fo:block>
        </xsl:when>
        <xsl:when test="$level=3">
          <fo:block xsl:use-attribute-sets="section.title.level3.properties">
            <xsl:copy-of select="$content" />
          </fo:block>
        </xsl:when>
        <xsl:when test="$level=4">
          <fo:block xsl:use-attribute-sets="section.title.level4.properties">
            <xsl:copy-of select="$content" />
          </fo:block>
        </xsl:when>
        <xsl:when test="$level=5">
          <fo:block xsl:use-attribute-sets="section.title.level5.properties">
            <xsl:copy-of select="$content" />
          </fo:block>
        </xsl:when>
        <xsl:otherwise>
          <fo:block xsl:use-attribute-sets="section.title.level6.properties">
            <xsl:copy-of select="$content" />
          </fo:block>
        </xsl:otherwise>
      </xsl:choose>
    </fo:block>
  </xsl:template>

  <xsl:template name="section.heading.layout">
    <xsl:param name="level"/>

    <xsl:variable name="label">
      <fo:block text-align="right" color="{$alt.colour.dark}">
        <xsl:if test="$level &lt; 3">
          <xsl:apply-templates select="parent::section" mode="label.markup" />
        </xsl:if>
      </fo:block>
    </xsl:variable>

    <xsl:variable name="title">
      <fo:block text-align="left">
        <xsl:apply-templates select="parent::section" mode="title.markup">
          <xsl:with-param name="allow-anchors" select="'1'"/>
        </xsl:apply-templates>
      </fo:block>
    </xsl:variable>

    <fo:list-block provisional-label-separation="4mm"
        provisional-distance-between-starts="-{$title.margin.left}">
      <fo:list-item>
        <fo:list-item-label end-indent="label-end()">
          <xsl:copy-of select="$label" />
        </fo:list-item-label>
        <fo:list-item-body start-indent="body-start()">
          <xsl:copy-of select="$title" />
        </fo:list-item-body>
      </fo:list-item>
    </fo:list-block>
  </xsl:template>

</xsl:stylesheet>
