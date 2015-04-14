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
                version="1.0">

  <!--
  Set the paper size. This can be changed to "Letter" if required, but there
  may need to be some adjustment made to other margin sizes, etc. elsewhere
  in this file in that case. Also, the cover page layout settings will need
  to be changed.
  -->
  <xsl:param name="paper.type" select="'A4'"/>

  <!--
  Set the page margins.
  -->
  <xsl:param name="page.margin.top" select="'17mm'"/>

  <xsl:param name="page.margin.bottom" select="'11mm'"/>

  <xsl:param name="page.margin.inner">
    <xsl:choose>
      <xsl:when test="$double.sided != 0">33mm</xsl:when>
      <xsl:otherwise>25mm</xsl:otherwise>
    </xsl:choose>
  </xsl:param>

  <xsl:param name="page.margin.outer">
    <xsl:choose>
      <xsl:when test="$double.sided != 0">17mm</xsl:when>
      <xsl:otherwise>25mm</xsl:otherwise>
    </xsl:choose>
  </xsl:param>

  <!--
  Set the gap between the body and the page margins.
  -->
  <xsl:param name="body.margin.top" select="'18mm'"/>
 
  <xsl:param name="body.margin.bottom" select="'19mm'"/>

  <!--
  Add hanging indent to section titles. This is used both for the major page
  layout setting here and when rendering the actual section titles elsewhere.
  -->
  <xsl:param name="title.margin.left" select="'-30mm'" />

  <!--
  Set the size of the header and footer regions. These fit into the
  body margin spaces.
  -->
  <xsl:param name="region.before.extent" select="'16mm'"/>

  <xsl:param name="region.after.extent" select="'9mm'"/>

  <!--
  General header and footer configuration.
  -->
  <xsl:param name="footers.on.blank.pages" select="0"/>
  <xsl:param name="headers.on.blank.pages" select="0"/>

  <!--
  Page header layout.
  -->
  <xsl:attribute-set name="header.content.properties">
    <xsl:attribute name="font-family">
      <xsl:value-of select="$title.fontset"/>
    </xsl:attribute>
    <xsl:attribute name="margin-left">0mm</xsl:attribute>
    <xsl:attribute name="font-size">12pt</xsl:attribute>
    <xsl:attribute name="color">black</xsl:attribute>
  </xsl:attribute-set>

  <!--
  Customized to use a list block and include the logo. Headers are not
  shown on "first" pages (e.g., book title pages, chapter title pages, etc.)
  -->
  <xsl:template name="header.table">
    <xsl:param name="pageclass" select="''"/>
    <xsl:param name="sequence" select="''"/>
    <xsl:param name="gentext-key" select="''"/>
  
    <xsl:variable name="candidate">
      <fo:list-block>
        <fo:list-item>
          <fo:list-item-label>
            <fo:block>
            </fo:block>
          </fo:list-item-label>
          <fo:list-item-body start-indent="3.2mm - {$title.margin.left}">
            <fo:block padding-before="5pt" padding-after="3pt"
                      text-align="end">
              <xsl:choose>
                <xsl:when test="/book/titleabbrev and /book/titleabbrev != ''">
                  <xsl:apply-templates select="/book/titleabbrev"
                                       mode="header.mode"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:apply-templates select="/book/title"
                                       mode="header.mode"/>
                </xsl:otherwise>
              </xsl:choose>
            </fo:block>
          </fo:list-item-body>
        </fo:list-item>
      </fo:list-block>
    </xsl:variable>
  
    <!-- Really output a header? -->
    <xsl:choose>
      <xsl:when test="$sequence = 'first' or $pageclass = 'custom-titlepage'">
        <!--
        Title pages or the first page in a sequence will have no header.
        -->
      </xsl:when>
      <xsl:when test="$sequence = 'blank' and $headers.on.blank.pages = 0">
        <!-- no output -->
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="$candidate"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="book/title" mode="header.mode">
    <xsl:apply-templates />
  </xsl:template>

  <xsl:template match="book/titleabbrev" mode="header.mode">
    <xsl:apply-templates />
  </xsl:template>

  <!--
  Page footer layout.
  -->
  <xsl:attribute-set name="footer.content.properties"
                     use-attribute-sets="header.content.properties" />

  <!--
  Customized to use a simple block instead of a table. This also allows
  the line to be drawn to the full width of the page.
  -->
  <xsl:template name="footer.table">
    <xsl:param name="pageclass" select="''"/>
    <xsl:param name="sequence" select="''"/>
    <xsl:param name="gentext-key" select="''"/>

    <xsl:variable name="candidate">
      <fo:block padding-before="5pt" text-align="right">
        <fo:page-number />
      </fo:block>
    </xsl:variable>

    <!-- Really output a footer? -->
    <!-- pageclass can be custom-titlepage, custom-lot, custom-body -->
    <!-- sequence can be odd, even, first, blank -->
    <xsl:choose>
      <xsl:when test="$pageclass = 'custom-titlepage'">
        <!-- no, the book titlepage sequence has no footers. -->
      </xsl:when>
      <xsl:when test="$sequence = 'blank' and $footers.on.blank.pages = 0">
        <!-- no output -->
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="$candidate"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Set up a new page master and page sequence for the cover page, etc.
  The "list-of-..." pages do not have the same left margin in the
  region-body as the rest of the book.
  -->
  <xsl:template name="user.pagemasters">

    <fo:simple-page-master master-name="custom-titlepage-first"
        page-width="{$page.width}" page-height="{$page.height}"
        margin-top="5mm" margin-bottom="5mm"
        margin-left="5mm" margin-right="5mm">
      <fo:region-body margin-top="0mm" margin-bottom="0mm"
                      margin-left="0mm" margin-right="0mm" />
    </fo:simple-page-master>

    <fo:simple-page-master master-name="custom-titlepage-odd"
        page-width="{$page.width}" page-height="{$page.height}"
        margin-top="{$page.margin.top}" margin-bottom="{$page.margin.bottom}"
        margin-left="{$page.margin.inner}" margin-right="{$page.margin.outer}">
      <fo:region-body
          margin-left="-{$title.margin.left}"
          margin-bottom="{$body.margin.bottom}" margin-top="{$body.margin.top}"
          column-gap="{$column.gap.titlepage}"
          column-count="{$column.count.titlepage}">
      </fo:region-body>
      <fo:region-before region-name="xsl-region-before-odd"
          extent="{$region.before.extent}" display-align="before"/>
      <fo:region-after region-name="xsl-region-after-odd"
          extent="{$region.after.extent}" display-align="after"/>
    </fo:simple-page-master>

    <fo:simple-page-master master-name="custom-titlepage-even"
        page-width="{$page.width}" page-height="{$page.height}"
        margin-top="{$page.margin.top}" margin-bottom="{$page.margin.bottom}"
        margin-right="{$page.margin.inner}" margin-left="{$page.margin.outer}">
      <fo:region-body
          margin-left="-{$title.margin.left}"
          margin-bottom="{$body.margin.bottom}" margin-top="{$body.margin.top}"
          column-gap="{$column.gap.titlepage}"
          column-count="{$column.count.titlepage}">
      </fo:region-body>
      <fo:region-before region-name="xsl-region-before-even"
          extent="{$region.before.extent}" display-align="before"/>
      <fo:region-after region-name="xsl-region-after-even"
          extent="{$region.after.extent}" display-align="after"/>
    </fo:simple-page-master>
 
    <fo:simple-page-master master-name="custom-lot-first"
        page-width="{$page.width}" page-height="{$page.height}"
        margin-top="{$page.margin.top}" margin-bottom="{$page.margin.bottom}"
        margin-left="{$page.margin.inner}" margin-right="{$page.margin.outer}">
      <fo:region-body
          margin-bottom="{$body.margin.bottom}" margin-top="{$body.margin.top}"
          column-gap="{$column.gap.lot}" column-count="{$column.count.lot}">
      </fo:region-body>
      <fo:region-before region-name="xsl-region-before-first"
          extent="{$region.before.extent}" display-align="before"/>
      <fo:region-after region-name="xsl-region-after-first"
          extent="{$region.after.extent}" display-align="after"/>
    </fo:simple-page-master>

    <fo:simple-page-master master-name="custom-lot-odd"
        page-width="{$page.width}" page-height="{$page.height}"
        margin-top="{$page.margin.top}" margin-bottom="{$page.margin.bottom}"
        margin-left="{$page.margin.inner}" margin-right="{$page.margin.outer}">
      <fo:region-body
          margin-bottom="{$body.margin.bottom}" margin-top="{$body.margin.top}"
          column-gap="{$column.gap.lot}" column-count="{$column.count.lot}">
      </fo:region-body>
      <fo:region-before region-name="xsl-region-before-odd"
          extent="{$region.before.extent}" display-align="before"/>
      <fo:region-after region-name="xsl-region-after-odd"
          extent="{$region.after.extent}" display-align="after"/>
    </fo:simple-page-master>

    <fo:simple-page-master master-name="custom-lot-even"
        page-width="{$page.width}" page-height="{$page.height}"
        margin-top="{$page.margin.top}" margin-bottom="{$page.margin.bottom}"
        margin-right="{$page.margin.inner}" margin-left="{$page.margin.outer}">
      <fo:region-body
          margin-bottom="{$body.margin.bottom}" margin-top="{$body.margin.top}"
          column-gap="{$column.gap.lot}" column-count="{$column.count.lot}">
      </fo:region-body>
      <fo:region-before region-name="xsl-region-before-even"
          extent="{$region.before.extent}" display-align="before"/>
      <fo:region-after region-name="xsl-region-after-even"
          extent="{$region.after.extent}" display-align="after"/>
    </fo:simple-page-master>

    <fo:simple-page-master master-name="custom-body-first"
        page-width="{$page.width}" page-height="{$page.height}"
        margin-top="{$page.margin.top}" margin-bottom="{$page.margin.bottom}"
        margin-left="{$page.margin.inner}" margin-right="{$page.margin.outer}">
      <fo:region-body
          margin-left="-{$title.margin.left}"
          margin-bottom="{$body.margin.bottom}" margin-top="{$body.margin.top}"
          column-gap="{$column.gap.body}" column-count="{$column.count.body}">
      </fo:region-body>
      <fo:region-before region-name="xsl-region-before-first"
          extent="{$region.before.extent}" display-align="before"/>
      <fo:region-after region-name="xsl-region-after-first"
          extent="{$region.after.extent}" display-align="after"/>
    </fo:simple-page-master>

    <fo:simple-page-master master-name="custom-body-odd"
        page-width="{$page.width}" page-height="{$page.height}"
        margin-top="{$page.margin.top}" margin-bottom="{$page.margin.bottom}"
        margin-left="{$page.margin.inner}" margin-right="{$page.margin.outer}">
      <fo:region-body
          margin-left="-{$title.margin.left}"
          margin-bottom="{$body.margin.bottom}" margin-top="{$body.margin.top}"
          column-gap="{$column.gap.body}" column-count="{$column.count.body}">
      </fo:region-body>
      <fo:region-before region-name="xsl-region-before-odd"
          extent="{$region.before.extent}" display-align="before"/>
      <fo:region-after region-name="xsl-region-after-odd"
          extent="{$region.after.extent}" display-align="after"/>
    </fo:simple-page-master>

    <fo:simple-page-master master-name="custom-body-even"
        page-width="{$page.width}" page-height="{$page.height}"
        margin-top="{$page.margin.top}" margin-bottom="{$page.margin.bottom}"
        margin-right="{$page.margin.inner}" margin-left="{$page.margin.outer}">
      <fo:region-body
          margin-left="-{$title.margin.left}"
          margin-bottom="{$body.margin.bottom}" margin-top="{$body.margin.top}"
          column-gap="{$column.gap.body}" column-count="{$column.count.body}">
      </fo:region-body>
      <fo:region-before region-name="xsl-region-before-even"
          extent="{$region.before.extent}" display-align="before"/>
      <fo:region-after region-name="xsl-region-after-even"
          extent="{$region.after.extent}" display-align="after"/>
    </fo:simple-page-master>

    <fo:page-sequence-master master-name="custom-titlepage">
      <fo:repeatable-page-master-alternatives>
        <fo:conditional-page-master-reference
            master-reference="blank" blank-or-not-blank="blank"/>
        <fo:conditional-page-master-reference
            master-reference="custom-titlepage-first" page-position="first"/>
        <fo:conditional-page-master-reference
            master-reference="custom-titlepage-odd" odd-or-even="odd"/>
        <fo:conditional-page-master-reference
            master-reference="custom-titlepage-even" odd-or-even="even"/>
      </fo:repeatable-page-master-alternatives>
    </fo:page-sequence-master>

    <fo:page-sequence-master master-name="custom-lot">
      <fo:repeatable-page-master-alternatives>
        <fo:conditional-page-master-reference
            master-reference="blank" blank-or-not-blank="blank"/>
        <fo:conditional-page-master-reference
            master-reference="custom-lot-first" page-position="first"/>
        <fo:conditional-page-master-reference
            master-reference="custom-lot-odd" odd-or-even="odd"/>
        <fo:conditional-page-master-reference
            master-reference="custom-lot-even" odd-or-even="even"/>
      </fo:repeatable-page-master-alternatives>
    </fo:page-sequence-master>

    <fo:page-sequence-master master-name="custom-body">
      <fo:repeatable-page-master-alternatives>
        <fo:conditional-page-master-reference
            master-reference="blank" blank-or-not-blank="blank"/>
        <fo:conditional-page-master-reference
            master-reference="custom-body-first" page-position="first"/>
        <fo:conditional-page-master-reference
            master-reference="custom-body-odd" odd-or-even="odd"/>
        <fo:conditional-page-master-reference
            master-reference="custom-body-even" odd-or-even="even"/>
      </fo:repeatable-page-master-alternatives>
    </fo:page-sequence-master>

  </xsl:template>

  <xsl:template name="select.user.pagemaster">
    <xsl:param name="element"/>
    <xsl:param name="pageclass"/>
    <xsl:param name="default-pagemaster"/>

    <xsl:choose>
      <xsl:when test="$element = 'book' and $pageclass = 'titlepage'">
        <xsl:text>custom-titlepage</xsl:text>
      </xsl:when>
      <xsl:when test="$pageclass = 'lot'">
        <xsl:text>custom-lot</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>custom-body</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
