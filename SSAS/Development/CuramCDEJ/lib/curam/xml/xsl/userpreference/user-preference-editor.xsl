<?xml version="1.0" encoding="UTF-8"?>
<!--
  Copyright (c) 2006-2008 Curam Software Ltd.
  All rights reserved.

  This software is the confidential and proprietary information of Curam
  Software, Ltd. ("Confidential Information"). You shall not disclose
  such Confidential Information and shall use it only in accordance with the
  terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:code-table="http://xml.apache.org/xalan/java/curam.omega3.codetable.CodeTableRepository"
  xmlns:domain-info="http://xml.apache.org/xalan/java/curam.util.client.domain.util.DomainUtils"
  xmlns:bidi-utils="http://xml.apache.org/xalan/java/curam.util.client.BidiUtils"
  exclude-result-prefixes="code-table domain-info bidi-utils" version="1.0">
  <xsl:import href="../common/ui-field.xsl"/>
  <xsl:output method="xml" indent="no" omit-xml-declaration="yes"/>
  <xsl:param name="locale"/>
  <xsl:param name="yes"/>
  <xsl:param name="no"/>
  <xsl:param name="externalUserInd"/>
  
    <xsl:template match="/PreferenceSet">
      <xsl:for-each select="Preference">
      <!-- Create and set the visibleAttribute, if the user is external, then set the 
           visibleAttribute to be the value of externalVisible, otherwise the user must
           be internal, so set the visibleAttribute to be the value of visible. -->
      <xsl:variable name="falseConstant" select="'false'"/>
      <xsl:variable name="trueConstant" select="'true'" />
      <xsl:variable name="visibleAttribute">
        <xsl:choose>
          <xsl:when test="$externalUserInd = 'true'">
            <xsl:choose>
              <!-- As the externalVisible element is optional, we need to check for its
                   existence. If it does not exist, then set the visibleAttribute to false -->
              <xsl:when test="./externalVisible">
                <xsl:value-of select="./externalVisible"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="$falseConstant"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:when>
          <xsl:otherwise>
            <xsl:choose>
            <!-- As the visible element is optional, we need to check for its existence. 
                 If it does not exist, then set the visibleAttribute to true -->
              <xsl:when test="./visible">
                <xsl:value-of select="./visible"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="$trueConstant"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <xsl:variable name="field-name" select="concat('__o3urpf.userPreferenceBean.userPreferenceList$userPrefXML.', ./type)"/>
      <xsl:choose>
        <xsl:when test="$visibleAttribute = 'true'">
        <tr>
          <th class="label">
          	<span class="label">
          		<xsl:attribute name="dir">
          		  <xsl:value-of select="bidi-utils:getResolvedBaseTextDirection(./title)"/>
          		</xsl:attribute>          	
          		<xsl:value-of select="./title" />
          	</span>
          </th>
          <td class="field">
            <xsl:choose>
              <xsl:when test="./readonly = 'true'">
                <xsl:call-template name="read-only-field">
                  <xsl:with-param name="name" select="concat(concat(concat(concat($field-name, '.'), $locale), '.'), @name)"/>
                  <xsl:with-param name="title" select="title"/>
                  <xsl:with-param name="value" select="value"/>
                  <xsl:with-param name="domain" select="type"/>
                </xsl:call-template>
              </xsl:when>
              <xsl:otherwise>
                <xsl:call-template name="gen-field">
                  <xsl:with-param name="name" select="concat(concat(concat(concat($field-name, '.'), $locale), '.'), @name)"/>
                  <xsl:with-param name="title" select="title"/>
                  <xsl:with-param name="value" select="value"/>
                  <xsl:with-param name="domain" select="type"/>
                </xsl:call-template>
              </xsl:otherwise>
            </xsl:choose>
          </td>
        </tr>
        </xsl:when>
        <!-- Output the hidden input field when a preference option is set to invisible -->
        <xsl:otherwise>
        <tr>
          <th class="hidden-label"></th>
          <td class="hidden-field">
            <xsl:variable name="name" select="concat(concat(concat(concat($field-name, '.'), $locale), '.'), @name)"/>
            <input type="hidden" name="{$name}" value="{value}" title="{title}"/>
          </td>
        </tr>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:for-each>
            
    </xsl:template>

    <!-- Handles read only rendering of userpreference fields -->
    <xsl:template name="read-only-field">
      <xsl:param name="name" />
      <xsl:param name="title" />
      <xsl:param name="value" />
      <xsl:param name="domain"/>
      
      <xsl:variable name="ct-name" select="domain-info:getDomainNodeSet($domain)/@code-table-name" />
      
      <!-- Handles generation of hidden input fields depending on type -->
      <xsl:choose>
         <xsl:when test="$ct-name">
           <xsl:variable name="code-table" select="code-table:getCodeTableNodeSet($ct-name, $locale)" />
           <xsl:for-each select="$code-table/item">
              <xsl:if test="@code = $value">
                <span class="read-only">
                  <xsl:attribute name="dir">
                    <xsl:value-of select="bidi-utils:getResolvedBaseTextDirection(description/text())"/>
                  </xsl:attribute>                
                  <xsl:value-of select="description/text()" />
                </span>
                <input type="hidden" name="{$name}" value="{$value}" title="{$title}"/>
              </xsl:if>
           </xsl:for-each>
         </xsl:when>
         <xsl:when test="./type = 'SVR_BOOLEAN'">
             <xsl:choose>
                 <xsl:when test="./value = 'true'">
                   <span class="read-only"><xsl:value-of select="$yes"/></span>
                   <input type="hidden" name="{$name}" title="{$title}" value="true" />
                 </xsl:when>
                 <xsl:otherwise>
                   <span class="read-only"><xsl:value-of select="$no"/></span>
                   <input type="hidden" name="{$name}" title="{$title}" value="false" />
                 </xsl:otherwise>
             </xsl:choose>
         </xsl:when>
         <xsl:otherwise>
             <span class="read-only"><xsl:value-of select="value" /></span>
             <input type="hidden" name="{$name}" value="{$value}" title="{$title}"/>
         </xsl:otherwise>
      </xsl:choose>

    </xsl:template>

    <!-- Handles generation of userpreference fields depending on type -->
    <xsl:template name="gen-field">
      <xsl:param name="name" />
      <xsl:param name="title" />
      <xsl:param name="value" />
      <xsl:param name="domain" />
      <xsl:param name="style" />

      <xsl:variable name="ct-name"
        select="domain-info:getDomainNodeSet($domain)/@code-table-name" />

      <xsl:variable name="domain-nodeset"
        select="domain-info:getDomainNodeSet($domain)" />

      <xsl:variable name="root-domain-name" select="$domain-nodeset/@root-domain" />

      <xsl:choose>
        <xsl:when test="$ct-name">
          <xsl:variable name="code-table" select="code-table:getCodeTableNodeSet($ct-name, $locale)" />
          <xsl:call-template name="gen-code-table-list-field">
            <xsl:with-param name="name" select="$name" />
            <xsl:with-param name="title" select="$title" />
            <xsl:with-param name="value" select="$value" />
            <xsl:with-param name="code-table" select="$code-table" />
            <xsl:with-param name="style" select="$style" />
          </xsl:call-template>
        </xsl:when>
         <xsl:when test="./type = 'SVR_BOOLEAN'">
            <xsl:choose>
                <xsl:when test="./value = 'true'">
                    <input class="radio-yes" type="radio" name="{$name}" title="{$title}" checked="checked" value="true"><xsl:value-of select="$yes"/></input>
                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                    <input class="radio-no" type="radio" name="{$name}" title="{$title}" value="false"><xsl:value-of select="$no"/></input>
                </xsl:when>
                <xsl:otherwise>
                    <input class="radio-yes" type="radio" name="{$name}" title="{$title}" value="true"><xsl:value-of select="$yes"/></input>
                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                    <input class="radio-no" type="radio" name="{$name}" title="{$title}" value="false" checked="checked"><xsl:value-of select="$no"/></input>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:when>
        <xsl:otherwise>
            <input class="non-radio" type="text" name="{$name}" value="{$value}" title="{$title}"/>
        </xsl:otherwise>
      </xsl:choose>

    </xsl:template>

</xsl:stylesheet>