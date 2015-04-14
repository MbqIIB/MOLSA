<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2004 Cúram Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:l="http://docbook.sourceforge.net/xmlns/l10n/1.0"
                exclude-result-prefixes="l"
                version="1.0">

  <!--
  A customization layer that dramatically improves the performance of the
  templates for typical Cúram documents that contain a lot of generated
  text using localized text templates. A single language is assumed for
  all look-ups, and access to the localization data is far more efficient.
  -->

  <!--
  This is redefined to point to a smaller set of localization data.
  <xsl:param name="l10n.xml" select="document('l10n.xml')"/>
  -->

  <!--
  Just get these once, instead of each time they are used.
  -->
  <xsl:param name="local.l10n"
    select="($local.l10n.xml/l:i18n/l:l10n[@language
                                            = $l10n.gentext.language])[1]"/>
  <xsl:param name="default.l10n"
    select="($l10n.xml/l:i18n/l:l10n[@language
                                     = $l10n.gentext.language])[1]"/>

  <!--
  Set up keys for access to the localization resources. Note that these will
  only work when the correct document is in context, so "for-each" or
  "apply-templates" will be needed to select a node from the required
  document to switch the context document. This indirect access means that
  results are usually RTFs, and the stylesheet must be rewritten to allow
  for this (though the "node-set()" extension function is another
  alternative).

  The "gentext-key" and "dingbat-key" are keyed on the language code and
  the key attribute value concatenated and separated by a colon.

  The "context-key" is keyed on the language code and the context name.
  -->
  <xsl:key name="gentext-key" match="l:gentext"
    use="concat(../@language, ':', @key)" />

  <xsl:key name="dingbat-key" match="l:dingbat"
    use="concat(../@language, ':', @key)" />

  <xsl:key name="context-key" match="l:context"
    use="concat(../@language, ':', @name)" />

  <!--
  Simplified and optimized version of this template. This is twice as fast as
  the original version.
  -->
  <xsl:template name="xpath.location">
    <xsl:param name="node" select="."/>

    <xsl:if test="$node/parent::*">
      <xsl:call-template name="xpath.location">
        <xsl:with-param name="node" select="$node/parent::*"/>
      </xsl:call-template>
    </xsl:if>

    <xsl:value-of select="concat('/', local-name($node))" />
  </xsl:template>

  <!--
  Optimized this template to reduce the number of calls to other templates,
  as some of the called templates are expensive. This is about 40% faster
  than the original.
  -->
  <xsl:template match="section" mode="label.markup">
    <!-- if this is a nested section, label the parent -->
    <xsl:if test="parent::section">
      <xsl:variable name="parent.section.label">
        <xsl:apply-templates select=".." mode="label.markup"/>
      </xsl:variable>
      <xsl:if test="$parent.section.label != ''">
        <xsl:value-of select="$parent.section.label"/>
        <xsl:apply-templates select=".." mode="intralabel.punctuation"/>
      </xsl:if>
    </xsl:if>

    <xsl:if test="$section.label.includes.component.label != 0">
      <!-- if the parent is a component, maybe label that too -->
      <xsl:variable name="parent.is.component">
        <xsl:call-template name="is.component">
          <xsl:with-param name="node" select=".."/>
        </xsl:call-template>
      </xsl:variable>

      <xsl:if test="$parent.is.component != 0">
        <xsl:variable name="parent.label">
          <xsl:apply-templates select=".." mode="label.markup"/>
        </xsl:variable>
        <xsl:if test="$parent.label != ''">
          <xsl:value-of select="$parent.label"/>
          <xsl:apply-templates select=".." mode="intralabel.punctuation"/>
        </xsl:if>
      </xsl:if>
    </xsl:if>

    <xsl:choose>
      <xsl:when test="@label">
        <xsl:value-of select="@label"/>
      </xsl:when>
      <xsl:when test="$section.autolabel != 0">
        <xsl:number count="section"/>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <!--
  Short-circuit the original templates and just return the fixed language code.
  -->
  <xsl:template name="l10n.language">
    <xsl:param name="target" select="."/>
    <xsl:param name="xref-context" select="false()"/>

    <xsl:value-of select="$l10n.gentext.language"/>
  </xsl:template>

  <xsl:template name="language.attribute">
    <xsl:param name="node" select="."/>

    <xsl:attribute name="lang">
      <xsl:value-of select="$l10n.gentext.language"/>
    </xsl:attribute>
  </xsl:template>

  <!--
  Templates now fail if there are no localized template strings.
  -->
  <xsl:template name="gentext">
    <xsl:param name="key" select="local-name(.)" />
    <xsl:param name="lang" select="$l10n.gentext.language" />

    <xsl:variable name="search.key" select="concat($lang, ':', $key)" />

    <xsl:variable name="local.l10n.gentext">
      <!-- Context switch. -->
      <xsl:for-each select="$local.l10n">
        <xsl:value-of select="key('gentext-key', $search.key)[1]/@text" />
      </xsl:for-each>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$local.l10n.gentext and not($local.l10n.gentext = '')">
        <xsl:value-of select="$local.l10n.gentext"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:variable name="l10n.gentext">
          <!-- Context switch. -->
          <xsl:for-each select="$default.l10n">
            <xsl:value-of select="key('gentext-key', $search.key)[1]/@text" />
          </xsl:for-each>
        </xsl:variable>

        <xsl:choose>
          <xsl:when test="$l10n.gentext and not($l10n.gentext = '')">
            <xsl:value-of select="$l10n.gentext"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:message terminate="yes">
              <xsl:text>No "</xsl:text>
              <xsl:value-of select="$lang"/>
              <xsl:text>" localization of "</xsl:text>
              <xsl:value-of select="$key"/>
              <xsl:text>" exists.</xsl:text>
            </xsl:message>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="gentext.element.name">
    <xsl:param name="element.name" select="name(.)"/>
    <xsl:param name="lang" select="$l10n.gentext.language" />

    <xsl:call-template name="gentext">
      <xsl:with-param name="key" select="$element.name"/>
      <xsl:with-param name="lang" select="$lang"/>
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="gentext.dingbat">
    <xsl:param name="dingbat" select="'bullet'" />
    <xsl:param name="lang" select="$l10n.gentext.language" />

    <xsl:variable name="search.key" select="concat($lang, ':', $dingbat)" />

    <xsl:variable name="local.l10n.dingbat">
      <!-- Context switch. -->
      <xsl:for-each select="$local.l10n">
        <xsl:value-of select="key('dingbat-key', $search.key)[1]/@text" />
      </xsl:for-each>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$local.l10n.dingbat and not($local.l10n.dingbat = '')">
        <xsl:value-of select="$local.l10n.dingbat"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:variable name="l10n.dingbat">
          <!-- Context switch. -->
          <xsl:for-each select="$default.l10n">
            <xsl:value-of select="key('dingbat-key', $search.key)[1]/@text" />
          </xsl:for-each>
        </xsl:variable>

        <xsl:choose>
          <xsl:when test="$l10n.dingbat and not($l10n.dingbat = '')">
            <xsl:value-of select="$l10n.dingbat"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:message terminate="yes">
              <xsl:text>No "</xsl:text>
              <xsl:value-of select="$lang"/>
              <xsl:text>" localization of dingbat "</xsl:text>
              <xsl:value-of select="$dingbat"/>
              <xsl:text>" exists.</xsl:text>
            </xsl:message>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Optimized template to reduce searches for template strings and eliminate
  the need for the "gentext.template.exists" template.
  -->
  <xsl:template match="*" mode="object.xref.template">
    <xsl:param name="purpose"/>
    <xsl:param name="xrefstyle"/>
    <xsl:param name="referrer"/>

    <xsl:variable name="autonumber">
      <xsl:apply-templates select="." mode="is.autonumber"/>
    </xsl:variable>

    <xsl:variable name="name">
      <xsl:call-template name="xpath.location"/>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$autonumber != 0">
        <xsl:variable name="number-and-title-template">
          <xsl:call-template name="gentext.template">
            <xsl:with-param name="context" select="'xref-number-and-title'"/>
            <xsl:with-param name="name" select="$name" />
            <xsl:with-param name="purpose" select="$purpose"/>
            <xsl:with-param name="xrefstyle" select="$xrefstyle"/>
            <xsl:with-param name="referrer" select="$referrer"/>
          </xsl:call-template>
        </xsl:variable>

        <xsl:choose>
          <xsl:when test="$number-and-title-template
                          and not($number-and-title-template = '')">
            <xsl:value-of select="$number-and-title-template" />
          </xsl:when>
          <xsl:otherwise>
            <xsl:variable name="number-template">
              <xsl:call-template name="gentext.template">
                <xsl:with-param name="context" select="'xref-number'"/>
                <xsl:with-param name="name" select="$name" />
                <xsl:with-param name="purpose" select="$purpose"/>
                <xsl:with-param name="xrefstyle" select="$xrefstyle"/>
                <xsl:with-param name="referrer" select="$referrer"/>
              </xsl:call-template>
            </xsl:variable>

            <xsl:choose>
              <xsl:when test="$number-template and not($number-template = '')">
                <xsl:value-of select="$number-template" />
              </xsl:when>
              <xsl:otherwise>
                <xsl:call-template name="gentext.template">
                  <xsl:with-param name="context" select="'xref'"/>
                  <xsl:with-param name="name" select="$name" />
                  <xsl:with-param name="purpose" select="$purpose"/>
                  <xsl:with-param name="xrefstyle" select="$xrefstyle"/>
                  <xsl:with-param name="referrer" select="$referrer"/>
                </xsl:call-template>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="gentext.template">
          <xsl:with-param name="context" select="'xref'"/>
          <xsl:with-param name="name" select="$name" />
          <xsl:with-param name="purpose" select="$purpose"/>
          <xsl:with-param name="xrefstyle" select="$xrefstyle"/>
          <xsl:with-param name="referrer" select="$referrer"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!--
  Changed the structure of this template to reduce the scope of the
  recursion and radically improve performance. Some of the descisions
  are based on assumptions about the template names and how prevelant
  different formats are in local and default localization contexts.
  -->
  <xsl:template name="gentext.template">
    <xsl:param name="context" select="'default'"/>
    <xsl:param name="name" select="'default'"/>
    <xsl:param name="origname" select="$name"/>
    <xsl:param name="purpose"/>
    <xsl:param name="xrefstyle"/>
    <xsl:param name="referrer"/>
    <xsl:param name="lang" select="$l10n.gentext.language"/>

    <xsl:variable name="template">
      <!-- Context switch. -->
      <xsl:for-each select="$default.l10n">
        <xsl:variable name="default.context"
            select="key('context-key', concat($lang, ':', $context))[1]" />
        <xsl:call-template name="gentext.template.search">
          <xsl:with-param name="name" select="$name" />
          <xsl:with-param name="xrefstyle" select="$xrefstyle" />
          <xsl:with-param name="local.context"
              select="($local.l10n/l:context[@name = $context])[1]" />
          <xsl:with-param name="default.context" select="$default.context" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:variable>
   
    <xsl:choose>
      <xsl:when test="$template and not($template = '')">
        <xsl:value-of select="$template" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:message>
          <xsl:text>No template for "</xsl:text>
          <xsl:value-of select="$origname"/>
          <xsl:text>" (or any of its leaves) exists </xsl:text>
          <xsl:text>in the context named "</xsl:text>
          <xsl:value-of select="$context"/>
          <xsl:text>" in the "</xsl:text>
          <xsl:value-of select="$lang"/>
          <xsl:text>" localization.</xsl:text>
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Checks the local and default localization contexts for a template matching
  the given name. The search chooses the match with the longest name path.
  -->
  <xsl:template name="gentext.template.search">
    <xsl:param name="name" />
    <xsl:param name="xrefstyle" />
    <xsl:param name="local.context" />
    <xsl:param name="default.context" />

    <xsl:variable name="templates"
        select="$local.context/l:template | $default.context/l:template" />

    <xsl:variable name="name.len" select="string-length($name)" />

    <!--
    Recursing over the node set and testing strings makes more sense, but
    recursion over a node set is far more expensive than a "for-each" and
    recursion over a string is very cheap. So, this is an odd approach, but
    performs much better. The "for-each" produces a string of results that
    are colon-separated numbers indicating the size of the match with the
    end of the path. A "+" is used for a styled match that will take
    precedence, but the "+" does not have to be removed when converting a
    string to a number, so it aids the performance.
    -->
    <xsl:variable name="best.pos">
      <xsl:call-template name="best.result">
        <xsl:with-param name="results">
          <xsl:for-each select="$templates">
            <xsl:variable name="this.name" select="@name" />
            <xsl:variable name="this.len" select="string-length($this.name)" />
            <xsl:choose>
              <!--
              "Ends with" test for a whole word. For example, "langcode"
              matches "langcode", "note" matches "section/note", but "note"
              does not match "para/footnote". The names are either whole
              words, or words separated by "/" characters. Either name may
              also start with a "/" character.
              -->
              <xsl:when
                test="substring($name, $name.len - $this.len + 1) = $this.name
                      and (substring($name, $name.len - $this.len, 1) = '/'
                           or starts-with($this.name, '/')
                           or $this.len = $name.len)">
                <xsl:if test="@style and @style = $xrefstyle">
                  <xsl:text>+</xsl:text>
                </xsl:if>
                <xsl:value-of select="$this.len" />
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>0</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
            <xsl:text>:</xsl:text>
          </xsl:for-each>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>

    <xsl:if test="$best.pos &gt; 0">
      <xsl:value-of select="$templates[position() = $best.pos]/@text" />
    </xsl:if>
  </xsl:template>

  <!--
  Scans through the results of the context matches and determines the best
  match. The best match is the longest. For a match of equal length, a
  "styled" match takes precedence over an "unstyled" match, then the
  first match takes precedence over a subsequent match (this enforces the
  local before default context precedence, as they are presented in that
  order).
  -->
  <xsl:template name="best.result">
    <xsl:param name="results" select="''" />
    <xsl:param name="best.pos" select="0" />
    <xsl:param name="best.len" select="0" />
    <xsl:param name="best.style" select="0" />
    <xsl:param name="this.pos" select="1" />

    <xsl:choose>
      <xsl:when test="$results">
        <!--
        Attempt to skip as many "0" results as practical, as it is cheaper
        to call "starts-with" than to start another recursion. The nesting
        ensures that a maximum of only one call more to "starts-with" will
        be made than the number of recursions saved.
        -->
        <xsl:variable name="zeros">
          <xsl:choose>
            <xsl:when test="starts-with($results, '0:')">
              <xsl:choose>
                <xsl:when test="starts-with($results, '0:0:')">
                  <xsl:choose>
                    <xsl:when test="starts-with($results, '0:0:0:')">
                      <xsl:choose>
                        <xsl:when test="starts-with($results, '0:0:0:0:')">
                          <xsl:choose>
                            <xsl:when test="starts-with($results,
                                                        '0:0:0:0:0:')">
                              <xsl:choose>
                                <xsl:when test="starts-with($results,
                                                            '0:0:0:0:0:0:')">
                                  <xsl:choose>
                                    <xsl:when test="starts-with($results,
                                                            '0:0:0:0:0:0:0:')">
                                      <xsl:text>7</xsl:text>
                                    </xsl:when>
                                    <xsl:otherwise>
                                      <xsl:text>6</xsl:text>
                                    </xsl:otherwise>
                                  </xsl:choose>
                                </xsl:when>
                                <xsl:otherwise>
                                  <xsl:text>5</xsl:text>
                                </xsl:otherwise>
                              </xsl:choose>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:text>4</xsl:text>
                            </xsl:otherwise>
                          </xsl:choose>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:text>3</xsl:text>
                        </xsl:otherwise>
                      </xsl:choose>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:text>2</xsl:text>
                    </xsl:otherwise>
                  </xsl:choose>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:text>1</xsl:text>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
              <xsl:text>0</xsl:text>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:variable>

        <xsl:choose>
          <xsl:when test="$zeros &gt; 0">
            <!-- Skip over all the "0:" results. -->
            <xsl:call-template name="best.result">
              <xsl:with-param name="results"
                              select="substring($results, ($zeros * 2) + 1)" />
              <xsl:with-param name="best.pos" select="$best.pos" />
              <xsl:with-param name="best.len" select="$best.len" />
              <xsl:with-param name="best.style" select="$best.style" />
              <xsl:with-param name="this.pos" select="$this.pos + $zeros" />
            </xsl:call-template>
          </xsl:when>
          <xsl:otherwise>
            <xsl:variable name="this.len"
                          select="number(substring-before($results, ':'))" />

            <xsl:choose>
              <xsl:when test="$this.len &gt; $best.len">
                <xsl:call-template name="best.result">
                  <xsl:with-param name="results"
                                  select="substring-after($results, ':')" />
                  <xsl:with-param name="best.pos" select="$this.pos" />
                  <xsl:with-param name="best.len" select="$this.len" />
                  <xsl:with-param name="best.style" select="0" />
                  <xsl:with-param name="this.pos" select="$this.pos + 1" />
                </xsl:call-template>
              </xsl:when>
              <xsl:when test="$this.len = $best.len and $best.style = 0
                              and starts-with($results, '+')">
                <xsl:call-template name="best.result">
                  <xsl:with-param name="results"
                                  select="substring-after($results, ':')" />
                  <xsl:with-param name="best.pos" select="$this.pos" />
                  <xsl:with-param name="best.len" select="$this.len" />
                  <xsl:with-param name="best.style" select="1" />
                  <xsl:with-param name="this.pos" select="$this.pos + 1" />
                </xsl:call-template>
              </xsl:when>
              <xsl:otherwise>
                <xsl:call-template name="best.result">
                  <xsl:with-param name="results"
                                  select="substring-after($results, ':')" />
                  <xsl:with-param name="best.pos" select="$best.pos" />
                  <xsl:with-param name="best.len" select="$best.len" />
                  <xsl:with-param name="best.style" select="$best.style" />
                  <xsl:with-param name="this.pos" select="$this.pos + 1" />
                </xsl:call-template>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$best.pos" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  The addition of the "label" attribute during preprocessing works for
  sections (the parent section number is used, etc.), but this template
  is needed to include the chapter or appendix number for the matched
  elements.
  -->
  <xsl:template match="figure|table|example|procedure" mode="label.markup">
    <xsl:variable name="pchap"
                  select="ancestor::chapter
                          | ancestor::appendix
                          | ancestor::article[ancestor::book]"/>

    <xsl:variable name="prefix">
      <xsl:apply-templates select="$pchap" mode="label.markup"/>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$prefix and $prefix != ''">
        <xsl:value-of select="$prefix" />
        <xsl:apply-templates select="$pchap"
                             mode="intralabel.punctuation" />
        <xsl:choose>
          <xsl:when test="@label">
            <xsl:value-of select="@label" />
          </xsl:when>
          <xsl:otherwise>
            <xsl:number format="1" from="chapter|appendix" level="any"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:number format="1" from="book|article" level="any"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>

