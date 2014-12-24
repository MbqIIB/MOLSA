<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2003-2004 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:exslt="http://exslt.org/common"
                xmlns:str="http://exslt.org/strings"
                xmlns:redirect="http://xml.apache.org/xalan/redirect"
                xmlns:xalan="http://xml.apache.org/xslt"
                extension-element-prefixes="exslt str redirect xalan">

  <xsl:output indent="yes" encoding="ISO-8859-1" method="xml"
              xalan:indent-amount="2"
              doctype-public="-//OASIS//DTD DocBook XML V4.2//EN"
              doctype-system="http://docbook.org/xml/4.2/docbookx.dtd" />

  <xsl:include href="xref-path.xsl"/>
  <xsl:include href="normalizer.xsl"/>

  <xsl:variable name="token" select="'__dm_xref__'"/>

  <!--
  Used as a handle to the original document.
  -->
  <xsl:variable name="book" select="/book"/>

  <!--
  The chapter number is calculated from the number of preceding chapters
  plus one. The same applies to appendices. These keys are used to resolve
  broken cross-references that occur across file boundaries.
  -->
  <xsl:key name="chapter" match="chapter"
    use="count(preceding-sibling::chapter) + 1" />

  <xsl:key name="chapter_section"
    match="section[title/@dm-title and ancestor::chapter]"
    use="concat(count(ancestor::chapter/preceding-sibling::chapter) + 1,
                '__', title/@dm-title)" />

  <xsl:key name="appendix" match="appendix"
    use="count(preceding-sibling::appendix) + 1" />

  <xsl:key name="appendix_section"
    match="section[title/@dm-title and ancestor::appendix]"
    use="concat(count(ancestor::appendix/preceding-sibling::appendix) + 1,
                '__', title/@dm-title)" />

  <!--
  An attempt will be made to resolve cross-references across file boundaries
  for elements that are not associated with a chapter or appendix. These
  elements are keyed on their title text (this was flattened and added as an
  attribute to the title element during the first pass). The paragraph numbers
  will be too difficult to decode and the chapter or appendix number cannot be
  included in the cross-reference text as there may be no "ChapterNumber" or
  "AppendixNumber" paragraph in the original file.
  -->
  <xsl:key name="section" match="section[title/@dm-title]"
           use="title/@dm-title" />

  <xsl:key name="table" match="table[title/@dm-title]"
           use="title/@dm-title" />

  <xsl:key name="figure" match="figure[title/@dm-title]"
           use="title/@dm-title" />

  <xsl:key name="example" match="example[title/@dm-title]"
           use="title/@dm-title" />

  <!--
  These keys are used to resolve cross-references within files when an
  "xref" element with a "linkend" attribute can be used to find targets
  by "id".
  -->
  <xsl:key name="chapter-xref-key" match="chapter" use="@id"/>
  <xsl:key name="appendix-xref-key" match="appendix" use="@id"/>
  <xsl:key name="chapter_section-xref-key" match="section" use="@id"/>
  <xsl:key name="appendix_section-xref-key" match="section" use="@id"/>
  <xsl:key name="section-xref-key" match="section" use="@id"/>
  <xsl:key name="example-xref-key" match="example" use="@id"/>
  <xsl:key name="figure-xref-key" match="figure" use="title/@id"/>
  <xsl:key name="table-xref-key" match="table" use="title/@id"/>

  <!--
  Generate the book file. A new file will be created for each chapter and
  appendix, the XInclude references are inserted into the book file.
  -->
  <xsl:template match="book">

    <xsl:copy>
      <xsl:copy-of select="title" />
      <xsl:copy-of select="bookinfo" />
      <xsl:apply-templates select="chapter | appendix" mode="xinclude" />
    </xsl:copy>

  </xsl:template>

  <!--
  Creates the XInclude reference and writes out the referenced file.
  -->
  <xsl:template match="chapter | appendix" mode="xinclude">

    <xsl:variable name="file-name">
      <xsl:call-template name="get-file-name" />
    </xsl:variable>
 
    <!-- Create the reference in the book element. -->
    <xsl:element name="xi:include"
                 namespace="http://www.w3.org/2003/XInclude">
      <xsl:attribute name="href">
        <xsl:value-of select="$file-name" />
      </xsl:attribute>
    </xsl:element>

    <!-- Generate a chapter or appendix file. -->
    <redirect:write file="{$file-name}">
      <xsl:apply-templates select="."/>
    </redirect:write>

  </xsl:template>

  <!--
  Gets the name of a file using the title of the context element and the
  first letter of the element name.
  -->
  <xsl:template name="get-file-name">
    <xsl:variable name="name">
      <xsl:apply-templates select="title" mode="normalize-text"/>
    </xsl:variable>
    <xsl:value-of select="concat(substring(local-name(), 1, 1), '_',
                                 normalize-space($name), '.xml')" />
  </xsl:template>

  <!--
  Recursive copy of all elements.
  -->
  <xsl:template match="*">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>

  <!--
  Strip most attributes, but keep some.
  -->
  <xsl:template match="@*" />

  <xsl:template match="@override
                       | phrase/@condition
                       | imagedata/@fileref
                       | imagedata/@format
                       | tgroup/@cols
                       | colspec/@colwidth
                       | colspec/@colnum
                       | abstract/@type">
    <xsl:copy />
  </xsl:template>

  <!--
  Preserve "dbhh" processing instructions.
  -->
  <xsl:template match="processing-instruction('dbhh')">
    <xsl:copy />
  </xsl:template>

  <!--
  For processing instructions inside "title" elements, move them outside
  the element.
  -->
  <xsl:template match="title[processing-instruction()]">
    <xsl:copy>
      <xsl:apply-templates select="@* | * | text()" />
    </xsl:copy>
    <xsl:apply-templates select="processing-instruction()" />
  </xsl:template>

  <!--
  Convert "xref" elements to "olink" elements and resolve the targets. The
  presence of an "xref" indicates that there should be an element with an
  "id" attribute matching the "linkend" attribute.
  -->
  <xsl:template match="xref">
    <xsl:if test="not(@role = 'section' or @role = 'example'
                      or @role = 'figure' or @role='table'
                      or @role = 'chapter' or @role='chapter_section'
                      or @role = 'appendix' or @role='appendix_section')">
      <xsl:message terminate="yes">
        <xsl:value-of select="concat('ERROR: Only local cross-references to ',
                                     'sections, listings, tables, figures ',
                                     'chapters, and appendices ',
                                     'are supported, but a &quot;',
                                     @role, '&quot; reference was found.')" />
      </xsl:message>
    </xsl:if>
    <xsl:variable name="key-name" select="concat(@role, '-xref-key')" />
    <xsl:variable name="target" select="key($key-name, @linkend)" />
    <xsl:choose>
      <xsl:when test="not($target)">
        <xsl:message terminate="yes">
          <xsl:value-of
              select="concat('ERROR: Cross-reference could not be ',
                             'resolved: id=&quot;', @linkend, '&quot;')" />
        </xsl:message>
      </xsl:when>
      <xsl:when test="count($target) &gt; 1">
        <xsl:message terminate="yes">
          <xsl:value-of
              select="concat('ERROR: Cross-reference has multiple ',
                             'targets: id=&quot;', @linkend, '&quot;')" />
        </xsl:message>
      </xsl:when>
      <xsl:otherwise>
        <xsl:variable name="id">
          <xsl:apply-templates select="$target" mode="xref-path"/>
        </xsl:variable>
        <xsl:if test="not($id) or $id = ''">
          <xsl:message terminate="yes">
            <xsl:value-of
                select="concat('ERROR: Cross-reference ID could not be ',
                               'created: id=&quot;', @linkend, '&quot;')" />
          </xsl:message>
        </xsl:if>
        <olink role="{@role}" targetptr="{$id}" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Resolve cross-references by calculating the ID value of the target. These
  textual references result from cross-references made to content in another
  file. Some, but not all, can be fixed automatically. The format of the text
  is "__dm_xref__<key-name>__<number>__<text>@@@", where the <key-name> is one
  of the non-ID-based keys defined above, the <number> is the chapter,
  appendix, or section number, and the <text> is the text of the paragraph
  if the target is a section. For "chapter" and "appendix" references, the
  "__<text>" is omitted. For "chapter_section" and "appendix_section"
  references, the number is the the chapter or appendix number. For "section"
  references, the number is the section number (or 'X' for unnumbered
  subsubsections); this section number is not used here but may be useful if
  a manual fix is required.
  -->
  <xsl:template match="text()">

    <xsl:variable name="key-name">
      <xsl:if test="contains(., $token)">
        <xsl:value-of select="substring-before(
                                substring-after(., $token),
                                '__')"/>
      </xsl:if>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$key-name = 'appendix_section'
                      or $key-name = 'appendix'
                      or $key-name = 'chapter_section'
                      or $key-name = 'chapter'
                      or $key-name = 'section'
                      or $key-name = 'example'
                      or $key-name = 'table'
                      or $key-name = 'figure'">

        <!-- Pass through any leading text. -->
        <xsl:value-of select="substring-before(., $token)"/>

        <!-- Get the text to use as the key for the look-up. -->
        <xsl:variable name="full-ref-text"
                select="normalize-space(
                            substring-before(
                                substring-after(., concat($token,
                                                          $key-name, '__')),
                                '@@@'))" />

        <!-- For some references, the number part is dropped. -->
        <xsl:variable name="ref-text">
          <xsl:choose>
            <xsl:when test="$key-name = 'section'
                            or $key-name = 'example'
                            or $key-name = 'table'
                            or $key-name = 'figure'">
              <xsl:value-of select="substring-after($full-ref-text, '__')" />
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$full-ref-text" />
            </xsl:otherwise>
          </xsl:choose>
        </xsl:variable>

        <!--
        Look-up possible targets for the reference. Because we can recurse
        into this template using the "exslt:node-set" function below, the
        key would not operate correctly after a recursion, as the "context
        document" would not be the full input document. Therefore, we need to
        switch the context back to the input document using the "for-each"
        loop with a single iteration. The extent of the "for-each" is needed
        to keep variables in scope for all the tests. A "book" variable must
        be used as "/book" would not be resolved during recursion, as it is in
        a different document.
        -->
        <xsl:for-each select="$book">
          <xsl:variable name="target" select="key($key-name, $ref-text)" />

          <xsl:choose>
            <xsl:when test="not($target)">
              <xsl:message terminate="yes">
                <xsl:value-of
                    select="concat('ERROR: Cross-reference could not be ',
                                   'resolved: &quot;', $token, $key-name, '__',
                                   $full-ref-text, '@@@&quot;')" />
              </xsl:message>
            </xsl:when>
            <xsl:when test="count($target) &gt; 1">
              <!--
              This may be common, so there is just a warning, and the text
              is passed through unchanged.
              -->
              <xsl:message>
                <xsl:value-of
                    select="concat('WARNING: Cross-reference has multiple ',
                                   'targets: &quot;', $token, $key-name, '__',
                                   $full-ref-text,
                                   '@@@&quot; Fix this later!')" />
              </xsl:message>
              <xsl:value-of select="concat($token, $key-name, '__',
                                           $full-ref-text, '@@@')" />
            </xsl:when>
            <xsl:otherwise>
              <xsl:variable name="id">
                <xsl:apply-templates select="$target" mode="xref-path"/>
              </xsl:variable>
              <xsl:if test="not($id) or $id = ''">
                <xsl:message terminate="yes">
                  <xsl:value-of
                      select="concat('ERROR: Cross-reference ID could not be ',
                                     'created: &quot;', $token, $key-name, '__',
                                     $full-ref-text, '@@@&quot;')" />
                </xsl:message>
              </xsl:if>
              <olink role="{$key-name}" targetptr="{$id}" />
            </xsl:otherwise>
          </xsl:choose>
        </xsl:for-each>

        <!-- Process the rest of the text node. -->
        <xsl:apply-templates
            select="exslt:node-set(substring-after(., '@@@'))" />
      </xsl:when>
      <xsl:when test="$key-name and not($key-name = '')">
        <xsl:message terminate="yes">
          <xsl:value-of select="concat('ERROR: Only remote cross-references ',
                                       'to chapters, appendices, sections, ',
                                       'tables, examples, and figures are ',
                                       'supported, but a &quot;', $key-name,
                                       '&quot; reference was found.')" />
        </xsl:message>
      </xsl:when>
      <xsl:otherwise>
        <!-- No cross-reference token found. -->
        <xsl:copy />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
