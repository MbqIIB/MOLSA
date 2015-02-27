<?xml version='1.0' encoding="UTF-8" standalone='yes'?>
<!DOCTYPE xsl:stylesheet [<!ENTITY nbsp "&#160;">]>
<!-- BEGIN, CR00357205, PB -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:fo="http://www.w3.org/1999/XSL/Format"
  version='1.0' xmlns:foa="http://fabio">
  <!-- END, CR00357205 -->
<!-- BEGIN, CR00352142, PB -->
      <xsl:attribute-set name="Normal_1" foa:class="block">
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
    <xsl:attribute name="font-size">10.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
 </xsl:attribute-set>
  
       <xsl:attribute-set name="Normal_3" foa:class="inline">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-family">WT Sans</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->

  </xsl:attribute-set>
   
       <xsl:attribute-set name="Normal_4" foa:class="inline">
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
        <!-- BEGIN, CR00352142, PB -->
          <fo:block xsl:use-attribute-sets="Normal_1" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="center" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_4">طلب للمعلومات للتحقق من الأهلية </fo:inline>
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
            <fo:inline xsl:use-attribute-sets="Normal_3">عزيري
<xsl:apply-templates select="FIELD[FNAME='applicantTitle']"/>&nbsp;<xsl:apply-templates select="FIELD[FNAME='applicantSurname']"/>،</fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_3">للحصول على الاعانات يجب أن تقوم بتزويدنا بوثائق التحقق التالي  </fo:inline>
            <fo:inline xsl:use-attribute-sets="Normal_4">لك </fo:inline>
            <fo:inline xsl:use-attribute-sets="Normal_3">و </fo:inline>
            <fo:inline xsl:use-attribute-sets="Normal_4">كل الأشخاص الذي تقوم بطلبهم </fo:inline>
            <fo:inline xsl:use-attribute-sets="Normal_3">. واذا كان لديك أي استفسار أو اذا كنت تريد المساعدة في الحصول على اثبات، برجاء الاتصال بنا. نحن
