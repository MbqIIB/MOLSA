<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2004-2006 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:exslt="http://exslt.org/common"
                extension-element-prefixes="exslt"
                version="1.0">

  <!--
  Configure the basic navigation parameters.
  -->
  <xsl:param name="suppress.navigation" select="0" />
  <xsl:param name="navig.graphics.extension" select="'.gif'" />
  <xsl:param name="navig.graphics" select="1" />
  <xsl:param name="navig.graphics.path" select="'../images/'" />
  <xsl:param name="navig.showtitles" select="0" />
  <xsl:param name="header.rule" select="0" />
  <xsl:param name="footer.rule" select="0" />

  <!--
  Customized to put the "home" and "up" buttons in the header and on the
  same row and to add the "sync" button. Support for titles remains, but
  should not be enabled without further customizations to ensure the layout
  would be correct.
  -->
  <xsl:template name="header.navigation">
    <xsl:param name="navbar-content"/>

    <xsl:if test="$suppress.navigation = '0'
                  and $suppress.header.navigation = '0'
                  and $navbar-content">
      <div class="navheader">
        <xsl:copy-of select="$navbar-content" />

        <xsl:if test="$header.rule != 0">
          <hr/>
        </xsl:if>
      </div>
    </xsl:if>
  </xsl:template>

  <!--
  Customized to put the "home" and "up" buttons in the footer on the same
  row and to add the "sync" button.
  -->
  <xsl:template name="footer.navigation">
    <xsl:param name="navbar-content"/>

    <xsl:if test="$suppress.navigation = '0'
                  and $suppress.footer.navigation = '0'
                  and $navbar-content">
      <div class="navfooter">
        <xsl:if test="$footer.rule != 0">
          <hr/>
        </xsl:if>

        <xsl:copy-of select="$navbar-content" />
      </div>
    </xsl:if>
  </xsl:template>

  <!--
  The same navigation bar content is shared by the header and footer.
  -->
  <xsl:template name="common.navigation">
    <xsl:param name="prev" select="/foo"/>
    <xsl:param name="next" select="/foo"/>
    <xsl:param name="nav.context"/>

    <xsl:variable name="home" select="/*[1]"/>
    <xsl:variable name="up" select="parent::*"/>

    <xsl:variable name="display-bar"
                  select="count($prev) &gt; 0
                          or (count($up) &gt; 0
                              and generate-id($up) != generate-id($home))
                          or count($next) &gt; 0"/>

    <xsl:if test="$suppress.navigation = '0'
                  and $suppress.header.navigation = '0'
                  and $display-bar">
      <table summary="Navigation">
        <xsl:call-template name="navbar">
          <xsl:with-param name="next" select="$next"/>
          <xsl:with-param name="prev" select="$prev"/>
          <xsl:with-param name="home" select="$home"/>
          <xsl:with-param name="up" select="$up"/>
          <xsl:with-param name="nav.context" select="$nav.context"/>
        </xsl:call-template>
      </table>
    </xsl:if>
  </xsl:template>

  <!--
  Common row of navigation buttons in the header and the footer. Optimized to
  improve performance.
  -->
  <xsl:template name="navbar">
    <xsl:param name="prev" />
    <xsl:param name="next" />
    <xsl:param name="nav.context"/>

    <tr>
      <td class="navbarright">
        <xsl:if test="count($prev) &gt; 0">
          <span class="navprev">
            <a accesskey="p">
              <xsl:attribute name="href">
                <xsl:call-template name="href.target">
                  <xsl:with-param name="object" select="$prev"/>
                </xsl:call-template>
              </xsl:attribute>
              <xsl:call-template name="navig.content">
                <xsl:with-param name="direction" select="'prev'"/>
              </xsl:call-template>
            </a>
          </span>
          <xsl:text> </xsl:text>
        </xsl:if>
        <xsl:if test="count($next) &gt; 0">
          <span class="navnext">
            <a accesskey="n">
              <xsl:attribute name="href">
                <xsl:call-template name="href.target">
                  <xsl:with-param name="object" select="$next"/>
                </xsl:call-template>
              </xsl:attribute>
              <xsl:call-template name="navig.content">
                <xsl:with-param name="direction" select="'next'"/>
              </xsl:call-template>
            </a>
          </span>
        </xsl:if>
      </td>
    </tr>    
  </xsl:template>

  <!--
  Customized to add a class attribute to the navigation image elements and
  to add the text for the synchronization button.
  -->
  <xsl:template name="navig.content">
    <xsl:param name="direction" select="'next'"/>

    <xsl:variable name="navtext">
      <xsl:choose>
        <xsl:when test="$direction = 'prev'">
          <xsl:call-template name="gentext.nav.prev"/>
        </xsl:when>
        <xsl:when test="$direction = 'next'">
          <xsl:call-template name="gentext.nav.next"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>xxx</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$navig.graphics != 0">
        <img class="navigation">
          <xsl:attribute name="src">
            <xsl:value-of select="$navig.graphics.path"/>
            <xsl:value-of select="$direction"/>
            <xsl:value-of select="$navig.graphics.extension"/>
          </xsl:attribute>
          <xsl:attribute name="alt">
            <xsl:value-of select="$navtext"/>
          </xsl:attribute>
          <xsl:attribute name="title">
            <xsl:value-of select="$navtext"/>
          </xsl:attribute>
        </img>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$navtext"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="gentext.nav.sync">
    <xsl:call-template name="gentext">
      <xsl:with-param name="key" select="'nav-sync'"/>
    </xsl:call-template>
  </xsl:template>

</xsl:stylesheet>
