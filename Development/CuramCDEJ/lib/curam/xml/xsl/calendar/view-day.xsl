<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright © 2004 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose
such Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="no" omit-xml-declaration="yes"/>

  <!--The supplied NodeSet containing the calendar config data.-->
  <xsl:param name="calendar-config" />
  <!-- 12 or 24 hour mode -->
  <xsl:param name="app-time-format"/>
  <!-- The current date to match events against -->
  <xsl:param name="EventDate"/>
  <!-- The Current Date variable is supplied by the Transformer object in the calendar jsp  tag. -->
  <xsl:param name="CurrentDate" />
  <!-- The Text of the Date Bar -->
  <xsl:param name="DateBarText"/>
  <!-- This parameter contains any __o3xxx parameters that need to be passed on.-->
  <xsl:param name="o3Parameters"/>
  <!-- User current locale -->
  <xsl:param name="locale" />
  <!-- The url of the web server with static content -->
  <xsl:param name="static-content-server-url"/>

  <!--The details page associated with this calendar.-->
  <xsl:variable name="calendarType" select="CURAM_CALENDAR_DATA/@TYPE"/>
  <!--The calendar configuration node with all details of calendar for this type.-->
  <xsl:variable name="config"
	              select="$calendar-config/CONFIGURATION/CALENDAR[@TYPE =$calendarType]" />
  <xsl:variable name="mode-override">
    <xsl:choose>
      <xsl:when test="$config/DAY_VIEW_TIME_FORMAT">
        <xsl:value-of select="$config/DAY_VIEW_TIME_FORMAT"/>
      </xsl:when>
      <xsl:otherwise><xsl:value-of select="$app-time-format"/></xsl:otherwise>
      </xsl:choose>
  </xsl:variable>

  <!-- The table summary -->
  <xsl:param name="summary"/>
  <xsl:attribute-set name="dateBar" >
    <xsl:attribute name="class">dateBar</xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="dateBarCol">
    <xsl:attribute name="colSpan">7</xsl:attribute>
    <xsl:attribute name="align">middle</xsl:attribute>
  </xsl:attribute-set>

  <!-- This template match functions as the main loop for placing all events in the correct positions on a page. -->
  <xsl:template match="/CURAM_CALENDAR_DATA">
    <div xsl:use-attribute-sets="dateBar">
      <xsl:value-of select="$DateBarText"/>
    </div>
    <table>
      <xsl:attribute name="summary"><xsl:value-of select="$summary" /></xsl:attribute>
      <xsl:attribute name="id">dayView</xsl:attribute>
      <xsl:attribute name="width">100%</xsl:attribute>
      <xsl:attribute name="cellpadding">5</xsl:attribute>
      <xsl:attribute name="class">dayView</xsl:attribute>
      <tbody>
        <xsl:call-template name="all_day"></xsl:call-template>
        <xsl:call-template name="print-hour">
          <xsl:with-param name="first-hour" select="7"/>
          <xsl:with-param name="last-hour" select="23"/>
          <xsl:with-param name="mode" select="$mode-override"/>
          <xsl:with-param name="counter" select="2"/>
        </xsl:call-template>
      </tbody>
    </table>
  </xsl:template>

  <!--This template functions as the main template for the day view. It prints out each hour in half hour increments recursively. Any non all-day events are inserted here according to their start times.-->
  <xsl:template name="print-hour">
    <!-- first-hour  - The first hour to include in the range -->
    <xsl:param name="first-hour"/>
    <!-- last-hour   - The last hour to include in the range -->
    <xsl:param name="last-hour"/>
    <!-- mode         - '12' for am/pm display or '24' for 24hr clock display-->
    <xsl:param name="mode"/>
    <!--counter         - row counter, used for calculating location of events in right-hand column.-->
    <xsl:param name="counter"/>
      <xsl:if test="$first-hour &lt;= $last-hour">
        <tr>
          <xsl:if test="$counter mod 2 = 0">
            <th align="right" rowspan="2" class="dayViewRow">
              <a>
                <xsl:attribute name="href">
                  <xsl:call-template name="createLink">
                    <xsl:with-param name="hour" select="$first-hour"/>
                  </xsl:call-template>
                </xsl:attribute>
                <xsl:choose>
                  <xsl:when test="$mode = 12">
                    <xsl:variable name="hour-value" select="$first-hour - 12*number($first-hour &gt; 12)"/>
                    <xsl:if test="$hour-value &lt; 10">0</xsl:if>
                    <xsl:value-of select="$hour-value"/>
                    <xsl:choose>
                    <xsl:when test="$first-hour = 12">
                      <sup>pm</sup>
                    </xsl:when>
                    <xsl:when test="$first-hour = 7">
                      <sup>am</sup>
                    </xsl:when>                    
                    <xsl:otherwise>
                      <sup>00</sup>
                    </xsl:otherwise>
                    </xsl:choose>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:if test="$first-hour &lt; 10">0</xsl:if>
                    <xsl:value-of select="$first-hour"/>
                    <sup>00</sup>
                  </xsl:otherwise>
                </xsl:choose>
              </a>
            </th>
          </xsl:if>
          <td>
            <xsl:if test="$counter = 2">
              <!-- Any events before the start time should go here -->
              <xsl:for-each select="EVENT[number(substring(STARTTIME,1,2)) &lt; number($first-hour)]
                                                               [ALL_DAY = 'false'][./DATE = $EventDate]">
                <xsl:sort select="STARTTIME"/>
                <xsl:apply-templates select="."/>
              </xsl:for-each>
            </xsl:if>
            <xsl:for-each select="EVENT[number(substring(STARTTIME,1,2)) = number($first-hour)]
                                            [($counter mod 2)=((substring(STARTTIME,4,2)) &gt;= 30)]
                                                                [ALL_DAY = 'false'][./DATE = $EventDate]">
              <xsl:sort select="STARTTIME"/>
              <xsl:apply-templates select="."/>
            </xsl:for-each>
          </td>
        </tr>
        <xsl:call-template name="print-hour">
          <xsl:with-param name="counter" select="$counter + 1"/>
          <xsl:with-param name="first-hour" select="$first-hour + ($counter mod 2)"/>
          <xsl:with-param name="last-hour" select="$last-hour"/>
          <xsl:with-param name="mode" select="$mode"/>
        </xsl:call-template>
      </xsl:if>
    </xsl:template>

    <!-- Matches an event and applies the appropriate template-->
    <xsl:template match="EVENT">
      <div class="event">
        <xsl:apply-templates select="STARTTIME"/>
        <xsl:text> - </xsl:text>
        <xsl:apply-templates select="ENDTIME"/>
        <xsl:text> </xsl:text>
        <a>
          <xsl:attribute name="href">
            <xsl:call-template name="determineLink">
              <xsl:with-param name="event" select="."/>
            </xsl:call-template>
          </xsl:attribute>
          <xsl:call-template name="add-onclick"/>
          <xsl:value-of select="DESCRIPTION"/>
        </a>
      </div>
      <br/>
    </xsl:template>

    <!-- This template matches all day events and single day events for the top of the day view-->
    <xsl:template name="all_day">
      <xsl:if test="count(EVENT[ALL_DAY ='true']) > 0 or count(SINGLE_DAY_EVENT)">
        <tr>
          <td align="right" style="width: 25px;">
            <xsl:attribute name="class">
	      <xsl:text>first-calendar-field</xsl:text>
            </xsl:attribute>
          </td>
          <td class="all-day-events-cell">
            <xsl:for-each select="SINGLE_DAY_EVENT">
              <xsl:if test="./DATE = $EventDate">
                <div class="event"><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                  <xsl:call-template name="event-type-image">
                    <xsl:with-param name="type" select="./TYPE" />
                  </xsl:call-template>
                  <a>
                    <xsl:attribute name="href">
                      <xsl:call-template name="determineLink" />
                    </xsl:attribute>
                    <xsl:call-template name="add-onclick"/>
                    <xsl:value-of select="DESCRIPTION"/>
                  </a>
                </div>
              </xsl:if>
            </xsl:for-each>
            <xsl:for-each select="EVENT[ALL_DAY = 'true']">
              <xsl:if test="./DATE = $EventDate">
                <div class="event"><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                  <a>
                    <xsl:attribute name="href">
                     <xsl:call-template name="determineLink"></xsl:call-template>
                    </xsl:attribute>
                    <xsl:call-template name="add-onclick"/>
                    <xsl:value-of select="DESCRIPTION"/>
                  </a>
                </div>
              </xsl:if>
            </xsl:for-each>
          </td>
        </tr>
      </xsl:if>
    </xsl:template>

    <!-- This template determines the hyperlink location of an event description-->
    <xsl:template name="determineLink">
      <!-- eventID The ID of this event -->
      <xsl:value-of select="$config/DESCRIPTION_LOCATION"/>?<xsl:apply-templates select="." mode="determineLink"/><xsl:value-of select="$o3Parameters"/>
    </xsl:template>

    <!-- This template generates parameters for an event's description hyperlink.-->
    <xsl:template match="EVENT" mode="determineLink">
      <xsl:value-of select="concat('ID=', ID,'&#38;RE=', RECURRING,
                                   '&#38;AT=', ATTENDEE, '&#38;RO=', READ_ONLY,
                                   '&#38;LV=', LEVEL, '&#38;AC=', ACCEPTANCE)"/>
    </xsl:template>

    <!-- This template generates parameters for an event's description hyperlink.-->
    <xsl:template match="SINGLE_DAY_EVENT" mode="determineLink">
      <xsl:value-of select="concat('ID=', ID, '&#38;TYPE=', TYPE)"/>
    </xsl:template>

    <!-- This template generates a hyperlink for creating a new event.-->
    <xsl:template name="createLink">
      <!-- start time of this event -->
      <xsl:param name="hour"/>
      <xsl:text>?startTime=</xsl:text>
      <xsl:number value="$hour" format="01"/>
      <xsl:text>:00:00&#38;startDate=</xsl:text>
      <xsl:value-of select="$CurrentDate"/>
      <xsl:value-of select="$o3Parameters"/>
    </xsl:template>

    <!-- Matches a start or end time on an event-->
    <xsl:template match="STARTTIME|ENDTIME">
      <xsl:value-of select="substring(.,1,5)"/>
    </xsl:template>

    <!-- Template for matching event type to image -->
    <xsl:template name="event-type-image">
      <xsl:param name="type" />
      <xsl:if test="$config/../EVENT_TYPES">
        <xsl:for-each select="$config/../EVENT_TYPES/TYPE">
          <xsl:if test="@NAME = $type" >
            <img src="{$static-content-server-url}/{@ICON}" alt=""></img>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
          </xsl:if>
        </xsl:for-each>
      </xsl:if>
    </xsl:template>
  
   <!-- Adds the onclick event to the anchor -->
  <xsl:template name="add-onclick">
    <xsl:attribute name="onclick">
        <xsl:text>calendarOpenModalDialog(arguments[0], this); return false;</xsl:text>
    </xsl:attribute>
  </xsl:template>
</xsl:stylesheet>