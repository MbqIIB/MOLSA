<?xml version="1.0" encoding="UTF-8"?>
<!--
   Copyright 2005-2007 Curam Software Ltd.
   All rights reserved.

   This software is the confidential and proprietary information of Curam
   Software, Ltd. ("Confidential Information"). You shall not disclose
   such Confidential Information and shall use it only in accordance with the
   terms of the license agreement you entered into with Curam Software.
   -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:domain-info="http://xml.apache.org/xalan/java/curam.util.client.domain.util.DomainUtils"
  xmlns:resources="http://xml.apache.org/xalan/java/curam.omega3.util.CDEJResources"
  exclude-result-prefixes="domain-info resources"
  version="1.0">

  <xsl:import href="../common/ui.xsl" />
  <xsl:import href="../common/runtime-params.xsl" />

  <!--
  Include ieg-ui-field.xsl to override ui-field.xsl since this
  causes problems with the rules simulation editor which we do not have
  time to fix at the moment.
  -->
  <xsl:import href="ieg-ui-field.xsl" />

  <xsl:output method="xml" indent="no" omit-xml-declaration="yes"/>
  <xsl:strip-space elements="*"/>

  <!--
  Node Set IEG Summary data. This is used to display a summary
  of questions answered so far by the user.
  -->
  <xsl:param name="summary-data"/>

  <!--
  Base64 encoded XML String containing page data. This is required to maintain
  state when a validation error occurs and the current page has to be
  re-displayed.
  -->
  <xsl:param name="encoded-page-data"/>

  <!--
  Base64 encoded XML String containing summary data. This is required to maintain
  state when a validation error occurs and the current page has to be
  re-displayed.
  -->
  <xsl:param name="encoded-summary-data"/>

  <!--
  NodeSet containing messages to display
  -->
  <xsl:param name="messages"/>

  <!--
  Contains the URL of the current page. Used when building links in the player.
  This url has all CDEJ parameters (__o3 prefix) stripped out.
  -->
  <xsl:param name="page-url"/>

  <!-- NodeSet containing configuration information for the player -->
  <xsl:param name="config" />

  <!-- NodeSet of visible tabs -->
  <xsl:param name="visible-tabs" />

  <!-- Parameters to apply to the finish page -->
  <xsl:param name="system-parameters"/>

  <!-- Parameters to apply to the finish page, in un-encoded form for
       adding to a hidden field. It must only be used on a hidden field. 
    -->
  <xsl:param name="system-parameters-unencoded"/>

  <!-- Resources supplied as parameters. For example, for each of the buttons used to display
       a panel, a label and alt text are supplied.
  -->
  <xsl:param name="previous-pages-button-label" />
  <xsl:param name="previous-pages-button-alt" />
  <xsl:param name="help-button-label" />
  <xsl:param name="help-button-alt" />
  <xsl:param name="notes-button-label" />
  <xsl:param name="notes-button-alt" />
  <xsl:param name="unanswered-button-label" />
  <xsl:param name="unanswered-button-alt" />
  <xsl:param name="summary-button-label" />
  <xsl:param name="summary-button-alt" />
  <xsl:param name="notes-input-alt" />

  <!-- Indicates that a checkbox should be used for booleans -->
  <xsl:param name="display-checkbox-for-boolean" />

  <!--
  The <UnansweredQuestion> elements have to grouped by pageid attribute
  and displayed as multiple "trees". Unfortunately the XML data does not
  reflect this tree structure so this variable builds a list of unique pageid's
  which are processed by an <xsl:for-each> call in the
  "unanswered-questions-panel" template below.
  -->
  <xsl:variable name="unanswered-question-pageids"
    select="//UnansweredQuestion[not(@pageid = following::UnansweredQuestion/@pageid)]/@pageid"/>
  <xsl:variable name="show-question-label"
    select="$config/ieg-player-config/tab-panel/summary-panel/@show-question-label" />
  <xsl:variable name="show-question-value"
    select="$config/ieg-player-config/tab-panel/summary-panel/@show-question-value" />
  <!-- Set the script notes variable. Need to give this a default value to force
  opening and closing <textarea> tags.
  -->
  <xsl:variable name="notes-text">
    <xsl:choose>
      <xsl:when test="not(QuestionPage/@scriptnotes) or QuestionPage/@scriptnotes = ''">
        <xsl:text>&#32;</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="QuestionPage/@scriptnotes"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <xsl:variable name="previous-pages"
                select="count(QuestionPage/PreviousPage) &gt; 0" />

  <!-- Process the root node -->
  <xsl:template match="QuestionPage">
    <form action="{$page-url}&amp;__o3iegsysparams={$system-parameters}" method="post" onsubmit="return dc(this,false);">
      <div class="ieg">
        <input type="hidden" id="o3iegscriptID" name="__o3iegscriptID" value="{@id}" />
        <input type="hidden" id="o3iegloopidx" name="__o3iegloopidx" value="{@loopindex}" />
        <input type="hidden" id="o3iegchildloopidx" name="__o3iegchildloopidx" value="{@childloopindex}" />
        <input type="hidden" name="__o3iegesd" value="{$encoded-summary-data}" />
        <input type="hidden" name="__o3iegepd" value="{$encoded-page-data}" />
        <input type="hidden" name="__o3iegscriptnotes.hf" value="{$notes-text}" />

        <xsl:if test="$visible-tabs/@visible = 'true'">
          <xsl:call-template name="create-tab-panel"/>
        </xsl:if>
        <xsl:call-template name="detail-panel"/>
      </div>
    </form>
  </xsl:template>
  <!--
  Create the tabbed panel on the left side of the screen.
  -->
  <xsl:template name="create-tab-panel">
    <xsl:variable name="num-visible-tabs" select="count($visible-tabs/tab[@visible = 'true'])" />
    <div id="tab-panel" class="tab-panel">
      <div id="tabs" class="tabs">
        <table>
          <tbody>
            <tr>
              <xsl:for-each select="$visible-tabs/tab[@visible = 'true']">
                <!--
                If there are 4 tabs visible only draw 2 tabs on this row. Otherwise, draw up to 3.
                -->
                <xsl:if test="($num-visible-tabs != 4 and position() &lt; 4 ) or ($num-visible-tabs = 4 and position() &lt; 3 )">
                  <xsl:call-template name="create-tab-selector" />
                </xsl:if>
              </xsl:for-each>
            </tr>
          </tbody>
        </table>
        <!-- If we have 4 or 5 visible tabs we need a second table -->
        <xsl:if test="$num-visible-tabs &gt; 3">
          <table>
            <tbody>
              <tr>
                <xsl:for-each select="$visible-tabs/tab[@visible = 'true']">
                  <xsl:if test="($num-visible-tabs = 4 and position() &gt; 2) or ($num-visible-tabs = 5 and position() &gt; 3 )">
                    <xsl:call-template name="create-tab-selector" />
                  </xsl:if>
                </xsl:for-each>
              </tr>
            </tbody>
          </table>
        </xsl:if>
        <div id="tab-footer">&#160;</div>
      </div>
      <!--
      This div contains the panels that are associated with each tab created
      above.
      -->
      <div id="panel-holder">
        <xsl:call-template name="previous-pages-panel"/>
        <xsl:call-template name="help-panel"/>
        <xsl:call-template name="notes-panel"/>
        <xsl:call-template name="unanswered-questions-panel"/>
        <xsl:call-template name="summary-panel"/>
      </div>
    </div>
  </xsl:template>

  <xsl:template name="create-tab-selector">
    <xsl:variable name="alt-text">
      <xsl:choose>
        <xsl:when test="@id = 'previous-pages-panel'">
          <xsl:value-of select="$previous-pages-button-alt"/>
        </xsl:when>
        <xsl:when test="@id = 'help-panel'">
          <xsl:value-of select="$help-button-alt"/>
        </xsl:when>
        <xsl:when test="@id = 'notes-panel'">
          <xsl:value-of select="$notes-button-alt"/>
        </xsl:when>
        <xsl:when test="@id = 'unanswered-questions-panel'">
          <xsl:value-of select="$unanswered-button-alt"/>
        </xsl:when>
        <xsl:when test="@id = 'summary-panel'">
          <xsl:value-of select="$summary-button-alt"/>
        </xsl:when>
        <xsl:otherwise>Button alt text not found</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="button-label">
      <xsl:choose>
        <xsl:when test="@id = 'previous-pages-panel'">
          <xsl:value-of select="$previous-pages-button-label"/>
        </xsl:when>
        <xsl:when test="@id = 'help-panel'">
          <xsl:value-of select="$help-button-label"/>
        </xsl:when>
        <xsl:when test="@id = 'notes-panel'">
          <xsl:value-of select="$notes-button-label"/>
        </xsl:when>
        <xsl:when test="@id = 'unanswered-questions-panel'">
          <xsl:value-of select="$unanswered-button-label"/>
        </xsl:when>
        <xsl:when test="@id = 'summary-panel'">
          <xsl:value-of select="$summary-button-label"/>
        </xsl:when>
        <xsl:otherwise>Button label text not found</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <td class="tab">
      <a id="{@id}-tab" href="#{@id}"
        onclick="return showTab('{@id}');"
        title="{$alt-text}">
        <xsl:value-of select="$button-label"/>
      </a>
    </td>
    <td class="tab-end"></td>
  </xsl:template>

  <!--
  Templates for previous pages panel.
  -->
  <xsl:template name="previous-pages-panel">
    <div id="previous-pages-panel">
      <!-- Check if the panel is enabled -->
      <xsl:if test="$visible-tabs/tab[@id = 'previous-pages-panel']/@visible = 'true'">
        <!-- Check if there are pages to be displayed -->
        <xsl:if test="$previous-pages">
          <ul id="previous-pages-panel-list">
            <xsl:apply-templates select="PreviousPage" />
          </ul>
        </xsl:if>
      </xsl:if>
      <!-- Force div to have separate opening + closing tags to cover situation
           where checks above result in no content being output
        -->
      <xsl:text>&#160;</xsl:text>
    </div>
  </xsl:template>
  <xsl:template match="PreviousPage">
    <li>
      <a id="{@id}.{@loopindex}" class="page" href="{$page-url}&amp;__o3ieggtp={@id}&amp;__o3ieggtpli={@loopindex}&amp;__o3ieggtpcli={@childloopindex}&amp;__o3iegsysparams={$system-parameters}">
        <xsl:value-of select="@name"/>
      </a>
    </li>
  </xsl:template>

  <!--
  Templates for help panel.
  -->
  <xsl:template name="help-panel">
    <div id="help-panel">
      <xsl:if test="$visible-tabs/tab[@id = 'help-panel']/@visible = 'true'">
        <h4>
          <xsl:value-of select="@name"/>
          <xsl:if test="@legislationlink and not(@legislationlink = '')">
            <a title="Legislation" href="{@legislationlink}" class="legislation" target="_newWindow">&#160;</a>
          </xsl:if>
          <xsl:if test="@policylink and not(@policylink = '')">
            <a title="Policy" href="{@policylink}" class="policy" target="_newWindow">&#160;</a>
          </xsl:if>
        </h4>
        <p>
          <xsl:value-of select="@description"/>
        </p>
        <dl>
          <xsl:apply-templates select="QuestionRuntime" mode="help"/>
        </dl>
      </xsl:if>
      <!-- Force div to have separate opening + closing tags to cover situation
           where check above results in no content being output
        -->
      <xsl:text>&#160;</xsl:text>
    </div>
  </xsl:template>
  <xsl:template match="QuestionRuntime" mode="help">
    <dt>
      <xsl:value-of select="@question"/>
      <xsl:if test="@legislationlink and not(@legislationlink = '')">
        <a title="Legislation" href="{@legislationlink}" class="legislation" target="_newWindow">&#160;</a>
      </xsl:if>
      <xsl:if test="@policylink and not(@policylink = '')">
        <a title="Policy" href="{@policylink}" class="policy" target="_newWindow">&#160;</a>
      </xsl:if>
    </dt>
    <dd>
      <!-- The xml filter handles the escaping of this attribute -->
      <xsl:value-of select="@helptext" disable-output-escaping="yes" />
    </dd>
  </xsl:template>

  <!--
  Templates for notes panel
  -->
  <xsl:template name="notes-panel">
    <div id="notes-panel">
      <xsl:if test="$visible-tabs/tab[@id = 'notes-panel']/@visible = 'true'">
        <textarea id="__o3iegscriptnotes.ta" name="__o3iegscriptnotes.ta"
          rows="10" cols="20" onblur="setNodesHF(this)"
          title="{$notes-input-alt}">
          <xsl:value-of select="$notes-text"/>
        </textarea>
      </xsl:if>
      <!-- Force div to have separate opening + closing tags to cover situation
           where check above results in no content being output
        -->
      <xsl:text>&#160;</xsl:text>
    </div>
  </xsl:template>

  <!--
  Templates for unanswered questions panel panel
  -->
  <xsl:template name="unanswered-questions-panel">
    <div id="unanswered-questions-panel">
      <xsl:if test="$visible-tabs/tab[@id = 'unanswered-questions-panel']/@visible = 'true'">
        <xsl:if test="count(./UnansweredQuestion) &gt; 0">
          <xsl:for-each select="$unanswered-question-pageids">
            <xsl:variable name="page-id" select="."/>
            <span>
              <!-- The tab index is hardcoded for now to 3 -->
              <a href="{$page-url}&amp;__o3ieggtp={$page-id}&amp;__o3ieggtpli={@loopindex}&amp;__o3ieggtpcli={@childloopindex}&amp;__o3ieggtt=3&amp;__o3iegsysparams={$system-parameters}" class="page">
                <xsl:value-of select="/QuestionPage/UnansweredQuestion[@pageid = $page-id]/@pagename"/>
              </a>
            </span>
            <ul>
              <xsl:apply-templates select="/QuestionPage/UnansweredQuestion[@pageid = $page-id]" />
            </ul>
          </xsl:for-each>
        </xsl:if>
      </xsl:if>
      <!-- Force div to have separate opening + closing tags to cover situation
           where check above results in no content being output
        -->
      <xsl:text>&#160;</xsl:text>
    </div>
  </xsl:template>
  <xsl:template match="UnansweredQuestion">
    <li>
      <a href="{$page-url}&amp;__o3ieggtp={@pageid}&amp;__o3ieggtpli={@loopindex}&amp;__o3ieggtpcli={@childloopindex}&amp;__o3ieggtq={@questionid}&amp;__o3ieggtt=3&amp;__o3iegsysparams={$system-parameters}" class="question">
        <xsl:value-of select="@question"/>
      </a>
    </li>
  </xsl:template>

  <!--
  Templates for the summary panel. This template operates on the "summary-data"
  template parameter. This is a separate document containing information on
  the questions answered so far in the script.
  -->
  <xsl:template name="summary-panel">
    <!-- Can't seem to get an 'and' condition working here so will use this method for
         checking when both label and value are turned off in the config -->
    <xsl:variable name="config-display-panel-off">
      <xsl:choose>
        <xsl:when test="$show-question-label = 'false'">
          <xsl:choose>
            <xsl:when test="$show-question-value = 'false'">
              <xsl:text>false</xsl:text>
            </xsl:when>
            <xsl:otherwise>
              <xsl:text>true</xsl:text>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>true</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <div id="summary-panel">
      <xsl:if test="$visible-tabs/tab[@id = 'summary-panel']/@visible = 'true'">
        <xsl:if test="$summary-data">
          <xsl:if test="$config-display-panel-off != 'false'">
            <xsl:for-each select="$summary-data/QuestionPage">
              <span class="page-name">
                <!-- The tab index is hardcoded for now to 3 -->
                <a href="{$page-url}&amp;__o3ieggtp={@id}&amp;__o3ieggtpli={@loopindex}&amp;__o3ieggtpcli={@childloopindex}&amp;__o3ieggtt=4&amp;__o3iegsysparams={$system-parameters}" class="page">
                  <xsl:value-of select="@name"/>
                </a>
              </span>
              <ul>
                <xsl:apply-templates select="./Question" mode="summary"/>
              </ul>
            </xsl:for-each>
          </xsl:if>
        </xsl:if>
      </xsl:if>
      <!-- Force div to have separate opening + closing tags to cover situation
           where check above results in no content being output
      -->
      <xsl:text>&#160;</xsl:text>
    </div>
  </xsl:template>

  <xsl:template match="Question" mode="summary">
    <xsl:variable name="question-has-multi-line-answer"
                  select="Answer//ItemValue/@multi-line-text" />
    <li>
      <xsl:if test="$show-question-label = 'true' or not($show-question-label)">
        <a href="{$page-url}&amp;__o3ieggtp={../@id}&amp;__o3ieggtpli={@loopindex}&amp;__o3ieggtpcli={@childloopindex}&amp;__o3ieggtq={@questionid}&amp;__o3ieggtt=4&amp;__o3iegsysparams={$system-parameters}" class="question">
          <span class="summary-label"><xsl:value-of select="@question"/>:</span>
        </a>
      </xsl:if>
      <!-- We use a span for "normal" answers and a "div" for multi-line answers. -->
      <xsl:if test="$show-question-value = 'true' or not($show-question-value)">
        <xsl:choose>
          <xsl:when test="$question-has-multi-line-answer">
            <div class="summary-value">&#160;<xsl:apply-templates select="Answer/AnswerItem" mode="summary"/></div>
          </xsl:when>
          <xsl:otherwise>
            <span class="summary-value">&#160;<xsl:apply-templates select="Answer/AnswerItem" mode="summary"/></span>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:if>
    </li>
  </xsl:template>

  <xsl:template match="AnswerItem" mode="summary">
    <xsl:choose>
      <!-- The IEGDataFilter adds an indicator when multi line text is detected in
           summary mode. In this case the filter will take care of formatting the new
           lines (as div elements) as well as XML escaping of the text in each line.
           Therefore output escaping is disabled.
        -->
      <xsl:when test="ItemValue/@multi-line-text">
        <xsl:value-of disable-output-escaping="yes" select="ItemValue/@value" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="ItemValue/@value" />
      </xsl:otherwise>
    </xsl:choose>
    <xsl:if test="not(position() = last())">
      <xsl:text>, </xsl:text>
    </xsl:if>
  </xsl:template>


  <!--
  Templates for the details panel on the right of the screen
  -->
  <xsl:template name="detail-panel">
    <!-- This div contains the main content on the right of the page -->
    <div id="detail-panel">
      <!-- Check if the tab panel on the left is visible. If not we need
           to increase the width of the detail panel.
        -->
      <xsl:if test="$visible-tabs/@visible = 'false'">
        <xsl:attribute name="style">
          <xsl:text>width:98%;</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <div id="question-script-panel">
        <!--
        The inner div is required to work around problems with setting
        padding values. With only one div was used and padding set on that,
        the div's scroll bars got pushed to the right in NS\Firefox and were
        out of line with "question-panel" div's scrollbars directly below it.
        -->
        <div id="question-script-panel-inner">&#160;</div>
      </div>
      <div id="question-panel">
        <table>
          <col id="page-title-col"/>
          <col id="page-title-help-col"/>
          <tbody>
            <tr>
              <td id="page-title"><xsl:value-of select="@name"/></td>
              <td id="page-title-help">
                <a title="Help" href="#" onclick="return showTab('help-panel');">
                <xsl:attribute name="title">
                  <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'help.title')"/>
                </xsl:attribute>&#160;</a>
              </td>
            </tr>
          </tbody>
        </table>
        <xsl:if test="$messages">
          <div class="page-errors">
            <ul>
              <xsl:for-each select="$messages/msg">
                <li><xsl:value-of select="@text"/></li>
              </xsl:for-each>
            </ul>
          </div>
        </xsl:if>
        <table class="questions">
          <col id="question-label-col" />
          <col id="question-value-col"/>
          <col id="question-unans-col"/>
          <tbody id="questions">
            <xsl:apply-templates select="QuestionRuntime|HyperlinkLabelRuntime" mode="input"/>
          </tbody>
        </table>
      </div>
      <div id="navigation-panel">
        <table id="buttons">
          <col id="exit-button-col"/>
          <col id="nav-buttons-col"/>
          <tbody>
            <tr>
              <td id="exit-button">
                <a href="{$page-url}&amp;__o3iegexit=true&amp;__o3iegscriptID={@id}&amp;__o3iegloopidx={@loopindex}&amp;__o3iegchildloopidx={@childloopindex}&amp;__o3iegsysparams={$system-parameters}"
                    keepModal="false">
                  <xsl:attribute name="title">
                    <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'button.exit.tooltip')"/>
                  </xsl:attribute>
                  <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'button.exit.title')"/>
                </a>
              </td>
              <td id="nav-buttons">
                <a id="next-link" href="#" onclick="dojo.byId('submitNext').click()">
                  <xsl:attribute name="title">
        <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'button.next.tooltip')"/>
                  </xsl:attribute>
                  <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'button.next.title')"/>
                </a>
                <xsl:if test="$previous-pages">
                  <!-- Previous page link does not need scriptID or loop index like the exit button above -->
                  <a id="prev-link" href="{$page-url}&amp;__o3iegprev=true&amp;__o3iegsysparams={$system-parameters}" keepModal="true">
                      <xsl:attribute name="title">
		        <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'button.previous.tooltip')"/>
                      </xsl:attribute>
                    <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'button.previous.title')"/>
                  </a>
                </xsl:if>
              </td>
            </tr>
          </tbody>
        </table>
        <input id="submitNext" name="__o3iegnext" type="submit" value="Next" style="display:none"/>
      </div>
    </div>
  </xsl:template>

  <!-- Creates a table row for each HyperlinkLabelRuntime in the questions panel -->
  <xsl:template match="HyperlinkLabelRuntime" mode="input">
    <tr class="hyper-link-label-row">
      <!-- Labels need to span across the entire question panel -->
      <xsl:choose>
        <xsl:when test="@url">
          <td colspan="3" class="hyper-link-label">
            <a class="hyper-link-label" id="{@id}" href="{@url}" target="_nw">
              <xsl:value-of select="@text" />
            </a>
          </td>
        </xsl:when>
        <xsl:otherwise>
          <td colspan="3" class="label-text">
            <span class="format-text" title="{@text}">&#32;</span>
          </td>
        </xsl:otherwise>
      </xsl:choose>
    </tr>
  </xsl:template>

  <!-- Creates a table row for each question in the questions panel -->
  <xsl:template match="QuestionRuntime" mode="input">
    <tr>
      <td class="question-label">
        <xsl:if test="@mandatory = 'true'">
          <span class="mandatory-field-image">
            <img src="../themes/classic/images/icons/mandatory.gif">
              <xsl:attribute name="title">
                <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'mandatory.title')"/>
              </xsl:attribute>
              <xsl:attribute name="alt">
                <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'mandatory.title')"/>
              </xsl:attribute>
            </img>
          </span>
        </xsl:if>
        <xsl:choose>
          <!-- Disabling use of <label> element because of introduction of
               radio buttons. If one label corresponds to two input controls,
               how do we control that? So, being removed to avoid XHTML compliance
               error.
            -->
          <xsl:when test="@expectedtype = 'FREQUENCY_PATTERN'">
            <!-- Different handling for frequency patterns -->
            <!--<label for="__o3iegans.{@id}_desc"><xsl:value-of select="@label"/>:</label>-->
            <xsl:value-of select="@question"/>
          </xsl:when>
          <xsl:otherwise>
            <!--<label for="__o3iegans.{@id}"><xsl:value-of select="@question"/>:</label>-->
            <xsl:value-of select="@question"/>
          </xsl:otherwise>
        </xsl:choose>
      </td>
      <td class="question-value">
        <xsl:variable name="domain-nodeset"
              select="domain-info:getDomainNodeSet(@expectedtype)" />
        <xsl:if test="$display-checkbox-for-boolean = 'true' and
                       ($domain-nodeset/@root-domain = 'SVR_BOOLEAN'
                        or @expectedtype = 'SVR_BOOLEAN')">
          <!--  Center align checkboxes -->
          <xsl:attribute name="style">
            <xsl:text>text-align:center;</xsl:text>
          </xsl:attribute>
        </xsl:if>

        <xsl:variable name="style">
          <xsl:text>width:100%;</xsl:text>
        </xsl:variable>
        <xsl:call-template name="gen-input-field">
          <xsl:with-param name="name">
            <xsl:text>__o3iegans.</xsl:text>
            <xsl:value-of select="@id"/>
            <xsl:text>.</xsl:text>
            <xsl:value-of select="@loopindex"/>
            <xsl:text>.</xsl:text>
            <xsl:value-of select="@expectedtype"/>
          </xsl:with-param>
          <xsl:with-param name="title">
            <xsl:value-of select="@scripttext"/>
          </xsl:with-param>
          <xsl:with-param name="value" select="./Answer/AnswerItem"/>
          <xsl:with-param name="domain">
            <xsl:value-of select="@expectedtype"/>
          </xsl:with-param>
          <xsl:with-param name="id">
            <xsl:text>__o3iegans.</xsl:text>
            <xsl:value-of select="@id"/>
          </xsl:with-param>
          <xsl:with-param name="onfocus" select="'setScript(this)'"/>
          <xsl:with-param name="style" select="$style"/>
          <xsl:with-param name="ct-name" select="@code-table-name"/>
        </xsl:call-template>
      </td>
      <td class="question-unans">
        <xsl:if test="@recordunanswered = 'true'">
          <input id="__o3iegunans.{@id}.{@loopindex}"
            name="__o3iegunans.{@id}.{@loopindex}"
            type="checkbox" onfocus="setScript(this)"
            value="true">
            <xsl:if test="@unanswered = 'true'">
              <xsl:attribute name="checked">
                <xsl:text>checked</xsl:text>
              </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="title">
              <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'unanswered.checkbox.title')"/>
            </xsl:attribute>
            <xsl:attribute name="alt">
              <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'unanswered.checkbox.title')"/>
            </xsl:attribute>
          </input>
        </xsl:if>
        <input type="hidden" name="__o3ieganslabel.{@id}.{@loopindex}"
          value="{@question}" />
        <xsl:if test="@mandatory = 'true'">
          <input type="hidden" name="__o3iegmandatory.{@id}.{@loopindex}"
            value="true" />
        </xsl:if>
      </td>
    </tr>
  </xsl:template>

</xsl:stylesheet>