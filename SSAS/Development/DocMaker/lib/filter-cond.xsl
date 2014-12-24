<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2004 Curam Software Ltd.
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

  <!--
  The condition value for the content to be preserved. If this is not set,
  all content will be preserved.
  -->
  <xsl:param name="condition" select="''" />

  <!--
  Copy the document and remove any content (other than the book element)
  that has a condition attribute whose value does not match the condition
  parameter value (unless that parameter is not set at all).
  -->
  <xsl:template match="@*|node()|processing-instruction()">
    <xsl:if test="self::book
                  or not($condition and $condition != ''
                         and @condition and @condition != $condition)">
      <xsl:copy>
        <xsl:apply-templates select="@*|node()|processing-instruction()"/>
      </xsl:copy>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
