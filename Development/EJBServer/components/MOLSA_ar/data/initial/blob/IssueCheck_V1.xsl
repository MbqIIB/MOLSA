<?xml version="1.0" encoding="UTF-8"?>
<!-- BEGIN, CR00357205, PB -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:foa="http://fabio" version="1.0">

 
 <xsl:attribute-set name="Normal_1" foa:class="block">
     <xsl:attribute name="font-size">13.0pt</xsl:attribute>
     <xsl:attribute name="line-height">5mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
	 <xsl:attribute name="margin-right">27mm</xsl:attribute>
  </xsl:attribute-set>	
  <xsl:attribute-set name="Normal_2" foa:class="block">
     <xsl:attribute name="font-size">13.0pt</xsl:attribute>
     <xsl:attribute name="line-height">5mm</xsl:attribute>
     <xsl:attribute name="text-align">left</xsl:attribute>
	 <xsl:attribute name="margin-right">23mm</xsl:attribute>
	 <xsl:attribute name="margin-left">8mm</xsl:attribute>
	 <xsl:attribute name="space-before">2mm</xsl:attribute>
  </xsl:attribute-set>
 <xsl:attribute-set name="Normal_3" foa:class="block">
     <xsl:attribute name="font-size">14.0pt</xsl:attribute>
     <xsl:attribute name="line-height">7mm</xsl:attribute>
     <xsl:attribute name="space-before">21mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
	 <xsl:attribute name="margin-right">45mm</xsl:attribute>
  </xsl:attribute-set>
 <xsl:attribute-set name="Normal_4" foa:class="block">
     <xsl:attribute name="font-size">14.0pt</xsl:attribute>
     <xsl:attribute name="line-height">7mm</xsl:attribute>
     <xsl:attribute name="space-before">7mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
	 <xsl:attribute name="margin-right">45mm</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_5" foa:class="block">
      <xsl:attribute name="font-size">13.0pt</xsl:attribute>
     <xsl:attribute name="line-height">7mm</xsl:attribute>
     <xsl:attribute name="space-before">8mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
	 <xsl:attribute name="margin-right">30mm</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_6" foa:class="block">
     <xsl:attribute name="font-size">14.0pt</xsl:attribute>
     <xsl:attribute name="line-height">7mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
	 <xsl:attribute name="margin-right">30mm</xsl:attribute>
  </xsl:attribute-set>
 <xsl:attribute-set name="Normal_7" foa:class="block">
     <xsl:attribute name="font-size">13.0pt</xsl:attribute>
     <xsl:attribute name="line-height">5mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
	 <xsl:attribute name="margin-right">5mm</xsl:attribute>
	  <xsl:attribute name="space-before">98mm</xsl:attribute>
  </xsl:attribute-set>	
  <xsl:attribute-set name="Normal_8" foa:class="block">
     <xsl:attribute name="font-size">14.0pt</xsl:attribute>
     <xsl:attribute name="line-height">7mm</xsl:attribute>
     <xsl:attribute name="space-before">15mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
	 <xsl:attribute name="margin-right">60mm</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_9" foa:class="block">
     <xsl:attribute name="font-size">13.0pt</xsl:attribute>
     <xsl:attribute name="line-height">6mm</xsl:attribute>
     <xsl:attribute name="space-before">1mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
	 <xsl:attribute name="margin-right">3mm</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_10" foa:class="block">
     <xsl:attribute name="font-size">13.0pt</xsl:attribute>
     <xsl:attribute name="line-height">6mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
	 <xsl:attribute name="margin-right">5mm</xsl:attribute>
  </xsl:attribute-set>
   <xsl:attribute-set name="Normal_11" foa:class="block">
     <xsl:attribute name="font-size">12.0pt</xsl:attribute>
     <xsl:attribute name="line-height">5mm</xsl:attribute>
     <xsl:attribute name="text-align">left</xsl:attribute>
	 <xsl:attribute name="space-after">15mm</xsl:attribute>
	 <xsl:attribute name="space-before">3mm</xsl:attribute>
  </xsl:attribute-set>
   <xsl:attribute-set name="Normal_12" foa:class="block">
    <xsl:attribute name="font-size">14.0pt</xsl:attribute>
     <xsl:attribute name="line-height">7mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
	 <xsl:attribute name="margin-right">30mm</xsl:attribute>
  </xsl:attribute-set>
 
 
  <xsl:attribute-set name="Normal_9" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">6mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="space-before.optimum">9mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <!-- END, CR00352142 -->
  <xsl:template match="DOCUMENT">
    <!--Explicitly select DATA to ensure META element is ignored.-->
    <xsl:apply-templates select="DATA" />
  </xsl:template>
  <xsl:template match="DATA">
    <!--Explicitly select the STRUCT to avoid processing anything
 else.-->
    <xsl:apply-templates select="STRUCT[SNAME='MOLSAPrintChequeDetails']" />
  </xsl:template>
  <xsl:template match="STRUCT">
    <fo:root>
      <fo:layout-master-set>
        <fo:simple-page-master master-name="only" page-height="297mm" page-width="210mm" margin-top="63mm" margin-bottom="15mm" margin-left="15mm" margin-right="15mm">
          <fo:region-body />
          
        </fo:simple-page-master>
      </fo:layout-master-set>
      <fo:page-sequence master-reference="only">
        <!-- BEGIN, CR00352142, PB -->
        <!-- START NON-TRANSLATABLE -->
        
        <fo:flow flow-name="xsl-region-body" font-family="Times New Roman">
        
    <fo:block xsl:use-attribute-sets="Normal_1"> <xsl:apply-templates select="FIELD[FNAME='accountDateString']" />  
</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_2"> <xsl:apply-templates select="FIELD[FNAME='checkAmount']" /></fo:block>
	
	
	<fo:block xsl:use-attribute-sets="Normal_3">
	 <xsl:apply-templates select="FIELD[FNAME='beneficiaryName']" />
      </fo:block>

	<fo:block-container writing-mode="rl-tb" >	
    <fo:block xsl:use-attribute-sets="Normal_4"> 
      
	<xsl:apply-templates select="FIELD[FNAME='checkAmountInWords']" />
     
   </fo:block>
    </fo:block-container>
    <fo:block xsl:use-attribute-sets="Normal_5"> 
      
	<xsl:apply-templates select="FIELD[FNAME='checkNumber']" />
     
   </fo:block>
    <fo:block xsl:use-attribute-sets="Normal_6"> 
      
	
     
   </fo:block>
   
    <fo:block xsl:use-attribute-sets="Normal_7"><xsl:apply-templates select="FIELD[FNAME='accountDateString']" />  
</fo:block>

<fo:block xsl:use-attribute-sets="Normal_8">
	<xsl:apply-templates select="FIELD[FNAME='beneficiaryName']" />
      </fo:block>

<fo:block-container writing-mode="rl-tb" >	
    <fo:block xsl:use-attribute-sets="Normal_9" > 
	<fo:bidi-override unicode-bidi="embed" direction="ltr">
 <xsl:apply-templates select="FIELD[FNAME='checkAmount']" />  </fo:bidi-override>
 <fo:leader leader-length="47mm"/>  <xsl:apply-templates select="FIELD[FNAME='checkAmountInWords']" /> 
   </fo:block>
   
    </fo:block-container>

     <!--  <fo:block xsl:use-attribute-sets="Normal_10" margin-bottom="4pt">12378  </fo:block> -->

   </fo:flow>
        <!-- END, CR00352142 -->
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE" />
  </xsl:template>
</xsl:stylesheet>


