<?xml version="1.0" encoding="UTF-8"?>
<!-- 
	Copyright 2008 Curam Software Ltd.
	All rights reserved.
	
	This software is the confidential and proprietary information of Curam
	Software, Ltd. ("Confidential Information").  You shall not disclose such
	Confidential Information and shall use it only in accordance with the
	terms of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fn="http://www.w3.org/2005/02/xpath-functions">
	<xsl:template match="Include[RelativePath]">
		<!-- look up the document with the relative path and copy its contents -->
		<xsl:variable name="relativePath">
			<xsl:value-of select="./RelativePath/@value"/>
		</xsl:variable>
		<!--
		<xsl:message terminate="no">Processing relative path: <xsl:value-of select="$relativePath"/></xsl:message>
		-->

		<xsl:if test="not(document($relativePath, .))">
			<xsl:message terminate="yes">Could not find file <xsl:value-of select="$relativePath"/>
				included in rule set.</xsl:message>
		</xsl:if>
		
		<xsl:text>
</xsl:text>
		<xsl:comment>Start inclusion of <xsl:value-of select="$relativePath"/></xsl:comment>
		<xsl:text>
</xsl:text>
		<xsl:choose>
			<xsl:when test="document($relativePath, .)/RuleSet">
				<!-- Root node is a RuleSet - include its contents-->
				<xsl:apply-templates select="document($relativePath, .)/RuleSet/*"/>
			</xsl:when>
			<xsl:otherwise>
				<!-- Root node is not a RuleSet - include it directly -->
				<xsl:apply-templates select="document($relativePath, .)"/>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>
</xsl:text>
		<xsl:comment>End inclusion of <xsl:value-of select="$relativePath"/></xsl:comment>
		<xsl:text>
</xsl:text>
	</xsl:template>

	<xsl:template match="@*|node()|text()">
		<!--identity for all other nodes-->
		<xsl:copy>
			<xsl:apply-templates select="@*|node()|text()"/>
		</xsl:copy>
	</xsl:template>
</xsl:stylesheet>
