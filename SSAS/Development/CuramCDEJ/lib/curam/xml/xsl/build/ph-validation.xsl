<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<axsl:stylesheet xmlns:axsl="http://www.w3.org/1999/XSL/Transform" xmlns:sch="http://www.ascc.net/xml/schematron" version="1.0">
<axsl:include href="../common/string-utils.xsl"/>
<axsl:output method="text"/>
<axsl:variable select="'\:()|'" name="chars-to-escape"/>
<axsl:template mode="schematron-get-full-path" match="*|@*">
<axsl:apply-templates mode="schematron-get-full-path" select="parent::*"/>
<axsl:text>/</axsl:text>
<axsl:if test="count(. | ../@*) = count(../@*)">@</axsl:if>
<axsl:value-of select="name()"/>
<axsl:text>[</axsl:text>
<axsl:value-of select="1+count(preceding-sibling::*[name()=name(current())])"/>
<axsl:text>]</axsl:text>
</axsl:template>
<axsl:template match="/">
<axsl:apply-templates mode="M0" select="/"/>
</axsl:template>
<axsl:template mode="M0" priority="4000" match="PARAMETER">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file' or name() = 'NAME')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'PARAMETER'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'NAME'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@NAME) or @NAME=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'PARAMETER'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'NAME'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="*">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_NOT_EMPTY</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'PARAMETER'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3999" match="TOOLBAR_REF">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file' or name() = 'FILE_NAME')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TOOLBAR_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FILE_NAME'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@FILE_NAME) or @FILE_NAME=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TOOLBAR_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FILE_NAME'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="*">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_NOT_EMPTY</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TOOLBAR_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3998" match="TOOLBAR">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TOOLBAR'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="''"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:choose>
<axsl:when test="count(*) = count(GROUP)"/>
<axsl:otherwise>
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_UNEXPECTED_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TOOLBAR'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'GROUP'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:otherwise>
</axsl:choose>
<axsl:if test="not(GROUP)">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TOOLBAR'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'GROUP'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3997" match="SECTION_REF">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file' or name() = 'FILE_NAME')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FILE_NAME'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@FILE_NAME) or @FILE_NAME=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FILE_NAME'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="*">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_NOT_EMPTY</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3996" match="SECTION">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file' or name() = 'TITLE' or name() = 'PAGE_ID' or name() = 'ID' or name() = 'DESCRIPTION')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TITLE, PAGE_ID, ID, DESCRIPTION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@TITLE) or @TITLE=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TITLE'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@PAGE_ID) or @PAGE_ID=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'PAGE_ID'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@ID) or @ID=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'ID'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:choose>
<axsl:when test="count(*) = count(MENU | MENU_REF)"/>
<axsl:otherwise>
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_UNEXPECTED_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'MENU, MENU_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:otherwise>
</axsl:choose>
<axsl:if test="not(MENU)">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'MENU'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3995" match="MENU_REF">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file' or name() = 'FILE_NAME')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'MENU_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FILE_NAME'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@FILE_NAME) or @FILE_NAME=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'MENU_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FILE_NAME'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="*">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_NOT_EMPTY</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'MENU_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3994" match="MENU">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file' or name() = 'NAVIGATION_MENU_LINK_ID' or name() = 'ID')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'MENU'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'NAVIGATION_MENU_LINK_ID, ID'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@ID) or @ID=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'MENU'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'ID'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:choose>
<axsl:when test="count(*) = count(PARAMETER | LINK | FOLDER)"/>
<axsl:otherwise>
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_UNEXPECTED_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'MENU'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'PARAMETER, LINK, FOLDER'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:otherwise>
</axsl:choose>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3993" match="LINK">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file' or name() = 'USER_PREFS_PAGE' or name() = 'TITLE' or name() = 'SMALL_ICON' or name() = 'PAGE_ID' or name() = 'LOGOUT_PAGE' or name() = 'LARGE_ICON' or name() = 'HOME_PAGE' or name() = 'DESCRIPTION' or name() = 'ACCESSKEY' or name() = 'HIGHLIGHT_PAGE_ID' or name() = 'VISIBLE')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'LINK'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'USER_PREFS_PAGE, TITLE, SMALL_ICON, PAGE_ID, LOGOUT_PAGE, LARGE_ICON, HOME_PAGE, DESCRIPTION, ACCESSKEY, HIGHLIGHT_PAGE_ID, VISIBLE'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@TITLE) or @TITLE=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'LINK'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TITLE'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="*">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_NOT_EMPTY</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'LINK'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3992" match="GROUP">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'GROUP'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="''"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:choose>
<axsl:when test="count(*) = count(LINK)"/>
<axsl:otherwise>
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_UNEXPECTED_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'GROUP'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'LINK'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:otherwise>
</axsl:choose>
<axsl:if test="not(LINK)">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'GROUP'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'LINK'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3991" match="FOLDER">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file' or name() = 'TITLE' or name() = 'PAGE_ID' or name() = 'DESCRIPTION')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FOLDER'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TITLE, PAGE_ID, DESCRIPTION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@TITLE) or @TITLE=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FOLDER'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TITLE'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:choose>
<axsl:when test="count(*) = count(LINK | FOLDER)"/>
<axsl:otherwise>
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_UNEXPECTED_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FOLDER'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'LINK, FOLDER'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:otherwise>
</axsl:choose>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3990" match="APPLICATION_REF">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file' or name() = 'FILE_NAME')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATION_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FILE_NAME'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@FILE_NAME) or @FILE_NAME=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATION_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'FILE_NAME'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="*">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_NOT_EMPTY</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATION_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3989" match="APPLICATIONS">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATIONS'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="''"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:choose>
<axsl:when test="count(*) = count(APPLICATION | APPLICATION_REF)"/>
<axsl:otherwise>
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_UNEXPECTED_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATIONS'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATION, APPLICATION_REF'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:otherwise>
</axsl:choose>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="3988" match="APPLICATION">
<axsl:if test="@*[not(namespace-uri() or name() = '__line' or name() = '__file' or name() = 'TITLE' or name() = 'ID' or name() = 'DESCRIPTION')]">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_INVALID_ATT</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TITLE, ID, DESCRIPTION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@TITLE) or @TITLE=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'TITLE'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:if test="not(@ID) or @ID=''">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_ATTRIBUTE</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'ID'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:choose>
<axsl:when test="count(*) = count(SECTION | SECTION_REF | TOOLBAR_REF | TOOLBAR)"/>
<axsl:otherwise>
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_UNEXPECTED_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION, SECTION_REF, TOOLBAR_REF, TOOLBAR'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:otherwise>
</axsl:choose>
<axsl:if test="not(SECTION)">
<axsl:message>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__file"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="@__line"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="name()"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>:</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:text>ERR_ELEMENT_MISSING_CHILD</axsl:text>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>:</axsl:text>
<axsl:text>(</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'APPLICATION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>|</axsl:text>
<axsl:call-template name="escape-string">
<axsl:with-param name="string">
<axsl:value-of select="'SECTION'"/>
</axsl:with-param>
<axsl:with-param select="$chars-to-escape" name="chars-to-escape"/>
</axsl:call-template>
<axsl:text>)</axsl:text>
</axsl:message>
</axsl:if>
<axsl:apply-templates mode="M0"/>
</axsl:template>
<axsl:template mode="M0" priority="-1" match="text()"/>
<axsl:template priority="-1" match="text()"/>
</axsl:stylesheet>
