<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright  2005-2006 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <!--
  Optimizations to improve the HTML Help rendering performance. The chunking
  is now fixed to top-level sections (except the first) and other higher-level
  elements. It cannot be controlled by the "chunk.section.depth" parameter.
  -->

  <!--
  Customized to wrap the content in a div with class "content", as the
  margins need to be set and nested sections cause the margins to be
  inherited if applied to the div with class "section". (IE does not support
  CSS child selectors, so the div cannot be selected as a child of the body
  element.) The navigation bar is also only generated once instead of twice
  for each page.
  -->  
  <xsl:template name="chunk-element-content">
    <xsl:param name="prev"/>
    <xsl:param name="next"/>
    <xsl:param name="nav.context"/>
    <xsl:param name="content" />
    <xsl:param name="underscore">_</xsl:param>
    <xsl:param name="dash">-</xsl:param>

    <xsl:variable name="navbar-content">
      <xsl:call-template name="common.navigation">
        <xsl:with-param name="prev" select="$prev"/>
        <xsl:with-param name="next" select="$next"/>
        <xsl:with-param name="nav.context" select="$nav.context"/>
      </xsl:call-template>
    </xsl:variable>

    <xsl:text disable-output-escaping="yes"><![CDATA[<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><!-- Copyright 2006 Curam Software Ltd. -->]]></xsl:text>
    <html>
      <xsl:attribute name="lang">
        <xsl:choose>
          <xsl:when test="contains($l10n.gentext.language, $underscore)">
            <xsl:value-of select="substring-before($l10n.gentext.language, $underscore)"/>
            <xsl:value-of select="$dash"/>       
            <xsl:value-of select="substring-after($l10n.gentext.language, $underscore)"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$l10n.gentext.language"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <meta http-equiv="Content-Type"
            content="text/html; charset={$chunker.output.encoding}"/>
      
      <xsl:call-template name="html.head">
        <xsl:with-param name="prev" select="$prev"/>
        <xsl:with-param name="next" select="$next"/>
      </xsl:call-template>

      <!--
      Call to JavaScript to enable features on the page hidden by default, as
      they require JavaScript to operate, e.g., the "Synchronize Table of
      Contents" button.
      -->
      <body onload="pageOpened();">
        <xsl:call-template name="body.attributes"/>
        <xsl:call-template name="user.header.navigation"/>

        <xsl:call-template name="header.navigation">
          <xsl:with-param name="navbar-content" select="$navbar-content"/>
        </xsl:call-template>

        <xsl:call-template name="user.header.content"/>

        <!--
        This spacer will be "floated" down the left side of the content to
        push the navigation footer off the bottom of the page, so that it
        is not visible until a user scrolls down.
        -->
        <div id="spacer"></div>

        <div class="content">
          <xsl:copy-of select="$content"/>
        </div>

        <xsl:call-template name="user.footer.content"/>

        <xsl:call-template name="footer.navigation">
          <xsl:with-param name="navbar-content" select="$navbar-content"/>
        </xsl:call-template>

        <xsl:call-template name="user.footer.navigation"/>
      </body>
    </html>
  </xsl:template>

  <!--
  Key all elements that are chunks. This ignores some of the controlling
  parameters defined in the original stylesheets.
  -->
  <xsl:key name="is-chunk"
           match="/
                  | preface
                  | chapter
                  | appendix
                  | article
                  | part
                  | reference
                  | refentry
                  | index[parent::article or parent::book]
                  | bibliography[parent::article or parent::book]
                  | glossary[parent::article or parent::book]
                  | colophon
                  | book
                  | set
                  | setindex
                  | sect1[count(preceding-sibling::sect1) &gt; 0]
                  | section[count(ancestor-or-self::section) = 1
                            and count(preceding-sibling::section) &gt; 0]"
           use="generate-id(.)" />

  <!--
  Completely rewritten to improve the speed of this heavily used template.
  -->
  <xsl:template name="chunk">
    <xsl:param name="node" select="."/>

    <xsl:choose>
      <xsl:when test="key('is-chunk', generate-id($node))">
        <xsl:text>1</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>0</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Optimized to improve the speed.
  -->
  <xsl:template match="*" mode="chunk-filename">
    <xsl:apply-templates select="." mode="recursive-chunk-filename"/>
  </xsl:template>

  <!--
  Rewritten to improve performance and dropped support for "dbhtml-filename"
  processing instructions. The tests have been re-ordered to reduce the number
  of tests executed for each call (hence the division of "section" and "sectN"
  elements into separate tests).
  -->
  <xsl:template match="*" mode="recursive-chunk-filename">
    <xsl:param name="recursive" select="false()"/>

    <xsl:variable name="ischunk">
      <xsl:call-template name="chunk"/>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$ischunk = '0'">
        <xsl:apply-templates mode="recursive-chunk-filename"
                             select="parent::*">
          <xsl:with-param name="recursive" select="$recursive"/>
        </xsl:apply-templates>
      </xsl:when>

      <xsl:otherwise>
         <xsl:variable name="filename">
           <xsl:choose>
            <xsl:when test="@id and $use.id.as.filename != 0">
              <xsl:value-of select="@id"/>
              <xsl:value-of select="$html.ext"/>
            </xsl:when>
            <xsl:when test="not(parent::*) and $root.filename != ''">
              <xsl:value-of select="$root.filename"/>
              <xsl:value-of select="$html.ext"/>
            </xsl:when>
            <xsl:otherwise></xsl:otherwise>
          </xsl:choose>
        </xsl:variable>

        <xsl:choose>
          <xsl:when test="not($recursive) and $filename != ''">
            <xsl:value-of select="$filename"/>
          </xsl:when>

          <xsl:when test="self::section">
            <xsl:apply-templates mode="recursive-chunk-filename"
                                 select="parent::*">
              <xsl:with-param name="recursive" select="true()"/>
            </xsl:apply-templates>
            <xsl:text>s</xsl:text>
            <xsl:number format="01"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::chapter">
            <xsl:if test="/set">
              <xsl:apply-templates mode="recursive-chunk-filename"
                                   select="parent::*">
                <xsl:with-param name="recursive" select="true()"/>
              </xsl:apply-templates>
            </xsl:if>
            <xsl:text>ch</xsl:text>
            <xsl:number level="any" format="01" from="book"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::appendix">
            <xsl:if test="/set">
              <xsl:apply-templates mode="recursive-chunk-filename"
                                   select="parent::*">
                <xsl:with-param name="recursive" select="true()"/>
              </xsl:apply-templates>
            </xsl:if>
            <xsl:text>ap</xsl:text>
            <xsl:number level="any" format="a" from="book"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::book">
            <xsl:text>bk</xsl:text>
            <xsl:number level="any" format="01"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::sect1
                          or self::sect2
                          or self::sect3
                          or self::sect4
                          or self::sect5">
            <xsl:apply-templates mode="recursive-chunk-filename"
                                 select="parent::*">
              <xsl:with-param name="recursive" select="true()"/>
            </xsl:apply-templates>
            <xsl:text>s</xsl:text>
            <xsl:number format="01"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::article or self::preface or self::colophon
                          or self::bibliography">
            <xsl:if test="/set">
              <xsl:apply-templates mode="recursive-chunk-filename"
                                   select="parent::*">
                <xsl:with-param name="recursive" select="true()"/>
              </xsl:apply-templates>
            </xsl:if>
            <xsl:value-of select="substring(name(.), 1, 2)" />
            <xsl:number level="any" format="01" from="book"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::set">
            <xsl:value-of select="$root.filename"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::part">
            <xsl:if test="/set">
              <xsl:apply-templates mode="recursive-chunk-filename"
                                   select="parent::*">
                <xsl:with-param name="recursive" select="true()"/>
              </xsl:apply-templates>
            </xsl:if>
            <xsl:text>pt</xsl:text>
            <xsl:number level="any" format="01" from="book"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::reference">
            <xsl:if test="/set">
              <xsl:apply-templates mode="recursive-chunk-filename"
                                   select="parent::*">
                <xsl:with-param name="recursive" select="true()"/>
              </xsl:apply-templates>
            </xsl:if>
            <xsl:text>rn</xsl:text>
            <xsl:number level="any" format="01" from="book"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::refentry">
            <xsl:if test="parent::reference">
              <xsl:apply-templates mode="recursive-chunk-filename"
                                   select="parent::*">
                <xsl:with-param name="recursive" select="true()"/>
              </xsl:apply-templates>
            </xsl:if>
            <xsl:text>re</xsl:text>
            <xsl:number level="any" format="01" from="book"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::glossary">
            <xsl:choose>
              <xsl:when test="/set">
                <!-- in a set, make sure we inherit the right book info... -->
                <xsl:apply-templates mode="recursive-chunk-filename"
                                     select="parent::*">
                  <xsl:with-param name="recursive" select="true()"/>
                </xsl:apply-templates>
              </xsl:when>
              <xsl:otherwise>
              </xsl:otherwise>
            </xsl:choose>

            <xsl:text>go</xsl:text>
            <xsl:number level="any" format="01" from="book"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::index">
            <xsl:choose>
              <xsl:when test="/set">
                <!-- in a set, make sure we inherit the right book info... -->
                <xsl:apply-templates mode="recursive-chunk-filename"
                                     select="parent::*">
                  <xsl:with-param name="recursive" select="true()"/>
                </xsl:apply-templates>
              </xsl:when>
              <xsl:otherwise>
              </xsl:otherwise>
            </xsl:choose>

            <xsl:text>ix</xsl:text>
            <xsl:number level="any" format="01" from="book"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:when test="self::setindex">
            <xsl:text>si</xsl:text>
            <xsl:number level="any" format="01" from="set"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:when>

          <xsl:otherwise>
            <xsl:text>chunk-filename-error-</xsl:text>
            <xsl:value-of select="name(.)"/>
            <xsl:number level="any" format="01" from="set"/>
            <xsl:if test="not($recursive)">
              <xsl:value-of select="$html.ext"/>
            </xsl:if>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
