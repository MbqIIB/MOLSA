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
                xmlns:fo="http://www.w3.org/1999/XSL/Format"
                version="1.0">

  <!--
  Import the DocBook XSL stylesheets and the customized parameters common
  to all output formats.
  -->
  <xsl:import href="../../docbook-xsl/fo/docbook.xsl"/>
  <xsl:import href="../common/param.xsl"/>
  <xsl:import href="../common/perform.xsl"/>
  <xsl:import href="../common/common.xsl" />

  <!--
  Import the customized title page templates. This file must be generated
  from the "title-pages.xml" file before applying this stylesheet. Some of
  the templates are further overridden, so this import must appear before
  all of the customizations below.
  -->
  <xsl:import href="title-pages.xsl"/>

  <!--
  Import the file defining the colour values for the presentation.
  -->
  <xsl:import href="colour.xsl"/>

  <!--
  Import other customizations. The file names used are the same as those in
  the original stylesheets that contained the content that is overridden,
  though extra content may have been added, parameters set, etc. The rest of
  this file contains miscellaneous customizations that either do not
  correspond to content in an original stylesheet, do not warrant the
  creation of a new file, or are logically related and better kept together.
  -->
  <xsl:import href="autotoc.xsl"/>
  <xsl:import href="component.xsl"/>
  <xsl:import href="coverpage.xsl"/>
  <xsl:import href="footnote.xsl"/>
  <xsl:import href="formal.xsl"/>
  <xsl:import href="inline.xsl"/>
  <xsl:import href="pagesetup.xsl"/>
  <xsl:import href="sections.xsl"/>
  <xsl:import href="table.xsl"/>
  <xsl:import href="titlepage.xsl"/>
  <xsl:import href="xref.xsl"/>

  <!--
  Set the output method and encoding to use for the XSLFO file. Indentation
  is turned off, as extra whitespace can affect the formatting adversly.
  -->
  <xsl:output encoding="UTF-8" method="xml" indent="no" />

  <!--
  Set various miscellaneous options.
  -->
  <xsl:param name="fop.extensions" select="1"/>
  <xsl:param name="variablelist.as.blocks" select="1"/>
  <xsl:param name="ignore.image.scaling" select="0"/>

  <!--
  Set the body font master size (many other fonts are calculated
  relative to this one.) Set up the font families for use in titles and
  in the body text.
  -->
  <xsl:param name="body.font.master" select="12"/>

  <xsl:param name="body.fontset"
             select="'TimesNewRoman,Times-Roman,serif'" />

  <xsl:param name="title.fontset"
             select="'TrebuchetMS,ArialNarrow,sans-serif'" />

  <!--
  Customized templates for generated text (titles, xrefs, etc.).
  Numbering formats have the "." after the number removed.
  X-ref titles have no quotes.
  -->
  <xsl:param name="local.l10n.xml" select="document('../common/l10n.xml')"/>

  <!--
  Set up the formatting and font size in program listings.
  -->
  <xsl:attribute-set name="verbatim.properties">
    <xsl:attribute name="space-before.minimum">6pt</xsl:attribute>
    <xsl:attribute name="space-before.optimum">6pt</xsl:attribute>
    <xsl:attribute name="space-before.maximum">6pt</xsl:attribute>
    <xsl:attribute name="space-after.minimum">0pt</xsl:attribute>
    <xsl:attribute name="space-after.optimum">0pt</xsl:attribute>
    <xsl:attribute name="space-after.maximum">0pt</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="monospace.verbatim.properties"
      use-attribute-sets="verbatim.properties">
    <xsl:attribute name="text-align">start</xsl:attribute>
    <xsl:attribute name="font-size">9pt</xsl:attribute>
    <xsl:attribute name="border-top-width">4pt</xsl:attribute>
    <xsl:attribute name="border-bottom-width">4pt</xsl:attribute>
    <xsl:attribute name="border-left-width">4pt</xsl:attribute>
    <xsl:attribute name="border-right-width">4pt</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="shade.verbatim.style">
    <xsl:attribute name="background-color">
      <xsl:value-of select="$alt.colour.light" />
    </xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="sidebar.properties"
                     use-attribute-sets="formal.object.properties">
    <xsl:attribute name="border-style">solid</xsl:attribute>
    <xsl:attribute name="border-width">0.2pt</xsl:attribute>
    <xsl:attribute name="border-color">
      <xsl:value-of select="$alt.colour.dark" />
    </xsl:attribute>
    <xsl:attribute name="background-color">
      <xsl:value-of select="$alt.colour.light" />
    </xsl:attribute>
    <xsl:attribute name="padding-left">12pt</xsl:attribute>
    <xsl:attribute name="padding-right">12pt</xsl:attribute>
    <xsl:attribute name="padding-top">6pt</xsl:attribute>
    <xsl:attribute name="padding-bottom">6pt</xsl:attribute>
  </xsl:attribute-set>

  <xsl:template match="sidebar/title" mode="sidebar.title.mode">
    <fo:block font-family="{$title.fontset}">
      <xsl:apply-templates />
    </fo:block>
  </xsl:template>

  <!--
  Use higher resolution graphics for admonitions in the PDF files.
  -->
  <xsl:param name="admon.graphics.extension" select="'-big.gif'"/>

  <xsl:template name="admon.graphic.width">
    <xsl:param name="node" select="."/>
    <xsl:text>20pt</xsl:text>
  </xsl:template>

  <xsl:attribute-set name="admonition.title.properties">
    <xsl:attribute name="font-size">
      <xsl:value-of select="concat($body.font.master, 'pt')" />
    </xsl:attribute>
    <xsl:attribute name="font-family">
      <xsl:value-of select="$title.fontset" />
    </xsl:attribute>
    <xsl:attribute name="font-weight">bold</xsl:attribute>
    <xsl:attribute name="hyphenate">false</xsl:attribute>
    <xsl:attribute name="keep-with-next.within-column">always</xsl:attribute>
  </xsl:attribute-set>

  <!--
  Set the monospace font size for inline elements. It looks better when it is
  one point smaller than the other text.
  <xsl:attribute-set name="monospace.properties">
    <xsl:attribute name="font-size">from-parent(font-size) - 1pt</xsl:attribute>
  </xsl:attribute-set>
  -->

  <!--
  Properties for paragraph spacing.
  -->
  <xsl:attribute-set name="normal.para.spacing">
    <xsl:attribute name="space-after.optimum">0pt</xsl:attribute>
    <xsl:attribute name="space-after.minimum">0pt</xsl:attribute>
    <xsl:attribute name="space-after.maximum">0pt</xsl:attribute>
    <xsl:attribute name="space-before.optimum">6pt</xsl:attribute>
    <xsl:attribute name="space-before.minimum">6pt</xsl:attribute>
    <xsl:attribute name="space-before.maximum">6pt</xsl:attribute>
  </xsl:attribute-set>

  <!--
  Special spacing properties occasionally used for the first paragraph
  in a sequence (e.g., within tables, etc.)
  -->
  <xsl:attribute-set name="first.para.spacing">
    <xsl:attribute name="space-after.optimum">0pt</xsl:attribute>
    <xsl:attribute name="space-after.minimum">0pt</xsl:attribute>
    <xsl:attribute name="space-after.maximum">0pt</xsl:attribute>
    <xsl:attribute name="space-before.optimum">0pt</xsl:attribute>
    <xsl:attribute name="space-before.minimum">0pt</xsl:attribute>
    <xsl:attribute name="space-before.maximum">0pt</xsl:attribute>
  </xsl:attribute-set>

  <!--
  Customise the spacing of lists and list items.
  -->
  <xsl:attribute-set name="list.block.spacing"
                     use-attribute-sets="normal.para.spacing"/>

  <xsl:attribute-set name="list.item.spacing">
    <xsl:attribute name="space-after.optimum">4pt</xsl:attribute>
    <xsl:attribute name="space-after.minimum">4pt</xsl:attribute>
    <xsl:attribute name="space-after.maximum">4pt</xsl:attribute>
    <xsl:attribute name="space-before.optimum">4pt</xsl:attribute>
    <xsl:attribute name="space-before.minimum">4pt</xsl:attribute>
    <xsl:attribute name="space-before.maximum">4pt</xsl:attribute>
  </xsl:attribute-set>

  <!--
  Set the properties of titles on formal objects (tables, examples,
  figures, formal paragraphs, etc.)
  -->
  <xsl:attribute-set name="formal.title.properties">
    <xsl:attribute name="font-weight">bold</xsl:attribute>
    <xsl:attribute name="font-family">
      <xsl:value-of select="$title.fontset" />
    </xsl:attribute>
    <xsl:attribute name="font-size">
      <xsl:value-of select="concat($body.font.master, 'pt')"/>
    </xsl:attribute>
    <xsl:attribute name="text-align">start</xsl:attribute>
    <xsl:attribute name="hyphenate">false</xsl:attribute>
    <xsl:attribute name="space-after.optimum">0pt</xsl:attribute>
    <xsl:attribute name="space-after.minimum">0pt</xsl:attribute>
    <xsl:attribute name="space-after.maximum">0pt</xsl:attribute>
    <xsl:attribute name="space-before.optimum">6pt</xsl:attribute>
    <xsl:attribute name="space-before.minimum">6pt</xsl:attribute>
    <xsl:attribute name="space-before.maximum">6pt</xsl:attribute>
    <!--
    Do not indent table titles, as tables are not indented to ensure that
    they have room.
    -->
    <xsl:attribute name="start-indent">
      <xsl:choose>
        <xsl:when test="self::table">
          <xsl:text>0mm</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>from-parent(start-indent)</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="informal.object.properties">
    <xsl:attribute name="space-after.optimum">6pt</xsl:attribute>
    <xsl:attribute name="space-after.minimum">6pt</xsl:attribute>
    <xsl:attribute name="space-after.maximum">6pt</xsl:attribute>
    <xsl:attribute name="space-before.optimum">8pt</xsl:attribute>
    <xsl:attribute name="space-before.minimum">8pt</xsl:attribute>
    <xsl:attribute name="space-before.maximum">8pt</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="formal.object.properties"
                     use-attribute-sets="informal.object.properties">
    <xsl:attribute name="keep-together.within-column">always</xsl:attribute>
  </xsl:attribute-set>

  <!--
  Overridden to "help" FOP calculate the left margin. FOP does not do
  the proper calculation relative to the parent, so this must be done
  explicitly.
  -->
  <xsl:template match="varlistentry" mode="vl.as.blocks">
    <xsl:variable name="id">
      <xsl:call-template name="object.id"/>
    </xsl:variable>

    <fo:block id="{$id}"
        xsl:use-attribute-sets="list.item.spacing"  
        keep-together.within-column="always" 
        keep-with-next.within-column="always"
        font-weight="bold">
      <xsl:apply-templates select="term"/>
    </fo:block>

    <!--
    1.7em works out to be the same as the itemized and ordered list indents.
    -->
    <fo:block margin-left="from-parent(start-indent) + 1.7em">
      <xsl:apply-templates select="listitem"/>
    </fo:block>
  </xsl:template>

  <!--
  Component titles are the chapter and appendix titles that appear on the
  title pages for those components. The template is changed to split the
  titles over two lines.
  -->
  <xsl:template name="component.title">
    <xsl:param name="node" select="."/>
    <xsl:param name="pagewide" select="0"/>

    <xsl:variable name="id">
      <xsl:call-template name="object.id">
        <xsl:with-param name="object" select="$node"/>
      </xsl:call-template>
    </xsl:variable>

    <!--
    Use the xref-number template to get "Chapter 1", "Appendix F", etc.
    -->
    <xsl:variable name="label.template">
      <xsl:call-template name="gentext.template">
        <xsl:with-param name="context" select="'xref-number'" />
        <xsl:with-param name="name">
          <xsl:call-template name="xpath.location">
            <xsl:with-param name="node" select="$node" />
          </xsl:call-template>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>

    <!--
    Change the context to the component node as the context node is the
    title element.
    -->
    <xsl:variable name="label">
      <xsl:for-each select="$node">
        <xsl:call-template name="substitute-markup">
          <xsl:with-param name="allow-anchors" select="1" />
          <xsl:with-param name="template" select="$label.template" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:variable>

    <xsl:variable name="title">
      <xsl:apply-templates select="$node" mode="title.markup" />
    </xsl:variable>

    <fo:block keep-with-next.within-column="always"
              space-before.optimum="{$body.font.master}pt"
              space-before.minimum="{$body.font.master * 0.8}pt"
              space-before.maximum="{$body.font.master * 1.2}pt"
              hyphenate="false">
      <xsl:if test="$pagewide != 0">
        <!-- Doesn't work to use 'all' here since not a child of fo:flow -->
        <xsl:attribute name="span">inherit</xsl:attribute>
      </xsl:if>
      <xsl:attribute name="hyphenation-character">
        <xsl:call-template name="gentext">
          <xsl:with-param name="key" select="'hyphenation-character'"/>
        </xsl:call-template>
      </xsl:attribute>
      <xsl:attribute name="hyphenation-push-character-count">
        <xsl:call-template name="gentext">
          <xsl:with-param name="key"
                          select="'hyphenation-push-character-count'"/>
        </xsl:call-template>
      </xsl:attribute>
      <xsl:attribute name="hyphenation-remain-character-count">
        <xsl:call-template name="gentext">
          <xsl:with-param name="key"
                          select="'hyphenation-remain-character-count'"/>
        </xsl:call-template>
      </xsl:attribute>
      <xsl:copy-of select="$label" />
      <fo:block font-size="20pt" color="black" space-before="20pt">
        <xsl:copy-of select="$title"/>
      </fo:block>
    </fo:block>
  </xsl:template>

  <!--
  Add support for informal.object.properties for examples, figures, etc.
  -->
  <xsl:template name="informal.object">
    <xsl:variable name="id">
      <xsl:call-template name="object.id"/>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="self::equation">
        <fo:block id="{$id}"
                  xsl:use-attribute-sets="equation.properties">
          <xsl:apply-templates/>
        </fo:block>
      </xsl:when>
      <xsl:when test="self::procedure">
        <fo:block id="{$id}"
                  xsl:use-attribute-sets="procedure.properties">
          <xsl:apply-templates/>
        </fo:block>
      </xsl:when>
      <xsl:otherwise>
        <fo:block id="{$id}"
                  xsl:use-attribute-sets="informal.object.properties">
          <xsl:apply-templates/>
        </fo:block>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Control the formatting of book, chapter, appendix, and front matter
  title blocks.
  -->
  <xsl:attribute-set name="component.title.properties">
    <xsl:attribute name="color">
      <xsl:value-of select="$alt.colour.dark" />
    </xsl:attribute>
    <xsl:attribute name="font-family">
      <xsl:value-of select="$title.fontset" />
    </xsl:attribute>
    <xsl:attribute name="font-style">normal</xsl:attribute>
    <xsl:attribute name="font-weight">normal</xsl:attribute>
    <xsl:attribute name="space-after">60pt</xsl:attribute>
    <xsl:attribute name="padding-before">25pt</xsl:attribute>
    <xsl:attribute name="padding-after">25pt</xsl:attribute>
    <xsl:attribute name="text-align">right</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="chapter.titlepage.recto.style"
                     use-attribute-sets="component.title.properties">
    <xsl:attribute name="font-size">30pt</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="appendix.titlepage.recto.style"
                     use-attribute-sets="chapter.titlepage.recto.style"/>

  <xsl:attribute-set name="front.matter.title.properties"
                     use-attribute-sets="component.title.properties">
    <xsl:attribute name="font-size">30pt</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="table.of.contents.titlepage.recto.style"
                     use-attribute-sets="front.matter.title.properties" />

  <xsl:attribute-set name="list.of.tables.titlepage.recto.style"
                     use-attribute-sets="front.matter.title.properties" />

  <xsl:attribute-set name="list.of.examples.titlepage.recto.style"
                     use-attribute-sets="front.matter.title.properties" />

  <xsl:attribute-set name="list.of.figures.titlepage.recto.style"
                     use-attribute-sets="front.matter.title.properties" />

  <!--
  Changed to place the copyright symbol first.
  -->
  <xsl:template match="copyright" mode="titlepage.mode">
    <xsl:call-template name="dingbat">
      <xsl:with-param name="dingbat">copyright</xsl:with-param>
    </xsl:call-template>
    <xsl:call-template name="gentext.space"/>
    <xsl:call-template name="gentext">
      <xsl:with-param name="key" select="'Copyright'"/>
    </xsl:call-template>
    <xsl:call-template name="gentext.space"/>
    <xsl:call-template name="copyright.years">
      <xsl:with-param name="years" select="year"/>
      <xsl:with-param name="print.ranges" select="$make.year.ranges"/>
      <xsl:with-param name="single.year.ranges"
                      select="$make.single.year.ranges"/>
    </xsl:call-template>
    <xsl:call-template name="gentext.space"/>
    <xsl:apply-templates select="holder" mode="titlepage.mode"/>
  </xsl:template>

</xsl:stylesheet>
