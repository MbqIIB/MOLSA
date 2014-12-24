<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2004 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:exslt="http://exslt.org/common"
                xmlns:str="http://exslt.org/strings"
                xmlns:redirect="org.apache.xalan.xslt.extensions.Redirect"
                extension-element-prefixes="exslt str redirect">

  <xsl:output indent="yes" encoding="ISO-8859-1" method="xml"
              doctype-public="-//OASIS//DTD DocBook XML V4.2//EN"
              doctype-system="http://docbook.org/xml/4.2/docbookx.dtd" />

  <xsl:include href="xref-path.xsl"/>
  <xsl:include href="normalizer.xsl"/>

  <xsl:variable name="token" select="'__dm_xref__'"/>

  <!--
  Restructures the output XML from FrameMaker to integrate components
  from different files.
  -->
  
  <!--
  Recursive copy of all nodes and attributes by default. Specific templates
  are used to process or strip content as required.
  -->
  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
    </xsl:copy>
  </xsl:template>

  <!--
  Convert "Id" attributes to lower-case.
  -->
  <xsl:template match="@Id">
    <xsl:attribute name="id">
      <xsl:value-of select="." />
    </xsl:attribute>
  </xsl:template>

  <!--
  Convert "Idref" attributes to lower-case.
  -->
  <xsl:template match="@Idref">
    <xsl:attribute name="idref">
      <xsl:value-of select="." />
    </xsl:attribute>
  </xsl:template>

  <!--
  Override attributes cannot be avoided sometimes, for example, a paragraph
  where the whole content was marked with the "CodeElement" character format.
  If an element has an override attribute, but that element only contains
  a single child element and empty text nodes, then drop the override,
  otherwise a warning is reported and the attribute is preserved. These
  will have to be removed manually to avoid DTD validation errors later,
  however, there may implied information about the content that should not
  be discarded lightly.
  -->
  <xsl:template match="@override">

    <!-- Get the normalised concatenation of immediate child nodes. -->
    <xsl:variable name="text">
      <xsl:for-each select="text()">
        <xsl:value-of select="normalize-space(.)" />
      </xsl:for-each>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="count(../*) = 1 and $text and $text = ''">
        <!--
        Drop the attribute. There is only one child element and no text
        other than whitespace.
        -->
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy />
        <xsl:message terminate="no">
          <xsl:text></xsl:text>
          <xsl:value-of select="concat('WARNING: Format override detected. ',
                                       'The text is: ',
                                       '&lt;', local-name(..), '&gt;',
                                       ..,
                                       '&lt;/', local-name(..), '&gt;')"/>
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!--
  Flatten the "dm-part" elements.
  -->
  <xsl:template match="dm-part">
    <xsl:apply-templates select="node()"/>
  </xsl:template>

  <!--
  Ignore "dm-sub-part" elements at the book level, otherwise flatten them.
  -->
  <xsl:template match="dm-sub-part">
    <xsl:if test="not(parent::book)">
      <xsl:apply-templates select="node()" />
    </xsl:if>
  </xsl:template>

  <!--
  Special handling is required for dm-sub-part elements as they contain
  sections that must be merged into a chapter or appendix.
  represents sections that must be added to the previous chapter or appendix
  (possibly nested in a dm-part). Here, when the last section is reached,
  more sections may be inserted from following sub-parts. The need to
  relocate the title element is respected.
  -->
  <xsl:template match="section">
    <xsl:copy>
      <xsl:apply-templates select="@* | title"/>
      <xsl:apply-templates select="node()[not(self::title)]"/>
    </xsl:copy>

    <!--
    If this is the last top-level section in the last chapter or appendix in
    a dm-part, or in a chapter or appendix not in a dm-part, then if there
    are dm-sub-part elements following the chapter or appendix, or following
    the dm-part that contains them, the belong in this chapter or appendix.
    Also, if this the last section in a dm-sub-part, it may need to be merged
    with sections in following dm-sub-part elements.
    -->
    <xsl:if test="(parent::chapter or parent::appendix or parent::dm-sub-part)
                  and position() = last()">
      <xsl:choose>
        <xsl:when test="ancestor::dm-part">
          <xsl:apply-templates
              select="ancestor::dm-part
                      /following-sibling::*[position() = 1
                                            and self::dm-sub-part]/section" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates
              select="parent::*
                      /following-sibling::*[position() = 1
                                            and self::dm-sub-part]/section" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>

  <!--
  If a title contains a "dm-cross-ref-marker", then add a temporary
  attribute to the title element indicating this. The attribute value will
  be the flattened text content of the title element. This text will be
  used as a key when cross-references are being resolved. These references
  will likely be to sections, tables, examples, and figures. Table titles
  have to be renamed, so a new "title" element is created. Extra modes
  are used to handle titles that do not contain cross-reference markers.
  The "blockinfo" is used for table summaries and must not be included
  within the title. If the "blockinfo" has an "Id" attribute, however, it
  must be relocated to the table title element. (The "dm-cross-ref-marker"
  element is removed by another template). Similarly, the "Id" attribute
  of a "dm-bad-figure" must be relocated to its "title" element. The
  "textobject" element is used for image "alt" and description text and
  must not be included.
  -->
  <xsl:template match="title[dm-cross-ref-marker]">
    <xsl:apply-templates select="." mode="referenced-title" />
  </xsl:template>

  <xsl:template match="title | dm-table-title"
                mode="referenced-title">
    <title>
      <xsl:attribute name="dm-title">
        <xsl:variable name="flat-title">
          <xsl:for-each select="descendant::text()">
            <xsl:copy />
          </xsl:for-each>
        </xsl:variable>
        <xsl:value-of select="normalize-space($flat-title)" />
      </xsl:attribute>
      <xsl:apply-templates select="@* | descendant::blockinfo/@Id
                                   | parent::dm-bad-figure/@Id" />
      <xsl:apply-templates select="node()[not(self::blockinfo
                                              or self::textobject)]" />
    </title>
  </xsl:template>

  <xsl:template match="title | dm-table-title"
                mode="unreferenced-title">
    <title>
      <xsl:apply-templates select="@* | descendant::blockinfo/@Id
                                   | parent::dm-bad-figure/@Id" />
      <xsl:apply-templates select="node()[not(self::blockinfo
                                              or self::textobject)]" />
    </title>
  </xsl:template>

  <!--
  For elements that contain title elements, make sure that the title is
  output first. Sections are handled separately and books are already okay.
  The dm-bad-figure is excluded as it handles its own title too. Note: be
  careful if adding templates for elements with titles as this template will
  probably match them instead; you must add the element to the exclusions.
  -->
  <xsl:template match="*[title and not(self::book
                                       or self::section
                                       or self::dm-bad-figure)]">
    <xsl:copy>
      <xsl:apply-templates select="@* | title"/>
      <xsl:apply-templates select="node()[not(self::title)]"/>
    </xsl:copy>
  </xsl:template>

  <!--
  Remove redundant elements, attributes, etc. created while structuring.
  -->
  <xsl:template match="dm-programlisting-end" />
  <xsl:template match="dm-cross-ref-marker" />
  <xsl:template match="dm-hypertext" />
  <xsl:template match="titleabbrev" />
  <xsl:template match="processing-instruction()" />
  <xsl:template match="comment()" />

  <!--
  Convert topic markers to processing instructions. The format for the
  instructions is <?dbhh topicname="MyTopic"?>, etc.
  -->
  <xsl:template match="dm-topic-alias">
    <xsl:processing-instruction name="dbhh">
      <xsl:value-of select="concat('topicname=&quot;', @text, '&quot;')" />
    </xsl:processing-instruction>
  </xsl:template>

  <!--
  Check that the strange "z-Top of Form" paragraphs are empty and do not
  copy them to the output.
  -->
  <xsl:template match="para[@role = 'dm-top-of-form']">
    <xsl:if test="text() and not(normalize-space(text()) = '')">
      <xsl:message terminate="yes">
        <xsl:value-of select="concat('ERROR: Spurious text found: ',
                                     text())" />
      </xsl:message>
    </xsl:if>
  </xsl:template>

  <!--
  Create the references to the image files. This assumes the image is in GIF
  format and this may need to be fixed manually if it is incorrect. It is not
  possible to determine the actual format.
  -->
  <xsl:template match="imagedata">

    <xsl:variable name="file-root">
      <xsl:apply-templates select="ancestor::chapter/title"
                           mode="normalize-text" />
    </xsl:variable>

    <xsl:copy>
      <xsl:attribute name="fileref">
        <xsl:text>images/</xsl:text>
        <xsl:value-of select="normalize-space($file-root)"/>
        <xsl:text>-</xsl:text>
        <xsl:value-of select="substring-after(@entity, 'imagedata')"/>
        <xsl:text>.gif</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="format">
        <xsl:text>GIF</xsl:text>
      </xsl:attribute>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>

  </xsl:template>

  <!--
  Attempt to fix broken images. These are images that are in paragraphs
  there were not marked "Figure" but were followed by a "FigureTitle"
  paragraph or were anchored in the "FigureTitle" paragraph itself. The
  title was marked "dm-bad-figure". Here, the "imageobject" is dropped
  from its current position. This will not handle images anchors that are
  within further mark-up within a the paragraph. The "note" element may
  also contain an imageobject that can be safely dropped.
  -->
  <xsl:template match="imageobject">

    <xsl:choose>
      <xsl:when test="parent::mediaobject">
        <!-- Probably a good image. Allow it through. -->
        <xsl:copy>
          <xsl:apply-templates select="@* | node()" />
        </xsl:copy>
      </xsl:when>
      <xsl:when test="ancestor::note and ancestor::title">
        <!--
        Drop images in note titles. These are just icons that will be
        rendered automatically from now on. They may be marked-up with
        other elements, so "ancestor" is used in preference to "parent".
        -->
      </xsl:when>
      <xsl:when test="ancestor::dm-bad-figure">
        <!-- Drop the image from the dm-bad-figure. -->
      </xsl:when>
      <xsl:when test="../following-sibling::*[position() = 1
                                              and self::dm-bad-figure]">
        <!--
        Drop the image from the para and let the dm-bad-figure template
        fix it.
        -->
      </xsl:when>
      <xsl:otherwise>
        <xsl:message terminate="yes">
          <xsl:value-of select="concat('ERROR: Illegal image placement: ',
                                       '&lt;', local-name(),
                                       '&gt;(imagedata entity &quot;',
                                       imagedata/@entity, '&quot;)&lt;/',
                                       local-name(), '&gt;')" />
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!--
  The textobject element holds the "alt" or long description text for an
  image and should be located in the figure title. It will be stripped by
  default, but added back in the correct place using the appropriate
  mode.
  -->
  <xsl:template match="textobject" />

  <xsl:template match="textobject" mode="relocate">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
    </xsl:copy>
  </xsl:template>

  <xsl:template match="figure/mediaobject">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
      <xsl:apply-templates
          select="following-sibling::title/descendant::textobject"
          mode="relocate" />
    </xsl:copy>
  </xsl:template>

  <!--
  Convert the marker text to plain text for these elements.
  -->
  <xsl:template match="dm-image-alt-text | dm-image-long-desc-text">
    <xsl:value-of select="@text" />
  </xsl:template>

  <!--
  A special template to process imageobject elements when creating proper
  figure elements from dm-bad-figure elements. They are normally stripped
  from dm-bad-figure elements to support the easy processing of the title
  element that may contain them.
  -->
  <xsl:template match="imageobject" mode="bad-figure">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
    </xsl:copy>
  </xsl:template>

  <!--
  There are two possibilities catered for here: either the image is in the
  previous element (probably a "para"), or it is in the "dm-bad-figure" element
  (the original title paragraph). Either way, a new "figure" is created and
  the "dm-bad-figure" element becomes the "title" element for that figure.
  -->
  <xsl:template match="dm-bad-figure">

    <figure>
      <xsl:apply-templates select="title" />
      <mediaobject>
        <xsl:choose>
          <xsl:when test="descendant::imageobject">
            <xsl:apply-templates
                select="descendant::imageobject"
                mode="bad-figure" />
          </xsl:when>
          <xsl:when test="preceding-sibling::*[1]//imageobject">
            <xsl:apply-templates
                select="preceding-sibling::*[1]//imageobject"
                mode="bad-figure" />
          </xsl:when>
          <xsl:otherwise>
            <xsl:message terminate="yes">
              <xsl:value-of select="concat('ERROR: Illegal image title: ',
                                           '&lt;', local-name(), '&gt;', .,
                                           '&lt;/', local-name(), '&gt;')" />
            </xsl:message>
          </xsl:otherwise>
        </xsl:choose>
        <!-- Add the image text. -->
        <xsl:apply-templates select="descendant::textobject"
                             mode="relocate" />
      </mediaobject>
    </figure>
    
  </xsl:template>

  <!--
  If a formalpara has no para child, then convert it to a para containing
  all children of its title element.
  -->
  <xsl:template match="formalpara[title and not(para)]">
    <para>
      <xsl:apply-templates select="title/node()" />
    </para>
  </xsl:template>

  <!--
  If a footnote appears inside inline markup, move it outside the end of
  the inline element. Inline elements are emphasis, literal, filename,
  interface, and systemitem. If inline elements are further nested in
  others, then this will not be enough and a manual fix is required. It
  would not be safe to move the footnote too far without knowing the
  context.
  -->
  <xsl:template match="emphasis[footnote] | literal[footnote]
                       | filename[footnote] | interface[footnote]
                       | systemitem[footnote]">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()[not(self::footnote)]" />
    </xsl:copy>
    <xsl:apply-templates select="footnote" />
  </xsl:template>

  <!--
  If a footnote does not contain any para, then put its content into a "para".
  This can happen to footnotes within tables.
  -->
  <xsl:template match="footnote">

    <xsl:choose>
      <xsl:when test="not(para)">
        <xsl:copy>
          <xsl:apply-templates select="@*" />
          <para>
            <xsl:apply-templates select="node()" />
          </para>
        </xsl:copy>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy>
          <xsl:apply-templates select="@* | node()" />
        </xsl:copy>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!--
  Demote the thead and tbody into a tgroup within a table. Add the cols
  attribute. The "blockinfo" contains the summary and is usually found in
  the table title element; it must be relocated.
  -->
  <xsl:template match="table">

    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates select="dm-table-title/blockinfo" />
      <xsl:choose>
        <xsl:when test="dm-table-title/dm-cross-ref-marker">
          <xsl:apply-templates select="dm-table-title"
                               mode="referenced-title" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates select="dm-table-title"
                               mode="unreferenced-title" />
        </xsl:otherwise>
      </xsl:choose>
      <tgroup cols="{@dm-cols}">
        <xsl:apply-templates select="str:split(@dm-colwidths, ' ')"/>
        <xsl:apply-templates select="thead"/>
        <xsl:apply-templates select="tbody"/>
      </tgroup>
    </xsl:copy>

  </xsl:template>

  <!--
  Handle the token elements from the "str:split" in the table template.
  -->
  <xsl:template match="token">
    <colspec colwidth="{text()}" colnum="{position()}" />
  </xsl:template>

  <!--
  Fix the table summaries by restructuring the "abstract".
  -->
  <xsl:template match="abstract[@type = 'TableSummary']">
    <abstract>
      <para>
        <xsl:value-of select="@text" />
      </para>
    </abstract>
  </xsl:template>

  <!--
  Strip the "Id" attribute off blockinfo element. This attribute is renamed
  and moved to the table title by applying the generic "Id" attribute template
  at that point, so it cannot be stripped by just matching it without
  affecting that process. Stripping all attributes here is safe.
  -->
  <xsl:template match="blockinfo">
    <xsl:copy>
      <xsl:apply-templates select="node()" />
    </xsl:copy>
  </xsl:template>

  <!--
  Report errors if illegal element are found.
  -->
  <xsl:template match="ILLEGAL_FORMATTING
                       | ILLEGAL_PARAGRAPH_FORMAT
                       | ILLEGAL_CHARACTER_FORMAT
                       | ILLEGAL_TABLE_FORMAT
                       | ILLEGAL_CROSS_REF_FORMAT">
    <xsl:message terminate="yes">
      <xsl:value-of select="concat('ERROR: Illegal formatting: ',
                                   '&lt;', local-name(), '&gt;', .,
                                   '&lt;/', local-name(), '&gt;')" />
    </xsl:message>
  </xsl:template>

  <xsl:template match="UNSUPPORTED_CROSS_REF_FORMAT">
    <xsl:message terminate="yes">
      <xsl:value-of
          select="concat('ERROR: Unsupported cross-reference format: ',
                         @format, '. Use a supported format instead.')" />
    </xsl:message>
  </xsl:template>

  <xsl:template match="UNSUPPORTED_MARKER_TYPE">
    <xsl:message terminate="no">
      <xsl:value-of select="concat('ERROR: Unsupported marker type: ',
                                   '&lt;', local-name(), '&gt;', .,
                                   '&lt;/', local-name(), '&gt;')" />
    </xsl:message>
  </xsl:template>

</xsl:stylesheet>
