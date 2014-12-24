<?xml version="1.0" encoding="UTF-8"?>
<!--
  Copyright (c) 2007 Curam Software Ltd.
  All rights reserved.

  This software is the confidential and proprietary information of Curam
  Software, Ltd. ("Confidential Information"). You shall not disclose
  such Confidential Information and shall use it only in accordance with the
  terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="no" omit-xml-declaration="yes"/>
  <xsl:param name="questionnaire-id-param-name"/>
  <xsl:param name="question-id-param-name"/>
  <xsl:param name="page-id-param-name"/>
  <xsl:param name="determination-delivery-id-param-name"/>
  <xsl:param name="page-link" />
  <xsl:param name="table-header-label1" />
  <xsl:param name="table-header-label2" />
  <xsl:param name="o3rpu-param"/>

  <xsl:template match="EVIDENCE_TAB_CONTAINER">
    <xsl:variable name="selectedChild">
      <xsl:for-each select="QUESTIONNAIRE">
        <xsl:if test="@SELECTED = 'true'">
          <xsl:value-of select="@LABEL"/>
        </xsl:if>
      </xsl:for-each>
    </xsl:variable>
    <xsl:variable name="node-id" select="concat('mainTabContainer_',generate-id(.))"/>
    <script type="text/javascript">
      <xsl:text>require(["dijit/layout/TabContainer","dijit/layout/ContentPane"]);</xsl:text>
    </script>
    <div id="{$node-id}" dojoType="dijit.layout.TabContainer" selectedChild="{$selectedChild}"
         doLayout="false" class="evidence-comparison">
      <xsl:apply-templates select="QUESTIONNAIRE" />
    </div>
    <script type="text/javascript">
      <xsl:text>disableClusterToggle("</xsl:text>
      <xsl:value-of select="$node-id"/>
      <xsl:text>");</xsl:text>
    </script>
  </xsl:template>

  <xsl:template match="QUESTIONNAIRE">
    <xsl:variable name="label" select="@LABEL"/>
    <div title="{$label}" dojoType="dijit.layout.ContentPane" id="{$label}" class="list list-wih-header">
      <!--
      <div class="header">
        <h2><xsl:value-of select="@LABEL"/></h2>
      </div>
      -->
      <table>
        <thead>
          <tr>
            <th class="field first-header">
              <span>
                <xsl:value-of select="$table-header-label1"/>
              </span>
            </th>
            <th class="field last-header">
              <span>
                <xsl:value-of select="$table-header-label2"/>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <xsl:apply-templates select="QUESTION" />
        </tbody>
      </table>
    </div>
  </xsl:template>

  <xsl:template match="QUESTION">
    <xsl:variable name="this-id" select="generate-id(.)"/>
    <tr>
      <td class="field">
        <xsl:value-of select="@LABEL"/>
      </td>
      <td class="field">
        <!-- text takes precedence over answer value -->
        <xsl:choose>
          <xsl:when test="ANSWER/@DISPLAY_TEXT">
            <xsl:value-of select="ANSWER/@DISPLAY_TEXT"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="ANSWER/@VALUE"/>
          </xsl:otherwise>
        </xsl:choose>

        <xsl:if test="ANSWER/@SHOW_LINK='true'">
          <xsl:variable name="questionnaireIDValue" select="../@QUESTIONNAIRE_ID"/>
          <xsl:variable name="questionIDValue" select="@QUESTION_ID"/>
          <xsl:variable name="determinationDeliveryIDValue" select="../../@DETERMINATION_DELIVERY_ID"/>
          <xsl:variable name="pageLink" select="concat($page-id-param-name, 'Page.do?', $questionnaire-id-param-name, '=', $questionnaireIDValue, '&amp;', $question-id-param-name, '=', $questionIDValue,
          '&amp;', $determination-delivery-id-param-name, '=', $determinationDeliveryIDValue,
          '&amp;', $o3rpu-param)"/>
          <xsl:text> [</xsl:text>
          <a href="{$pageLink}"><xsl:value-of select="$page-link"/></a>
          <xsl:text>]</xsl:text>
        </xsl:if>
      </td>
    </tr>
  </xsl:template>

</xsl:stylesheet>