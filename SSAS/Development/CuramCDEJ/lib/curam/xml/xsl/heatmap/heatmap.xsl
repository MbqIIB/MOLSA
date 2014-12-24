<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="no" omit-xml-declaration="yes"/>   
  <xsl:strip-space elements="*" />
  
<xsl:param name="static-content-server-url"/>
<xsl:param name="locale"/>
<xsl:param name="page-id"/>
<xsl:param name="columns"/>
<xsl:param name="max-rows"/>
<xsl:param name="legend-pos"/>
<xsl:param name="legend-title"/>
<xsl:param name="paramz"/>
  
<xsl:template match="HEATMAP">
  <xsl:variable name="tblPos">
    <xsl:choose>
    <xsl:when test="$legend-pos='left'">right</xsl:when>
    <xsl:otherwise>left</xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <script type="text/javascript">
    <xsl:text>require(["curam/widgets"]);
	var heatmapObject = new HeatMap(</xsl:text>
      <xsl:value-of select="count(REGION)"/>
    <xsl:text>);</xsl:text>
    <xsl:call-template name="set-regions"/>
  </script>
  <div id="heatmapWrap">
    <xsl:if test="$max-rows">
      <xsl:attribute name="style">
        <!-- adjust this for ie, maybe css expression! -->
        <xsl:text>height:</xsl:text>
        <xsl:value-of select="$max-rows * 30 + $max-rows * 1"/><xsl:text>px;overflow-y:auto;</xsl:text>
      </xsl:attribute>
    </xsl:if>
  
  <div id="heatmapLegend" style="float:{$legend-pos};margin-{$legend-pos}:5px;">
    <div class="legendCaption"><xsl:value-of select="$legend-title"/></div>
    <xsl:call-template name="output-legend"/>
  </div>
 
  <div id="table-holder" style="float:{$tblPos};width:75%;">
		<xsl:if test="count(REGION/ITEM) &gt; 0">
      <!--added in role="presentation" to fix TEC-16876   -->  
  		<table id="heatmapTable" cellspacing="0" role="presentation">
        <thead>
          <xsl:call-template name="headers"/>
        </thead>
    		<tbody>
      		<xsl:apply-templates select="REGION/ITEM" mode="selector"/>
   		 </tbody>
  		</table>
  	</xsl:if>
	</div>
  </div>
</xsl:template>

<xsl:template name="set-regions">
 <!-- heatmapObject.addRegion('regionID'); -->
  <xsl:for-each select="REGION">
    <xsl:text>&#xa;heatmapObject.addRegion(&apos;</xsl:text>
      <xsl:value-of select="@REGION_ID"/>
    <xsl:text>&apos;);</xsl:text>
  </xsl:for-each>
</xsl:template>

<xsl:template match="ITEM" mode="selector">
  <xsl:if test="((count(preceding::ITEM)+1) mod $columns) = 1">
    <xsl:apply-templates select="." mode="start-cell"/>
  </xsl:if>
</xsl:template>

<xsl:template match="ITEM" mode="start-cell">
  <tr>
    <xsl:apply-templates select="." mode="recursive-row">
      <xsl:with-param name="colNum" select="$columns"/>
    </xsl:apply-templates>
   </tr>
</xsl:template>

<xsl:template match="ITEM" mode="recursive-row">
  <xsl:param name="colNum"/>
  
  <xsl:variable name="this-item" select="."/>
  <xsl:variable name="linkHref" select="concat($static-content-server-url, '/', $locale, '/', $page-id,'Page.do')"/>
  <td class="region{parent::REGION/@REGION_ID}" headers="{parent::REGION/@REGION_ID}">
    <a>
      <xsl:attribute name="href">
        <xsl:value-of select="$linkHref"/>
        <xsl:for-each select="$paramz/PARAM">
          <xsl:variable name="carrier" select="$this-item/@*[name() = current()/@VALUE]" />
          <xsl:if test="position() = 1">?</xsl:if>
          <xsl:value-of select="current()/@NAME"/>
          <xsl:text>=</xsl:text>
          <xsl:choose>
            <xsl:when test="$carrier"><xsl:value-of select="$carrier" /></xsl:when>
            <xsl:otherwise><xsl:value-of select="current()/@VALUE" /></xsl:otherwise>
	  </xsl:choose>
	  <xsl:if test="position() != last()">
	  <xsl:text>&amp;</xsl:text>
	  </xsl:if>
	</xsl:for-each>
      </xsl:attribute>
      <xsl:value-of select="@LABEL"/>
    </a>
  </td>
  <xsl:if test="$colNum &gt; 1">
    <xsl:choose>
    <xsl:when test="following-sibling::ITEM[1]">
      <xsl:apply-templates select="following-sibling::ITEM[1]" mode="recursive-row">
        <xsl:with-param name="colNum" select="$colNum - 1"/>
      </xsl:apply-templates>
    </xsl:when>
    <xsl:otherwise>
      <xsl:if test="parent::REGION/following-sibling::REGION[count(ITEM) > 0]">
        <xsl:apply-templates select="parent::REGION/following-sibling::REGION[count(ITEM) > 0][1]/ITEM[1]" mode="recursive-row">
          <xsl:with-param name="colNum" select="$colNum - 1"/>
        </xsl:apply-templates>
      </xsl:if>
    </xsl:otherwise>
    </xsl:choose>
  </xsl:if>
</xsl:template>

<xsl:template name="output-legend">
    <xsl:for-each select="REGION">
      <div id="legendItem{@REGION_ID}" class="legendItem">
        <div id="legendImage{@REGION_ID}" class="legendImage {@REGION_ID}">·</div>
        <div class="legendItemValue"><xsl:value-of select="current()/@LABEL"/></div>
      </div>
    </xsl:for-each>
</xsl:template>

<xsl:template name="headers">
 <tr>
    <xsl:for-each select="REGION">
      <th>
       <xsl:attribute name="id">
         <xsl:value-of select="current()/@REGION_ID"/>
       </xsl:attribute>
       <xsl:value-of select="current()/@LABEL"/>
      </th>
    </xsl:for-each>
  </tr>
</xsl:template>

</xsl:stylesheet>
