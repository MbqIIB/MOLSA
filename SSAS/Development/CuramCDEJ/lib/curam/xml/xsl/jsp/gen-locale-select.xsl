<?xml version="1.0" encoding="UTF-8"?>
<!--
Copyright (c) 2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Interactive
Technology Design, Ltd. ("Confidential Information"). You shall not disclose
such Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.

$Id$
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:curam="http://www.curamsoftware.com/curam"
                xmlns:jsp="http://java.sun.com/JSP/Page"
                xmlns:c="http://java.sun.com/jsp/jstl/core"
                xmlns:xalan="http://xml.apache.org/xalan"
                exclude-result-prefixes="xalan">
  <xsl:param name="all-locales"/>

  <xsl:template match="/">
    <jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" xmlns:curam="http://www.curamsoftware.com/curam" version="2.0">
      <jsp:directive.page isELIgnored="false" />
      <!-- <jsp:output omit-xml-declaration="yes" /> -->
      <jsp:scriptlet><![CDATA[pageContext.setAttribute("showLocaleSelector", curam.omega3.config.appconfig.CuramConfig.getInstance().getLanguageSelection());]]></jsp:scriptlet>
      <!-- curam.omega3.PropertyFilter will replace @LOCALE@ with the appropriate
           locale string value -->
      <c:set var="pageLocale" value="@LOCALE@" scope="page"/>
      <c:if>
              <xsl:attribute name="test">
          <xsl:text>${showLocaleSelector}</xsl:text>
        </xsl:attribute>
        <div class="menu locale-selection">
          <h2>
           <xsl:value-of select="concat('@', 'localeSelector.header.text', '@')"/>
          </h2>
          <ul>
            <xsl:for-each select="xalan:tokenize($all-locales,',')">
              <xsl:variable name="locale-code" select="normalize-space(.)"/>
              <!-- The current locale should only be displayed as text
                   and marked as selected. -->
              <c:choose>
                <c:when>
                  <xsl:attribute name="test">
                    <xsl:text>${pageLocale=='</xsl:text>
                    <xsl:value-of select="$locale-code"/>
                    <xsl:text>'}</xsl:text>
                  </xsl:attribute>
                  <li class="selected"><curam:localeSelect localeCode="{$locale-code}" disableLink="true"/></li>
                </c:when>
                <c:otherwise>
                  <li><curam:localeSelect localeCode="{$locale-code}" /></li>
                </c:otherwise>
              </c:choose>
            </xsl:for-each>
          </ul>
        </div>
      </c:if>
    </jsp:root>
  </xsl:template>
</xsl:stylesheet>