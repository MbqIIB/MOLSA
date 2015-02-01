<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2003-2004 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:exslt="http://exslt.org/common"
                extension-element-prefixes="exslt" >

  <!--
  Normalizes the text node descendants of the given node. This will "flatten"
  the text, convert it to lower-case, and hyphenate the resulting words. If
  the node contains a "footnote" element, its contents are ignored.
  -->
  <xsl:template match="node()" mode="normalize-text">
    <!--
    The first pass is used to convert text nodes into a set of "token"
    elements containing parts of the normalized text content.
    -->
    <xsl:variable name="normalizedTitle">
      <xsl:apply-templates select="node()[not(self::footnote)]"
                           mode="normalizer"/>
    </xsl:variable>
    <!--
    The second pass concatenates the contents of the non-empty tokens.
    -->
    <xsl:apply-templates
        select="exslt:node-set($normalizedTitle)
                      /token[string-length(text()) > 0]"
        mode="normalizer"/>
  </xsl:template>

  <!--
  Recurses into the element's descendants and normalizes the contents. This
  will not recurse into "footnote" elements.
  -->
  <xsl:template match="node()" mode="normalizer">
    <xsl:apply-templates select="node()[not(self::footnote)]"
                         mode="normalizer"/>
  </xsl:template>

  <!--
  Normalise the text. Remove punctuation, etc., convert to lower-case, and
  separate words by hyphens. This is not capable of handling accented
  characters, etc.
  -->
  <xsl:template match="text()" mode="normalizer">
    <!--
    Characters removed before normalizing. These are stripped completely
    and not replaced with space characters. 169 is the copyright symbol.
    8216, 8217, 8220, and 8221 are the left and right single and double
    quotation marks respectively. Unfortunately, it is not possible to
    discard all characters that are not explicitly supported. The slightly
    strange way of building this string is needed to allow the apostrophe
    to be included.
    -->
    <xsl:variable name="remove-chars">
      <xsl:value-of select="concat(':()[]{}/!*,?%^&quot;&gt;&lt;&amp;&#169;',
                                   '&#8216;&#8217;&#8220;&#8221;')" />
      <xsl:text>&apos;</xsl:text>
    </xsl:variable>

    <!--
    Characters converted to hyphens during normalizing. These are first
    converted into space characters, the spaces are normalised, and then
    remaining spaces are converted to hyphens. 8211 and 8212 are the en-dash
    and em-dash respectively. Hyphens themselves are first removed to avoid
    ending up with triple hyphens if they are surrounded by spaces.
    -->
    <xsl:variable name="hyphen-chars" select="'-._+=|&#8211;&#8212;'" />

    <!--
    The hyphen-chars must be mapped to spaces, so this creates a string with
    the correct number of spaces without requiring any maintenance.
    -->
    <xsl:variable name="space-chars">
      <xsl:call-template name="spaces">
        <xsl:with-param name="length" select="string-length($hyphen-chars)" />
      </xsl:call-template>
    </xsl:variable>

    <token>
      <xsl:value-of
          select="translate(normalize-space(
                              translate(.,
                                        concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                                               $hyphen-chars, $remove-chars),
                                        concat('abcdefghijklmnopqrstuvwxyz',
                                               $space-chars))),
                            ' ', '-')" />
    </token>
  </xsl:template>

  <!--
  Tokens are used to handle situations where normalized nodes contain
  mark-up. This allows the text to be "flattened" but still maintains the
  correct hyphenation between words.
  -->
  <xsl:template match="token" mode="normalizer">
    <xsl:if test="not(position() = 1)">
      <xsl:text>-</xsl:text>
    </xsl:if>
    <xsl:value-of select="." />  
  </xsl:template>

  <!--
  Utility template to produce a string of spaces of a required length.
  -->
  <xsl:template name="spaces">
    <xsl:param name="length" select="0" />
  
    <xsl:if test="$length &gt; 0">
      <xsl:text> </xsl:text>
      <xsl:call-template name="spaces">
        <xsl:with-param name="length" select="$length - 1" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
