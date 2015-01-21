<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:foa="http://fabio" version="1.0">
  <xsl:variable name="fo:layout-master-set">
    <fo:layout-master-set>
      <fo:simple-page-master master-name="default-page" page-height="11in" page-width="8.5in" margin-left="0.6in" margin-right="0.6in">
        <fo:region-body margin-top="0.79in" margin-bottom="0.79in" />
      </fo:simple-page-master>
    </fo:layout-master-set>
  </xsl:variable>
  <!-- BEGIN, CR00356535, PB -->
  <xsl:attribute-set name="Normal_1" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">5mm</xsl:attribute>
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
    <xsl:attribute name="text-indent">110mm</xsl:attribute>
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
  <xsl:attribute-set name="Normal_3" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">15mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="text-indent">0mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_4" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">7mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="text-indent">0mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="white-space-collapse">false</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="white-space-treatment">preserve</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_5" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">5mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="text-indent">0mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <!-- END, CR00356535 -->
  <xsl:template match="DOCUMENT">
    <!--Explicitly select DATA to ensure META element is ignored.-->
    <xsl:apply-templates select="DATA" />
  </xsl:template>
  <xsl:template match="DATA">
    <!--Explicitly select the STRUCT to avoid processing anything else.-->
    <xsl:apply-templates select="STRUCT[SNAME='ContractNotificationDetails']" />
  </xsl:template>
  <xsl:template match="STRUCT">
    <fo:root>
      <xsl:copy-of select="$fo:layout-master-set" />
      <fo:page-sequence master-reference="default-page" initial-page-number="1" format="1">
	  	    <!-- START NON-TRANSLATABLE -->
        <fo:flow flow-name="xsl-region-body" font-family="WT Sans ME">
		        <!-- END NON-TRANSLATABLE -->
          <fo:block>
            <fo:block space-before.optimum="1pt" space-after.optimum="2pt">
              <!-- BEGIN, CR00356535, PB -->
              <fo:block xsl:use-attribute-sets="Normal_1">
                <xsl:apply-templates select="FIELD[FNAME='organizationName']" />
              </fo:block>
              <fo:block xsl:use-attribute-sets="Normal_2">
                <xsl:apply-templates select="FIELD[FNAME='organizationAddress']" />
              </fo:block>
              <fo:block xsl:use-attribute-sets="Normal_3" />
              <fo:block xsl:use-attribute-sets="Normal_3" />
              <fo:block xsl:use-attribute-sets="Normal_4">
                <xsl:apply-templates select="FIELD[FNAME='providerAddress']" />
              </fo:block>
              <fo:block xsl:use-attribute-sets="Normal_5" />
              <fo:block xsl:use-attribute-sets="Normal_3" />
              <!-- END, CR00356535 -->
              <fo:block space-before.optimum="1pt" space-after.optimum="2pt">
                <fo:block text-align="justify">
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt" font-weight="normal">
                    عزيزي <xsl:apply-templates select="FIELD[FNAME='providerName']" />
                    ,
                  </fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt">
                    هذا العقد يعد اتفاقية بين <xsl:apply-templates select="FIELD[FNAME='providerName']" />
                    و
              <xsl:apply-templates select="FIELD[FNAME='organizationName']" />
                    .
                  </fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt">
                    <xsl:apply-templates select="FIELD[FNAME='providerName']" />
                    وافق على تقديم الخدمات المعروضة بأسفل من <xsl:apply-templates select="FIELD[FNAME='startDate']" />
                    الى <xsl:apply-templates select="FIELD[FNAME='endDate']" />
                    بالمبلغ الثابت <xsl:apply-templates select="FIELD[FNAME='totalContractAmount']" />
                    .
                  </fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt" font-weight="bold">الخدمات:</fo:inline>
                  <xsl:if test="count(FIELD[FNAME='serviceOfferingNotificationListAgg']/STRUCT_LIST/STRUCT) &gt; 0">
                    <xsl:call-template name="ServiceOfferings" />
                  </xsl:if>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt">التوقيع: ___________________________        التاريخ: ______________________</fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt" font-weight="normal">مع خالص التقدير،</fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt">
                    <xsl:apply-templates select="FIELD[FNAME='organizationName']" />
                    .
                  </fo:inline>
                </fo:block>
              </fo:block>
            </fo:block>
          </fo:block>
        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  <xsl:template name="ServiceOfferings">
    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <xsl:for-each select="FIELD[FNAME='serviceOfferingNotificationListAgg']/STRUCT_LIST/STRUCT['ServiceOfferingNotificationList']/FIELD[FNAME='serviceOfferingName']">
        <xsl:value-of select="VALUE" />
        <fo:block linefeed-treatment="preserve" />
      </xsl:for-each>
    </fo:block>
  </xsl:template>
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE" />
  </xsl:template>
</xsl:stylesheet>


