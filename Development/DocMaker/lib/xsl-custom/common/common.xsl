<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2005 Cúram Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <!--
  Optimized for improved performance in typical Cúram documents.
  -->
  <xsl:template name="section.level">
    <xsl:param name="node" select="."/>

    <xsl:choose>
      <xsl:when test="$node/self::section">
        <xsl:value-of select="count($node/ancestor-or-self::section)" />
      </xsl:when>
      <xsl:when test="name($node)='sect1'">1</xsl:when>
      <xsl:when test="name($node)='sect2'">2</xsl:when>
      <xsl:when test="name($node)='sect3'">3</xsl:when>
      <xsl:when test="name($node)='sect4'">4</xsl:when>
      <xsl:when test="name($node)='sect5'">5</xsl:when>
      <xsl:when test="name($node)='refsect1' or
                      name($node)='refsect2' or
                      name($node)='refsect3' or
                      name($node)='refsection' or
                      name($node)='refsynopsisdiv'">
        <xsl:call-template name="refentry.section.level">
          <xsl:with-param name="node" select="$node"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="name($node)='simplesect'">
        <xsl:choose>
          <xsl:when test="$node/../../sect1">2</xsl:when>
          <xsl:when test="$node/../../sect2">3</xsl:when>
          <xsl:when test="$node/../../sect3">4</xsl:when>
          <xsl:when test="$node/../../sect4">5</xsl:when>
          <xsl:when test="$node/../../sect5">5</xsl:when>
          <xsl:when test="$node/../../section">
            <xsl:choose>
              <xsl:when test="$node/../../../../../section">5</xsl:when>
              <xsl:when test="$node/../../../../section">4</xsl:when>
              <xsl:when test="$node/../../../section">3</xsl:when>
              <xsl:otherwise>2</xsl:otherwise>
            </xsl:choose>
          </xsl:when>
          <xsl:otherwise>1</xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>1</xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
