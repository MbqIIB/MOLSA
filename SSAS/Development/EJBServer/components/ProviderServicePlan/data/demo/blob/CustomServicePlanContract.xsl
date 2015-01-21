<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
  <xsl:template match="DOCUMENT">
    <!--Explicitly select DATA to ensure META element is ignored.-->
    <xsl:apply-templates select="DATA" />
  </xsl:template>
  <xsl:template match="DATA">
    <!--Explicitly select the STRUCT to avoid processing anything else.-->
    <xsl:apply-templates select="STRUCT[SNAME='ServicePlanDocumentData']" />
  </xsl:template>
  <xsl:template match="STRUCT[SNAME='ServicePlanDocumentData']">
    <fo:root>
      <fo:layout-master-set>
        <fo:simple-page-master master-name="only" page-height="297mm" page-width="210mm" margin-top="30mm" margin-bottom="30mm" margin-left="30mm" margin-right="30mm">
          <fo:region-body />
        </fo:simple-page-master>
      </fo:layout-master-set>
      <fo:page-sequence master-reference="only">
        <!-- START NON-TRANSLATABLE -->
        <fo:flow flow-name="xsl-region-body" font-family="WT Sans">
          <!-- END NON-TRANSLATABLE -->
          <xsl:apply-templates select="FIELD[FNAME='contractDetails']/STRUCT[SNAME='ServicePlanContractDetails']" />
        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  <xsl:template match="STRUCT[SNAME='ServicePlanContractDetails']">
    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="center" text-indent="0.0pt">
      <fo:inline font-size="12pt" font-weight="bold">Service Plan Contract</fo:inline>
    </fo:block>
    <fo:block font-size="20.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
    <fo:block wrap-option="wrap" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <fo:inline font-size="8pt">
        Client Name:
        <xsl:apply-templates select="FIELD[FNAME='clientName']" />
      </fo:inline>
      <fo:inline font-size="8pt">
                         Social Security Number:
        <xsl:apply-templates select="FIELD[FNAME='ssnNumber']" />
      </fo:inline>
    </fo:block>
    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <fo:inline font-size="8pt">
        Contract Date:
        <xsl:apply-templates select="FIELD[FNAME='contractDate']" />
      </fo:inline>
      <fo:inline font-size="8pt">
                         Plan Reference Number:
        <xsl:apply-templates select="FIELD[FNAME='caseReference']" />
      </fo:inline>
    </fo:block>
    <fo:block font-size="10.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <fo:inline font-size="8pt">
        Plan Goal:
        <xsl:apply-templates select="FIELD[FNAME='plannedGoalName']" />
      </fo:inline>
    </fo:block>
    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <fo:inline font-size="8pt">
        <xsl:apply-templates select="FIELD[FNAME='goalContractText']" />
      </fo:inline>
      <fo:block font-size="10.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
    </fo:block>
    <xsl:if test="count(FIELD[FNAME='objectivePlannedSubGoalDetails']/STRUCT[SNAME='ObjectivePlannedSubGoalDetails']/FIELD[FNAME='plannedSubGoalDetails']/STRUCT_LIST/STRUCT) &gt; 0">
      <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      <fo:block font-size="10.0pt" font-weight="bold" border="1px solid blue" background-color="white" text-align="center">Objectives</fo:block>
      <fo:block font-size="5.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      <xsl:apply-templates select="FIELD[FNAME='objectivePlannedSubGoalDetails']/STRUCT[SNAME='ObjectivePlannedSubGoalDetails']/FIELD[FNAME='plannedSubGoalDetails']/STRUCT_LIST/STRUCT[SNAME='PlannedSubGoalDetailsForContract']" />
    </xsl:if>
    <xsl:if test="count(FIELD[FNAME='barrierPlannedSubGoalDetails']/STRUCT[SNAME='BarrierPlannedSubGoalDetails']/FIELD[FNAME='plannedSubGoalDetails']/STRUCT_LIST/STRUCT) &gt; 0">
      <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      <fo:block font-size="10.0pt" font-weight="bold" border="1px solid blue" background-color="white" text-align="center">Barriers</fo:block>
      <fo:block font-size="5.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      <xsl:apply-templates select="FIELD[FNAME='barrierPlannedSubGoalDetails']/STRUCT[SNAME='BarrierPlannedSubGoalDetails']/FIELD[FNAME='plannedSubGoalDetails']/STRUCT_LIST/STRUCT[SNAME='PlannedSubGoalDetailsForContract']" />
    </xsl:if>
    <xsl:if test="count(FIELD[FNAME='needPlannedSubGoalDetails']/STRUCT[SNAME='NeedPlannedSubGoalDetails']/FIELD[FNAME='plannedSubGoalDetails']/STRUCT_LIST/STRUCT) &gt; 0">
      <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      <fo:block font-size="10.0pt" font-weight="bold" border="1px solid blue" background-color="white" text-align="center">Needs</fo:block>
      <fo:block font-size="5.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      <xsl:apply-templates select="FIELD[FNAME='needPlannedSubGoalDetails']/STRUCT[SNAME='NeedPlannedSubGoalDetails']/FIELD[FNAME='plannedSubGoalDetails']/STRUCT_LIST/STRUCT[SNAME='PlannedSubGoalDetailsForContract']" />
    </xsl:if>
    <xsl:if test="count(FIELD[FNAME='otherPlannedSubGoalDetails']/STRUCT[SNAME='OtherPlannedSubGoalDetails']/FIELD[FNAME='plannedSubGoalDetails']/STRUCT_LIST/STRUCT) &gt; 0">
      <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      <xsl:apply-templates select="FIELD[FNAME='otherPlannedSubGoalDetails']/STRUCT[SNAME='OtherPlannedSubGoalDetails']/FIELD[FNAME='plannedSubGoalDetails']" />
      <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
    </xsl:if>
    <fo:block font-size="15.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
    <fo:block font-size="15.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
    <fo:block font-size="15.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
    <fo:block font-size="15.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <xsl:if test="count(FIELD[FNAME='servicePlanSignatories']/STRUCT[SNAME='ServicePlanSignatoriesList']/FIELD[FNAME='concernRoleList']/STRUCT_LIST/STRUCT) &gt; 0">
        <fo:block font-size="12pt">
          <fo:table table-layout="fixed" width="100%">
            <fo:table-column column-width="proportional-column-width(50)" />
            <fo:table-column column-width="proportional-column-width(50)" />
            <fo:table-body>
              <xsl:apply-templates select="FIELD[FNAME='servicePlanSignatories']/STRUCT[SNAME='ServicePlanSignatoriesList']/FIELD[FNAME='concernRoleList']/STRUCT_LIST/STRUCT[SNAME='ConcernRoleNameDetails']" />
            </fo:table-body>
          </fo:table>
        </fo:block>
      </xsl:if>
    </fo:block>
  </xsl:template>
  <xsl:template match="STRUCT[SNAME='ConcernRoleNameDetails']">
    <fo:table-row>
      <fo:table-cell border-bottom-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
          <fo:inline font-size="8pt">Signature:___________________________</fo:inline>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell border-bottom-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="end" text-indent="0.0pt">
          <fo:inline font-size="8pt">Date:____________________</fo:inline>
        </fo:block>
      </fo:table-cell>
    </fo:table-row>
    <fo:table-row>
      <fo:table-cell border-bottom-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
          <fo:inline font-size="8pt">
            (
            <xsl:apply-templates select="FIELD[FNAME='concernRoleName']" />
            )
          </fo:inline>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell border-bottom-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
          <fo:inline font-size="8pt"> </fo:inline>
        </fo:block>
      </fo:table-cell>
    </fo:table-row>
    <fo:table-row>
      <fo:table-cell border-bottom-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
          <fo:inline font-size="8pt"> </fo:inline>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell border-bottom-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="end" text-indent="0.0pt">
          <fo:inline font-size="8pt"> </fo:inline>
        </fo:block>
      </fo:table-cell>
    </fo:table-row>
  </xsl:template>
  <xsl:template match="STRUCT[SNAME='OtherPlannedSubGoalDetails']">
    <xsl:for-each select="FIELD[FNAME='subGoalDtlsForContractList']/STRUCT_LIST/STRUCT[SNAME='PlannedSubGoalDetailsForContract'][not(FIELD[FNAME='plannedSubGoalDetails']/STRUCT[SNAME='PlannedSubGoalDetailsForContract']/FIELD[FNAME='subGoalType']/VALUE=preceding-sibling::STRUCT[SNAME='PlannedSubGoalDetailsForContract']/FIELD[FNAME='plannedSubGoalDetails']/STRUCT[SNAME='PlannedSubGoalDetailsForContract']/FIELD[FNAME='subGoalType']/VALUE)]">
      <xsl:sort select="FIELD[FNAME='plannedSubGoalDetails']/STRUCT[SNAME='PlannedSubGoalDetailsForContract']/FIELD[FNAME='subGoalType']/VALUE" />
      <fo:block font-size="10.0pt" font-weight="bold" border="1px solid blue" background-color="white" text-align="center">
        <xsl:value-of select="FIELD[FNAME='plannedSubGoalDetails']/STRUCT[SNAME='PlannedSubGoalDetailsForContract']/FIELD[FNAME='subGoalTypeName']/VALUE" />
      </fo:block>
      <fo:block font-size="5.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      <xsl:for-each select="../node()[FIELD[FNAME='plannedSubGoalDetails']/STRUCT[SNAME='PlannedSubGoalDetailsForContract']/FIELD[FNAME='subGoalType']/VALUE=current()/FIELD[FNAME='plannedSubGoalDetails']/STRUCT[SNAME='PlannedSubGoalDetailsForContract']/FIELD[FNAME='subGoalType']/VALUE]">
        <xsl:apply-templates select="current()" />
      </xsl:for-each>
    </xsl:for-each>
  </xsl:template>
  <xsl:template match="STRUCT[SNAME='PlannedSubGoalDetailsForContract']">
    <fo:block border-bottom-style="solid" border-bottom-width="0.5pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <fo:inline font-size="8pt">
        <xsl:apply-templates select="FIELD[FNAME='subGoalName']" />
      </fo:inline>
      <fo:block font-size="1.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      <fo:inline font-size="8pt">
        <xsl:apply-templates select="FIELD[FNAME='subGoalContractText']" />
      </fo:inline>
      <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
    </fo:block>
    <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <xsl:apply-templates select="FIELD[FNAME='plannedItemDetails']" />
    </fo:block>
  </xsl:template>
  <xsl:template match="FIELD[FNAME='plannedItemDetails']">
    <xsl:if test="count(STRUCT_LIST/STRUCT) &gt; 0">
      <fo:block font-size="12pt">
        <fo:table table-layout="fixed" width="100%">
          <fo:table-column />
          <fo:table-column />
          <fo:table-body>
            <xsl:apply-templates select="STRUCT_LIST/STRUCT[SNAME='PlannedItemDetailsForContract']" />
          </fo:table-body>
        </fo:table>
      </fo:block>
    </xsl:if>
  </xsl:template>
  <xsl:template match="STRUCT[SNAME='PlannedItemDetailsForContract']">
    <fo:table-row>
      <fo:table-cell padding-left="2.4pt" padding-right="2.4pt" number-columns-spanned="2">
        <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
          <fo:inline font-size="8pt">
            Plan Item:
            <xsl:apply-templates select="FIELD[FNAME='plannedItemName']" />
          </fo:inline>
        </fo:block>
        <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      </fo:table-cell>
    </fo:table-row>
    <fo:table-row>
      <fo:table-cell padding-left="2.4pt" padding-right="2.4pt">
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
          <fo:inline font-size="8pt">
            Start Date:
            <xsl:apply-templates select="FIELD[FNAME='plannedItemExpectedStartDate']" />
          </fo:inline>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell padding-left="2.4pt" padding-right="2.4pt">
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
          <fo:inline font-size="8pt">
            End Date:
            <xsl:apply-templates select="FIELD[FNAME='plannedItemExpectedEndDate']" />
          </fo:inline>
        </fo:block>
      </fo:table-cell>
    </fo:table-row>
    <xsl:if test="FIELD[FNAME='authorizedUnits']/VALUE &gt; 0">
      <fo:table-row>
        <fo:table-cell padding-left="2.4pt" padding-right="2.4pt">
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline font-size="8pt">
              Service Offering:
              <xsl:apply-templates select="FIELD[FNAME='serviceOfferingName']" />
            </fo:inline>
          </fo:block>
        </fo:table-cell>
        <fo:table-cell padding-left="2.4pt" padding-right="2.4pt">
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline font-size="8pt">
              Provider:
              <xsl:apply-templates select="FIELD[FNAME='providerName']" />
            </fo:inline>
          </fo:block>
        </fo:table-cell>
      </fo:table-row>
      <fo:table-row>
        <fo:table-cell padding-left="2.4pt" padding-right="2.4pt">
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline font-size="8pt">
              Units Authorized:
              <xsl:apply-templates select="FIELD[FNAME='authorizedUnits']" />
            </fo:inline>
          </fo:block>
        </fo:table-cell>
        <fo:table-cell padding-left="2.4pt" padding-right="2.4pt">
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline font-size="8pt">
              Total Units Authorized:
              <xsl:apply-templates select="FIELD[FNAME='totalUnitsAuthorized']" />
            </fo:inline>
          </fo:block>
        </fo:table-cell>
      </fo:table-row>
      <fo:table-row>
        <fo:table-cell padding-left="2.4pt" padding-right="2.4pt">
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline font-size="8pt">
              Rate Authorized:
              <xsl:apply-templates select="FIELD[FNAME='rateAuthorized']" />
            </fo:inline>
          </fo:block>
        </fo:table-cell>
        <fo:table-cell padding-left="2.4pt" padding-right="2.4pt">
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline font-size="8pt">
              Frequency:
              <xsl:apply-templates select="FIELD[FNAME='frequencyName']" />
            </fo:inline>
          </fo:block>
        </fo:table-cell>
      </fo:table-row>
    </xsl:if>
    <fo:table-row>
      <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" padding-left="2.4pt" padding-right="2.4pt" number-columns-spanned="2">
        <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
          <fo:inline font-size="8pt" font-weight="bold">
            Comments:
            <xsl:apply-templates select="FIELD[FNAME='comments']" />
          </fo:inline>
        </fo:block>
        <fo:block font-size="8.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt"> </fo:block>
      </fo:table-cell>
    </fo:table-row>
  </xsl:template>
  <xsl:template match="FIELD">
    <xsl:choose>
      <xsl:when test="TYPE='SVR_BOOLEAN'">
        <xsl:choose>
          <xsl:when test="VALUE='false'">No</xsl:when>
          <xsl:otherwise>Yes</xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="VALUE" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>

