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
  Replaced the tail recursion algorithm with something much more efficient.
  -->
  <xsl:template match="thead | tbody | tfoot">
    <xsl:element name="{name(.)}">
      <xsl:if test="@align">
        <xsl:attribute name="align">
          <xsl:value-of select="@align"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@char">
        <xsl:attribute name="char">
          <xsl:value-of select="@char"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@charoff">
        <xsl:attribute name="charoff">
          <xsl:value-of select="@charoff"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@valign">
        <xsl:attribute name="valign">
          <xsl:value-of select="@valign"/>
        </xsl:attribute>
      </xsl:if>

      <xsl:call-template name="generate-rows">
        <xsl:with-param name="spans">
          <xsl:call-template name="blank.spans">
            <xsl:with-param name="cols" select="../@cols"/>
          </xsl:call-template>
        </xsl:with-param>
      </xsl:call-template>

    </xsl:element>
  </xsl:template>

  <!--
  Optimized the performance and removed the support for processing
  instructions.
  -->
  <xsl:template name="generate-rows">
    <xsl:param name="spans" />
    <xsl:param name="row-num" select="1" />

    <xsl:variable name="this-row" select="row[$row-num]" />
    <xsl:variable name="is-last-row" select="not(row[$row-num + 1])" />
    <xsl:variable name="first-entry"
                  select="($this-row/entry | $this-row/entrytbl)[1]" />

    <xsl:apply-templates select="$this-row">
      <xsl:with-param name="spans" select="$spans" />
      <xsl:with-param name="row-num" select="$row-num" />
      <xsl:with-param name="is-last-row" select="$is-last-row" />
      <xsl:with-param name="first-entry" select="$first-entry" />
    </xsl:apply-templates>

    <xsl:if test="not($is-last-row)">
      <xsl:call-template name="generate-rows">
        <xsl:with-param name="spans">
          <xsl:apply-templates select="$first-entry" mode="span">
            <xsl:with-param name="spans" select="$spans"/>
          </xsl:apply-templates>
        </xsl:with-param>
        <xsl:with-param name="row-num" select="$row-num + 1" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="row">
    <xsl:param name="spans" />
    <xsl:param name="row-num" />
    <xsl:param name="is-last-row" />
    <xsl:param name="first-entry" />

    <tr>
      <xsl:call-template name="tr.attributes">
        <xsl:with-param name="rownum" select="$row-num" />
      </xsl:call-template>

      <xsl:if test="$table.borders.with.css != 0">
        <xsl:if test="@rowsep = 1 and not($is-last-row)">
          <xsl:attribute name="style">
            <xsl:call-template name="border">
              <xsl:with-param name="side" select="'bottom'"/>
            </xsl:call-template>
          </xsl:attribute>
        </xsl:if>
      </xsl:if>

      <xsl:if test="@align">
        <xsl:attribute name="align">
          <xsl:value-of select="@align"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@char">
        <xsl:attribute name="char">
          <xsl:value-of select="@char"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@charoff">
        <xsl:attribute name="charoff">
          <xsl:value-of select="@charoff"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@valign">
        <xsl:attribute name="valign">
          <xsl:value-of select="@valign"/>
        </xsl:attribute>
      </xsl:if>

      <xsl:apply-templates select="$first-entry">
        <xsl:with-param name="spans" select="$spans" />
      </xsl:apply-templates>
    </tr>
  </xsl:template>

</xsl:stylesheet>
