<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Copyright 2004, 2007-2008 Curam Software Ltd. All rights reserved. This 
  software is the confidential and proprietary information of Curam Software, 
  Ltd. ("Confidential Information"). You shall not disclose such Confidential 
  Information and shall use it only in accordance with the terms of the license 
  agreement you entered into with Curam Software. -->
<xsl:stylesheet exclude-result-prefixes="tag" version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:tag="http://xml.apache.org/xalan/java/curam.omega3.taglib.widget.MeetingViewTag">
  <xsl:output method="xml" indent="no" omit-xml-declaration="yes" />
  <xsl:param name="locale" />
  <xsl:param name="static-content-server-url" />
  <xsl:param name="tag" />
  <xsl:param name="tabStringParam" />
  <xsl:param name="multiSelectLocation" />
  <xsl:param name="open-new-window" />
  <xsl:param name="interval" />
  <xsl:param name="amPmMode" />

  <xsl:param name="MultiSelect.Submit" />
  <xsl:param name="MultiSelect.Submit.Alt" />
  <xsl:param name="MultiSelect.Column.One" />
  <xsl:param name="MultiSelect.Column.Two" />
  <xsl:param name="MultiSelect.Column.Three" />
  <xsl:param name="Table.Summary" />
  <xsl:param name="User.Home.Alt" />

  <xsl:variable name="intervalAmount">
    <xsl:value-of select="tag:getIntervalAmount($tag)" />
  </xsl:variable>
  <xsl:variable name="numberQuarterHours">
    <xsl:value-of select="tag:getNumQuarterHours($tag)" />
  </xsl:variable>
  <xsl:variable name="timeLineLength">
    <xsl:value-of select="$numberQuarterHours * 15 * ($interval div 15)" />
  </xsl:variable>

  <xsl:template match="SCHEDULE">
    <xsl:variable name="single-quote">'</xsl:variable>
    <div class="meeting-view multi-select" style="width:100%;overflow:auto;">
      <div class="ac_center">
        <span class="ac_control">
          <div id="page-action-set-" class="action-set blue-action-set">
            <a keepModal="true" onclick="{concat('appendTabColumn(', $single-quote, $tabStringParam, $single-quote,', this)')}"
              title="{$MultiSelect.Submit.Alt}">
              <xsl:attribute name="href">
              <xsl:value-of disable-output-escaping="yes"
                select="concat($multiSelectLocation, '&amp;',
                                           tag:getDateParameter($tag, @DATE))" />
                                           
            </xsl:attribute>
              <span class="left-corner">
                <span class="right-corner">
                  <span class="middle">
                    <xsl:value-of select="$MultiSelect.Submit" />
                  </span>
                </span>
              </span>
            </a>
          </div>
        </span>
      </div>
      <table id="MeetingView" summary="{$Table.Summary}" style="width:100%;">
        <colgroup span="3">
          <col width="50" />
          <col width="{120 + number($timeLineLength &lt;= 700)*50}" />
          <col width="{$timeLineLength}" />
        </colgroup>
        <thead>
          <tr>
            <th class="checkbox">
              <input
                onclick="{concat('ToggleAll(this, ',$single-quote, $tabStringParam, $single-quote,');')}"
                title="{$MultiSelect.Column.One}" type="checkbox" />
            </th>
            <th class="user">
              <xsl:value-of select="$MultiSelect.Column.Two" />
            </th>
            <th class="schedule">
              <xsl:value-of select="$MultiSelect.Column.Three" />
            </th>
          </tr>
        </thead>
        <tbody>
          <xsl:comment>force closing tag</xsl:comment>
          <xsl:for-each select="./USER">
            <xsl:call-template name="select-row" />
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>
  <xsl:template name="select-row">
    <tr>
      <xsl:attribute name="class">
        <xsl:choose>
          <xsl:when test="position() mod 2 = 0">
            <xsl:text>darkRow</xsl:text>
          </xsl:when>
        <xsl:otherwise>
          <xsl:text>lightRow</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
      </xsl:attribute>
      <xsl:apply-templates select="." mode="row-contents" />
    </tr>
  </xsl:template>
  <xsl:template match="USER" mode="row-contents">
    <xsl:choose>
      <xsl:when test="$amPmMode = 'true'">
        <td class="checkbox12">
          <input name="{$tabStringParam}" type="checkbox" value="{@ID}" />
        </td>
      </xsl:when>
      <xsl:otherwise>
        <td class="checkbox">
          <input name="{$tabStringParam}" type="checkbox" value="{@ID}" />
        </td>
      </xsl:otherwise>
    </xsl:choose>

    <xsl:choose>
      <xsl:when test="$amPmMode = 'true'">
        <td class="user12">
          <span>
            <xsl:value-of select="@NAME" />
          </span>
        </td>
      </xsl:when>
      <xsl:otherwise>
        <td class="user">
          <span>
            <xsl:value-of select="@NAME" />
          </span>
        </td>
      </xsl:otherwise>
    </xsl:choose>

    <td class="schedule">
      <xsl:if test="$amPmMode = 'true'">
        <span class="format12"></span>
      </xsl:if>
      <span class="timeBar">
        <xsl:value-of disable-output-escaping="yes"
          select="tag:getTimeSlot($tag, string(@ID))" />
        <span class="timeLine">
          <br />
          <img src="{concat($static-content-server-url, '/themes/v6/images/meeting-view/blank.png')}"
            alt="" />
          <xsl:value-of disable-output-escaping="yes"
            select="tag:getTimeGrid($tag)" />
        </span>
        <br />
        <xsl:choose>
          <xsl:when test="$interval = 15">
            <xsl:text>&#160;</xsl:text>
          </xsl:when>
          <xsl:when test="$interval = 60">
            <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>&#160;&#160;</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
        <xsl:call-template name="time-text">
          <xsl:with-param name="counter" select="0" />
        </xsl:call-template>
      </span>
    </td>
  </xsl:template>
  <xsl:template name="time-text">
    <xsl:param name="counter" />
    <xsl:if test="number($counter) &lt; number($intervalAmount)">
      <xsl:choose>
        <xsl:when test="$amPmMode = 'true'">
          <span class="timeSlot12"
            style="{concat('margin-right:18px;',
                  										'margin-left:', number($counter = 0)*number($interval = 30)*5 + number($counter = 0)*number($interval = 60)*10, 'px;')}">
            <xsl:value-of select="tag:getTime($tag, $counter)" />
          </span>
        </xsl:when>
        <xsl:otherwise>
          <span class="timeSlot"
            style="{concat('margin-right:36px;',
                  										'margin-left:', number($counter = 0)*number($interval = 30)*5 + number($counter = 0)*number($interval = 60)*10, 'px;')}">
            <xsl:value-of select="tag:getTime($tag, $counter)" />
          </span>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:call-template name="time-text">
        <xsl:with-param name="counter" select="number($counter) + 1" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>
