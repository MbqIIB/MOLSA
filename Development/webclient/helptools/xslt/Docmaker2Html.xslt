<?xml version="1.0" encoding="UTF-8"?>
<!-- 
Copyright 2005 Curam Software Ltd.  All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information").  You shall not
disclose such Confidential Information and shall use it only in accordance
with the terms of the license agreement you entered into with Curam Software.
-->
<!--
This stylesheet is used to generate a preview version of HTML help for Curam UIM files from .assemble files.
 -->
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
  <xsl:output
    encoding="ISO-8859-1"
    indent="yes"
    method="html"
  />
  <xsl:param name="LOCALE_CODE"/>
  
  <xsl:template match="/">

    <h1>
      <i>(Locale: <xsl:value-of select="$LOCALE_CODE"/>)</i>
    </h1>

    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="/section[1]/title" >
    <!-- get the first section element - the title of this is the page title -->
    <h1>
	 <xsl:value-of select="."/> 	
    </h1>
  </xsl:template>

  <xsl:template match="/section/section" >    
    <xsl:apply-templates/>
    
  </xsl:template>

  <xsl:template match="title" >
    <h2>
	 <xsl:value-of select="."/> 	
    </h2>
  </xsl:template>

  <xsl:template match="para" >
    <p>
	 <xsl:value-of select="."/> 	
    </p>
  </xsl:template>

  <xsl:template match="table" >
    <table border="1">
		    <xsl:apply-templates select="tgroup/thead" />		    
		    <xsl:apply-templates select="tgroup/tbody" />		    		    
    </table>
  </xsl:template>

  <xsl:template match="row" >
    <tr>
		    <xsl:apply-templates select="entry" />		    		
    </tr>
  </xsl:template>

  <xsl:template match="entry" >
    <td>
		    <xsl:apply-templates select="para" />		    		
    </td>
  </xsl:template>

  <xsl:template match="itemizedlist" >
    <ul>
       <xsl:apply-templates select="listitem" />
    </ul>
   
  </xsl:template>

  <xsl:template match="listitem" >
    <li>
	   <xsl:apply-templates select="para" />
    </li>
  
  </xsl:template>


</xsl:stylesheet>