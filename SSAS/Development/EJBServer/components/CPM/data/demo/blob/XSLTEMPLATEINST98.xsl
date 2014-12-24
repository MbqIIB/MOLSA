<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:foa="http://fabio">
  <xsl:variable name="fo:layout-master-set">
    <fo:layout-master-set>
      <fo:simple-page-master master-name="default-page" page-height="11in" page-width="8.5in"
        margin-left="0.6in" margin-right="0.6in">
        <fo:region-body margin-top="0.79in" margin-bottom="0.79in"/>
      </fo:simple-page-master>
    </fo:layout-master-set>
  </xsl:variable>
  <!-- BEGIN, CR00356535, PB -->
   	<xsl:attribute-set name="Normal_1" foa:class="inline">
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
   </xsl:attribute-set>
   <!-- END, CR00356535 -->
  <xsl:template match="DOCUMENT">
    <!--Explicitly select DATA to ensure META element is ignored.-->
    <xsl:apply-templates select="DATA"/>
  </xsl:template>
  
  <xsl:template match="DATA">
    <!--Explicitly select the STRUCT to avoid processing anything else.-->
    <xsl:apply-templates select="STRUCT[SNAME='ContractNotificationDetails']"/>
  </xsl:template>
  
  <xsl:template match="STRUCT">
    <fo:root>
      <xsl:copy-of select="$fo:layout-master-set"/>
      <fo:page-sequence master-reference="default-page" initial-page-number="1" format="1">
        <fo:flow flow-name="xsl-region-body">
          <fo:block>
            <fo:block space-before.optimum="1pt" space-after.optimum="2pt">
              <fo:block>
                <xsl:text>\u000A</xsl:text>
              </fo:block>
              <fo:block space-before.optimum="1pt" space-after.optimum="2pt">
                <fo:block text-align="justify">
                  <fo:block>
                    <fo:leader leader-pattern="space"/>
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space"/>
                  </fo:block>
                  <fo:inline font-size="12pt" font-weight="normal">Dear <xsl:apply-templates
                    select="FIELD[FNAME='providerGroupName']"/>,
                  </fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space"/>
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space"/>
                  </fo:block>
                  <fo:inline font-size="12pt"> We wish to inform you that your contract '</fo:inline> 
				  <!-- BEGIN, CR00356535, PB -->
                  <fo:inline xsl:use-attribute-sets="Normal_1"><xsl:apply-templates select="FIELD[FNAME='contractReferenceNumber']"/></fo:inline>
	          <fo:inline font-size="12pt">' is due to end on <xsl:apply-templates select="FIELD[FNAME='endDate']"/>. Please contact us if you wish to renew your contract.
			  <!-- END, CR00356535 -->
                  </fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space"/>
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space"/>
                  </fo:block>
                  <fo:inline font-size="12pt" font-weight="normal">Regards,</fo:inline>
                  <fo:block>
                    <fo:leader leader-pattern="space"/>
                  </fo:block>
                  <fo:block>
                    <fo:leader leader-pattern="space"/>
                  </fo:block>
                  <fo:inline font-size="12pt">
                    <xsl:apply-templates select="FIELD[FNAME='organizationName']"/>.
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
    <xsl:value-of select="VALUE"/>
  </xsl:template>
</xsl:stylesheet>