نشكرك. </fo:inline>
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>
          <fo:block font-size="12pt">
            <fo:table>
              <fo:table-column column-width="50mm"/>
              <fo:table-column column-width="50mm"/>
              <fo:table-column column-width="50mm"/>
              <fo:table-body>
                <fo:table-row>
                  <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="5.4pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_4">الدخل</fo:inline>
                    </fo:block>
                    <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      &nbsp;
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">كعب ايصال الدفع</fo:inline>
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">ايصال لنفقات الأعمال</fo:inline>
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">بيان الأرباح التقديرية</fo:inline>
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">الضرائب المرتجعة</fo:inline>
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">شيك/ايصال المعاش</fo:inline>
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">شيك أو نسخة أغلب أحدث الاعانات </fo:inline>
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">شهادة خطية من كفيل مخالف</fo:inline>
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">سجلات المحكمة</fo:inline>
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="5.4pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">بيان من الشخص/الهيئة يثبت الأموال أو بعملية الدفع للعميل </fo:inline>
                    </fo:block>
                  </fo:table-cell>
                  <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="5.4pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_4">دليل الهوية</fo:inline>
                    </fo:block>
                    <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      &nbsp;
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">رخصة القيادة</fo:inline>
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">سجلات المستشفى أو الميلاد</fo:inline>
                    </fo:block>
					<!-- BEGIN, CR00357029, PB -->
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">تصريح الزواج/الطلاق</fo:inline>
                    </fo:block>
					<!-- END, CR00357029 -->
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">جواز سفر أمريكي</fo:inline>
                    </fo:block>
                    <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                      <fo:inline xsl:use-attribute-sets="Normal_2">أوراق أو سجلات التبني</fo:inline>
                    </fo:block>
                   <fo:block margin-left="0.0pt" space-after="5.4pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">بطاقة التسجيل الانتخابي</fo:inline>
                   </fo:block>
                 </fo:table-cell>
                 <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="5.4pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_4">أحدث اثبات للنفقات</fo:inline>
                   </fo:block>
                   <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     &nbsp;
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">بيان مكتوب/الفواتير من جهة التقديم</fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">بطاقات الرعاية الصحية، التأمين الصحي والاعانات الحالية </fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">الفواتير الطبية للمفلس</fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">اثبات الاعاقة</fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">ايصال الايجار، الرهن العقاري</fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">اتفاقية التأجير</fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="5.4pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">فواتير الغاز والكهرباء والتليفون </fo:inline>
                   </fo:block>
                 </fo:table-cell>
               </fo:table-row>
               <fo:table-row>
                 <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="5.4pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_4">الحضور بالمدرسة</fo:inline>
                   </fo:block>
                   <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     &nbsp;
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">المدرسة</fo:inline>
                     <fo:inline xsl:use-attribute-sets="Normal_2"> سجلات الحضور</fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="5.4pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">بطاقة التقرير الحالي</fo:inline>
                   </fo:block>
                 </fo:table-cell>
                 <fo:table-cell border-bottom-style="none" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="5.4pt" text-align="justify" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_4">ASSETS</fo:inline>
                   </fo:block>
                   <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="justify" text-indent="0.0pt">
                     &nbsp;
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">بيان البنك</fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">التحقق من الحساب، حساب التوفير وسجلات النقابة </fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">الأسهم والسندات</fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">بيان من مسؤول البنك، وهيئة التأمين </fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">تقييمات التأمين/الضرائب</fo:inline>
                   </fo:block>
                   <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                     <fo:inline xsl:use-attribute-sets="Normal_2">وثيقة التأمين</fo:inline>
                   </fo:block>
                  <fo:block margin-left="0.0pt" space-after="5.4pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_2">أحدث ايصالات للمبيعات</fo:inline>
                  </fo:block>
                </fo:table-cell>
                <fo:table-cell border-bottom-style="none" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                  <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="5.4pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_4">EMERGENCY </fo:inline>
                    <fo:inline xsl:use-attribute-sets="Normal_4">ASSISTANCE</fo:inline>
                  </fo:block>
                  <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                    &nbsp;
                  </fo:block>
                  <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_2">بيان الطرد من المالك</fo:inline>
                  </fo:block>
                  <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_2">اشعار مكتوب بانهاء مرق الخدمة من جهة التقديم </fo:inline>
                  </fo:block>
                  <fo:block margin-left="0.0pt" space-after="5.4pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_2">بيان موقع من المؤسسة المقرضة</fo:inline>
                  </fo:block>
                </fo:table-cell>
              </fo:table-row>
              <fo:table-row>
                <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="solid" border-top-width="0.5pt" padding-left="5.4pt" padding-right="5.4pt">
                  <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="5.4pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_4">SSN</fo:inline>
                  </fo:block>
                  <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                    &nbsp;
                  </fo:block>
                  <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_2">بطاقة الضمان الاجتماعي</fo:inline>
                  </fo:block>
                  <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_2">نسخة من تطبيق SSN </fo:inline>
                  </fo:block>
                  <fo:block margin-left="0.0pt" space-after="5.4pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_2">مخرجات طباعة Bendex أو SDX </fo:inline>
                  </fo:block>
                </fo:table-cell>
                <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="none" padding-left="5.4pt" padding-right="5.4pt">
                  <fo:block margin-left="0.0pt" space-after="5.4pt" space-before="5.4pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_3">&nbsp;</fo:inline>
                  </fo:block>
                </fo:table-cell>
                <fo:table-cell border-bottom-style="solid" border-bottom-width="0.5pt" border-left-style="solid" border-left-width="0.5pt" border-right-style="solid" border-right-width="0.5pt" border-top-style="none" padding-left="5.4pt" padding-right="5.4pt">
				<!-- BEGIN, CR00357029, PB -->
                  <fo:block margin-left="0.0pt" space-after="5.4pt" space-before="5.4pt" text-align="start" text-indent="0.0pt">
                    <fo:inline xsl:use-attribute-sets="Normal_3">&nbsp;</fo:inline>
                  </fo:block>
				  <!-- ENd, CR00357029 -->
                </fo:table-cell>
              </fo:table-row>
            </fo:table-body>
          </fo:table>
          </fo:block>
          
          <fo:block font-size="12.0pt" margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            &nbsp;
          </fo:block>  
          <fo:block margin-left="0.0pt" space-after="0.0pt" space-before="0.0pt" text-align="start" text-indent="0.0pt">
            <fo:inline xsl:use-attribute-sets="Normal_2">*هام: هذا الاثبات يجب أن يتضمن اسم وعنوان ورقم تليفون الشخص الذي قام بتقديم البيان. </fo:inline>
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
