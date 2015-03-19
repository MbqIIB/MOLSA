<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2003-2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://exslt.org/strings"
                xmlns:xalanredirect="org.apache.xalan.xslt.extensions.Redirect"
                extension-element-prefixes="xalanredirect" >

  <!--
  Catch all the output so that a final "go/no-go" decision can be made if
  any errors were reported.
  -->
  <xsl:template match="/">

    <!-- "Catch" all the output. -->
    <xsl:variable name="output">
      <xsl:apply-templates />
    </xsl:variable>

    <!-- Write out all the errors and warnings. -->
    <xsl:value-of select="$output" />
    
    <!--
    Create a marker file if errors occurred so that Ant can detect the
    problem. Using <xsl:message terminate="yes"> would prevent the output
    being written to the book.txt file, so it is not useful.
    -->
    <xsl:if test="starts-with($output, 'ERROR:')
                  or contains($output, '&#x0A;ERROR:')">
      <xalanredirect:write file="failed.txt">
        <xsl:text>FATAL: The document failed the check.</xsl:text>
      </xalanredirect:write>
    </xsl:if>

  </xsl:template>

  <!--
  Recursively applies the templates in the "rules" mode.
  -->
  <xsl:template match="*">

    <!--
    Apply rules for this element, its attributes, and its text nodes.
    -->
    <xsl:apply-templates select=". | @* | text()" mode="rules" />

    <!--
    Recurse into the child elements.
    -->
    <xsl:apply-templates select="*" />

  </xsl:template>

  <!--
  The default text and attribute templates do nothing.
  -->
  <xsl:template match="text()|@*" />

  <!--
  The default "rules" templates do nothing.
  -->
  <xsl:template match="*|text()|@*" mode="rules" />

  <!--
  Reports validation results.
  -->
  <xsl:template name="report-message">
    <xsl:param name="message" />
    <xsl:param name="type" select="'ERROR'" />
    <xsl:param name="context">
      <xsl:call-template name="get-context" />
    </xsl:param>

    <xsl:variable name="full-message"
        select="concat($type, ': ', $message, ' (', $context, ')', '&#x0A;')" />

    <xsl:message>
      <xsl:value-of select="$full-message" />
    </xsl:message>

    <xsl:value-of select="$full-message" />

  </xsl:template>

  <!--
  Reports validation errors.
  -->
  <xsl:template name="report-error">
    <xsl:param name="message" />

    <xsl:call-template name="report-message">
      <xsl:with-param name="message" select="$message" />
      <xsl:with-param name="type" select="'ERROR'" />
    </xsl:call-template>

  </xsl:template>

  <!--
  Reports validation warnings.
  -->
  <xsl:template name="report-warning">
    <xsl:param name="message" />

    <xsl:call-template name="report-message">
      <xsl:with-param name="message" select="$message" />
      <xsl:with-param name="type" select="'WARNING'" />
    </xsl:call-template>

  </xsl:template>

  <!--
  Reports that the child elements of the current node are allowed. There are
  two parameters that accept a comma-separated list of element names. If
  there is a child whose name is not in the "valid-names" parameter, an
  error is reported. Similarly, if there is a child whose name is listed in
  the "invalid-names" parameter, an error is reported. Either parameter can
  be omitted. If both are provided, only the "valid-names" will be checked.
  -->
  <xsl:template name="report-illegal-children">
    <xsl:param name="valid-names" />
    <xsl:param name="invalid-names" />

    <xsl:for-each select="*">
      <xsl:variable name="name" select="name()" />
      <xsl:choose>
        <xsl:when test="$valid-names
                        and not($valid-names[normalize-space(.) = $name])">
          <xsl:call-template name="report-error">
            <xsl:with-param name="message"
              select="concat($name, ' element not allowed here.')" />
          </xsl:call-template>
        </xsl:when>
        <xsl:when test="$invalid-names
                        and $invalid-names[normalize-space(.) = $name]">
          <xsl:call-template name="report-error">
            <xsl:with-param name="message"
              select="concat($name, ' element not allowed here.')" />
          </xsl:call-template>
        </xsl:when>
      </xsl:choose>
    </xsl:for-each>

  </xsl:template>

  <!--
  Reports if the current element has child elements matching the names.
  The names should be specified as a comma-separated list.
  -->
  <xsl:template name="report-missing-children">
    <xsl:param name="names" />

    <xsl:variable name="children" select="*" />

    <xsl:for-each select="$names">
      <xsl:variable name="name" select="normalize-space(.)" />
      <xsl:if test="not($children[name() = $name])">
        <xsl:call-template name="report-error">
          <xsl:with-param name="message"
            select="concat('Missing ', $name, ' element.')" />
        </xsl:call-template>
      </xsl:if>
    </xsl:for-each>

  </xsl:template>

  <!--
  Reports if the string contains lines that exceed the "max-length" value.
  -->
  <xsl:template name="report-long-lines">
    <xsl:param name="string" />
    <xsl:param name="max-length" />

    <xsl:for-each select="str:split($string, '&#x0a;')">
      <xsl:variable name="len" select="string-length(.)" />
      <xsl:if test="$len &gt; $max-length">
        <xsl:call-template name="report-error">
          <xsl:with-param name="message"
            select="concat('Line too long (', $len,
                           ' chars., max. ', $max-length, '):', .)" />
        </xsl:call-template>
      </xsl:if>
    </xsl:for-each>

  </xsl:template>

  <!--
  Gets a string that represents the document context of the current element in
  a human-readable form.
  -->
  <xsl:template name="get-context">
    <xsl:for-each select="ancestor-or-self::*">
      <xsl:call-template name="get-next-context" />
    </xsl:for-each>
  </xsl:template>

  <!--
  Generates the additional context for an element that can be appended to the
  context of its ancestor elements.
  -->
  <xsl:template name="get-next-context">
    <xsl:variable name="this" select="." />
    <xsl:variable name="name" select="name()" />
    <xsl:variable name="this-chapter"
        select="ancestor-or-self::chapter | ancestor-or-self::appendix" />

    <!--
    The reported name of an element may differ from the actual name when the
    initial processing before the "check" is performed has replaced the
    original element with another. This is done for "olink" elements that link
    to targets within the same book; they are replaced with "xref" or "link"
    elements, so "xref" or "link" elements are reported as "olink" elements.
    -->
    <xsl:variable name="reported-name">
      <xsl:choose>
        <xsl:when test="self::link or self::xref">
          <xsl:text>olink</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$name" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!--
    Output a comma (if not a book or a section), and the element name (if not
    a section).
    -->
    <xsl:choose>
      <xsl:when test="not(self::book or self::section) and parent::section">
        <xsl:value-of select="concat(' &quot;', normalize-space(../title),
                                     '&quot;, ')" />
      </xsl:when>
      <xsl:when test="not(self::book or self::section)">
        <xsl:value-of select="', '" />
      </xsl:when>
    </xsl:choose>

    <xsl:if test="not(self::section)">
      <xsl:value-of select="$reported-name" />
    </xsl:if>

    <xsl:if test="self::book">
      <xsl:value-of select="concat(' &quot;', normalize-space(title),
                                   '&quot;')" />
    </xsl:if>

    <!--
    Output the new context.
    -->
    <xsl:if test="$this-chapter">

      <xsl:variable name="chapter-num">
        <xsl:choose>
          <xsl:when test="$this-chapter[self::chapter]">
            <xsl:value-of
                select="count($this-chapter/preceding-sibling::chapter) + 1" />
          </xsl:when>
          <xsl:when test="$this-chapter[self::appendix]">
            <!-- Convert the appendix position value to a letter. -->
            <xsl:value-of
                select="substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                          count($this-chapter/preceding-sibling::appendix) + 1,
                          1)" />
          </xsl:when>
        </xsl:choose>        
      </xsl:variable>

      <xsl:variable
        name="index-in-parent"
        select="count(preceding-sibling::*[name() = $name
                                           or name() = $reported-name]) + 1" />

      <!--
      A space after the name ready for the number!
      -->
      <xsl:if test="not(self::section)">
        <xsl:value-of select="' '" />
      </xsl:if>

      <xsl:choose>
        <xsl:when test="self::section">
          <xsl:choose>
            <xsl:when test="not(parent::section)">
              <xsl:value-of
                  select="concat(', ', $reported-name, ' ',
                                 $chapter-num, '.', $index-in-parent)" />
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="concat('.', $index-in-parent)" />
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:when test="self::table or self::example or self::figure">
          <!--
          Formal items are numbered in document order within a
          chapter regardless of nesting.
          -->
          <xsl:variable
            name="this-chapter-id"
            select="generate-id($this-chapter)" />

          <xsl:variable
            name="index-in-chapter"
            select="count(preceding::*[
                            (name() = $name or name() = $reported-name)
                            and generate-id(ancestor::chapter
                                            | ancestor::appendix)
                                = $this-chapter-id]) + 1" />
          <xsl:value-of
            select="concat($chapter-num, '.', $index-in-chapter,
                           ' &quot;', normalize-space(title), '&quot;')" />
        </xsl:when>
        <xsl:when test="self::chapter or self::appendix">
          <xsl:value-of select="concat($chapter-num,
                                       ' &quot;', normalize-space(title),
                                       '&quot;')" />
        </xsl:when>
        <xsl:otherwise>
          <!--
          This handles most elements using a "name-index" format.
          -->
          <xsl:value-of select="$index-in-parent" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>

  </xsl:template>

</xsl:stylesheet>
