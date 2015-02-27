<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2004-2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output doctype-public="-//OASIS//DTD DocBook XML V4.2//EN"
              doctype-system="http://docbook.org/xml/4.2/docbookx.dtd"
              indent="no" method="xml" encoding="ISO-8859-1"/>

  <xsl:key name="ids" match="*[@id]" use="@id" />
  <xsl:key name="dm-xref-ids" match="*[@dm-xref-id]" use="@dm-xref-id" />
  <xsl:key name="dm-titles" match="title" use="local-name(..)" />

  <xsl:template match="@* | node() | processing-instruction()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node() | processing-instruction()"/>
    </xsl:copy>
  </xsl:template>

  <!--
  Remove the temporary attributes added to help resolution.
  -->
  <xsl:template match="@targetptr" />
  <xsl:template match="@dm-title" />
  <xsl:template match="@dm-xref-id" />

  <!--
  Convert "olink" element to "link" or "xref" elements and check validity
  of references.
  -->
  <xsl:template match="olink">

    <xsl:variable name="type" select="substring-before(@targetptr, ':')" />
    <xsl:variable name="title" select="substring-after(@targetptr, ':')" />

    <xsl:choose>
      <xsl:when test="string-length($title) > 0
                      and ($type = 'chapter' or $type = 'appendix'
                           or $type = 'section' or $type = 'table'
                           or $type = 'figure' or $type = 'example'
                           or $type = 'tip' or $type = 'note'
                           or $type = 'important' or $type = 'warning'
                           or $type = 'variablelist' or $type = 'orderedlist'
                           or $type = 'itemizedlist')">
        <xsl:call-template name="resolve-olink">
          <xsl:with-param name="type" select="$type"/>
          <xsl:with-param name="title" select="$title"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="string-length($title) > 0 and $type = 'topicname'">
        <!--
        External topic reference: preserve the content and mark this for
        special treatment during rendering.
        -->
        <olink type="topicname" localinfo="{$title}">
          <xsl:copy-of select="node()" />
        </olink>
      </xsl:when>
      <xsl:otherwise>
        <xsl:variable name="target" select="key('dm-xref-ids', @targetptr)" />
        <xsl:choose>
          <xsl:when test="not($target)">
            <xsl:message terminate="yes">
              <xsl:value-of
                  select="concat('ERROR: Invalid cross-reference to: &quot;',
                                 @targetptr, '&quot;. No targets match.')" />
            </xsl:message>
          </xsl:when>
          <xsl:when test="count($target) &gt; 1">
            <xsl:message terminate="yes">
              <xsl:value-of
                  select="concat('ERROR: Invalid cross-reference to: &quot;',
                                 @targetptr,
                                 '&quot;. The target is not unique.')" />
            </xsl:message>
          </xsl:when>
          <xsl:when test="child::node()">
            <!-- Content, so use a "link" element. -->
            <link linkend="{$target/@id}">
              <xsl:apply-templates select="@*|node()" />
            </link>
          </xsl:when>
          <xsl:otherwise>
            <!-- No content, so use an "xref" element. -->
            <xref linkend="{$target/@id}">
              <xsl:apply-templates select="@*" />
            </xref>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!--
  Resolve "olink" references using the short-hand format for the
  "targetptr" attribute.
  -->
  <xsl:template name="resolve-olink">

    <xsl:param name="type"/>
    <xsl:param name="title"/>

    <xsl:variable name="title-nodes"
        select="key('dm-titles', $type)[contains(../@dm-title, $title)]"/>
    <xsl:variable name="num-matches" select="count($title-nodes)" />

    <xsl:choose>
      <xsl:when test="$num-matches = 1">
        <!-- Convert the "olink" element. -->
        <xsl:choose>
          <xsl:when test="child::node()">
            <!-- Content, so use a "link" element. -->
            <link linkend="{$title-nodes/../@id}">
              <xsl:apply-templates select="@*|node()" />
            </link>
          </xsl:when>
          <xsl:otherwise>
            <!-- No content, so use an "xref" element. -->
            <xref linkend="{$title-nodes/../@id}">
              <xsl:apply-templates select="@*" />
            </xref>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$num-matches = 0">
        <xsl:message terminate="yes">
          <xsl:value-of select="concat('ERROR: No ', $type,
                                       ' element with title matching &quot;',
                                       $title, '&quot; found.')"/>
        </xsl:message>
      </xsl:when>
      <xsl:otherwise>
        <xsl:message terminate="yes">
          <xsl:value-of
              select="concat('ERROR: Ambiguous cross-reference: &quot;',
                             $type, ':', $title,
                             '&quot;. The following targets match:')" />
          <xsl:for-each select="$title-nodes">
            <xsl:value-of select="concat('&#xa;  &quot;', $title, '&quot; [',
                                         ../@dm-xref-id, ']')" />
          </xsl:for-each>
          <xsl:value-of 
              select="concat('&#xa;Either disambiguate the title ',
                             'or, if that is not possible, use the ',
                             'explicit notation shown beside the ',
                             'title above to identify the target.')" />
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
