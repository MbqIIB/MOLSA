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
                xmlns:fo="http://www.w3.org/1999/XSL/Format"
                version="1.0">

  <!--
  Customized to remove table-specific footnote formatting.
  -->
  <xsl:template name="calsTable">
    <xsl:if test="tgroup/tbody/tr | tgroup/thead/tr | tgroup/tfoot/tr">
      <xsl:message terminate="yes">
        <xsl:text>Broken table: tr descendent of CALS Table.</xsl:text>
      </xsl:message>
    </xsl:if>

    <xsl:variable name="id">
      <xsl:call-template name="object.id"/>
    </xsl:variable>

    <xsl:variable name="param.placement"
        select="substring-after(normalize-space($formal.title.placement),
                                concat(local-name(.), ' '))"/>

    <xsl:variable name="placement">
      <xsl:choose>
        <xsl:when test="contains($param.placement, ' ')">
          <xsl:value-of select="substring-before($param.placement, ' ')"/>
        </xsl:when>
        <xsl:when test="$param.placement = ''">before</xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$param.placement"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="table.content">
      <fo:block id="{$id}" xsl:use-attribute-sets="formal.object.properties">
        <xsl:if test="$placement = 'before'">
          <xsl:call-template name="formal.object.heading">
            <xsl:with-param name="placement" select="$placement"/>
          </xsl:call-template>
        </xsl:if>

        <xsl:for-each select="tgroup">
          <xsl:variable name="prop-columns"
                        select=".//colspec[contains(@colwidth, '*')]"/>
          <fo:table border-collapse="collapse">
            <xsl:call-template name="table.frame"/>
            <xsl:if test="following-sibling::tgroup">
              <xsl:attribute name="border-bottom-width">0pt</xsl:attribute>
              <xsl:attribute name="border-bottom-style">none</xsl:attribute>
              <xsl:attribute name="padding-bottom">0pt</xsl:attribute>
              <xsl:attribute name="margin-bottom">0pt</xsl:attribute>
              <xsl:attribute name="space-after">0pt</xsl:attribute>
              <xsl:attribute name="space-after.minimum">0pt</xsl:attribute>
              <xsl:attribute name="space-after.optimum">0pt</xsl:attribute>
              <xsl:attribute name="space-after.maximum">0pt</xsl:attribute>
            </xsl:if>
            <xsl:if test="preceding-sibling::tgroup">
              <xsl:attribute name="border-top-width">0pt</xsl:attribute>
              <xsl:attribute name="border-top-style">none</xsl:attribute>
              <xsl:attribute name="padding-top">0pt</xsl:attribute>
              <xsl:attribute name="margin-top">0pt</xsl:attribute>
              <xsl:attribute name="space-before">0pt</xsl:attribute>
              <xsl:attribute name="space-before.minimum">0pt</xsl:attribute>
              <xsl:attribute name="space-before.optimum">0pt</xsl:attribute>
              <xsl:attribute name="space-before.maximum">0pt</xsl:attribute>
            </xsl:if>
            <xsl:if test="count($prop-columns) != 0">
              <xsl:attribute name="table-layout">fixed</xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="."/>
          </fo:table>
        </xsl:for-each>

        <xsl:if test="$placement != 'before'">
          <xsl:call-template name="formal.object.heading">
            <xsl:with-param name="placement" select="$placement"/>
          </xsl:call-template>
        </xsl:if>
      </fo:block>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="@orient='land'">
        <fo:block-container reference-orientation="90">
          <fo:block>
            <!--
            Such spans won't work in most FO processors since it does not
            follow the XSL spec, which says it must appear on an element that
            is a direct child of fo:flow. Some processors relax that
            requirement, however.
            -->
            <xsl:attribute name="span">
              <xsl:choose>
                <xsl:when test="@pgwide=1">all</xsl:when>
                <xsl:otherwise>none</xsl:otherwise>
              </xsl:choose>
            </xsl:attribute>
            <xsl:copy-of select="$table.content"/>
          </fo:block>
        </fo:block-container>
      </xsl:when>
      <xsl:otherwise>
        <fo:block>
          <xsl:attribute name="span">
            <xsl:choose>
              <xsl:when test="@pgwide=1">all</xsl:when>
              <xsl:otherwise>none</xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>
          <xsl:copy-of select="$table.content"/>
        </fo:block>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Customized to remove table-specific footnote formatting.
  -->
  <xsl:template name="informalCalsTable">
    <xsl:variable name="id">
      <xsl:call-template name="object.id"/>
    </xsl:variable>

    <xsl:variable name="table.content">
      <xsl:for-each select="tgroup">
        <xsl:variable name="prop-columns"
                      select=".//colspec[contains(@colwidth, '*')]"/>
        <fo:table border-collapse="collapse"
                  xsl:use-attribute-sets="informal.object.properties">
          <xsl:call-template name="table.frame"/>
          <xsl:if test="following-sibling::tgroup">
            <xsl:attribute name="border-bottom-width">0pt</xsl:attribute>
            <xsl:attribute name="border-bottom-style">none</xsl:attribute>
            <xsl:attribute name="padding-bottom">0pt</xsl:attribute>
            <xsl:attribute name="margin-bottom">0pt</xsl:attribute>
            <xsl:attribute name="space-after">0pt</xsl:attribute>
            <xsl:attribute name="space-after.minimum">0pt</xsl:attribute>
            <xsl:attribute name="space-after.optimum">0pt</xsl:attribute>
            <xsl:attribute name="space-after.maximum">0pt</xsl:attribute>
          </xsl:if>
          <xsl:if test="preceding-sibling::tgroup">
            <xsl:attribute name="border-top-width">0pt</xsl:attribute>
            <xsl:attribute name="border-top-style">none</xsl:attribute>
            <xsl:attribute name="padding-top">0pt</xsl:attribute>
            <xsl:attribute name="margin-top">0pt</xsl:attribute>
            <xsl:attribute name="space-before">0pt</xsl:attribute>
            <xsl:attribute name="space-before.minimum">0pt</xsl:attribute>
            <xsl:attribute name="space-before.optimum">0pt</xsl:attribute>
            <xsl:attribute name="space-before.maximum">0pt</xsl:attribute>
          </xsl:if>
          <xsl:if test="count($prop-columns) != 0">
            <xsl:attribute name="table-layout">fixed</xsl:attribute>
          </xsl:if>
          <xsl:apply-templates select="."/>
        </fo:table>
      </xsl:for-each>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="@orient='land'">
        <fo:block-container reference-orientation="90">
          <fo:block id="{$id}">
            <xsl:attribute name="span">
              <xsl:choose>
                <xsl:when test="@pgwide=1">all</xsl:when>
                <xsl:otherwise>none</xsl:otherwise>
              </xsl:choose>
            </xsl:attribute>
            <xsl:copy-of select="$table.content"/>
          </fo:block>
        </fo:block-container>
      </xsl:when>
      <xsl:otherwise>
        <fo:block id="{$id}">
          <xsl:attribute name="span">
            <xsl:choose>
              <xsl:when test="@pgwide=1">all</xsl:when>
              <xsl:otherwise>none</xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>
          <xsl:copy-of select="$table.content"/>
        </fo:block>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
