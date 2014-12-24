<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright  2003-2005 Curam Software Ltd.
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
  The image used on the cover page. This is determined from the "role"
  attribute of the book element.
  -->
  <xsl:param name="cover.page.image">
    <xsl:choose>
      <xsl:when test="/book/@role = 'administrator'">
        <xsl:text>administrator-cover.jpg</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'analyst'">
        <xsl:text>analyst-cover.jpg</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'business'">
        <xsl:text>analyst-cover.jpg</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'user'">
        <xsl:text>user-cover.jpg</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'developer'">
        <xsl:text>developer-cover.jpg</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'functional'">
        <xsl:text>developer-cover.jpg</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'design'">
        <xsl:text>developer-cover.jpg</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text></xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:param>

  <!--
  Format the title on the cover page. This inserts all of the title page
  content, including the graphics and boilerplate text.
  -->
  <xsl:template match="book/title" mode="book.titlepage.recto.mode">
    <xsl:apply-templates select="." mode="book.cover.page"/>
  </xsl:template>

  <xsl:template name="get.book.category.title">

    <xsl:variable name="category.title">
      <xsl:choose>
        <xsl:when test="/book/@role = 'administrator'">
          <xsl:text>AdminGuides</xsl:text>
        </xsl:when>
        <xsl:when test="/book/@role = 'analyst'">
          <xsl:text>AnalystGuides</xsl:text>
        </xsl:when>
        <xsl:when test="/book/@role = 'business'">
          <xsl:text>BusinessGuides</xsl:text>
        </xsl:when>
        <xsl:when test="/book/@role = 'developer'">
          <xsl:text>DevelGuides</xsl:text>
        </xsl:when>
        <xsl:when test="/book/@role = 'user'">
          <xsl:text>UserGuides</xsl:text>
        </xsl:when>
        <!-- The next few are just variations on the "developer" cover. -->
        <xsl:when test="/book/@role = 'functional'">
          <xsl:text>FuncSpecs</xsl:text>
        </xsl:when>
        <xsl:when test="/book/@role = 'design'">
          <xsl:text>DesignSpecs</xsl:text>
        </xsl:when>
      </xsl:choose>
    </xsl:variable>

    <xsl:if test="$category.title and $category.title != ''">
      <xsl:call-template name="gentext">
        <xsl:with-param name="key" select="$category.title"/>
      </xsl:call-template>
    </xsl:if>

  </xsl:template>

  <xsl:template match="title" mode="book.cover.page">

    <!--
    This layout is difficult to do without a table, as the output is within
    a higher-level block and absolute positioning of block-containers cannot
    be used within blocks.
    -->    
    <fo:table table-layout="fixed" width="100%">
    
      <fo:table-column column-number="1"
                       column-width="proportional-column-width(1)" />
      <fo:table-body>
        <fo:table-row>
          <fo:table-cell>
            <fo:block text-align="right" space-before="20pt">
              <fo:external-graphic width="58mm" height="20mm" src="../images/logo.gif" />
            </fo:block>
          </fo:table-cell>
        </fo:table-row>
        <fo:table-row>
          <fo:table-cell>
            <fo:block font-size="14pt" font-style="italic" space-before="30pt">
              <xsl:call-template name="gentext">
                <xsl:with-param name="key" select="'IBMCuram'"/>
              </xsl:call-template>
            </fo:block>
          </fo:table-cell>
        </fo:table-row>
        <fo:table-row>
          <fo:table-cell>
            <fo:block font-size="25pt" space-before="7pt">
              <xsl:apply-templates select="." mode="titlepage.mode" />
            </fo:block>
          </fo:table-cell>
        </fo:table-row>
        <fo:table-row>
          <fo:table-cell>
            <fo:block font-size="12pt" font-style="italic" space-before="30pt">
              <xsl:call-template name="gentext">
                <xsl:with-param name="key" select="'Version'"/>
              </xsl:call-template>
            </fo:block>
          </fo:table-cell>
        </fo:table-row>
      </fo:table-body>
    </fo:table>    
  </xsl:template>
  
  <xsl:template match="productname" mode="book.titlepage.verso.mode">
    <fo:block font-weight="bold" space-before="5pt">
      <xsl:call-template name="gentext">
        <xsl:with-param name="key" select="'CoverNote'"/>
      </xsl:call-template>
    </fo:block>
    <fo:block space-before="5pt">
      <xsl:call-template name="gentext">
        <xsl:with-param name="key" select="'CoverNotices'"/>
      </xsl:call-template>
    </fo:block>
    <fo:block space-before="440pt">
      <xsl:call-template name="gentext">
        <xsl:with-param name="key" select="'CoverEdition'"/>
      </xsl:call-template>
    </fo:block>
    <fo:block space-before="15pt">
      <xsl:call-template name="gentext">
        <xsl:with-param name="key" select="'CoverProperty'"/>
      </xsl:call-template>
    </fo:block>
    <fo:block space-before="7pt">
      <xsl:call-template name="gentext">
        <xsl:with-param name="key" select="'CoverCopyright'"/>
      </xsl:call-template>
    </fo:block>
    <fo:block space-before="7pt">
      <xsl:call-template name="gentext">
        <xsl:with-param name="key" select="'CoverRestrictions'"/>
      </xsl:call-template>
    </fo:block>
  </xsl:template>
  
</xsl:stylesheet>
