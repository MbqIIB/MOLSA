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
    <xsl:apply-templates select="FIELD[FNAME='isDetails']"/>
  </xsl:template>
  
  <xsl:template match="FIELD[FNAME='isDetails']">
    <xsl:apply-templates select="STRUCT[SNAME='IncomeSupportDetails']"/>
  </xsl:template>

  <xsl:template match="STRUCT[SNAME='IncomeSupportDetails']">
  
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
        
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
        
          <fo:block font-size="12pt">
            <fo:table>
              <fo:table-column column-width="90mm"/>
              <fo:table-column column-width="60mm"/>
              <fo:table-body>
                <fo:table-row>
                  <fo:table-cell padding-left="5.4pt" padding-right="5.4pt">
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      &nbsp;
                    </fo:block>
                  </fo:table-cell>
                  <fo:table-cell padding-left="5.4pt" padding-right="5.4pt">
				  <!-- BEGIN, CR00352142, PB -->
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_1">التليفون:
<xsl:apply-templates select="FIELD[FNAME='contactTelephoneNo']"/></fo:inline>
                    </fo:block>
                  </fo:table-cell>
                </fo:table-row>
                <fo:table-row>
                  <fo:table-cell padding-left="5.4pt" padding-right="5.4pt">
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      &nbsp;
                    </fo:block>
                  </fo:table-cell>
                  <fo:table-cell padding-left="5.4pt" padding-right="5.4pt">
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_1">التاريخ: <xsl:apply-templates select="FIELD[FNAME='documentDate']"/></fo:inline>
                    </fo:block>
                  </fo:table-cell>
                </fo:table-row>
              </fo:table-body>
            </fo:table>
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1"><xsl:apply-templates select="FIELD[FNAME='applicantTitle']"/>&nbsp;<xsl:apply-templates select="FIELD[FNAME='applicantFirstName']"/>&nbsp;<xsl:apply-templates select="FIELD[FNAME='applicantSurname']"/></fo:inline>
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1"><xsl:apply-templates select="FIELD[FNAME='applicantAddress']"/></fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">رقم المرجع: <xsl:apply-templates select="FIELD[FNAME='applicantReferenceNumber']"/></fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">عزيري
<xsl:apply-templates select="FIELD[FNAME='applicantTitle']"/>&nbsp;<xsl:apply-templates select="FIELD[FNAME='applicantSurname']"/>،</fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">نشكرك على الاتصال بهذا المكتب.  بناء على المعلومات التي قمت بادخالها لنا اليوم، فان النماذج التي تقوم بارفاقها توضح الاستحقاقات المحتملة لك. </fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">تم جدولة موعدك مع
<xsl:apply-templates select="FIELD[FNAME='appointmentUserFullName']"/> في
<xsl:apply-templates select="FIELD[FNAME='appointmentTime']"/> في
<xsl:apply-templates select="FIELD[FNAME='appointmentDate']"/> في
<xsl:apply-templates select="FIELD[FNAME='appointmentLocation']"/> بشأن المطالبة الى <xsl:apply-templates select="FIELD[FNAME='claimList']"/>.</fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">للحصول على الاعانات يجب أن تقوم بموافاتنا بمتطلبات التحقق الموضحة
في الوثيقة المرفقة لك وكل الأشخاص الذين تقوم بمطالتهم. </fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">يمكن تقرير الاستحقاق الفعلي بعد استلام المطالبة/الطلب الذي تم
عمله في نموذج الطلب المتضمن. ويجب أن تقوم باتمام هذا النموذج واعادته الى
<xsl:apply-templates select="FIELD[FNAME='localOffice']"/> قبل تاريخ الموعد أو احضار النموذج الذي تم ملئه للموعد. </fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">مع </fo:inline>
            <fo:inline xsl:use-attribute-sets="Normal_1">خالص التقدير،</fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1">_____________</fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_1"><xsl:apply-templates select="FIELD[FNAME='currentUserFullName']"/></fo:inline>
          </fo:block>
          <!-- END, CR00352142 -->
        </fo:flow>
        
      </fo:page-sequence>
      
    </fo:root>

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
