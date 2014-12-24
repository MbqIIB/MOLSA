<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:domain="http://xml.apache.org/xalan/java/curam.util.common.util.JavaScriptEscaper"
    xmlns:xalan="http://xml.apache.org/xalan"
    extension-element-prefixes="xalan"
    exclude-result-prefixes="domain">
  <xsl:output method="xml" indent="no" omit-xml-declaration="yes"/>   
  <xsl:strip-space elements="*" />

<xsl:param name="static-content-server-url"/>
<xsl:param name="locale"/>
<xsl:param name="chart-num"/>
<xsl:param name="chart-title"/>
<xsl:param name="page-id"/>
<xsl:param name="caption-page-id"/>
<xsl:param name="page-params"/>
<xsl:param name="data-params"/>
<xsl:param name="caption-page-params"/>
<xsl:param name="caption-data-params"/>
<xsl:param name="chart-legend"/>
<xsl:param name="ax-label"/>
<xsl:param name="ay-label"/>
<xsl:param name="axis-max"/>
<xsl:param name="increment"/>
<xsl:param name="legend-items"/>
<xsl:param name="orientation" select="'vertical'"/>
  
 <!-- Match on the data XML file -->
<xsl:template match="CHART">
  <xsl:variable name="ident" select="concat('fchart', domain:escapeText($chart-num))"/>
  <xsl:variable name="link-base">
    <xsl:value-of select="concat($static-content-server-url, '/', $locale, '/', $page-id, 'Page.do')"/>
  </xsl:variable>
  <xsl:variable name="caption-link-base">
    <xsl:value-of select="concat($static-content-server-url, '/', $locale, '/', $caption-page-id, 'Page.do')"/>
  </xsl:variable>
  <xsl:variable name="vars-to-pass">
    <xsl:value-of select="concat('ident=', $ident,
                                 '&amp;title=',$chart-title,
                                 '&amp;linkBase=', $link-base,
                                 '&amp;captionLinkBase=', $caption-link-base,
                                 '&amp;xLabel=', $ax-label,
                                 '&amp;yLabel=', $ay-label,
                                 '&amp;axisMax=', $axis-max,
                                 '&amp;increment=', $increment)"/>
  </xsl:variable>
   
   <xsl:variable name="orient">
     <xsl:value-of select="concat($static-content-server-url,'/CDEJ/flex/linechart.swf')"/>
   </xsl:variable>
  
  <script type="text/javascript">
    <xsl:text>function getDataIn(whatVar) { return eval(whatVar); };</xsl:text>
    <xsl:text>var chartLabels</xsl:text><xsl:value-of select="$ident"/><xsl:text> = [</xsl:text><xsl:value-of select="$chart-legend"/><xsl:text>];</xsl:text>
    <xsl:text>var chartData</xsl:text><xsl:value-of select="$ident"/><xsl:text> = [</xsl:text><xsl:apply-templates select="UNIT" mode="data"/><xsl:text>];</xsl:text>
    <xsl:text>function getPageParams</xsl:text><xsl:value-of select="$ident"/><xsl:text>(){ return '</xsl:text><xsl:value-of select="domain:escapeText($page-params)"/><xsl:text>';};</xsl:text>
    <xsl:text>function getCaptionPageParams</xsl:text><xsl:value-of select="$ident"/><xsl:text>(){ return '</xsl:text><xsl:value-of select="domain:escapeText($caption-page-params)"/><xsl:text>';};</xsl:text>
    <xsl:text>var dataParams</xsl:text><xsl:value-of select="$ident"/><xsl:text>= </xsl:text><xsl:value-of select="$data-params"/><xsl:text>;</xsl:text>
    <xsl:text>var captionDataParams</xsl:text><xsl:value-of select="$ident"/><xsl:text>= </xsl:text><xsl:value-of select="$caption-data-params"/><xsl:text>;</xsl:text>
    <xsl:text>var linkData</xsl:text><xsl:value-of select="$ident"/><xsl:text>= new Array();</xsl:text>
    <xsl:apply-templates select="UNIT" mode="links">
      <xsl:with-param name="chart-id" select="$ident"/>
    </xsl:apply-templates>
    <xsl:text>var captionsData</xsl:text><xsl:value-of select="$ident"/><xsl:text>=[</xsl:text>
      <xsl:apply-templates select="UNIT" mode="caption-links"/>
    <xsl:text>];</xsl:text>
  </script>

    <object id="{$ident}" classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='100%'>
      <param name='src' value="{$orient}"/>
      <param name='flashVars' value="{$vars-to-pass}"/>
      <embed name='{$ident}' src='{$orient}' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' height='100%' width='100%' flashVars="{$vars-to-pass}"/>
    </object>
</xsl:template>

<xsl:template match="UNIT" mode="data">
  <xsl:variable name="this-unit" select="."/>
  <xsl:text>{xAxis:&quot;</xsl:text><xsl:value-of select="CAPTION/@parsed-caption"/><xsl:text>&quot;,</xsl:text>
  <xsl:for-each select="$legend-items/ITEM">
    <xsl:text>col</xsl:text><xsl:value-of select="position() - 1"/><xsl:text>:</xsl:text>
      <xsl:choose>
        <xsl:when test="$this-unit/BLOCK[@TYPE=current()/@CODE]">
          <xsl:value-of select="$this-unit/BLOCK[@TYPE=current()/@CODE]/@LENGTH"/>
        </xsl:when>
        <xsl:otherwise><xsl:text>0</xsl:text></xsl:otherwise>
      </xsl:choose>
    <xsl:if test="not(position() = last())">
      <xsl:text>, </xsl:text>
    </xsl:if>
  </xsl:for-each>
  <xsl:text>}</xsl:text>
  <xsl:if test="not(position() = last())">
    <xsl:text>, </xsl:text>
  </xsl:if>
