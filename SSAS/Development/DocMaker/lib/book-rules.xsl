<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2003-2005 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://exslt.org/strings">

  <!--
  The UTF-8 encoding must be used here, as the parser will fail if a
  character outside of the character set is output to the text file. This
  would not be a problem if the output were XML instead of text, as the
  parser would output the character using an XML entity.
  -->
  <xsl:output method="text" indent="no" omit-xml-declaration="yes"
              encoding="UTF-8" />

  <xsl:include href="validate.xsl" />

  <!--
  NOTE: Many checks are not performed here as they are automatically
  provided by a validating parser and the DTD. It is only where the
  DTD differs from the Curam style guidelines that a check is required.
  Comments below include "(DTD)" when the specified child element is
  automatically checked.

  To add checks, write a matching template with the "rules" mode. Generic
  templates handle the traversal of the node tree. Utility templates can be
  called to handle most types of checks and reporting.
  -->

  <!--
  Sets of element names that MUST be present as children of a specific
  element.
  -->
  <xsl:variable name="book-required-children"
                select="str:split('bookinfo,chapter', ',')" />
  <xsl:variable name="bookinfo-required-children"
                select="str:split('copyright,legalnotice,productname', ',')" />
  <xsl:variable name="tgroup-required-children"
                select="str:split('colspec,thead,tbody', ',')" />
  <xsl:variable name="thead-required-children"
                select="str:split('row', ',')" />

  <!--
  Sets of element names that are the ONLY allowed children of a specific
  element.
  -->
  <xsl:variable name="chapter-valid-children"
                select="str:split('title,section', ',')" />
  <xsl:variable name="section-valid-children"
                select="str:split('title,para,formalpara,variablelist,
                                   itemizedlist,orderedlist,programlisting,
                                   informalfigure,figure,informalexample,
                                   example,informaltable,table,blockquote,
                                   section,important,note,tip,warning,remark',
                                   ',')" />
  <xsl:variable name="table-valid-children"
                select="str:split('blockinfo,title,tgroup', ',')" />

  <!--
  Sets of element names that are NOT allowed as children of a specific
  element.
  -->
  <xsl:variable name="para-invalid-children"
                select="str:split('variablelist,itemizedlist,orderedlist,
                                   programlisting,informalfigure,figure,
                                   informalexample,example,informaltable,table,
                                   blockquote,section', ',')" />
  <xsl:variable name="tgroup-invalid-children"
                select="str:split('spanspec,tfoot', ',')" />
  <xsl:variable name="thead-invalid-children"
                select="str:split('colspec', ',')" />

  <!--
  The book must have a bookinfo, title (DTD), and one or more chapters.
  -->
  <xsl:template match="book" mode="rules">

    <xsl:call-template name="report-missing-children">
      <xsl:with-param name="names" select="$book-required-children" />
    </xsl:call-template>

  </xsl:template>

  <!--
  The bookinfo must contain a copyright, a productname, and a legalnotice.
  -->
  <xsl:template match="bookinfo" mode="rules">

    <xsl:call-template name="report-missing-children">
      <xsl:with-param name="names" select="$bookinfo-required-children" />
    </xsl:call-template>

  </xsl:template>

  <!--
  A chapter must contain only a title (DTD) and sections. Free para or
  other elements are not allowed nor are numbered sectN elements.
  -->
  <xsl:template match="chapter" mode="rules">

    <xsl:call-template name="report-illegal-children">
      <xsl:with-param name="valid-names" select="$chapter-valid-children" />
    </xsl:call-template>

  </xsl:template>

  <!--
  A section must have a title (DTD) and may contain a limited list of
  element types.
  -->
  <xsl:template match="section" mode="rules">

    <xsl:call-template name="report-illegal-children">
      <xsl:with-param name="valid-names" select="$section-valid-children" />
    </xsl:call-template>

  </xsl:template>

  <!--
  A para or formalpara must not contain block elements other than a para.
  A formalpara can contain a para, but a para cannot (DTD).
  -->
  <xsl:template match="para|formalpara" mode="rules">

    <xsl:call-template name="report-illegal-children">
      <xsl:with-param name="invalid-names" select="$para-invalid-children" />
    </xsl:call-template>

  </xsl:template>

  <!--
  A list should have more than one item, otherwise it is redundant. However,
  it may be because it is used to standardise presentation of related
  items where some lists are longer and other shorter, so only "orderedlist"
  elements will be tested, as these should not be used this way. 
  -->
  <xsl:template match="orderedlist" mode="rules">

    <xsl:if test="count(listitem) &lt; 2">
      <xsl:call-template name="report-error">
        <xsl:with-param name="message"
                        select="'List should have more than one item.'" />
      </xsl:call-template>
    </xsl:if>

  </xsl:template>

  <!--
  A link elements that have body content must contain descendant text nodes
  that contain more than just whitespace characters.

  An olink with a type of "topicname" (applied during the cross-reference
  resolution stage) must contain descendant text nodes to specify the link
  text, as no link text will be generated.

  A link element is used to replace an olink element in the original text where
  that olink had body content and was not a "topicname" olink. These link
  elements must be checked for some text content but are reported as if they
  were "olink" elements. There is a special case in the "context" string
  generation routines that support this.
  -->
  <xsl:template match="olink | ulink | link" mode="rules">

    <xsl:variable name="text-content">
      <xsl:for-each select="descendant::text()">
        <xsl:value-of select="normalize-space(.)" />
      </xsl:for-each>
    </xsl:variable>

    <xsl:if test="descendant::text() and $text-content = ''">
      <xsl:call-template name="report-error">
        <xsl:with-param name="message"
          select="concat('The body content of a ulink or olink must include ',
                         'some link text.')" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="self::olink and @type = 'topicname'">
      <xsl:if test="not(descendant::text()) or $text-content = ''">
        <xsl:call-template name="report-error">
          <xsl:with-param name="message"
              select="'An external olink must include the link text.'" />
        </xsl:call-template>
      </xsl:if>
    </xsl:if>

  </xsl:template>

  <!--
  A table must have a title (DTD) and only one tgroup (DTD allows one or
  more). Tables in books with a role of "user" must have an abstract
  containing the table summary for accessibility.
  -->
  <xsl:template match="table|informaltable" mode="rules">

    <xsl:if test="not(count(tgroup) = 1)">
      <xsl:call-template name="report-error">
        <xsl:with-param name="message"
                        select="'There is more than one tgroup.'" />
      </xsl:call-template>
    </xsl:if>

    <xsl:call-template name="report-illegal-children">
      <xsl:with-param name="valid-names" select="$table-valid-children" />
    </xsl:call-template>

    <!--
    User guides must have table summaries.
    -->
    <xsl:if test="/book/@role = 'user' and count(blockinfo/abstract) = 0">
      <xsl:call-template name="report-error">
        <xsl:with-param name="message"
            select="'The table summary (blockinfo/abstract) is missing.'" />
      </xsl:call-template>
    </xsl:if>

  </xsl:template>

  <!--
  A tgroup must have a thead and a tbody (DTD). There must be one or more
  colspec elements. The spanspec and tfoot elements are not supported.
  -->
  <xsl:template match="tgroup" mode="rules">

    <xsl:call-template name="report-missing-children">
      <xsl:with-param name="names" select="$tgroup-required-children" />
    </xsl:call-template>

    <xsl:call-template name="report-illegal-children">
      <xsl:with-param name="invalid-names" select="$tgroup-invalid-children" />
    </xsl:call-template>

  </xsl:template>

  <!--
  There should be exactly one row in the thead. For each entry in the
  thead row, there should be a matching colspec sibling unless the table
  contains spans. Spans are identified by finding entry elements that have
  a namest attribute set. The colspec element is not allowed in the thead.
  -->
  <xsl:template match="thead" mode="rules">

    <xsl:if test="not(count(row) = 1)">
      <xsl:call-template name="report-error">
        <xsl:with-param name="message"
            select="'There must be one row in the table header.'" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="not(count(row[1]/entry) = count(../colspec))">
      <!--
      Test for spans that allow the colspec and entry counts to differ
      -->
      <xsl:if test="count(row[1]/entry[@namest and @namest != '']) = 0">
        <xsl:call-template name="report-error">
          <xsl:with-param name="message"
              select="concat('The number of colspec elements (',
                             count(../colspec),
                             ') does not match the number of columns (',
                             count(row[1]/entry) , ').')" />
        </xsl:call-template>
      </xsl:if>
    </xsl:if>

    <xsl:call-template name="report-missing-children">
      <xsl:with-param name="names" select="$thead-required-children" />
    </xsl:call-template>

    <xsl:call-template name="report-illegal-children">
      <xsl:with-param name="invalid-names" select="$thead-invalid-children" />
    </xsl:call-template>

  </xsl:template>

  <!--
  Simple checking of text strings for obvious problems.
  -->
  <xsl:template match="text()" mode="rules">

    <!--
    The maximum number of characters in a line in a program listing is 66.
    -->
    <xsl:if test="ancestor::programlisting">
      <xsl:call-template name="report-long-lines">
        <xsl:with-param name="string" select="." />
        <xsl:with-param name="max-length" select="66" />
      </xsl:call-template>
    </xsl:if>

  </xsl:template>

  <!--
  The colwidth attribute of the colspec element must use proportional
  notation.
  -->
  <xsl:template match="colspec/@colwidth" mode="rules">

    <!--
    Check the format is correct. It should be "n*", where "n" is an integer.
    If all digits are removed using "translate()", only "*" should be left.
    The "*" must be at the end.
    -->
    <xsl:if test="not(substring(., string-length()) = '*'
                      and translate(., '0123456789', '') = '*')">
      <xsl:call-template name="report-error">
        <xsl:with-param name="message"
          select="concat('The column width (', ., ') is not proportional.')" />
      </xsl:call-template>
    </xsl:if>

  </xsl:template>

  <!--
  In a user guide, a mediaobject containing an image must have a short and
  long description for accessibility.
  -->
  <xsl:template match="mediaobject[imageobject]" mode="rules">

    <xsl:if test="/book/@role = 'user'">
      <xsl:if test="count(textobject[@role = 'alt']) = 0">
        <xsl:call-template name="report-error">
          <xsl:with-param name="message"
            select="'The image is missing its &quot;alt text&quot;.'" />
        </xsl:call-template>
      </xsl:if>
      <xsl:if test="count(textobject[@role = 'desc']) = 0">
        <xsl:call-template name="report-error">
          <xsl:with-param name="message"
            select="'The image is missing its long description.'" />
        </xsl:call-template>
      </xsl:if>
    </xsl:if>

  </xsl:template>

  <!--
  A "title" element must not be empty. A child element is accepted as content,
  though it is not checked to see if it has any text content (perhaps the
  content will be generated).
  -->
  <xsl:template match="title" mode="rules">
    <xsl:if test="not(*)">
      <!-- Flatten and normalize child text nodes. -->
      <xsl:variable name="content">
        <xsl:for-each select="text()">
          <xsl:value-of select="normalize-space(.)" />
        </xsl:for-each>
      </xsl:variable>

      <xsl:if test="not($content) or $content = ''">
        <xsl:call-template name="report-error">
          <xsl:with-param name="message" select="'The title is empty.'" />
        </xsl:call-template>
      </xsl:if>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
