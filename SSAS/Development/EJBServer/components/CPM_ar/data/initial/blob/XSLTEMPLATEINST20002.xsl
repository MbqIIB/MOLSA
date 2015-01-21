<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM

  Copyright IBM Corporation 2010, 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:foa="http://fabio" version="1.0">
  <!-- BEGIN, CR00356535, PB -->
  <xsl:attribute-set name="Normal_1" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">5mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="text-indent">100mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="white-space-collapse">false</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="white-space-treatment">preserve</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="text-align">right</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_2" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">5mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="white-space-collapse">false</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="white-space-treatment">preserve</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="text-align">left</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_3" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="space-before.optimum">10mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_4" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="space-before.optimum">6mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">6mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_5" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="space-before.optimum">6mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">8mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_6" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">6mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <!-- END, CR00356535 -->
  <xsl:template match="DOCUMENT">
    <!--Explicitly select DATA to ensure META element is ignored.-->
    <xsl:apply-templates select="DATA" />
  </xsl:template>
  <xsl:template match="DATA">
    <!--Explicitly select the STRUCT to avoid processing anything
      else.-->
    <xsl:apply-templates select="STRUCT[SNAME='ProviderNotificationData']" />
  </xsl:template>
  <xsl:template match="STRUCT[SNAME='ProviderNotificationData']">
    <fo:root>
      <fo:layout-master-set>
        <fo:simple-page-master master-name="only" page-height="297mm" page-width="210mm" margin-top="30mm" margin-bottom="30mm" margin-left="30mm" margin-right="30mm">
          <fo:region-body />
        </fo:simple-page-master>
      </fo:layout-master-set>
      <fo:page-sequence master-reference="only">
	  	    <!-- START NON-TRANSLATABLE -->
        <fo:flow flow-name="xsl-region-body" font-family="WT Sans ME">
		        <!-- END NON-TRANSLATABLE -->
          <!-- Build variables strings -->
          <xsl:variable name="referralRecipients">
            <xsl:value-of select="FIELD[FNAME='referralRecipients']/VALUE" />
          </xsl:variable>
          <xsl:variable name="referralReason">
            <xsl:value-of select="FIELD[FNAME='referralReason']/VALUE" />
          </xsl:variable>
          <xsl:variable name="caseWorkerEmail">
            <xsl:value-of select="FIELD[FNAME='caseWorkerEmail']/VALUE" />
          </xsl:variable>
          <xsl:variable name="caseWorkerPhoneNumber">
            <xsl:value-of select="FIELD[FNAME='caseWorkerPhoneNumber']/VALUE" />
          </xsl:variable>
          <!-- BEGIN, CR00356535, PB -->
          <fo:block xsl:use-attribute-sets="Normal_1">
            <xsl:apply-templates select="FIELD[FNAME='agencyAddress']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_1">
            <xsl:apply-templates select="FIELD[FNAME='currentDate']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_2">
            <xsl:apply-templates select="FIELD[FNAME='providerDetails']/STRUCT[SNAME='ProviderNotificationDetails']/FIELD[FNAME='providerAddress']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3">
            عزيزي <xsl:apply-templates select="FIELD[FNAME='providerDetails']/STRUCT[SNAME='ProviderNotificationDetails']/FIELD[FNAME='providerName']" />
            ,
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_4">
            نريد احالة العملاء التاليين لك بالنسبة الى <xsl:apply-templates select="FIELD[FNAME='serviceName']" />.
          </fo:block>
          <!-- display the clients details if a provider exists -->
          <xsl:apply-templates select="FIELD[FNAME='clientDetailsList']/STRUCT[SNAME='ClientNotificationDetailsList']/FIELD[FNAME='clientDetails']/STRUCT_LIST" />
          <!-- Only display referral reason if one entered -->
          <xsl:if test="string-length($referralReason) &gt; 0 ">
            <fo:block xsl:use-attribute-sets="Normal_4">
              السبب للاحالة هذه: <xsl:apply-templates select="FIELD[FNAME='referralReason']" />
            </fo:block>
          </xsl:if>
          <!--  case worker phone number and and email address -->
          <xsl:if test="string-length($caseWorkerEmail) &gt; 0 and string-length($caseWorkerPhoneNumber) &gt; 0">
            <fo:block xsl:use-attribute-sets="Normal_4">
              اذا كان لديك أية أسئلة، برجاء الاتصال بي على <xsl:apply-templates select="FIELD[FNAME='caseWorkerPhoneNumber']" /> أو <xsl:apply-templates select="FIELD[FNAME='caseWorkerEmail']" />.
            </fo:block>
          </xsl:if>
          <!--  case worker phone number and and email address -->
          <xsl:if test="string-length($caseWorkerEmail) &gt; 0 and string-length($caseWorkerPhoneNumber) = 0">
            <fo:block xsl:use-attribute-sets="Normal_4">
              اذا كان لديك أية أسئلة برجاء الاتصال بي على <xsl:apply-templates select="FIELD[FNAME='caseWorkerEmail']" />.
            </fo:block>
          </xsl:if>
          <!--  case worker phone number and and email address -->
          <xsl:if test="string-length($caseWorkerEmail) = 0 and string-length($caseWorkerPhoneNumber) &gt; 0">
            <fo:block xsl:use-attribute-sets="Normal_4">
              اذا كان لديك أية أسئلة برجاء الاتصال بي في <xsl:apply-templates select="FIELD[FNAME='caseWorkerPhoneNumber']" />.
            </fo:block>
          </xsl:if>
          <fo:block xsl:use-attribute-sets="Normal_4">مع تحياتي،</fo:block>
          <fo:block xsl:use-attribute-sets="Normal_5">
            <xsl:apply-templates select="FIELD[FNAME='caseWorkerFullName']" />
          </fo:block>
        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  <xsl:template match="FIELD[FNAME='clientDetailsList']/STRUCT[SNAME='ClientNotificationDetailsList']/FIELD[FNAME='clientDetails']/STRUCT_LIST">
    <!--  Adds the details of each client -->
    <xsl:for-each select="STRUCT[SNAME='ClientNotificationDetails']">
      <xsl:variable name="address">
        <xsl:value-of select="FIELD[FNAME='address']/VALUE" />
      </xsl:variable>
      <xsl:variable name="phoneNumber">
        <xsl:value-of select="FIELD[FNAME='phoneNumber']/VALUE" />
      </xsl:variable>
      <fo:block xsl:use-attribute-sets="Normal_6">
        <xsl:apply-templates select="FIELD[FNAME='name']" />
        <!-- END, CR00356535 -->
        <xsl:if test="string-length($address) &gt; 0 ">
          بالعنوان <xsl:apply-templates select="FIELD[FNAME='address']" />
        </xsl:if>
        <xsl:if test="string-length($phoneNumber) &gt; 0 ">
          ورقم التليفون <xsl:apply-templates select="FIELD[FNAME='phoneNumber']" />
        </xsl:if>
        .
      </fo:block>
    </xsl:for-each>
  </xsl:template>
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE" />
  </xsl:template>
</xsl:stylesheet>


