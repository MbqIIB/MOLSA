<?xml version='1.0' encoding="UTF-8" standalone='yes'?>
<!DOCTYPE xsl:stylesheet [<!ENTITY nbsp "&#160;">]>
<!-- BEGIN, CR00357205, PB -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:fo="http://www.w3.org/1999/XSL/Format"
  version='1.0' xmlns:foa="http://fabio">
  <!-- END, CR00357205 -->
  <!-- BEGIN, CR00352142, PB -->
      <xsl:attribute-set name="Normal_1" foa:class="inline">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  
     <xsl:attribute-set name="Normal_2" foa:class="inline">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">14.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
	<!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-weight">bold</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  
       <xsl:attribute-set name="Normal_3" foa:class="inline">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
	<!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-weight">bold</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <!-- END, CR00352142 -->
  <xsl:template match="DOCUMENT">
    <!--Explicitly select DATA to ensure META element is ignored.-->
    <xsl:apply-templates select="DATA"/>
  </xsl:template>
    
    
  <xsl:template match="DATA">
    <!--Explicitly select the STRUCT to avoid processing anything else.-->
    <xsl:apply-templates select="STRUCT[SNAME='IncomeSupportDocumentData']"/>
  </xsl:template>
  
  
  <xsl:template match="STRUCT[SNAME='IncomeSupportDocumentData']">
  
    <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
      
      <fo:layout-master-set>
        <fo:simple-page-master master-name="only"
                               page-height="297mm"
                               page-width="210mm"
                               margin-top="30mm"
                               margin-bottom="30mm"
                               margin-left="30mm"
                               margin-right="30mm">
          <fo:region-body/>
        </fo:simple-page-master>
      </fo:layout-master-set>
      
      <fo:page-sequence master-reference="only">
      
        <fo:flow flow-name="xsl-region-body">
        
          <xsl:apply-templates select="FIELD[FNAME='isDetails']"/>
          <!-- BEGIN, CR00352142, PB -->
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="center" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">&nbsp;</fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="center" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">&nbsp;</fo:inline>
          </fo:block>
                        
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">برجاء ملاحظة أن الاستحقاق المعروضة تعد تقديرات على أساس
المعلومات التي قمت بتزويدنا بها اليوم فقط. ويمكن اتخاذ قرار بشأن الاستحقاق الفعلي بعد استلام المطالبة/الطلب الذي تم تقديمه بنموذج الطلب/المطالبة المناسبة. </fo:inline>
          </fo:block>
          <fo:block font-size="9.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">&nbsp;</fo:inline>
          </fo:block>
          
          <xsl:apply-templates select="FIELD[FNAME='eligibilityData']"/>
        </fo:flow>
          
      </fo:page-sequence>
          
    </fo:root>
         
  </xsl:template>
  
  
  <xsl:template match="FIELD[FNAME='isDetails']">
    <xsl:apply-templates select="STRUCT[SNAME='IncomeSupportDetails']"/>
  </xsl:template>

  
  <xsl:template match="STRUCT[SNAME='IncomeSupportDetails']">
    
    <fo:block xsl:use-attribute-sets="Normal_1" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="center" text-indent="0.0pt">
      <fo:inline xsl:use-attribute-sets="Normal_2">ملخص كل بيانات ESTIMATED الى
<xsl:apply-templates select="FIELD[FNAME='applicantTitle']"/>&nbsp;<xsl:apply-templates select="FIELD[FNAME='applicantFirstName']"/>&nbsp;<xsl:apply-templates select="FIELD[FNAME='applicantSurname']"/></fo:inline>
    </fo:block>
  
  </xsl:template>
  
  
  <xsl:template match="FIELD[FNAME='eligibilityData']">
    <xsl:apply-templates select="STRUCT[SNAME='EligibilityDocumentData']"/>
  </xsl:template>

  
  
  <xsl:template match="STRUCT[SNAME='EligibilityDocumentData']">
  
    <!--
    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <fo:inline font-family="WT Sans ME" font-size="12pt">The following estimate eligibility results are based on rules effective from <xsl:apply-templates select="FIELD[FNAME='effectiveFromDate']"/>.</fo:inline>
    </fo:block>
    
    <fo:block font-size="10.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <fo:inline font-family="WT Sans ME" font-size="12pt">&nbsp;</fo:inline>
    </fo:block>
    -->
    
    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
      <fo:inline xsl:use-attribute-sets="Normal_1">بناء على المعلومات التي قمت بادخالها لنا اليوم، فان ما يلي يوضح
