<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
  <xsl:variable name="fo:layout-master-set">
    <fo:layout-master-set>
      <fo:simple-page-master master-name="default-page" page-height="11in" page-width="8.5in" margin-left="0.6in" margin-right="0.6in">
        <fo:region-body margin-top="0.79in" margin-bottom="0.79in" />
      </fo:simple-page-master>
    </fo:layout-master-set>
  </xsl:variable>
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
        <fo:flow flow-name="xsl-region-body" font-family="WT Sans">
          <!-- END NON-TRANSLATABLE -->
          <fo:block>
            <fo:block space-before.optimum="1pt" space-after.optimum="2pt">
              <fo:block>
                <xsl:text />
              </fo:block>
              <fo:block space-before.optimum="1pt" space-after.optimum="2pt">
                <fo:block text-align="justify">
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt" font-weight="normal">
                    Dear
                    <xsl:apply-templates select="FIELD[FNAME='providerGroupName']" />
                    ,
                  </fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt">
                    We wish to inform you that you are now under contract with our agency for the following
                    providers to deliver the services listed below to clients of this agency from
                    <xsl:apply-templates select="FIELD[FNAME='startDate']" />
                    to
                    <xsl:apply-templates select="FIELD[FNAME='endDate']" />
                    .
                  </fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt" font-weight="bold">PROVIDERS:</fo:inline>
                  <xsl:if test="count(FIELD[FNAME='providerNotificationListAgg']/STRUCT_LIST/STRUCT) &gt; 0">
                    <xsl:call-template name="Providers" />
                  </xsl:if>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt" font-weight="bold">SERVICES:</fo:inline>
                  <xsl:if test="count(FIELD[FNAME='serviceOfferingNotificationListAgg']/STRUCT_LIST/STRUCT) &gt; 0">
                    <xsl:call-template name="ServiceOfferings" />
                  </xsl:if>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt" font-weight="normal">Regards,</fo:inline>
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
  <xsl:template name="Providers">
    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <xsl:for-each select="FIELD[FNAME='providerNotificationListAgg']/STRUCT_LIST/STRUCT['ProviderNotificationList']/FIELD[FNAME='providerName']">
        <xsl:value-of select="VALUE" />
        <fo:block linefeed-treatment="preserve" />
      </xsl:for-each>
    </fo:block>
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

