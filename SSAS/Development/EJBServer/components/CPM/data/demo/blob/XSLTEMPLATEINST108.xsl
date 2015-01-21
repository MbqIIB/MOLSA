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
    <xsl:apply-templates select="STRUCT[SNAME='ProviderNotificationDetails']" />
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
                    <xsl:apply-templates select="FIELD[FNAME='providerName']" />
                    ,
                  </fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space" />
                  </fo:block>
                  <fo:inline font-size="12pt">
                    We wish to inform you that the rate for the service offering
                    <xsl:apply-templates select="FIELD[FNAME='serviceOfferingName']" />
                    has been updated to the following:
                    <xsl:apply-templates select="FIELD[FNAME='currentServiceRate']" />
                    from
                    <xsl:apply-templates select="FIELD[FNAME='serviceRateStartDate']" />
                    <xsl:if test="not(boolean(contains(FIELD[FNAME='serviceRateEndDate'], '01-01-0001')))">
                      to
                      <xsl:apply-templates select="FIELD[FNAME='serviceRateEndDate']" />
                    </xsl:if>
                    .
                  </fo:inline>
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
                    <xsl:apply-templates select="FIELD[FNAME='organisationName']" />
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
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE" />
  </xsl:template>
</xsl:stylesheet>

