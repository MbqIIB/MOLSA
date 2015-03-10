<?xml version="1.0" encoding="UTF-8"?>
<!-- BEGIN, CR00357205, PB -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:foa="http://fabio" version="1.0">

 
  <xsl:attribute-set name="Normal_1" foa:class="block">
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <xsl:attribute name="line-height">5mm</xsl:attribute>
    <xsl:attribute name="text-align">right</xsl:attribute>
    <xsl:attribute name="font-weight">bold</xsl:attribute>
    <xsl:attribute name="text-indent">50mm</xsl:attribute>
  </xsl:attribute-set>
 <xsl:attribute-set name="Normal_2" foa:class="block">
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <xsl:attribute name="font-weight">bold</xsl:attribute>
    <xsl:attribute name="line-height">6mm</xsl:attribute>
    <xsl:attribute name="space-before.optimum">10mm</xsl:attribute>
    <xsl:attribute name="text-align">center</xsl:attribute>
   </xsl:attribute-set>
 <xsl:attribute-set name="Normal_3" foa:class="block">
     <xsl:attribute name="font-size">12.0pt</xsl:attribute>
     <xsl:attribute name="line-height">7mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="border-width">2mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_4" foa:class="block">
   <xsl:attribute name="font-size">12.0pt</xsl:attribute>
     <xsl:attribute name="line-height">5mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="border-width">2mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_5" foa:class="block">
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
     <xsl:attribute name="line-height">7mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="border-width">2mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_6" foa:class="block">
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
     <xsl:attribute name="line-height">10mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="margin-left">35mm</xsl:attribute>
     <xsl:attribute name="text-align">left</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_7" foa:class="block">
     <xsl:attribute name="font-size">12.0pt</xsl:attribute>
     <xsl:attribute name="line-height">5mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="text-align">left</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_8" foa:class="block">
     <xsl:attribute name="font-size">10.0pt</xsl:attribute>
     <xsl:attribute name="line-height">5mm</xsl:attribute>
     <xsl:attribute name="text-align">left</xsl:attribute>
  </xsl:attribute-set>	
 
 
  <xsl:attribute-set name="Normal_9" foa:class="block">
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="line-height">6mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
    <!-- START NON-TRANSLATABLE -->
    <xsl:attribute name="space-before.optimum">8mm</xsl:attribute>
    <!-- END NON-TRANSLATABLE -->
  </xsl:attribute-set>
  <!-- END, CR00352142 -->
  <xsl:template match="DOCUMENT">
    <!--Explicitly select DATA to ensure META element is ignored.-->
    <xsl:apply-templates select="DATA" />
  </xsl:template>
  <xsl:template match="DATA">
    <!--Explicitly select the STRUCT to avoid processing anything
 else.-->
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
        <!-- BEGIN, CR00352142, PB -->
	    <!-- START NON-TRANSLATABLE -->
        <fo:flow flow-name="xsl-region-body" font-family="WT Sans ME">
        
        <fo:block xsl:use-attribute-sets="Normal_8">..................... :سجل طلب تحت الرقم </fo:block>
        <fo:block xsl:use-attribute-sets="Normal_8">..................... :التاريخ </fo:block>
	<fo:block xsl:use-attribute-sets="Normal_1">إدارة الشؤون الاجتماعية </fo:block>
	<fo:block xsl:use-attribute-sets="Normal_1">الضمان الإجتماعي</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_2">طلب مساعدة إجتماعية </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_1" white-space="pre">السيد مدير إدارة الشؤون الإجتماعية     حفظه الله</fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3" white-space="pre">السلام عليكم و رحمة الله و بركاته,      و بعد  </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3">١- اسم طالب المساعدة....................................................المقيم بمدينة...............................................ه </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3">١- اسم المنطقة................رقم المنزل .....................الشارع...............................................ه </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3">١- اسم المنطقة................رقم المنزل .....................الشارع...............................................ه </fo:block>
          <fo:block xsl:use-attribute-sets="Normal_3">١- اسم المنطقة................رقم المنزل .....................الشارع...............................................ه </fo:block>
          
		  
		  <fo:table>
     <fo:table-column column-width="20%"/>
     <fo:table-column column-width="80%"/>
     <fo:table-body>
       <fo:table-row>
         <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     الاسم
           </fo:block>
         </fo:table-cell>
         <fo:table-cell>
           <fo:block margin="12pt" font-size="8pt">
		     الصلة
           </fo:block>
         </fo:table-cell>
       </fo:table-row>
       <fo:table-row>
         <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		    ...............
           </fo:block>
         </fo:table-cell>
         <fo:table-cell>
           <fo:block margin="12pt" font-size="36pt">
		     ...................
           </fo:block>
         </fo:table-cell>
       </fo:table-row>
     </fo:table-body>
   </fo:table>
		  
    


	<fo:table>
     <fo:table-column column-width="20%"/>
     <fo:table-column column-width="80%"/>
     <fo:table-body>
       <fo:table-row>
         <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     ملاحظات
           </fo:block>
         </fo:table-cell>
         <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     المستوى الاجتماعي
           </fo:block>
         </fo:table-cell>
		 <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     الحالة الصحية
           </fo:block>
         </fo:table-cell><fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     تاريخ الملاد
           </fo:block>
         </fo:table-cell><fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		    صلة القرابة
           </fo:block>
         </fo:table-cell><fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		    الاسم
           </fo:block>
         </fo:table-cell><fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     م
           </fo:block>
         </fo:table-cell>
       </fo:table-row>
       <fo:table-row>
         <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     1
           </fo:block>
         </fo:table-cell>
		 <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     2
           </fo:block>
         </fo:table-cell>
		 <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     3
           </fo:block>
         </fo:table-cell>
		 <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     4
           </fo:block>
         </fo:table-cell>
		 <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     5
           </fo:block>
         </fo:table-cell>
		 <fo:table-cell>
           <fo:block margin="12pt" font-weight="bold" font-size="8pt">
		     6
           </fo:block>
         </fo:table-cell>
         <fo:table-cell>
           <fo:block margin="12pt" >
		     7
           </fo:block>
         </fo:table-cell>
       </fo:table-row>
     </fo:table-body>
   </fo:table>

		  
		  
		  
		  
        <fo:block xsl:use-attribute-sets="Normal_5"> بطلب للحصول على مساعدة بدل خادم و سبب طلب المساعدة الإعاقة </fo:block>
	<fo:block xsl:use-attribute-sets="Normal_5"> يرجى التكرم بإحالته إلى اللجنة الطبية، وموافاتنا عن مدى حاجته لمن يقوم برعايته وتشخيص الحالة ليتسنى لنا إتخذ الإجراءت اللازمة بناءً على ردكم</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_6">شاكرين حسن تعاونكم معنا</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_7">غانم مبارك الكواري</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_7">مدير ادارة الضمان الاجتماعي</fo:block>
        </fo:flow>
        <!-- END, CR00352142 -->
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE" />
  </xsl:template>
</xsl:stylesheet>


