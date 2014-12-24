<?xml version="1.0"?>

<!-- Copyright 2004-2011 Curam Software Ltd.

  All rights reserved.
  This software is the confidential and proprietary information of Curam
  Software, Ltd. ("Confidential Information").  You shall not disclose such
  Confidential Information and shall use it only in accordance with the
  terms of the license agreement you entered into with Curam Software.

  This XSLT merges a codetable file; the main codetable file, with a delta codetable file;
  the merge file, to produce a new codetable file. Duplicate codetable names are copied
  depending on precedence; the main codetable file has the highest precedence.
  All locales are merged, any duplicates in the merge file are ignored.

-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:param name="mergeFileName"/>
  <xsl:preserve-space elements="codetables locale codetable code annotation codetabledata description comments"/>
  <xsl:output method="xml" indent="yes" encoding="UTF-8"/>

  <!-- Assign the main source file -->
  <xsl:variable name="mainfileroot" select="/"/>

  <!--Load the merge file -->
  <xsl:variable name="mergefile" select="document($mergeFileName)"/>

  <!-- Assign the list of codetable names from the main codetable file -->
  <xsl:variable name="mainCodetableList" select="$mainfileroot/codetables/codetable"/>

  <!-- Start to combine the files -->
  <xsl:template match="codetables">
    <xsl:copy>
      <!-- Copy the attributes from the main codetable file codetables tag including the schema -->
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="@*|*">
    <xsl:copy-of select="."/>
  </xsl:template>

  <!-- Need to test for displaynames element not existing in the mainfile but existing in the merge
       file. If it exists in the merge file, then copy the details over. -->

  <xsl:template name="new_displaynames">
    <xsl:param name="this-codetable"/>
    <xsl:if test="not(displaynames) and $mergefile//codetables/codetable[@name = $this-codetable/@name]/displaynames">
      <xsl:copy-of select="$mergefile//codetables/codetable[@name = $this-codetable/@name]/displaynames"/>
    </xsl:if>
  </xsl:template>

  <xsl:template match="codetable" name="codetable">
    <!-- Copy the codetable tag and its attributes in the main file. -->
    <xsl:copy>
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates select="displaynames">
        <xsl:with-param name="this-codetable" select="."/>
      </xsl:apply-templates>
      <xsl:call-template name="new_displaynames">
         <xsl:with-param name="this-codetable" select="."/>
      </xsl:call-template>
      <xsl:apply-templates select="codetabledata">
        <xsl:with-param name="this-codetable" select="."/>
      </xsl:apply-templates>
       <xsl:call-template name="new_codetabledata">
        <xsl:with-param name="this-codetable" select="."/>
      </xsl:call-template>
      <xsl:apply-templates select="code">
        <xsl:with-param name="this-codetable" select="."/>
      </xsl:apply-templates>
      <xsl:call-template name="new_code">
        <xsl:with-param name="this-codetable" select="."/>
      </xsl:call-template>
    </xsl:copy>
  </xsl:template>


 <!-- Copy the display names elements from the main file. -->
  <xsl:template match="displaynames">
    <xsl:param name="this-codetable"/>

    <xsl:copy>
      <xsl:apply-templates select="name|locale"/>
      <xsl:call-template name="new_name">
        <xsl:with-param name="this-codetable" select="$this-codetable"/>
        <xsl:with-param name="this-displayname" select="."/>
      </xsl:call-template>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="name">
    <xsl:copy-of select = "."/>
  </xsl:template>

  <!-- Search for new names within the mergefile and copy to the mainfile if they dont already
       exist. -->

  <xsl:template name="new_name">
    <xsl:param name="this-codetable"/>
    <xsl:param name="this-displayname"/>

    <!-- iterate through each name element and select if the language attribute is not equal to
         the language attribute in the mainfile OR if the language attributes are equal, then the
         country attribute must be present and not equal. -->

    <xsl:for-each select="$mergefile//codetables/codetable[@name = $this-codetable/@name]/displaynames/name[(not(@language = $this-codetable/displaynames/name/@language)) or ((@language = $this-codetable/displaynames/name/@language) and (not(@country = $this-codetable/displaynames/name/@country) and (@country)))]
        | $mergefile//codetables/codetable[@name = $this-codetable/@name]/displaynames/locale[(not(@language = $this-codetable/displaynames/locale/@language)) or ((@language = $this-codetable/displaynames/locale/@language) and (not(@country = $this-codetable/displaynames/locale/@country) and (@country)))]">
      <xsl:copy-of select="."/>

    </xsl:for-each>
  </xsl:template>


  <xsl:template match="code">
    <xsl:param name="this-codetable"/>
    <xsl:variable name="this-code" select="." />

    <xsl:copy>
      <xsl:copy-of select="@*"/>

      <!-- Add every locale in a code from the main file. -->
      <xsl:for-each select="$this-code/locale">
        <xsl:copy-of select="."/>
      </xsl:for-each>

      <!-- Search for codes in the merge file of the same name, in the same codetable,
           and add any new locale entries that exist in them, only if the locale does not exist
           already in the main file. -->
      <xsl:for-each select="$mergefile//codetables/codetable[@name = $this-codetable/@name]/code[@value = $this-code/@value]/locale">
        <!-- Test to see if the locale is not already in the main file -->
        <xsl:if test="not($this-code/locale[((@language = current()/@language)
            and ((not(@country) and not(current()/@country)) or
                 (not(@country) and current()/@country='') or
                 (@country='' and not(current()/@country)) or
                 (@country = current()/@country)))])">
          <xsl:copy-of select="."/>
        </xsl:if>
      </xsl:for-each>

    </xsl:copy>
  </xsl:template>

  <!-- Search for new codes in the merge file and add them. -->
  <xsl:template name="new_code">
    <!-- Pass in the codetable in which the new code will be added -->
    <xsl:param name="this-codetable"/>

    <xsl:for-each select="$mergefile//codetables/codetable[@name = $this-codetable/@name]/code[not(@value = $this-codetable/code/@value)]">
      <xsl:copy>
        <!-- Only copy the default attribute if there isn't already a default attribute of true
             in the codetable or if the default is false -->
        <xsl:if test="((current()[@default = 'true'])
                         and (not($this-codetable/code[@default = 'true'])))
                       or (current()[@default = 'false'])">
          <xsl:copy-of select="@default"/>
        </xsl:if>

        <xsl:copy-of select="@java_identifier"/>
        <xsl:copy-of select="@status"/>
        <xsl:copy-of select="@value"/>
        <xsl:copy-of select="@removed"/>
        <xsl:copy-of select="@parent_code"/>

        <xsl:for-each select="./locale">
          <xsl:copy-of select="."/>
        </xsl:for-each>
      </xsl:copy>
    </xsl:for-each>
  </xsl:template>

  <!-- This gets executed if the main file has codetabledata element. -->

  <xsl:template match="codetabledata">
    <xsl:param name="this-codetable"/>
    <xsl:variable name="this-codetabledata" select="." />
    <xsl:copy>
    <!-- Add every locale in a codetabledata from the main file. -->
      <xsl:for-each select="$this-codetabledata/locale">
        <xsl:copy-of select="."/>
      </xsl:for-each>
      <!-- Search for new locales in the merge file,
           and add any new locale entries that exist in them, only if the locale does not exist
           already in the main file. -->
      <xsl:for-each select="$mergefile//codetables/codetable[@name = $this-codetable/@name]/codetabledata/locale">
        <!-- Test to see if the locale is not already in the main file -->
        <xsl:if test="not($this-codetabledata/locale[((@language = current()/@language)
          and ((not(@country) and not(current()/@country)) or (@country = current()/@country)))])">
          <xsl:copy-of select="."/>
        </xsl:if>
      </xsl:for-each>

    </xsl:copy>
  </xsl:template>

  <!-- Need to test for codetabledata element not existing in the mainfile but existing in the merge
       file. If it exists in the merge file, then copy the details over. -->

  <xsl:template name="new_codetabledata">
    <xsl:param name="this-codetable"/>
    <xsl:if test="not(codetabledata) and $mergefile//codetables/codetable[@name = $this-codetable/@name]/codetabledata">
      <xsl:copy-of select="$mergefile//codetables/codetable[@name = $this-codetable/@name]/codetabledata"/>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
