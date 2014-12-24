<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0" xmlns:foa="http://fabio">
  <!-- BEGIN, CR00356535, PB -->
  <xsl:attribute-set name="Normal_1" foa:class="block">
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
	<xsl:attribute name="line-height">5mm</xsl:attribute>
	<xsl:attribute name="text-indent">100mm</xsl:attribute>
	<xsl:attribute name="white-space-collapse">false</xsl:attribute>
	<xsl:attribute name="linefeed-treatment=">preserve</xsl:attribute>
	<xsl:attribute name="white-space-treatment">preserve</xsl:attribute>
	<xsl:attribute name="text-align">right</xsl:attribute>
   </xsl:attribute-set>
   
      <xsl:attribute-set name="Normal_2" foa:class="block">
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
	<xsl:attribute name="line-height">5mm</xsl:attribute>
	<xsl:attribute name="white-space-collapse">false</xsl:attribute>
	<xsl:attribute name="linefeed-treatment=">preserve</xsl:attribute>
	<xsl:attribute name="white-space-treatment">preserve</xsl:attribute>
	<xsl:attribute name="text-align">left</xsl:attribute>
   </xsl:attribute-set>

   <xsl:attribute-set name="Normal_3" foa:class="block">
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
		<xsl:attribute name="space-before.optimum">10mm</xsl:attribute>
  </xsl:attribute-set>
  
   <xsl:attribute-set name="Normal_4" foa:class="block">
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
		<xsl:attribute name="space-before.optimum">6mm</xsl:attribute>
	<xsl:attribute name="line-height">6mm</xsl:attribute>
  </xsl:attribute-set>
  
     <xsl:attribute-set name="Normal_5" foa:class="block">
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
		<xsl:attribute name="space-before.optimum">6mm</xsl:attribute>
	<xsl:attribute name="line-height">8mm</xsl:attribute>
  </xsl:attribute-set>
  
  
   
      <xsl:attribute-set name="Normal_6" foa:class="block">
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
		<xsl:attribute name="line-height">6mm</xsl:attribute>
  </xsl:attribute-set>
  <!-- END, CR00356535 -->
  <xsl:template match="DOCUMENT">
    <!--Explicitly select DATA to ensure META element is ignored.-->
    <xsl:apply-templates select="DATA"/>
  </xsl:template>
  
  <xsl:template match="DATA">
    <!--Explicitly select the STRUCT to avoid processing anything
      else.-->
    <xsl:apply-templates select="STRUCT[SNAME='ClientNotificationData']"/>
  </xsl:template>
  
  
 
  
  <xsl:template match="STRUCT[SNAME='ClientNotificationData']">
    <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
      <fo:layout-master-set>
        <fo:simple-page-master master-name="only" page-height="297mm" page-width="210mm"
          margin-top="30mm" margin-bottom="30mm" margin-left="30mm" margin-right="30mm">
          <fo:region-body/>
        </fo:simple-page-master>
      </fo:layout-master-set>
      
      <fo:page-sequence master-reference="only">
        
        <fo:flow flow-name="xsl-region-body">
          
          <!-- Build variables strings -->
          <xsl:variable name="referralRecipients"><xsl:value-of select="FIELD[FNAME='referralRecipients']/VALUE"/></xsl:variable>
          <xsl:variable name="providerName"><xsl:value-of select="//STRUCT[SNAME='ProviderNotificationDetails']/FIELD[FNAME='providerName']/VALUE"/></xsl:variable>
          <xsl:variable name="referralReason"><xsl:value-of select="FIELD[FNAME='referralReason']/VALUE"/></xsl:variable>
          
          <!-- BEGIN, CR00356535, PB -->
          <fo:block xsl:use-attribute-sets="Normal_1">
            <xsl:apply-templates select="FIELD[FNAME='agencyAddress']"/>
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_1">
            <xsl:apply-templates select="FIELD[FNAME='currentDate']"/>
          </fo:block>
          
          <fo:block xsl:use-attribute-sets="Normal_2">
            <xsl:apply-templates select="FIELD[FNAME='clientAddress']"/>
          </fo:block>
          
          
          <fo:block xsl:use-attribute-sets="Normal-3"> Dear
            <xsl:apply-templates select="FIELD[FNAME='client']"/>, </fo:block>
          
          
          <fo:block xsl:use-attribute-sets="Normal_4">
            We would like to refer you 
            <xsl:if
              test="string-length($referralRecipients) > 0 "> and 
              <xsl:apply-templates select="FIELD[FNAME='referralRecipients']"/>
            </xsl:if>
            for 
            <xsl:apply-templates select="FIELD[FNAME='serviceName']"/>
            <xsl:if
              test="string-length($providerName) > 0 "> 
              with <xsl:apply-templates select="FIELD[FNAME='providerDetails']/STRUCT[SNAME='ProviderNotificationDetails']/FIELD[FNAME='providerName']"/> 
           </xsl:if>.
          </fo:block>
          
          <!-- Only display provider details if a provider exists -->
          <xsl:apply-templates select="//STRUCT[SNAME='ProviderNotificationDetails']"/>

          
          <!-- Only display referral reason if one entered -->
          <xsl:if
            test="string-length($referralReason) > 0 ">
            <fo:block xsl:use-attribute-sets="Normal_4"> The reason for this referral: <xsl:apply-templates
                select="FIELD[FNAME='referralReason']"/>
            </fo:block>
          </xsl:if>
          
          
          <fo:block xsl:use-attribute-sets="Normal_4">
            <xsl:if
              test="string-length($providerName) > 0 "> 
              Please present this letter to <xsl:apply-templates
                select="FIELD[FNAME='providerDetails']/STRUCT[SNAME='ProviderNotificationDetails']/FIELD[FNAME='providerName']"/>.  
            </xsl:if>
            Your appointment is scheduled for
            <xsl:apply-templates select="FIELD[FNAME='referralDate']"/>. </fo:block>
          
          <fo:block xsl:use-attribute-sets="Normal_4"> Yours Sincerely, </fo:block>
          
          <fo:block xsl:use-attribute-sets="Normal_5">
            <xsl:apply-templates select="FIELD[FNAME='caseWorkerFullName']"/>
          </fo:block>
        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  
  <xsl:template match="//STRUCT[SNAME='ProviderNotificationDetails']">
    
    <xsl:variable name="providerName"><xsl:value-of select="FIELD[FNAME='providerName']/VALUE"/></xsl:variable>
    <xsl:variable name="providerEmail"><xsl:value-of select="FIELD[FNAME='providerEmail']/VALUE"/></xsl:variable>
    <xsl:variable name="providerTelephoneNumber"><xsl:value-of select="FIELD[FNAME='providerTelephoneNumber']/VALUE"/></xsl:variable>
    
    <xsl:if
      test="string-length($providerName) > 0 "> 

      <fo:block xsl:use-attribute-sets="Normal_4"> The contact details for, <xsl:apply-templates
          select="FIELD[FNAME='providerName']"/>, are as follows: </fo:block>
      <fo:block xsl:use-attribute-sets="Normal_6"
        > Provider Address: <xsl:apply-templates  
          select="FIELD[FNAME='providerAddress']"/>
      </fo:block>
      
      <xsl:if
        test="string-length($providerTelephoneNumber) > 0 "> 
        <fo:block xsl:use-attribute-sets="Normal_6"
          > Provider Telephone Number: <xsl:apply-templates
            select="FIELD[FNAME='providerTelephoneNumber']"/>
        </fo:block>
      </xsl:if>
      <xsl:if
        test="string-length($providerEmail) > 0 "> 
        <fo:block xsl:use-attribute-sets="Normal_6"
          > Provider Email Address: <xsl:apply-templates
            select="FIELD[FNAME='providerEmail']"/>
        </fo:block>
		<!-- END, CR00356535 -->
      </xsl:if>
    </xsl:if> 
  </xsl:template>
  
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE"/>
  </xsl:template>
  
</xsl:stylesheet>