أعضاء الأسرة والاعانات التي يحتمل أن يكونوا مؤهلين لها. </fo:inline>
    </fo:block>
              
    <xsl:apply-templates select="FIELD[FNAME='eligibleSchemeDataList']"/>
    <xsl:apply-templates select="FIELD[FNAME='eligibleAdditionalGroupDetailsList']"/>
    <xsl:apply-templates select="FIELD[FNAME='ineligibleSchemeDataList']"/>
    
  </xsl:template>
  
  
  <xsl:template match="FIELD[FNAME='eligibleSchemeDataList']">
    <xsl:if test="count(STRUCT_LIST/STRUCT) > 0">
    
      <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
        <fo:inline xsl:use-attribute-sets="Normal_1">&nbsp;</fo:inline>
      </fo:block>
      <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
        <fo:inline xsl:use-attribute-sets="Normal_1">&nbsp;</fo:inline>
      </fo:block>
      
      <fo:block font-size="12pt">
        <fo:table>
          <fo:table-column column-width="75mm"/>
          <fo:table-column column-width="75mm"/>
          <fo:table-body>
            <fo:table-row>
              <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                  <fo:inline xsl:use-attribute-sets="Normal_3">يحتمل أن يكون مؤهل الى:</fo:inline>
                </fo:block>
              </fo:table-cell>
              <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                  <fo:inline xsl:use-attribute-sets="Normal_3">أعضاء الأسرة:</fo:inline>
                </fo:block>
              </fo:table-cell>
            </fo:table-row>
      
            <xsl:apply-templates select="STRUCT_LIST/STRUCT[SNAME='EligibleSchemeData']"/>
    
          </fo:table-body>
        </fo:table>
      </fo:block>
          
    </xsl:if>
  </xsl:template>
  
  
  <xsl:template match="STRUCT[SNAME='EligibleSchemeData']">
  
    <fo:table-row>
      <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
          <fo:inline xsl:use-attribute-sets="Normal_1"><xsl:apply-templates select="FIELD[FNAME='schemeType']"/>&nbsp;</fo:inline>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
        <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
          <fo:inline xsl:use-attribute-sets="Normal_1"><xsl:apply-templates select="FIELD[FNAME='eligibleApplicantGroup']"/>&nbsp;</fo:inline>
        </fo:block>
      </fo:table-cell>
    </fo:table-row>
                
  </xsl:template>
    
  
  <xsl:template match="FIELD[FNAME='eligibleAdditionalGroupDetailsList']">
    <xsl:if test="count(STRUCT_LIST/STRUCT) > 0">
    
      <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
        <fo:inline xsl:use-attribute-sets="Normal_1">&nbsp;</fo:inline>  
      </fo:block>
      <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
        <fo:inline xsl:use-attribute-sets="Normal_1">&nbsp;</fo:inline>  
      </fo:block>
      
      <fo:block font-size="12pt">
        <fo:table>
          <fo:table-column column-width="150mm"/>
          <fo:table-body>
            <fo:table-row>
              <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                <fo:block margin-left="108.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="-108.0pt">
                  <fo:inline xsl:use-attribute-sets="Normal_3">المساعدات المالية التي يحتمل تأهل المجموعات الأخرى من الأسرة لها: </fo:inline>
                </fo:block>
              </fo:table-cell>
            </fo:table-row>
      
            <xsl:apply-templates select="STRUCT_LIST/STRUCT[SNAME='EligibleAdditionalGroupDetails_bo']"/>
      
          </fo:table-body>
        </fo:table>
      </fo:block>
      
    </xsl:if>
  </xsl:template>
  
  
  <xsl:template match="STRUCT[SNAME='EligibleAdditionalGroupDetails_bo']">
  
    <fo:table-row>
      <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
        <fo:block margin-left="108.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="-108.0pt">
          <fo:inline xsl:use-attribute-sets="Normal_1"><xsl:apply-templates select="FIELD[FNAME='eligibleAdditionalGroup']"/>&nbsp;</fo:inline>
        </fo:block>
      </fo:table-cell>
    </fo:table-row>
  
  </xsl:template>
  
  
  <xsl:template match="FIELD[FNAME='ineligibleSchemeDataList']">
    <xsl:if test="count(STRUCT_LIST/STRUCT) > 0">
    
      <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
        <fo:inline xsl:use-attribute-sets="Normal_1">&nbsp;</fo:inline>  
      </fo:block>
      <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
        <fo:inline xsl:use-attribute-sets="Normal_1">&nbsp;</fo:inline>  
      </fo:block>
      
      <fo:block font-size="12pt">
        <fo:table>
          <fo:table-column column-width="150mm"/>
          <fo:table-body>
            <fo:table-row>
              <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                <fo:block margin-left="108.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="-108.0pt">
                  <fo:inline xsl:use-attribute-sets="Normal_3">غير مؤهل الى:</fo:inline>
                </fo:block>
              </fo:table-cell>
            </fo:table-row>
            
            <xsl:apply-templates select="STRUCT_LIST/STRUCT[SNAME='IneligibleSchemeData']"/>
      
          </fo:table-body>
        </fo:table>
      </fo:block>
      
    </xsl:if>
  </xsl:template>
  
  
  <xsl:template match="STRUCT[SNAME='IneligibleSchemeData']">
  
    <fo:table-row>
      <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
        <fo:block margin-left="108.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="-108.0pt">
          <fo:inline xsl:use-attribute-sets="Normal_1"><xsl:apply-templates select="FIELD[FNAME='schemeType']"/>&nbsp;</fo:inline>
        </fo:block>
      </fo:table-cell>
    </fo:table-row>
    <!-- END, CR00352142 -->            
  </xsl:template>
  
  
  <xsl:template match="FIELD">
    <xsl:choose>
      <xsl:when test="TYPE='SVR_BOOLEAN'">
      
        <xsl:choose>
          <xsl:when test="VALUE='false'">
            لا
          </xsl:when>
          <xsl:otherwise>
            نعم
          </xsl:otherwise>
        </xsl:choose>
      
      </xsl:when>
      
      <xsl:otherwise>
        <xsl:value-of select="VALUE"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
                 
 
</xsl:stylesheet>
