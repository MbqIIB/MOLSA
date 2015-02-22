<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2003-2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <!--
  The alternative colour used for the cover page background, etc. This is
  determined from the "role" attribute of the book element.
  -->
  <xsl:param name="alt.colour">
    <xsl:choose>
      <xsl:when test="/book/@role = 'user'">
        <!-- Green -->
        <xsl:text>#ADC6BC</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'administrator'">
        <!-- Blue -->
        <xsl:text>#AABFD4</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'analyst'">
        <!-- Brown -->
        <xsl:text>#BAB098</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'business'">
        <!-- Brown -->
        <xsl:text>#BAB098</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'developer'">
        <!-- Pink -->
        <xsl:text>#E1B6B2</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'functional'">
        <!-- Pink -->
        <xsl:text>#E1B6B2</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'design'">
        <!-- Pink -->
        <xsl:text>#E1B6B2</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <!-- Default to Green -->
        <xsl:text>#ADC6BC</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:param>

  <!--
  A lighter tone of alternative colour used for background shading, etc.
  This is determined from the "role" attribute of the book element.
  -->
  <xsl:param name="alt.colour.light">
    <xsl:choose>
      <xsl:when test="/book/@role = 'user'">
        <!-- Green -->
        <xsl:text>#CFE2DB</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'administrator'">
        <!-- Blue -->
        <xsl:text>#D4E3F2</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'analyst'">
        <!-- Brown -->
        <xsl:text>#DED5BE</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'business'">
        <!-- Brown -->
        <xsl:text>#DED5BE</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'developer'">
        <!-- Pink -->
        <xsl:text>#F4E0DE</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'functional'">
        <!-- Pink -->
        <xsl:text>#F4E0DE</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'design'">
        <!-- Pink -->
        <xsl:text>#F4E0DE</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <!-- Default to Green -->
        <xsl:text>#CFE2DB</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:param>

  <!--
  A darker tone of alternative colour used for number text, etc.
  This is determined from the "role" attribute of the book element.
  -->
  <xsl:param name="alt.colour.dark">
    <xsl:choose>
      <xsl:when test="/book/@role = 'user'">
        <!-- Green -->
        <xsl:text>#759B8C</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'administrator'">
        <!-- Blue -->
        <xsl:text>#92A6B9</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'analyst'">
        <!-- Brown -->
        <xsl:text>#9B9077</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'business'">
        <!-- Brown -->
        <xsl:text>#9B9077</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'developer'">
        <!-- Pink -->
        <xsl:text>#A77470</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'functional'">
        <!-- Pink -->
        <xsl:text>#A77470</xsl:text>
      </xsl:when>
      <xsl:when test="/book/@role = 'design'">
        <!-- Pink -->
        <xsl:text>#A77470</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <!-- Default to Green -->
        <xsl:text>#759B8C</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:param>

</xsl:stylesheet>