</xsl:template>
  
<xsl:template match="UNIT" mode="links">
  <xsl:param name="chart-id"/>
  <xsl:variable name="this-unit" select="."/>
  <xsl:variable name="group-idx" select="position() - 1"/>
  <xsl:text>linkData</xsl:text><xsl:value-of select="$chart-id"/>
  <xsl:text>[</xsl:text><xsl:value-of select="$group-idx"/><xsl:text>] = new Array();</xsl:text>
  <xsl:for-each select="$legend-items/ITEM">
    <xsl:text>linkData</xsl:text><xsl:value-of select="$chart-id"/>
    <xsl:text>[</xsl:text><xsl:value-of select="$group-idx"/><xsl:text>]</xsl:text>
    <xsl:text>[</xsl:text><xsl:value-of select="position() - 1"/><xsl:text>]={</xsl:text>
    <xsl:choose>
      <xsl:when test="$this-unit/BLOCK[@TYPE=current()/@CODE]">
        <xsl:apply-templates select="$this-unit/BLOCK[@TYPE=current()/@CODE]" mode="output-params"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:if test="count($this-unit/BLOCK) &gt;=1">
          <xsl:apply-templates select="$this-unit/BLOCK[1]" mode="output-empty"/>
        </xsl:if>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:for-each>
</xsl:template>

<xsl:template match="BLOCK" mode="output-params">
  <xsl:for-each select="@*">
    <xsl:value-of select="name()"/><xsl:text>:&quot;</xsl:text><xsl:value-of select="."/><xsl:text>&quot;</xsl:text>
    <xsl:if test="not(position() = last())">
      <xsl:text>, </xsl:text>
    </xsl:if>
  </xsl:for-each>
  <xsl:if test="preceding-sibling::CAPTION/@TEXT">
    <xsl:text>, TEXT:&quot;</xsl:text><xsl:value-of select="preceding-sibling::CAPTION/@TEXT"/><xsl:text>&quot;</xsl:text>
  </xsl:if>
  <xsl:if test="preceding-sibling::CAPTION/@START_DATE">
    <xsl:text>, START_DATE:&quot;</xsl:text><xsl:value-of select="preceding-sibling::CAPTION/@START_DATE"/><xsl:text>&quot;</xsl:text>
  </xsl:if>
  <xsl:if test="preceding-sibling::CAPTION/@END_DATE">
    <xsl:text>, END_DATE:&quot;</xsl:text><xsl:value-of select="preceding-sibling::CAPTION/@END_DATE"/><xsl:text>&quot;</xsl:text>
  </xsl:if>
  <xsl:text>};</xsl:text>
</xsl:template>

<xsl:template match="BLOCK" mode="output-empty">
  <xsl:for-each select="@*">
    <xsl:value-of select="name()"/><xsl:text>:&quot;&quot;</xsl:text>
    <xsl:if test="not(position() = last())">
      <xsl:text>, </xsl:text>
    </xsl:if>
  </xsl:for-each>  
  <xsl:if test="preceding-sibling::CAPTION/@TEXT">
    <xsl:text>, TEXT:&quot;</xsl:text><xsl:value-of select="preceding-sibling::CAPTION/@TEXT"/><xsl:text>&quot;</xsl:text>
  </xsl:if>
  <xsl:if test="preceding-sibling::CAPTION/@START_DATE">
    <xsl:text>, START_DATE:&quot;</xsl:text><xsl:value-of select="preceding-sibling::CAPTION/@START_DATE"/><xsl:text>&quot;</xsl:text>
  </xsl:if>
  <xsl:if test="preceding-sibling::CAPTION/@END_DATE">
    <xsl:text>, END_DATE:&quot;</xsl:text><xsl:value-of select="preceding-sibling::CAPTION/@END_DATE"/><xsl:text>&quot;</xsl:text>
  </xsl:if>
  <xsl:text>};</xsl:text>
</xsl:template>
  
<xsl:template match="UNIT" mode="caption-links">
  <xsl:for-each select="CAPTION">
    <xsl:text>{</xsl:text>
    <xsl:for-each select="@*">
      <xsl:choose>
        <xsl:when test="name()='parsed-caption'">
          <xsl:text>parsedCaption:&quot;</xsl:text><xsl:value-of select="."/><xsl:text>&quot;</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="name()"/><xsl:text>:&quot;</xsl:text><xsl:value-of select="."/><xsl:text>&quot;</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:if test="not(position() = last())">
        <xsl:text>, </xsl:text>
      </xsl:if>
    </xsl:for-each>
    <xsl:text>}</xsl:text>
    <xsl:if test="count(following::CAPTION) > 0">
      <xsl:text>, </xsl:text>
    </xsl:if>
  </xsl:for-each>
</xsl:template>

</xsl:stylesheet>