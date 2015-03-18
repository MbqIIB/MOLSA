<?xml version="1.0" encoding="UTF-8"?>
<!-- 
Copyright 2005 Curam Software Ltd.  All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information").  You shall not
disclose such Confidential Information and shall use it only in accordance
with the terms of the license agreement you entered into with Curam Software.
-->
<!--
Scan client metadata files for any Action Controls which have no label.
 -->
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
  <xsl:output
    encoding="ISO-8859-1"
    method="text"
  />
  <xsl:template match="ACTION_CONTROL[string-length(@LABEL)=0]">
    <xsl:value-of select="@IMAGE"/>
    <xsl:text>.Help=Double_click_to_enter_text
</xsl:text>
  </xsl:template>


  <xsl:template match="text()"/>
</xsl:stylesheet>