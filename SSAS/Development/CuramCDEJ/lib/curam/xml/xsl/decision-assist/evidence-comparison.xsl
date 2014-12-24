<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright 2006-2010 Curam Software Ltd.
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
  <xsl:param name="page-link"/>
  <xsl:param name="table-header-label"/>
  <xsl:param name="o3rpu-param"/>
  <xsl:param name="table-different-previous"/>
  <xsl:param name="table-different-next"/>

  <xsl:template match="EVIDENCE_COMPARISON">
    <xsl:variable name="node-id"
                  select="concat('mainTabContainer_', generate-id(.))"/>
    <div id="{$node-id}" dojoType="dijit.layout.TabContainer"
         doLayout="false" class="evidence-comparison">
      <xsl:apply-templates select="QUESTIONNAIRE"/>
    </div>    
    <script type="text/javascript">
			<xsl:text>require(["dijit/layout/TabContainer","dijit/layout/ContentPane"]);</xsl:text>
    </script>
  </xsl:template>

  <xsl:template match="QUESTIONNAIRE">
    <div label="{@LABEL}" dojoType="dijit.layout.ContentPane" id="{@LABEL}"
         class="list list-with-header" title="{@LABEL}">
      <table>
        <thead>
          <tr>
            <th class="field first-header">
            	<span>
              	<xsl:value-of select="$table-header-label"/>
              </span>
            </th>
            <th class="field">
            	<span>
             	 <xsl:value-of select="/EVIDENCE_COMPARISON/@BASELINE1_LABEL"/>
             	</span>
            </th>
            <th class="field last-header">
            	<span>
              	<xsl:value-of select="/EVIDENCE_COMPARISON/@BASELINE2_LABEL"/>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <xsl:apply-templates select="QUESTION"/>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <xsl:template match="QUESTION">
    <xsl:variable name="css-class">
      <xsl:choose>
        <xsl:when test="@HIGHLIGHT = 'false'">field</xsl:when>
        <xsl:otherwise>field changed</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <tr>
      <xsl:if test="position() = last()">
        <xsl:attribute name="class">last-row</xsl:attribute>
      </xsl:if>
      <td class="{$css-class} first-field">
        <xsl:value-of select="@LABEL"/>
      </td>
      <td class="{$css-class}">
        <xsl:apply-templates select="BASELINE1"/>
        <xsl:if test="not(@HIGHLIGHT = 'false')">
          <span class="changed">
          	<xsl:value-of select="$table-different-next" />
          </span>
        </xsl:if>
      </td>
      <td class="{$css-class} last-field">
        <xsl:apply-templates select="BASELINE2"/>
        <xsl:if test="not(@HIGHLIGHT = 'false')">
          <span class="changed">
            <xsl:value-of select="$table-different-previous" />
          </span>
        </xsl:if>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="BASELINE1 | BASELINE2">
    <!-- Text takes precedence over answer value. -->
    <xsl:choose>
      <xsl:when test="@DISPLAY_TEXT">
        <xsl:value-of select="@DISPLAY_TEXT"/>          
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="@ANSWER"/>          
      </xsl:otherwise>
    </xsl:choose>

    <xsl:if test="@SHOW_LINK = 'true'">
      <xsl:variable name="linkURI"
          select="concat($page-id-param-name, 'Page.do?',
              $questionnaire-id-param-name, '=', ../../@QUESTIONNAIRE_ID,
              '&amp;', $question-id-param-name, '=', ../@QUESTION_ID, 
              '&amp;', $determination-delivery-id-param-name, '=',
                  /EVIDENCE_COMPARISON/@DETERMINATION_DELIVERY_ID,
              '&amp;', $o3rpu-param)"/>
      <xsl:text> [</xsl:text>
      <a href="{$linkURI}"><xsl:value-of select="$page-link"/></a>
      <xsl:text>]</xsl:text>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>