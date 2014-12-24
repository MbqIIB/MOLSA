<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <!--
  Override templates to omit chapter, appendix and section elements (and their
  descendants by means of the absense of any recursion) from the HTML Help
  table of contents (.hhc file) where the role attribute is "no-toc".
  -->
  <xsl:template match="chapter[@role = 'no-toc']
                       | appendix[@role = 'no-toc']
                       | section[@role = 'no-toc']" mode="hhc" />

</xsl:stylesheet>
