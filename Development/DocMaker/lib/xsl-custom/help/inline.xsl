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
                version="1.0">

  <!--
  Modify some of the inline elements and leave the formatting to CSS.
  -->
  <xsl:template match="keycap">
    <xsl:call-template name="inline.charseq"/>
  </xsl:template>

  <xsl:template match="shortcut">
    <xsl:call-template name="inline.charseq"/>
  </xsl:template>

  <!--
  Change the font family for some of the inline elements.
  -->
  <xsl:template match="property">
    <xsl:call-template name="inline.monoseq"/>
  </xsl:template>

  <xsl:template match="returnvalue">
    <xsl:call-template name="inline.monoseq"/>
  </xsl:template>

  <xsl:template match="structname">
    <xsl:call-template name="inline.monoseq"/>
  </xsl:template>

  <xsl:template match="symbol">
    <xsl:call-template name="inline.monoseq"/>
  </xsl:template>

  <!--
  Do not render the trademark symbol unless within the bookinfo element.
  (CSS is used to apply the font style.)
  -->
  <xsl:template match="productname">
    <xsl:call-template name="inline.charseq"/>
    <xsl:if test="@class and ancestor::bookinfo">
      <xsl:call-template name="dingbat">
        <xsl:with-param name="dingbat" select="@class"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <!--
  Add chevrons to a type where the role is "stereotype" and change the font
  family.
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

</xsl:stylesheet>

