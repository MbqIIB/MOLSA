<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2004 Curam Software Ltd.
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
  Changed to place the copyright symbol first.
  -->
  <xsl:template match="copyright" mode="titlepage.mode">
    <xsl:call-template name="dingbat">
      <xsl:with-param name="dingbat">copyright</xsl:with-param>
    </xsl:call-template>
    <xsl:call-template name="gentext.space"/>
    <xsl:call-template name="gentext">
      <xsl:with-param name="key" select="'Copyright'"/>
    </xsl:call-template>
    <xsl:call-template name="gentext.space"/>
    <xsl:call-template name="copyright.years">
      <xsl:with-param name="years" select="year"/>
      <xsl:with-param name="print.ranges" select="$make.year.ranges"/>
      <xsl:with-param name="single.year.ranges"
                      select="$make.single.year.ranges"/>
    </xsl:call-template>
    <xsl:call-template name="gentext.space"/>
    <xsl:apply-templates select="holder" mode="titlepage.mode"/>
  </xsl:template>

  <!--
  Customized to change the layout of a revision history and make it appear
  only when the book's status is "draft". The revision history will be
  inserted into the front matter of the book (after the legal notice) and
  a page-break is inserted to make it appear on a new page. The heading for
  the revision history is formatted in the same manner as the heading for
  endnotes (i.e., equivalent to a top-level section heading); each revision
  then uses a second-level section style heading.
  -->
  <xsl:template match="revhistory" mode="titlepage.mode">
    <xsl:if test="/book/@status = 'draft'">
      <fo:block break-before="page">
        <fo:block xsl:use-attribute-sets="section.title.properties">
          <fo:block xsl:use-attribute-sets="section.title.level1.properties">
            <xsl:call-template name="gentext">
              <xsl:with-param name="key" select="'RevHistory'"/>
            </xsl:call-template>
          </fo:block>
        </fo:block>
        <xsl:apply-templates mode="titlepage.mode" />
      </fo:block>
    </xsl:if>
  </xsl:template>

  <xsl:template match="revhistory/revision" mode="titlepage.mode">
    <!-- Heading for this revision. -->
    <fo:block xsl:use-attribute-sets="section.title.properties">
      <fo:block xsl:use-attribute-sets="section.title.level2.properties">
        <xsl:call-template name="gentext">
          <xsl:with-param name="key" select="'Revision'"/>
        </xsl:call-template>
        <xsl:text> </xsl:text>
        <xsl:apply-templates select="revnumber" mode="titlepage.mode" />
        <xsl:text> (</xsl:text>
        <xsl:apply-templates select="date" mode="titlepage.mode" />
        <xsl:text>)</xsl:text>
      </fo:block>
    </fo:block>
    <!-- Comma-separated list of authors and/or initials, if present. -->
    <xsl:if test="author | authorinitials">
      <fo:block>
        <xsl:call-template name="gentext">
          <xsl:with-param name="key" select="'Revisedby'"/>
        </xsl:call-template>
        <xsl:for-each select="author | authorinitials">
          <xsl:choose>
            <xsl:when test="self::author">
              <!--
              Do not use the "titlepage" mode for author, as it will be
              rendered in a block and not inline.
              -->
              <xsl:apply-templates select="." />
            </xsl:when>
            <xsl:otherwise>
              <xsl:apply-templates select="." mode="titlepage.mode" />
            </xsl:otherwise>
          </xsl:choose>
          <xsl:if test="not(position() = last())">
            <xsl:text>, </xsl:text>
          </xsl:if>
        </xsl:for-each>
      </fo:block>
    </xsl:if>
    <!-- Remark or description, if present. -->
    <xsl:choose>
      <xsl:when test="revremark">
        <!-- Rendered as though it is a para. -->
        <fo:block xsl:use-attribute-sets="normal.para.spacing">
          <xsl:apply-templates select="revremark" mode="titlepage.mode" />
        </fo:block>
      </xsl:when>
      <xsl:when test="revdescription">
        <fo:block>
          <xsl:apply-templates select="revdescription" mode="titlepage.mode" />
        </fo:block>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
