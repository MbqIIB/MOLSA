<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright (c) 2004-2007 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose
such Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:code-table="http://xml.apache.org/xalan/java/curam.omega3.codetable.CodeTableRepository"
  xmlns:domain-info="http://xml.apache.org/xalan/java/curam.util.client.domain.util.DomainUtils"
  xmlns:taglib-util="http://xml.apache.org/xalan/java/curam.omega3.taglib.TagLibUtil"
  xmlns:resources="http://xml.apache.org/xalan/java/curam.omega3.util.CDEJResources"
  exclude-result-prefixes="code-table domain-info taglib-util resources"
  version="1.0">

  <xsl:import href="../common/ui-param.xsl" />

  <!--
  NOTE: While these templates do not have a "match" attribute,
  there will still be a context node if the calling template
  had a context node. This context node is automatically passed
  through to templates called from this template.
  -->

  <!--
  Generate a field. This can be an input or an output and the actual control
  depends on the domain definition.

  $name   The encoded name of the field.
  $title  The title (label) for the field.
  $value  The initial value for the field (optional).
  $domain The domain definition name for the field.
  $mode   The field mode: "in", "out", or "inout".
  $style  The CSS style to apply to the field (optional).
  -->
  <xsl:template name="gen-field">

    <xsl:param name="name" />
    <xsl:param name="title" />
    <xsl:param name="value" />
    <xsl:param name="domain" />
    <xsl:param name="mode" />
    <xsl:param name="style" />

    <xsl:choose>
      <xsl:when test="$mode = 'in'">
        <xsl:call-template name="gen-input-field">
          <xsl:with-param name="name" select="$name" />
          <xsl:with-param name="title" select="$title" />
          <xsl:with-param name="value" select="$value" />
          <xsl:with-param name="domain" select="$domain" />
          <xsl:with-param name="style" select="$style" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:message terminate="yes">
          <xsl:text>ERROR: Unsupported mode in "gen-field".</xsl:text>
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!--
  Generate an input field. The actual control depends on the domain
  definition.

  $name    The encoded name of the field.
  $title   The title (label) for the field.
  $value   The initial value for the field (optional). This is a NodeSet of "AnswerItem" elements
  $domain  The domain definition name for the field.
  $style   The CSS style to apply to the field (optional).
  $id      The value of the XHTML id attribute.
  $onfocus The value of the XHTML onfocus attribute.
  $ct-name Used when a code table without a domain definition
           association (i.e. code tables added through Cúram admin)
           is required. In this case the domain will always be
           "CODETABLE_CODE".
  -->
  <xsl:template name="gen-input-field">

    <xsl:param name="name" />
    <xsl:param name="title" />
    <xsl:param name="value" />
    <xsl:param name="domain" />
    <xsl:param name="style" />
    <xsl:param name="id" />
    <xsl:param name="onfocus" />
    <xsl:param name="ct-name" />

    <!-- Get the domain node set -->
    <xsl:variable name="domain-nodeset"
        select="domain-info:getDomainNodeSet($domain)" />

    <!-- Get the root domain name -->
    <xsl:variable name="root-domain-name"
        select="$domain-nodeset/@root-domain" />

    <!-- Get the code-table name for the domain. -->
    <xsl:variable name="code-table-name">
      <xsl:choose>
        <xsl:when test="$ct-name != ''">
          <xsl:value-of select="$ct-name" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$domain-nodeset/@code-table-name" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!-- Get the code-table data from the code-table repository. -->
    <xsl:variable name="code-table" select="code-table:getCodeTableNodeSet($code-table-name, $locale)"/>

    <!--
    If the id attribute is not specified it must take the
    value of the name attribute. Parameters are immutable so
    we use a local variable
    -->
    <xsl:variable name="element-id">
      <xsl:choose>
         <xsl:when test="$id"><xsl:value-of select="$id"/></xsl:when>
         <xsl:otherwise><xsl:value-of select="$name"/></xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="single-value" select="$value[1]/ItemValue/@value"/>
    <xsl:choose>
      <xsl:when test="$code-table">
        <!-- Note this template takes the AnswerItem node set.
        All the following templates take a single value -->
        <xsl:call-template name="gen-code-table-list-field">
          <xsl:with-param name="name" select="$name" />
          <xsl:with-param name="title" select="$title" />
          <xsl:with-param name="value" select="$value" />
          <xsl:with-param name="code-table" select="$code-table" />
          <xsl:with-param name="style" select="$style" />
          <xsl:with-param name="id" select="$element-id" />
          <xsl:with-param name="onfocus" select="$onfocus" />
        </xsl:call-template>
      </xsl:when>
      <!--
      Frequency patterns are not a curam base type so we cannot do not
      check the root domain since that is simply a SVR_STRING.
      -->
      <xsl:when test="$domain = 'FREQUENCY_PATTERN'">
        <xsl:call-template name="gen-frequency-field">
          <xsl:with-param name="name" select="$name" />
          <xsl:with-param name="title" select="$title" />
          <xsl:with-param name="value" select="$single-value" />
          <xsl:with-param name="style" select="$style" />
          <xsl:with-param name="id" select="$element-id" />
          <xsl:with-param name="onfocus" select="$onfocus" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$domain = 'SVR_BOOLEAN' or $root-domain-name = 'SVR_BOOLEAN'">
        <xsl:choose>
          <xsl:when test="$display-checkbox-for-boolean = 'true'">
            <xsl:call-template name="gen-checkbox-field">
              <xsl:with-param name="name" select="$name" />
                <xsl:with-param name="title" select="$title" />
                <xsl:with-param name="value" select="$value" />
                <xsl:with-param name="style" select="$style" />
                <xsl:with-param name="id" select="$element-id" />
                <xsl:with-param name="onfocus" select="$onfocus" />
              </xsl:call-template>
          </xsl:when>
          <xsl:otherwise>
            <xsl:call-template name="gen-boolean-radio-button-field">
              <xsl:with-param name="name" select="$name" />
              <xsl:with-param name="title" select="$title" />
              <xsl:with-param name="value" select="$single-value" />
              <xsl:with-param name="style" select="$style" />
              <xsl:with-param name="id" select="$element-id" />
              <xsl:with-param name="onfocus" select="$onfocus" />
            </xsl:call-template>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$domain = 'SVR_DATE' or $root-domain-name = 'SVR_DATE'">
        <xsl:call-template name="gen-date-selector-field">
          <xsl:with-param name="name" select="$name" />
          <xsl:with-param name="title" select="$title" />
          <xsl:with-param name="value" select="$single-value" />
          <xsl:with-param name="style" select="$style" />
          <xsl:with-param name="id" select="$element-id" />
          <xsl:with-param name="onfocus" select="$onfocus" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="($domain ='SVR_STRING' or $root-domain-name = 'SVR_STRING') and @numberofvisiblerows and @numberofvisiblerows &gt; 1">
        <xsl:call-template name="gen-text-area-field">
          <xsl:with-param name="name" select="$name" />
          <xsl:with-param name="title" select="$title" />
          <xsl:with-param name="value" select="$single-value" />
          <xsl:with-param name="style" select="$style" />
          <xsl:with-param name="id" select="$element-id" />
          <xsl:with-param name="onfocus" select="$onfocus" />
          <xsl:with-param name="rows" select="@numberofvisiblerows" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="gen-text-input-field">
          <xsl:with-param name="name" select="$name" />
          <xsl:with-param name="title" select="$title" />
          <xsl:with-param name="value" select="$single-value" />
          <xsl:with-param name="style" select="$style" />
          <xsl:with-param name="id" select="$element-id" />
          <xsl:with-param name="onfocus" select="$onfocus" />
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!--
  Generate a text input field.

  $name    The encoded name of the field.
  $title   The title (label) for the field.
  $value   The initial value for the field (optional).
  $style   The CSS style to apply to the field (optional).
  $id      The id of the field. If not specified the value of $name is used
  $onfocus The onfocus attribute for the field. (optional)
  -->
  <xsl:template name="gen-text-input-field">

    <xsl:param name="name" />
    <xsl:param name="title" />
    <xsl:param name="value" select="''" />
    <xsl:param name="style" />
    <xsl:param name="id" />
    <xsl:param name="onfocus" />

    <input type="text" id="{$id}" name="{$name}" value="{$value}"
           title="{$title}">
      <xsl:if test="$style">
        <xsl:attribute name="style">
          <xsl:value-of select="$style" />
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="$onfocus">
        <xsl:attribute name="onfocus">
          <xsl:value-of select="$onfocus" />
        </xsl:attribute>
      </xsl:if>
    </input>

  </xsl:template>

  <!--
  Generate a text area field.

  $name    The encoded name of the field.
  $title   The title (label) for the field.
  $value   The initial value for the field (optional).
  $style   The CSS style to apply to the field (optional).
  $id      The id of the field. If not specified the value of $name is used
  $onfocus The onfocus attribute for the field. (optional)
  $rows    The number of rows in the text area
  -->
  <xsl:template name="gen-text-area-field">

    <xsl:param name="name" />
    <xsl:param name="title" />
    <xsl:param name="value" select="' '" />
    <xsl:param name="style" />
    <xsl:param name="id" />
    <xsl:param name="onfocus" />
    <xsl:param name="rows" />


    <textarea id="{$id}" name="{$name}" title="{$title}"
              rows="{$rows}" cols="20">
      <xsl:if test="$style">
        <xsl:attribute name="style">
          <xsl:value-of select="$style" />
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="$onfocus">
        <xsl:attribute name="onfocus">
          <xsl:value-of select="$onfocus" />
        </xsl:attribute>
      </xsl:if>
      <xsl:choose>
        <xsl:when test="string-length($value) = 0">&#160;</xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$value"/>
        </xsl:otherwise>
      </xsl:choose>
    </textarea>

  </xsl:template>

  <!--
  Generate a code-table drop-down list field. A blank entry is always added
  to the list and is used as the default value.

  $name       The encoded name of the field.
  $title      The title (label) for the field.
  $value      The initial value for the field (optional). A NodeSet of AnswerItem elements.
  $code-table The code-table node set.
  $style      The CSS style to apply to the field (optional).
  $id         The id of the field. If not specified the value of $name is used
  $onfocus    The onfocus attribute for the field. (optional)
  -->
  <xsl:template name="gen-code-table-list-field">

    <xsl:param name="name" />
    <xsl:param name="title" />
    <xsl:param name="value" />
    <xsl:param name="code-table" />
    <xsl:param name="style" />
    <xsl:param name="id" />
    <xsl:param name="onfocus" />

    <!-- Need to identify a multi-select widget with an extra prefix so
         to associate it with the XXXRequestItem class.
    -->
    <xsl:variable name="widget-name">
      <xsl:choose>
        <xsl:when test="@listtype = 'multi'">
          <xsl:value-of select="concat($name, '.msl')" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$name" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <select id="{$id}" name="{$widget-name}" title="{$title}"
            class="{$code-table-list-class}">

      <xsl:if test="$style">
        <xsl:attribute name="style">
          <xsl:value-of select="$style" />
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="$onfocus">
        <xsl:attribute name="onfocus">
          <xsl:value-of select="$onfocus" />
        </xsl:attribute>
      </xsl:if>

      <!-- Set the number of visible rows. Note that an attribute from
           the Question element is used rather than template parameter
        -->
      <xsl:if test="@numberofvisiblerows">
        <xsl:attribute name="size">
          <xsl:value-of select="@numberofvisiblerows" />
        </xsl:attribute>
      </xsl:if>
      <!-- Enable multi-select if required. Note that an attribute from
           the Question element is used rather than template parameter
        -->
      <xsl:if test="@listtype = 'multi'">
        <xsl:attribute name="multiple" >
          <xsl:text>multiple</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <!-- Insert a blank entry if required. Note that an attribute from
           the Question element is used rather than template parameter
        -->
      <xsl:if test="@blankdefaultentry = 'true'">
              <option value=""></option>
      </xsl:if>

      <xsl:for-each select="$code-table/item">
        <xsl:if test="@enabled='true'">
          <xsl:variable name="tmp-code" select="@code" />
          <option value="{@code}">
            <xsl:variable name="selected">
              <xsl:for-each select="$value">
                <xsl:if test="$tmp-code = ./ItemValue/@value">
                 <xsl:text>true</xsl:text>
                </xsl:if>
              </xsl:for-each>
            </xsl:variable>
            <xsl:if test="string-length($selected) > 0">
              <xsl:attribute name="selected">
                <xsl:text>selected</xsl:text>
              </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="description/text()" />
          </option>
        </xsl:if>
      </xsl:for-each>
    </select>

  </xsl:template>

  <!--
  Generate a checkbox field.

  $name    The encoded name of the field.
  $title   The title (label) for the field.
  $value   The initial value for the field (optional).
  $style   The CSS style to apply to the field (optional).
  $id      The id of the field. If not specified the value of $name is used
  $onfocus The onfocus attribute for the field. (optional)
  -->
  <xsl:template name="gen-checkbox-field">

    <xsl:param name="name" />
    <xsl:param name="title" />
    <xsl:param name="value" />
    <xsl:param name="style" />
    <xsl:param name="id" />
    <xsl:param name="onfocus" />
    <input type="checkbox" id="{$id}" name="{$name}.true" value="true"
           title="{$title}">
      <xsl:if test="$value = 'true'">
        <xsl:attribute name="checked">
          <xsl:text>checked</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="$onfocus">
        <xsl:attribute name="onfocus">
          <xsl:value-of select="$onfocus" />
        </xsl:attribute>
      </xsl:if>
    </input>
    <!-- need a second hidden fields to submit "false" -->
    <input type="hidden" name="{$name}" value="false" />

  </xsl:template>

  <!--
  Generate a radio button group to represent a boolean.

  $name    The encoded name of the field.
  $title   The title (label) for the field.
  $value   The initial value for the field (optional).
  $style   The CSS style to apply to the field (optional).
  $id      The id of the field. If not specified the value of $name is used
  $onfocus The onfocus attribute for the field. (optional)
  -->
  <xsl:template name="gen-boolean-radio-button-field">

    <xsl:param name="name" />
    <xsl:param name="title" />
    <xsl:param name="value" />
    <xsl:param name="style" />
    <xsl:param name="id" />
    <xsl:param name="onfocus" />

    <input type="radio" id="{$id}.true" name="{$name}" value="true"
           title="{$title}">
      <xsl:if test="$value = 'true'">
        <xsl:attribute name="checked">
          <xsl:text>checked</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="$onfocus">
        <xsl:attribute name="onfocus">
          <xsl:value-of select="$onfocus" />
        </xsl:attribute>
      </xsl:if>
    </input><span class="radio-group-separator" style="font: bold 9pt;"><xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'radio.yes.title')"/></span>
    <input type="radio" id="{$id}.false" name="{$name}" value="false"
           title="{$title}">
      <xsl:if test="$value = '' or $value = 'false'">
        <xsl:attribute name="checked">
          <xsl:text>checked</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="$onfocus">
        <xsl:attribute name="onfocus">
          <xsl:value-of select="$onfocus" />
        </xsl:attribute>
      </xsl:if>
    </input><span class="radio-group-separator" style="font: bold 9pt;"><xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'radio.no.title')"/></span>
  </xsl:template>

  <!--
  Generate a date field with a popup calendar.

  $name    The encoded name of the field.
  $title   The title (label) for the field.
  $value   The initial value for the field (optional).
  $style   The CSS style to apply to the field (optional).
  $id      The id of the field. If not specified the value of $name is used
  $onfocus The onfocus attribute for the field. (optional)
  -->
  <xsl:template name="gen-date-selector-field">

    <xsl:param name="name" />
    <xsl:param name="title" />
    <xsl:param name="value" select="''" />
    <xsl:param name="style" />
    <xsl:param name="id" />
    <xsl:param name="onfocus" />

   <input title="{$title}" id="{$id}"
     name="{$name}" type="text" style="width: 88%;"
     onfocus="{$onfocus}" value="{$value}"/>
   <a href="" class="popup-action"
      onclick="storePopupInputFromWidget('dateSelectorInitDate','{$id}');addPopupMapping('{$id}','return_date','{$id}');openPopupFromDomain('{$id}_a','{$id}','SVR_DATE','');return false;" name="{$id}_a" id="{$id}_a" >
     <img src="../themes/classic/images/icons/date-selector.gif">
       <xsl:attribute name="alt">
         <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'date.tooltip')"/>
       </xsl:attribute>
     </img>
   </a>

  </xsl:template>

  <!--
  Generate a date time field with a popup calendar.

  $name    The encoded name of the field.
  $title   The title (label) for the field.
  $value   The initial value for the field (optional).
  $style   The CSS style to apply to the field (optional).
  $id      The id of the field. If not specified the value of $name is used
  $onfocus The onfocus attribute for the field. (optional)
  -->
  <xsl:template name="gen-date-time-selector-field">

    <xsl:param name="name" />
    <xsl:param name="title" />
    <xsl:param name="value" select="''" />
    <xsl:param name="style" />
    <xsl:param name="id" />
    <xsl:param name="onfocus" />

    <input title="{$title}" id="{$id}"
      name="{$name}" type="text" style="width: 50%;"
      onfocus="{$onfocus}" value="{$value}"/>
    <a href="" class="popup-action"
      onclick="storePopupInputFromWidget('dateSelectorInitDate','{$id}');addPopupMapping('{$id}','return_date','{$id}');openPopupFromDomain('{$id}_a','{$id}','SVR_DATETIME','');return false;"
      name="{$id}_a" id="{$id}_a">
     <img src="../themes/classic/images/icons/date-selector.gif">
       <xsl:attribute name="alt">
         <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'date.tooltip')"/>
       </xsl:attribute>
     </img>
    </a>
    <select title="{$title}"
      id="{$id}.HOUR" name="{$id}.HOUR">
      <xsl:if test="$onfocus">
        <xsl:attribute name="onfocus">
          <xsl:value-of select="$onfocus" />
        </xsl:attribute>
      </xsl:if>
      <option selected="selected"/>
      <option>00</option>
      <option>01</option>
      <option>02</option>
      <option>03</option>
      <option>04</option>
      <option>05</option>
      <option>06</option>
      <option>07</option>
      <option>08</option>
      <option>09</option>
      <option>10</option>
      <option>11</option>
      <option>12</option>
      <option>13</option>
      <option>14</option>
      <option>15</option>
      <option>16</option>
      <option>17</option>
      <option>18</option>
      <option>19</option>
      <option>20</option>
      <option>21</option>
      <option>22</option>
      <option>23</option>
    </select>:<select title="{$title}"
      id="{$id}.MIN" name="{$id}.MIN">
      <xsl:if test="$onfocus">
        <xsl:attribute name="onfocus">
          <xsl:value-of select="$onfocus" />
        </xsl:attribute>
      </xsl:if>
      <option selected="selected"/>
      <option>00</option>
      <option>01</option>
      <option>02</option>
      <option>03</option>
      <option>04</option>
      <option>05</option>
      <option>06</option>
      <option>07</option>
      <option>08</option>
      <option>09</option>
      <option>10</option>
      <option>11</option>
      <option>12</option>
      <option>13</option>
      <option>14</option>
      <option>15</option>
      <option>16</option>
      <option>17</option>
      <option>18</option>
      <option>19</option>
      <option>20</option>
      <option>21</option>
      <option>22</option>
      <option>23</option>
      <option>24</option>
      <option>25</option>
      <option>26</option>
      <option>27</option>
      <option>28</option>
      <option>29</option>
      <option>30</option>
      <option>31</option>
      <option>32</option>
      <option>33</option>
      <option>34</option>
      <option>35</option>
      <option>36</option>
      <option>37</option>
      <option>38</option>
      <option>39</option>
      <option>40</option>
      <option>41</option>
      <option>42</option>
      <option>43</option>
      <option>44</option>
      <option>45</option>
      <option>46</option>
      <option>47</option>
      <option>48</option>
      <option>49</option>
      <option>50</option>
      <option>51</option>
      <option>52</option>
      <option>53</option>
      <option>54</option>
      <option>55</option>
      <option>56</option>
      <option>57</option>
      <option>58</option>
      <option>59</option>
    </select>

  </xsl:template>

  <!--
  Generate a frequency pattern selector

  $name    The encoded name of the field.
  $title   The title (label) for the field.
  $value   The initial value for the field (optional).
  $style   The CSS style to apply to the field (optional).
  $id      The id of the field. If not specified the value of $name is used
  $onfocus The onfocus attribute for the field. (optional)
  -->
  <xsl:template name="gen-frequency-field">

    <xsl:param name="name" />
    <xsl:param name="title" />
    <xsl:param name="value" select="''" />
    <xsl:param name="style" />
    <xsl:param name="id" />
    <xsl:param name="onfocus" />

    <xsl:variable name="freq-desc" select="taglib-util:translateFrequencyPattern($value, $locale)" />
    <span class="popup-field">
      <span class="question-value desc" id="{$id}_desc">
        <xsl:attribute name="title">
          <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'frequency.description.title')"/>
        </xsl:attribute>
        <xsl:value-of select="$freq-desc"/>&#160;
      </span>
      <!--
          Give the hidden field for the description another prefix to prevent it from being
          processed when the form is submitted.
        -->
      <input id="{$id}_deschf" type="hidden" name="__o3iegfp.{$id}_deschf" value="{$freq-desc}"/>
      <input id="{$id}_value" type="hidden" name="{$name}" value="{$value}"/>
      <span class="popup-actions">
	      <a href="" onclick="storePopupInputFromWidget('initFreq','{$id}_value');addPopupMapping('{$id}','freq_data','{$id}_value');addPopupMapping('{$id}','freq_text','{$id}_desc');addPopupMapping('{$id}','freq_text','{$id}_deschf');openPopupFromDomain('{$id}_a','{$id}','FREQUENCY_PATTERN','');;return false;" name="{$id}_a" id="{$id}_a" >
	       <img src="../themes/classic/images/icons/frequency-editor.gif">
	         <xsl:attribute name="alt">
	           <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'frequency.tooltip')"/>
	         </xsl:attribute>
	       </img>
	      </a>
	      <img src="../themes/classic/images/icons/clear-popup.gif" id="{$id}_clear" onclick="clearPopup(this,arguments[0])">
	        <xsl:attribute name="alt">
	          <xsl:value-of select="resources:getProperty('curam.omega3.i18n.IEGPlayer', 'clear.value.tooltip')"/>
	        </xsl:attribute>
	      </img>
      </span>
    </span>
  </xsl:template>

</xsl:stylesheet>
