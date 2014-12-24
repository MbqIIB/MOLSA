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

  <xsl:param name="nominal.table.width" select="''"/>
  <xsl:param name="tablecolumns.extension" select="0"/>

  <!--
  Control the formatting of tables. Thin lines around cells and the table.
  -->
  <xsl:param name="table.frame.border.thickness" select="'0.1pt'"/>
  <xsl:param name="table.frame.border.color" select="$alt.colour.dark"/>
  <xsl:param name="table.frame.border.style" select="'solid'"/>
  <xsl:param name="table.cell.border.thickness" select="'0pt'"/>
  <xsl:param name="table.cell.border.color" select="$alt.colour.dark"/>
  <xsl:param name="table.cell.border.style" select="'solid'"/>

  <xsl:attribute-set name="table.row.properties">
    <!--
    Even body rows are in the light alternative colour, odd are transparent,
    and header rows are in the dark alternative colour. All paragraphs are
    left-aligned. Text is white for header rows and black for body rows.
    -->
    <xsl:attribute name="background-color">
      <xsl:choose>
        <xsl:when test="parent::tbody">
          <xsl:choose>
            <!--
            The position() function doesn't work so a count() is used.
            This returns 0 for the first element, etc.
            -->
            <xsl:when test="count(preceding-sibling::row) mod 2 = 0">
              <xsl:text>transparent</xsl:text>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$alt.colour.light" />
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:when test="parent::thead">
          <xsl:value-of select="$alt.colour.dark" />
        </xsl:when>
      </xsl:choose>
    </xsl:attribute>
    <xsl:attribute name="color">
      <xsl:choose>
        <xsl:when test="parent::tbody">
          <xsl:text>black</xsl:text>
        </xsl:when>
        <xsl:when test="parent::thead">
          <xsl:text>white</xsl:text>
        </xsl:when>
      </xsl:choose>
    </xsl:attribute>
    <xsl:attribute name="font-family">
      <xsl:choose>
        <xsl:when test="parent::thead">
          <xsl:value-of select="$title.fontset"/>
        </xsl:when>
        <xsl:when test="parent::tbody">
          <xsl:value-of select="$body.fontset"/>
        </xsl:when>
      </xsl:choose>
    </xsl:attribute>
    <xsl:attribute name="font-size">
      <xsl:value-of select="concat($body.font.master, 'pt')"/>
    </xsl:attribute>
    <xsl:attribute name="text-align">
      <xsl:text>start</xsl:text>
    </xsl:attribute>
    <!-- Prevent bad indentation of content when embedded in lists, etc. -->
    <xsl:attribute name="start-indent">
      <xsl:text>0mm</xsl:text>
    </xsl:attribute>
  </xsl:attribute-set>

  <!--
  Added "table.row.properties" to the fo:table-row element to
  support colour changes.
  -->
  <xsl:template match="row">
    <xsl:param name="spans"/>
  
    <fo:table-row xsl:use-attribute-sets="table.row.properties">
      <xsl:call-template name="anchor"/>
  
      <xsl:apply-templates select="(entry|entrytbl)[1]">
        <xsl:with-param name="spans" select="$spans"/>
      </xsl:apply-templates>
    </fo:table-row>
  
    <xsl:if test="following-sibling::row">
      <xsl:variable name="nextspans">
        <xsl:apply-templates select="(entry|entrytbl)[1]" mode="span">
          <xsl:with-param name="spans" select="$spans"/>
        </xsl:apply-templates>
      </xsl:variable>
  
      <xsl:apply-templates select="following-sibling::row[1]">
        <xsl:with-param name="spans" select="$nextspans"/>
      </xsl:apply-templates>
    </xsl:if>
  
  </xsl:template>

  <!--
  Within tables, using normal paragraph spacing that has a "space-before"
  set creates nasty gaps at the top of cells. This template (copied from
  the standard match="para" template) uses alternative spacing for the
  first paragraph with an entry element.
  -->
  <xsl:template match="entry/para[1]">
    <fo:block xsl:use-attribute-sets="first.para.spacing">
      <xsl:call-template name="anchor"/>
      <xsl:apply-templates/>
    </fo:block>
  </xsl:template>

</xsl:stylesheet>
