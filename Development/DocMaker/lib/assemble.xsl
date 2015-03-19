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
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output doctype-public="-//OASIS//DTD DocBook XML V4.2//EN"
    doctype-system="http://docbook.org/xml/4.2/docbookx.dtd"
    indent="no" method="xml" encoding="ISO-8859-1"/>

  <xsl:include href="xref-path.xsl"/>

  <!--
  Copy the document (incorporating any included files into one). The
  processing instructions are copied to support on-line help topic
  markers.
  -->
  <xsl:template match="@* | node() | processing-instruction()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node() | processing-instruction()"/>
    </xsl:copy>
  </xsl:template>

  <!--
  Add some meta-data to elements that can be cross-referenced to aid in
  cross-reference resolution in the next stage. For some elements, the title
  is optional, so only those that include a title are processed.
  -->
  <xsl:template match="chapter | appendix | section
                       | figure | table | example
                       | tip[title] | note[title]
                       | important[title] | warning[title]
                       | variablelist[title] | orderedlist[title]
                       | itemizedlist[title]">
    <xsl:copy>
      <xsl:attribute name="id">
        <xsl:value-of select="concat('DM', generate-id(.))" />
      </xsl:attribute>
      <!-- Add labels to speed up the autonumbering process later. -->
      <xsl:attribute name="label">
        <xsl:choose>
          <xsl:when test="self::section">
            <xsl:number count="section" />
          </xsl:when>
          <xsl:when test="self::figure | self::table | self::example">
            <!-- Numbered from their base chapter or appendix. -->
            <xsl:number format="1" from="chapter|appendix" level="any" />
          </xsl:when>
          <xsl:when test="self::chapter">
            <xsl:number from="book" count="chapter" format="1" level="any" />
          </xsl:when>
          <xsl:when test="self::appendix">
            <xsl:number from="book" count="appendix" format="A" level="any" />
          </xsl:when>
        </xsl:choose>
      </xsl:attribute>
      <xsl:attribute name="dm-xref-id">
        <xsl:apply-templates select="." mode="xref-path" />
      </xsl:attribute>
      <xsl:attribute name="dm-title">
        <xsl:variable name="flat-title">
          <xsl:for-each select="title/descendant::text()">
            <xsl:copy />
          </xsl:for-each>
        </xsl:variable>
        <xsl:value-of select="normalize-space($flat-title)" />
      </xsl:attribute>
      <xsl:apply-templates select="@* | node() | processing-instruction()"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
