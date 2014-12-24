<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright  2004-2006 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <xsl:import href="../../docbook-xsl/html/docbook.xsl" />
  <xsl:import href="../../docbook-xsl/htmlhelp/htmlhelp-common.xsl" />
  <xsl:import href="../common/param.xsl" />
  <xsl:import href="../common/perform.xsl" />
  <xsl:import href="../common/common.xsl" />
  <xsl:import href="htmlhelp-common.xsl" />
  <xsl:import href="inline.xsl" />
  <xsl:import href="table.xsl" />

  <!--
  Import the customized title page templates. This file must be generated
  from the "titlepage.templates.xml" file before applying this stylesheet.
  -->
  <xsl:import href="titlepage.templates.xsl" />
  
  <!-- 
  PK: override docmaker setting for this param
  default value is what we're overriding
  -->
  
  <!--
  There are two files which contain text used during DocMaker builds:
  $DOCMAKER_HOME\lib\docbook-xsl\common\l10n.xml
  $DOCMAKER_HOME\lib\xsl-custom\common\l10n.xml
  
  The first is provided by DocBook and is loaded into a parameter called
  "l10n.xml" in $DOCMAKER_HOME\lib\docbook-xsl\common\l10n.xsl (line 18
  at time of writing).
  
  The second contains Curam specific text as well as overriding DocBook.
  It is loaded into a parameter called "local.l10n.xml" in this stylesheet. 
  
  For localization we don't want customers to update files in the DocMaker
  installation folder so overriding of the locations of these files is
  allowed through the following parameters. The default values given to 
  the parameters point to the DocMaker installation locations. Note that 
  the default value of "l10n.docbook.default" points to the same file 
  loaded into the "l10n.xml" parameter in 
  $DOCMAKER_HOME\lib\docbook-xsl\common\l10n.xsl
  -->
  
  <xsl:param name="l10n.docbook.default" 
             select="'../../docbook-xsl/common/l10n.xml'" />
  <xsl:param name="l10n.docbook.curam" 
             select="'../common/l10n.xml'" />
    
  <!-- 
  Override the "l10.xml" parameter defined in 
  $DOCMAKER_HOME\lib\docbook-xsl\common\l10n.xsl
  -->
  
  <xsl:param name="l10n.xml" select="document($l10n.docbook.default)"/>

  <!--
  Do not use an extra sub-directory for the generated HTML files as it
  will make referenced resources hard to handle. The default would have
  put then into a "files" sub-directory. To avoid a clash with the root
  frameset file in "index.html", the document index file is renamed to
  "book-index.html".
  -->
  <xsl:param name="base.dir" select="''" />
  <xsl:param name="root.filename" select="'book-index'" />

  <!--
  Miscellaneous settings.
  -->
  <xsl:param name="tablecolumns.extension" select="1" />
  <xsl:param name="chunk.quietly" select="1" />
  <xsl:param name="htmlhelp.use.hhk" select="1" />
  <xsl:param name="ignore.image.scaling" select="1" />
  <xsl:param name="admon.style" select="''" />
  <xsl:param name="html.stylesheet" select="'help-style.css'" />
  <xsl:param name="menuchoice.menu.separator" select="'&#8594;'" />
  <xsl:param name="chunker.output.encoding" select="'UTF-8'" />

  <!--
  Keeping first sections with chapter headings is slower, but looks better.
  The element IDs are used as the file names.
  -->
  <xsl:param name="chunk.first.sections" select="0" />
  <xsl:param name="use.id.as.filename" select="1"/>

  <!--
  This will be handled from CSS instead. This prevents the fixed colours
  being applied to the table cell that will hold the "pre" element.
  -->
  <xsl:param name="shade.verbatim" select="0" />

  <!-- Until SVG is converted during build.... -->
  <xsl:param name="use.embed.for.svg" select="1" />

  <!--
  Numbering is not used for chapters, sections, etc. in the HTML Help
  output and no tables of contents are included.
  -->
  <xsl:param name="part.autolabel" select="0" />
  <xsl:param name="chapter.autolabel" select="0" />
  <xsl:param name="appendix.autolabel" select="0" />
  <xsl:param name="section.autolabel" select="0" />
  <xsl:param name="section.label.includes.component.label" select="0" />

  <xsl:param name="generate.toc" select="''" />
  <xsl:param name="generate.index" select="0" />

  <!--
  Customized templates for generated text (titles, xrefs, etc.). Numbering
  formats have the "." after the number removed. Cross-reference titles have
  no quotes.
  -->
  
  <xsl:param name="local.l10n.xml" select="document($l10n.docbook.curam)" />
  
  <!--
  <xsl:param name="local.l10n.xml" select="document('../common/l10n.xml')"/>
  -->

  

  <!--
  There is no parameter to control auto-numbering of these elements, so this
  template must be overridden. This will cause the cross-references to use
  the localized "xref" formats instead of the "xref-number-and-title" or
  "xref-number" formats defined in "l10n.xml".
  -->
  <xsl:template match="figure | example | table | equation"
                mode="is.autonumber">
    <xsl:value-of select="'0'"/>
  </xsl:template>

  <!--
  By default, these elements will use the localized "title" format defined in
  "l10n.xml". That title format contains number for these elements, so this
  template overrides the default format and uses the "title-unnumbered"
  formats instead. This is more consistent with the behavior of chapters and
  sections, etc.
  -->
  <xsl:template match="figure | example | table | equation"
                mode="object.title.template">
    <xsl:call-template name="gentext.template">
      <xsl:with-param name="context" select="'title-unnumbered'"/>
      <xsl:with-param name="name">
        <xsl:call-template name="xpath.location"/>
      </xsl:with-param>
    </xsl:call-template>
  </xsl:template>

  <!--
  Make the title font italic in cross-references (this is already done by
  default for chapter and appendix titles).
  -->
  <xsl:template match="section | example | figure | table
                       | note | tip | important | warning
                       | variablelist | orderedlist | itemizedlist"
                mode="insert.title.markup">
    <xsl:param name="purpose"/>
    <xsl:param name="xrefstyle"/>
    <xsl:param name="title"/>

    <xsl:choose>
      <xsl:when test="$purpose = 'xref' and titleabbrev">
        <i>
          <xsl:apply-templates select="." mode="titleabbrev.markup"/>
        </i>
      </xsl:when>
      <xsl:when test="$purpose = 'xref'">
        <i>
          <xsl:copy-of select="$title"/>
        </i>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="$title"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Customized to remove the "clear: both" style on the section headings,
  because Internet Explorer does not restrict this to the containing box.
  This prevented the use of the "spacer" div to push the navigation footer
  off the end of the page to unclutter the presentation.
  -->
  <xsl:template name="section.heading">
    <xsl:param name="section" select="."/>
    <xsl:param name="level" select="1"/>
    <xsl:param name="allow-anchors" select="1"/>
    <xsl:param name="title"/>
    <xsl:param name="class" select="'title'"/>

    <xsl:variable name="id">
      <xsl:choose>
        <!-- if title is in an *info wrapper, get the grandparent -->
        <xsl:when test="contains(local-name(..), 'info')">
          <xsl:call-template name="object.id">
            <xsl:with-param name="object" select="../.."/>
          </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
          <xsl:call-template name="object.id">
            <xsl:with-param name="object" select=".."/>
          </xsl:call-template>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!-- HTML H level is one higher than section level -->
    <xsl:variable name="hlevel" select="$level + 1"/>
    <xsl:element name="h{$hlevel}">
      <xsl:attribute name="class">
        <xsl:value-of select="$class"/>
      </xsl:attribute>
      <xsl:if test="$allow-anchors != 0">
        <xsl:call-template name="anchor">
          <xsl:with-param name="node" select="$section"/>
          <xsl:with-param name="conditional" select="0"/>
        </xsl:call-template>
      </xsl:if>
      <xsl:copy-of select="$title"/>
    </xsl:element>
  </xsl:template>

  <!--
  Add the Curam copyright to the bottom of the pages.
  -->
  <xsl:template name="user.footer.content">
    <div class="footer">
      <!-- Hardcoded the new copyright for bluewash -->
      <p class="copyright">
        <xsl:call-template name="gentext">
          <xsl:with-param name="key" select="'IBMCopyright'"/>
        </xsl:call-template>
      </p>
    </div>
  </xsl:template>

  <!--
  Add the link to the JavaScript file.
  -->
  <xsl:template name="user.head.content">
    <script type="text/javascript" src="help-util.js" />
  </xsl:template>

  <!--
  Generate the frameset used to separate the applet from the content.
  -->
  <xsl:template match="/">
    <xsl:apply-imports />
    <xsl:call-template name="generate.help.frameset"/>
  </xsl:template>

  <xsl:template name="generate.help.frameset">
    <xsl:param name="underscore">_</xsl:param>
    <xsl:param name="dash">-</xsl:param>

    <xsl:variable name="frameset.content">
      <xsl:text disable-output-escaping="yes"><![CDATA[<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><!-- Copyright 2006 Curam Software Ltd. -->]]></xsl:text>
      <html>
        <xsl:attribute name="lang">
          <xsl:choose>
            <xsl:when test="contains($l10n.gentext.language, $underscore)">
              <xsl:value-of select="substring-before($l10n.gentext.language, $underscore)"/>
              <xsl:value-of select="$dash"/>       
              <xsl:value-of select="substring-after($l10n.gentext.language, $underscore)"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$l10n.gentext.language"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
        <xsl:call-template name="head.content">
          <xsl:with-param name="node" select="/"/>
        </xsl:call-template>
        <frameset cols="250,*" border="1">
          <frame name="applet" src="applet.html" scrolling="no">
            <xsl:attribute name="alt">
              <xsl:call-template name="gentext">
                <xsl:with-param name="key" select="'AppletFrame'"/>
              </xsl:call-template>
            </xsl:attribute>
            <xsl:attribute name="title">
              <xsl:call-template name="gentext">
                <xsl:with-param name="key" select="'AppletFrame'"/>
              </xsl:call-template>
            </xsl:attribute>
          </frame>
          <frame name="main" src="{concat($root.filename, $html.ext)}"
                 scrolling="auto">
            <xsl:attribute name="alt">
              <xsl:call-template name="gentext">
                <xsl:with-param name="key" select="'MainFrame'"/>
              </xsl:call-template>
            </xsl:attribute>
            <xsl:attribute name="title">
              <xsl:call-template name="gentext">
                <xsl:with-param name="key" select="'MainFrame'"/>
              </xsl:call-template>
            </xsl:attribute>
          </frame>
          <noframes>
            <body>
              <p>
                <xsl:call-template name="gentext">
                  <xsl:with-param name="key" select="'NoFrames'"/>
                </xsl:call-template>
              </p>
            </body>
          </noframes>
        </frameset>
      </html>
    </xsl:variable>

    <xsl:variable name="applet.content">
      <xsl:text disable-output-escaping="yes"><![CDATA[<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><!-- Copyright 2006 Curam Software Ltd. -->]]></xsl:text>
      <html>
        <xsl:attribute name="lang">
          <xsl:choose>
            <xsl:when test="contains($l10n.gentext.language, $underscore)">
              <xsl:value-of select="substring-before($l10n.gentext.language, $underscore)"/>
              <xsl:value-of select="$dash"/>       
              <xsl:value-of select="substring-after($l10n.gentext.language, $underscore)"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$l10n.gentext.language"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
        <head>
          <meta http-equiv="Content-Type"
                content="text/html; charset={$chunker.output.encoding}"/>
          <link href="{$html.stylesheet}" rel="stylesheet" type="text/css" />
          <xsl:call-template name="user.head.content" />
          <title>
            <xsl:call-template name="gentext">
              <xsl:with-param name="key" select="'HelpNavigation'"/>
            </xsl:call-template>
          </title>
        </head>
        <body class="applet" onload="setHelpURL();focusApplet();">
          <div class="focus">
            <a accesskey="a" href="#"
               onclick="this.href='javascript:focusApplet()'">
              <xsl:attribute name="title">
                <xsl:call-template name="gentext">
                  <xsl:with-param name="key" select="'FocusApplet'"/>
                </xsl:call-template>
              </xsl:attribute>
              <img>
                <xsl:attribute name="src">
                  <xsl:value-of select="$navig.graphics.path"/>
                  <xsl:value-of select="'focus'"/>
                  <xsl:value-of select="$navig.graphics.extension"/>
                </xsl:attribute>
                <xsl:attribute name="alt">
                  <xsl:call-template name="gentext">
                    <xsl:with-param name="key" select="'FocusApplet'"/>
                  </xsl:call-template>
                </xsl:attribute>
                <xsl:attribute name="title">
                  <xsl:call-template name="gentext">
                    <xsl:with-param name="key" select="'FocusApplet'"/>
                  </xsl:call-template>
                </xsl:attribute>
              </img>
            </a>
          </div>
          <div class="logo">
            <img src="{$admon.graphics.path}green-logo.gif">
              <xsl:attribute name="alt">
                <xsl:call-template name="gentext">
                  <xsl:with-param name="key" select="'CuramLogo'"/>
                </xsl:call-template>
              </xsl:attribute>
              <xsl:attribute name="title">
                <xsl:call-template name="gentext">
                  <xsl:with-param name="key" select="'CuramLogo'"/>
                </xsl:call-template>
              </xsl:attribute>
            </img>
          </div>
          <div class="applet">
            <!-- online-help-l10n.jar -->
            <applet codebase="." width="100%" height="100%" name="HelpApplet"
                    code="curam.docmaker.tools.help.HelpApplet.class"
                    archive="help-applet.jar,lucene.jar,jde-commons-ext.jar">
              <param name="target" value="main" />
              <param name="locale" value="{$l10n.gentext.language}" />
              <xsl:call-template name="gentext">
                <xsl:with-param name="key" select="'NoApplet'"/>
              </xsl:call-template>
            </applet>
          </div>
        </body>
      </html>
    </xsl:variable>

    <xsl:call-template name="write.chunk">
      <xsl:with-param name="content" select="$frameset.content"/>
      <xsl:with-param name="filename" select="'index.html'" />
    </xsl:call-template>

    <xsl:call-template name="write.chunk">
      <xsl:with-param name="content" select="$applet.content"/>
      <xsl:with-param name="filename" select="'applet.html'" />
    </xsl:call-template>

  </xsl:template>

  <!--
  Customized to support context-sensitive hyperlinks. This takes advantage of
  the fact that the original template has both a "match" and a "name"
  attribute and that the "match" is the only way it is used. Here, a check
  for a type of "topicname" is made and then the original template is called,
  rather than try to rewrite the original, as it is very long. It would be
  nice to use xsl:apply-imports, but the parameter prevents it from working.

  This scheme supports both applet help and server-side help. If the applet is
  being used, JavaScript must be enabled and the "onclick" handler will
  rewite the HREF of the link. If server-side help is being used, the static
  HREF will resolve the cross-reference via a servlet if JavaScript is not
  enabled. If JavaScript is enabled, then the JavaScript code will detect that
  the applet is not present and will not attempt to rewrite the HREF. 
  -->
  <xsl:template match="olink">
    <xsl:param name="target.database" />

    <xsl:choose>
      <xsl:when test="@type = 'topicname'">
        <!--
        Server-side help is only supported at the "top-level". As all pages
        are located one level below the help redirect servlet, "../topic" is
        used for links from pages to the redirect servlet.
        -->
        <a href="../topic?topicname={@localinfo}"
           onclick="rewriteLink(this, '{@localinfo}');">
          <xsl:apply-templates />
        </a>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="olink">
          <xsl:with-param name="target.database" select="$target.database" />
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Disabling this because it is slow and redundant.
  -->
  <xsl:template name="dbhtml-dir" />

  <!--
  The output that is send to the HTML Help configuration text files is
  assumed to be output using the "text" method and thus require escaping.
  This is not the case for Xalan, which does not support output methods
  on its "redirect" extension function. This template is therefore short-
  circuited to prevent the "double escaping" that happens using Xalan.
  -->
  <xsl:template name="escape-attr">
    <xsl:param name="value"/>
    <xsl:value-of select="$value"/>
  </xsl:template>

  <!--
  Overridden to do nothing, as we do not use this and it is a significant
  performance drain.
  -->
  <xsl:template match="*" mode="head.keywords.content" />

</xsl:stylesheet>
