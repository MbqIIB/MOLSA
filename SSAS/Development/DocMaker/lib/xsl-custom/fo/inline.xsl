<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2003-2005 Curam Software Ltd.
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
  Make the menu choices and other GUI element look nice. Use italic font
  and use a ZapfDingbats arrow character for the menu separator.
  -->
  <xsl:template match="application">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="errorname">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="errortype">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="guibutton">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="guiicon">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="guilabel">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="guimenu">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="guimenuitem">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="guisubmenu">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="interface">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="keycap">
    <xsl:call-template name="inline.italicseq"/>
  </xsl:template>

  <xsl:template match="property">
    <xsl:call-template name="inline.monoseq"/>
  </xsl:template>

  <xsl:template match="symbol">
    <xsl:call-template name="inline.monoseq"/>
  </xsl:template>

  <!--
  Add chevrons to a type where the role is "stereotype".
  -->
  <xsl:template match="type">
    <xsl:choose>
      <xsl:when test="@role = 'stereotype'">
        <!--
        Make the chevrons part of the content, so that the correct font is
        applied to everything.
        -->
        <xsl:call-template name="inline.monoseq">
          <xsl:with-param name="content">
            <xsl:call-template name="anchor"/>
            <xsl:call-template name="simple.xlink">
              <xsl:with-param name="content">
                <xsl:text>&lt;&lt;</xsl:text>
                <xsl:apply-templates/>
                <xsl:text>&gt;&gt;</xsl:text>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:with-param>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="inline.monoseq"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Do not render the trademark symbol unless within the bookinfo element.
  -->
  <xsl:template match="productname">
    <xsl:call-template name="inline.italicseq"/>
    <xsl:if test="@class and ancestor::bookinfo">
      <xsl:call-template name="dingbat">
        <xsl:with-param name="dingbat" select="@class"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <!--
  Customize the appearance of the menu item separators.
  -->
  <xsl:template name="process.menuchoice">
    <xsl:param name="nodelist"
        select="guibutton|guiicon|guilabel|guimenu
                |guimenuitem|guisubmenu|interface"/>
    <xsl:param name="count" select="1"/>

    <xsl:choose>
      <xsl:when test="$count &gt; count($nodelist)"></xsl:when>
      <xsl:when test="$count=1">
        <xsl:apply-templates select="$nodelist[$count=position()]"/>
        <xsl:call-template name="process.menuchoice">
          <xsl:with-param name="nodelist" select="$nodelist"/>
          <xsl:with-param name="count" select="$count+1"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:variable name="node" select="$nodelist[$count=position()]"/>
        <xsl:choose>
          <xsl:when test="name($node)='guimenuitem'
                          or name($node)='guisubmenu'">
            <fo:inline font-family="ZapfDingbats">&#x2192;</fo:inline>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$menuchoice.separator"/>
          </xsl:otherwise>
        </xsl:choose>
        <xsl:apply-templates select="$node"/>
        <xsl:call-template name="process.menuchoice">
          <xsl:with-param name="nodelist" select="$nodelist"/>
          <xsl:with-param name="count" select="$count+1"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
