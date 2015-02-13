<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2004-2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <!--
  The order of the imports here is very important and is required to ensure
  that the chunking templates can be overridden while still ensuring that the
  ordinary HTML templates are visible. The first set of imports is the
  equivalent of inlining the "docbook-xsl/htmlhelp/htmlhelp.xsl" stylesheet
  and inlining the "docbook-xsl/html/chunk.xsl" stylesheet that it imports.
  The latter stylesheet includes comments describing this approach, but the
  proposed solution is still inadequate and the original "chunk-code.xsl"
  stylesheet has to be discarded.
  -->
  <xsl:import href="htmlhelp.xsl"/>
  <xsl:import href="../../docbook-xsl/html/chunk-common.xsl"/>
  <xsl:import href="navigation.xsl" />

  <!--
  Output will be XHTML using UTF-8 encoding. The "html" method is specified to
  ensure that the empty element shorthand of XML is not used, as this
  shorthand confuses many browsers (i.e., IE).
  -->
  <xsl:output method="html" encoding="UTF-8" indent="no" />

  <xsl:include href="chunk-common.xsl" />
  <xsl:include href="../../docbook-xsl/html/manifest.xsl"/>
  <xsl:include href="chunk-code.xsl" />
  
  
</xsl:stylesheet>
