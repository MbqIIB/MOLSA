<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright 2004-2007 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose
such Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0" exclude-result-prefixes="tag"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tag="http://xml.apache.org/xalan/java/curam.omega3.taglib.widget.CalendarTag">

  <xsl:output method="xml" indent="no" omit-xml-declaration="yes"/>

  <!-- The supplied NodeSet containing the calendar config data.-->
  <xsl:param name="calendar-config" />
  <!-- Any extra parameters that need to be passed on.-->
  <xsl:param name="o3Parameters" />
  <!-- The Text of the Date Bar -->
  <xsl:param name="DateBarText"/>
  <!-- The date of the selected day -->
  <xsl:param name="selectedDay" />
  <!-- The ordinal reference to the start month of the current week-->
  <xsl:param name="startMonth" />
  <!-- The date that the start month begins with -->
  <xsl:param name="startDate" />
  <!-- The date that the start month ends with -->
  <xsl:param name="monthEnd" />
  <!-- The ordinal reference to the end month of the current week -->
  <xsl:param name="endMonth" />
  <!-- The year of the start month -->
  <xsl:param name="startYear" />
  <!-- The year of the end month -->
  <xsl:param name="endYear" />
  <!-- User current locale -->
  <xsl:param name="locale" />
  <!-- Calendar Tag calling this object -->
  <xsl:param name="CalendarTag" />
  <!-- The URL of the web server with static content -->
  <xsl:param name="static-content-server-url"/>
  <!-- Table summary for screen readers. -->
  <xsl:param name="summary"/>
  <!-- Locale-formatted days of the week -->
  <xsl:param name="day1format"/>
  <xsl:param name="day2format"/>
  <xsl:param name="day3format"/>
  <xsl:param name="day4format"/>
  <xsl:param name="day5format"/>
  <xsl:param name="day6format"/>
  <xsl:param name="day7format"/>
  <!-- Current day prompt for screen reader users -->
  <xsl:param name="todayPrompt"/>

  <!-- The configuration type to use. -->
  <xsl:variable name="calendarType" select="CURAM_CALENDAR_DATA/@TYPE"/>
  <!-- The calendar configuration node with all details for this type. -->
  <xsl:variable name="config"
      select="$calendar-config/CONFIGURATION/CALENDAR[@TYPE = $calendarType]"/>

  <!-- Main template -->
  <xsl:template match="/CURAM_CALENDAR_DATA">
    <div class="dateBar">
      <xsl:value-of select="$DateBarText"/>
    </div>
    <table width="100%" class="week-view" id="weekView" summary="{$summary}" role="presentation">
      <tbody>
        <tr>
          <td>
            <xsl:attribute name="class">
	      <xsl:text>first-calendar-field</xsl:text>
            </xsl:attribute>
            <xsl:call-template name="print-date">
              <xsl:with-param name="formatted-date" select="$day1format"/>
              <xsl:with-param name="date" select="$startDate" />
            </xsl:call-template>
          </td>
          <td>
            <xsl:attribute name="class">
	      <xsl:text>last-calendar-field</xsl:text>
            </xsl:attribute>
            <xsl:call-template name="print-date">
              <xsl:with-param name="formatted-date" select="$day4format"/>
              <xsl:with-param name="date" select="$startDate + 3" />
            </xsl:call-template>
          </td>
        </tr>
        <tr>
          <td>
            <xsl:attribute name="class">
	      <xsl:text>first-calendar-field</xsl:text>
            </xsl:attribute>
            <xsl:call-template name="print-date">
              <xsl:with-param name="formatted-date" select="$day2format"/>
              <xsl:with-param name="date" select="$startDate + 1" />
            </xsl:call-template>
          </td>
          <td>
            <xsl:attribute name="class">
	      <xsl:text>last-calendar-field</xsl:text>
            </xsl:attribute>
            <xsl:call-template name="print-date">
              <xsl:with-param name="formatted-date" select="$day5format"/>
              <xsl:with-param name="date" select="$startDate + 4" />
            </xsl:call-template>
          </td>
        </tr>
        <tr>
          <td rowspan="2">
            <xsl:attribute name="class">
	      <xsl:text>first-calendar-field</xsl:text>
            </xsl:attribute>
            <xsl:call-template name="print-date">
              <xsl:with-param name="formatted-date" select="$day3format"/>
              <xsl:with-param name="date" select="$startDate + 2" />
            </xsl:call-template>
          </td>
          <td class="weekend-td">
            <xsl:attribute name="class">
	      <xsl:text>last-calendar-field</xsl:text>
            </xsl:attribute>
            <xsl:call-template name="print-date">
              <xsl:with-param name="formatted-date" select="$day6format"/>
              <xsl:with-param name="date" select="$startDate + 5" />
            </xsl:call-template>
          </td>
        </tr>
        <tr>
          <td class="weekend-td">
            <xsl:attribute name="class">
	      <xsl:text>last-calendar-field</xsl:text>
            </xsl:attribute>
            <xsl:call-template name="print-date">
              <xsl:with-param name="formatted-date" select="$day7format"/>
              <xsl:with-param name="date" select="$startDate + 6" />
            </xsl:call-template>
          </td>
        </tr>
      </tbody>
    </table>
  </xsl:template>

  <!-- Draws cell caption hyperlink with date for current month. -->
  <xsl:template name="print-date">
    <xsl:param name="formatted-date"/>
    <xsl:param name="day" />
    <xsl:param name="date" />

    <xsl:variable name="adjusted-date">
      <xsl:choose>
        <xsl:when test="$date &gt; $monthEnd">
          <xsl:value-of select="$date - $monthEnd"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$date"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="adjusted-month">
      <xsl:choose>
        <xsl:when test="$date &gt; $monthEnd">
          <xsl:value-of select="$endMonth"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$startMonth"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <div class="cell-caption">
      <span>
        <xsl:if test="$selectedDay = $adjusted-date">
          <xsl:attribute name="class">
            <xsl:text>current-day-link</xsl:text>
          </xsl:attribute>
        </xsl:if>
        <a href="{concat('?startDate=',
                         tag:getDate($CalendarTag, $adjusted-date,
                                     $adjusted-month, $startYear),
                         $o3Parameters)}">
          <xsl:value-of select="$formatted-date"/>
          <xsl:if test="$selectedDay = $adjusted-date">
            <span class="hidden">
              <xsl:text> - </xsl:text>
              <xsl:value-of select="$todayPrompt"/>
            </span>
          </xsl:if>
        </a>
      </span>
    </div>

    <xsl:call-template name="do-cell-body" >
      <xsl:with-param name="eventDate" select="$adjusted-date" />
      <xsl:with-param name="eventMonth" select="$adjusted-month" />
      <xsl:with-param name="eventYear" select="$startYear" />
    </xsl:call-template>
  </xsl:template>

  <!-- Generates the table containing text of each event in a cell body. -->
  <xsl:template name="do-cell-body">
    <xsl:param name="eventDate"/>
    <xsl:param name="eventMonth"/>
    <xsl:param name="eventYear"/>

    <xsl:variable name="single-day-events"
        select="SINGLE_DAY_EVENT
                  [number(substring(DATE, 9, 2)) = number($eventDate)]
                  [number(substring(DATE, 6, 2)) = number($eventMonth)]
                  [number(substring(DATE, 1, 4)) = number($eventYear)]"/>
    <xsl:variable name="other-events"
        select="EVENT
                  [number(substring(DATE, 9, 2)) = number($eventDate)]
                  [number(substring(DATE, 6, 2)) = number($eventMonth)]
                  [number(substring(DATE, 1, 4)) = number($eventYear)]"/>

    <xsl:if test="$single-day-events or $other-events">
      <table class="week-view-events">
        <tbody>
          <!-- Display single day events first -->
          <xsl:apply-templates select="$single-day-events"/>
          <xsl:apply-templates select="$other-events">
            <xsl:sort select="STARTTIME"/>
          </xsl:apply-templates>
        </tbody>
      </table>
    </xsl:if>
  </xsl:template>

  <!-- Rgular events. -->
  <xsl:template match="EVENT">
    <tr>
      <td>
        <a>
          <xsl:call-template name="add-href"/>
          <xsl:call-template name="add-onclick"/>
          <span class="event-text">
            <xsl:if test="ALL_DAY = 'false'">
              <xsl:apply-templates select="STARTTIME"/>
              <xsl:text> - </xsl:text>
            </xsl:if>
            <xsl:value-of select="DESCRIPTION"/>
          </span>
        </a>
      </td>
    </tr>
  </xsl:template>

  <!-- Single-day events. -->
  <xsl:template match="SINGLE_DAY_EVENT">
    <tr>
      <td>
        <xsl:call-template name="event-type-image"/>
        <a>
          <xsl:call-template name="add-href"/>
          <xsl:call-template name="add-onclick"/>
          <span class="event-text">
            <xsl:value-of select="DESCRIPTION"/>
          </span>
        </a>
      </td>
    </tr>
  </xsl:template>

  <!--
  Determines the hyperlink location of an event description and generates the
  appropriate "href" attribute.
  -->
  <xsl:template name="add-href">
    <xsl:attribute name="href">
      <xsl:value-of select="$config/DESCRIPTION_LOCATION"/>
      <xsl:text>?</xsl:text>
      <xsl:apply-templates select="." mode="determineLink"/>
      <xsl:value-of select="$o3Parameters"/>
    </xsl:attribute>
  </xsl:template>
  
  <!-- Adds the onclick event to the anchor -->
  
  <xsl:template name="add-onclick">
    <xsl:attribute name="onclick">
      <xsl:text>calendarOpenModalDialog(arguments[0], this); return false;</xsl:text>
    </xsl:attribute>
  </xsl:template>

  <!-- Generates parameters for an event's description hyperlink. -->
  <xsl:template match="SINGLE_DAY_EVENT" mode="determineLink">
    <xsl:value-of select="concat('ID=', ID, '&#38;TYPE=', TYPE)"/>
  </xsl:template>

  <!-- Generates parameters for an event's description hyperlink. -->
  <xsl:template match="EVENT" mode="determineLink">
    <xsl:value-of select="concat('ID=', ID,'&#38;RE=', RECURRING,
                                 '&#38;AT=', ATTENDEE, '&#38;RO=', READ_ONLY,
                                 '&#38;LV=', LEVEL, '&#38;AC=', ACCEPTANCE)"/>
  </xsl:template>

  <!-- Matches a start on an event-->
  <xsl:template match="STARTTIME">
    <xsl:value-of select="substring(.,1,5)"/>
  </xsl:template>

  <!-- Template for matching event type to image -->
  <xsl:template name="event-type-image">
    <xsl:variable name="type" select="TYPE"/>

    <xsl:for-each select="$config/../EVENT_TYPES/TYPE[@NAME = $type]">
      <img src="{concat($static-content-server-url, '/', @ICON)}" alt=""/>
      <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
    </xsl:for-each>
  </xsl:template>

</xsl:stylesheet>
