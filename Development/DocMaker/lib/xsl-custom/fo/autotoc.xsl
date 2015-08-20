<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2003-2004 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:fo="http://www.w3.org/1999/XSL/Format"
                xmlns:fox="http://xml.apache.org/fop/extensions"                
                version="1.0">

  <!--
  Only generate a TOC for a book and add the "Table of Contents" title
  to that TOC.
  -->
  <xsl:param name="generate.toc">
book      toc,title
</xsl:param>

  <!--
  For the PDF bookmark labels, the special handling used above to restrict
  the numbering of sections is also required.
  -->
  <xsl:template match="set|book|part|reference|preface|chapter|appendix|article
                       |glossary|bibliography|index|setindex
                       |refentry
                       |sect1|sect2|sect3|sect4|sect5|section"
                mode="fop.outline">

    <xsl:variable name="id">
      <xsl:call-template name="object.id"/>
    </xsl:variable>

    <xsl:variable name="bookmark-label">
      <xsl:choose>
        <xsl:when test="self::section and ../../self::section">
          <!--
          This section is too deeply nested within other sections to have a
          number. Only the first two section levels are numbered.
          -->
          <xsl:apply-templates select="." mode="title.markup" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates select="." mode="object.title.markup"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!-- Put the root element bookmark at the same level as its children -->
    <!-- If the object is a set or book, generate a bookmark for the toc -->

    <xsl:choose>
      <xsl:when test="parent::*">
        <fox:outline internal-destination="{$id}">
          <fox:label>
            <xsl:value-of
              select="normalize-space(
                          translate($bookmark-label, $a-dia, $a-asc))"/>
          </fox:label>
          <xsl:apply-templates select="*" mode="fop.outline"/>
        </fox:outline>
      </xsl:when>
      <xsl:otherwise>
        <fox:outline internal-destination="{$id}">
          <fox:label>
            <xsl:value-of
              select="normalize-space(
                          translate($bookmark-label, $a-dia, $a-asc))"/>
          </fox:label>
        </fox:outline>

        <xsl:variable name="toc.params">
          <xsl:call-template name="find.path.params">
            <xsl:with-param name="table"
                            select="normalize-space($generate.toc)"/>
          </xsl:call-template>
        </xsl:variable>

        <xsl:if test="contains($toc.params, 'toc')
                      and (book|part|reference|preface|chapter|appendix|article
                           |glossary|bibliography|index|setindex
                           |refentry
                           |sect1|sect2|sect3|sect4|sect5|section)">
          <fox:outline internal-destination="toc...{$id}">
            <fox:label>
              <xsl:call-template name="gentext">
                <xsl:with-param name="key" select="'TableofContents'"/>
              </xsl:call-template>
            </fox:label>
          </fox:outline>
        </xsl:if>
        <xsl:apply-templates select="*" mode="fop.outline"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Customise the TOC so that "Chapter" or "Appendix" appears and the numbers
  are in the alternative colour. The "last-line-end-indent" is removed because
  it does not work with FOP.
  -->
  <xsl:template name="toc.line">
    <xsl:variable name="id">
      <xsl:call-template name="object.id"/>
    </xsl:variable>

    <xsl:variable name="label">
      <xsl:apply-templates select="." mode="label.markup"/>
    </xsl:variable>

    <fo:block text-align-last="justify">
      <xsl:if test="self::chapter or self::appendix">
        <xsl:attribute name="space-before">10pt</xsl:attribute>
      </xsl:if>
      <fo:inline keep-with-next.within-line="always">
        <fo:basic-link internal-destination="{$id}">
          <xsl:if test="$label != ''">
            <fo:inline color="{$alt.colour.dark}">
              <xsl:choose>
                <xsl:when test="self::chapter">
                  <xsl:call-template name="gentext">
                    <xsl:with-param name="key" select="'Chapter'"/>
                  </xsl:call-template>
                  <xsl:call-template name="gentext.space" />
                </xsl:when>
                <xsl:when test="self::appendix">
                  <xsl:call-template name="gentext">
                    <xsl:with-param name="key" select="'Appendix'"/>
                  </xsl:call-template>
                  <xsl:call-template name="gentext.space" />
                </xsl:when>
              </xsl:choose>
              <xsl:copy-of select="$label"/>
              <xsl:value-of select="$autotoc.label.separator" />
            </fo:inline>
          </xsl:if>
          <xsl:apply-templates select="." mode="title.markup"/>
        </fo:basic-link>
      </fo:inline>
      <fo:inline keep-together.within-line="always">
        <xsl:text> </xsl:text>
        <fo:leader leader-pattern="dots"
                   leader-pattern-width="3pt"
                   leader-alignment="reference-area"
                   keep-with-next.within-line="always"/>
        <xsl:text> </xsl:text> 
        <fo:basic-link internal-destination="{$id}">
          <fo:page-number-citation ref-id="{$id}"/>
        </fo:basic-link>
      </fo:inline>
    </fo:block>
  </xsl:template>

</xsl:stylesheet>
