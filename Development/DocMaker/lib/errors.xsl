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
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:exslt="http://exslt.org/common"
                xmlns:xalan="http://xml.apache.org/xslt"
                extension-element-prefixes="exslt">

  <xsl:output indent="yes" method="xml" xalan:indent-amount="2"
              encoding="ISO-8859-1" />
  <xsl:strip-space elements="*" />

  <!--
  Creates a skeleton chapter for error messages from a Java 1.5-style
  XML properties file.
  -->
  <xsl:template match="properties">
    <chapter>
      <title><xsl:text>Error Messages</xsl:text></title>
      <xsl:apply-templates select="entry">
        <xsl:sort data-type="number" order="descending" select="@key" />
      </xsl:apply-templates>
    </chapter>
  </xsl:template>

  <!--
  Creates a skeleton section for an error message.
  -->
  <xsl:template match="entry">
    <section>
      <title><errorcode><xsl:value-of select="@key" /></errorcode></title>

      <section>
        <title>
          <xsl:text>Message</xsl:text>
        </title>
        <para>
          <errortext>
            <xsl:apply-templates select="text()" mode="error-text" />
          </errortext>
        </para>
        <xsl:if test="contains(text(), '%')">
          <para>
            <xsl:text>Message place-holders:</xsl:text>
          </para>
          <variablelist>
            <xsl:apply-templates select="text()" mode="place-holder" />
          </variablelist>
        </xsl:if>
      </section>

      <section>
        <title>
          <xsl:text>Description</xsl:text>
        </title>
        <para>
          <xsl:text>Description of the error.</xsl:text>
        </para>
      </section>

      <section>
        <title>
          <xsl:text>Resolution</xsl:text>
        </title>
        <para>
          <xsl:text>How to resolve the error.</xsl:text>
        </para>
      </section>

    </section>  

  </xsl:template>

  <!--
  Wraps "%ns", where "n" is a number, in <replaceable>
  -->
  <xsl:template match="text()" mode="error-text">

    <xsl:choose>
      <xsl:when test="contains(., '%')">
        <xsl:value-of select="substring-before(., '%')" />
        <replaceable>
          <xsl:value-of
              select="concat('%',
                             substring-before(substring-after(., '%'), 's'),
                             's')" />
        </replaceable>
        <xsl:apply-templates
            select="exslt:node-set(substring-after(substring-after(., '%'),
                                                   's'))"
            mode="error-text" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="." />
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!--
  Generates a <varlistentry> for each "%ns" place-holder in the text.
  -->
  <xsl:template match="text()" mode="place-holder">

    <xsl:if test="contains(., '%')">
      <varlistentry>
        <term>
          <xsl:value-of
              select="concat('%',
                             substring-before(substring-after(., '%'), 's'),
                             's')" />        
        </term>
        <listitem>
          <para>
            <xsl:text>Description of the place-holder.</xsl:text>
          </para>
        </listitem>
      </varlistentry>
      <xsl:apply-templates
          select="exslt:node-set(substring-after(substring-after(., '%'), 's'))"
          mode="place-holder" />
    </xsl:if>

  </xsl:template>

</xsl:stylesheet>
