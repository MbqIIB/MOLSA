<?xml version="1.0" encoding="UTF-8"?>
<!-- BEGIN, CR00357205, PB -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:foa="http://fabio" version="1.0">
  <!-- END, CR00357205 -->
  <!-- BEGIN, CR00352142, PB -->
  <xsl:attribute-set name="Normal_1" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">5mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="text-indent">110mm</xsl:attribute>
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
    <xsl:attribute name="linefeed-treatment">preserve</xsl:attribute>
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
    <xsl:attribute name="line-height">5mm</xsl:attribute>
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
    <xsl:attribute name="line-height">15mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="text-indent">0mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_5" foa:class="block">
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
    <xsl:attribute name="linefeed-treatment">preserve</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="white-space-treatment">preserve</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_6" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">7mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="text-indent">0mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <!-- END, CR00352142 -->
  <xsl:template match="DOCUMENT">
    <!--Explicitly select DATA to ensure META element is ignored.-->
    <xsl:apply-templates select="DATA" />
  </xsl:template>
  <xsl:template match="DATA">
    <!--Explicitly select the STRUCT to avoid processing anything else.-->
    <!-- to do: change SNAME name -->
    <xsl:apply-templates select="STRUCT[SNAME='ProFormaDocumentData']" />
  </xsl:template>
  <xsl:template match="STRUCT">
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
          <!-- BEGIN, CR00352142, PB -->
          <fo:block xsl:use-attribute-sets="Normal_2">
            <xsl:apply-templates select="FIELD[FNAME='concernRoleAddress']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3"> </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_1">
            <xsl:apply-templates select="FIELD[FNAME='currentDate']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_4"> </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">برجاء تأكيد أن المعلومات التالية التي تقوم بادخالها لهذه الادارة تعد صحيحة.</fo:block>
          <fo:block xsl:use-attribute-sets="Normal_4"> </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            اسم العميل: <xsl:apply-templates select="FIELD[FNAME='concernRoleName']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            اسم صاحب العمل:
            <xsl:apply-templates select="FIELD[FNAME='lastEmployerName']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            آخر عمل:
            <xsl:apply-templates select="FIELD[FNAME='dateLastWorked']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            سبب البطالة:
            <xsl:apply-templates select="FIELD[FNAME='lastReasonCode']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            مقابل لآخر صاحب عمل:
            <xsl:apply-templates select="FIELD[FNAME='nextToLastEmployerName']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            سبب البطالة:
            <xsl:apply-templates select="FIELD[FNAME='nextToLastReasonCode']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            متاح للعمل:
            <xsl:apply-templates select="FIELD[FNAME='availableForWorkInd']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            يمكنه العمل:
            <xsl:apply-templates select="FIELD[FNAME='capableOfWorkInd']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            عند استلام اعانات أخرى:
            <xsl:apply-templates select="FIELD[FNAME='receiptOfOtherBenefitsInd']" />
          </fo:block>
          <xsl:if test="FIELD[FNAME='receiptOfOtherBenefitsInd' and VALUE='1']">
            <fo:block xsl:use-attribute-sets="Normal_6">
              التفاصيل:
              <xsl:apply-templates select="FIELD[FNAME='otherBenefitDescription']" />
            </fo:block>
            <fo:block xsl:use-attribute-sets="Normal_6">
              المبلغ:
              <xsl:apply-templates select="FIELD[FNAME='otherBenefitAmount']" />
            </fo:block>
          </xsl:if>
          <fo:block xsl:use-attribute-sets="Normal_6">
            ينطبق على الاعانة في مناطق أخرى:
            <xsl:apply-templates select="FIELD[FNAME='appliedInAnotherStateInd']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            المحافظة:
            <xsl:apply-templates select="FIELD[FNAME='stateCode']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            مقيم بهذه المحافظة:
            <xsl:apply-templates select="FIELD[FNAME='clientResidentInd']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            العرق:
            <xsl:apply-templates select="FIELD[FNAME='ethnicityCode']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            المحاربين القدماء:
            <xsl:apply-templates select="FIELD[FNAME='veteranInd']" />
          </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_6">
            عضو بنقابة:
            <xsl:apply-templates select="FIELD[FNAME='unionMemberInd']" />
          </fo:block>
          <xsl:if test="FIELD[FNAME='unionMemberInd' and VALUE='1']">
            <fo:block xsl:use-attribute-sets="Normal_6">
              تفاصيل النقابة:
              <xsl:apply-templates select="FIELD[FNAME='unionMemberDescription']" />
            </fo:block>
          </xsl:if>
          <fo:block xsl:use-attribute-sets="Normal_3"> </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3"> </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3">أوضح أن كل التفاصيل التي تم ادخالها حقيقية وتامة وأنني
             أتعهد باعلام الادارة عند الحصول على وظيفة أو عند حدوث
             أي تغيير في التفاصيل الموضحة.</fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3"> </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3"> </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3">برجاء التوقيع هنا:</fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3"> </fo:block>
          <!-- END, CR00352142 -->
        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  <xsl:template match="FIELD">
    <xsl:choose>
      <xsl:when test="TYPE='SVR_BOOLEAN'">
        <xsl:choose>
          <xsl:when test="VALUE='false'">لا</xsl:when>
          <xsl:otherwise>نعم</xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="VALUE" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>


