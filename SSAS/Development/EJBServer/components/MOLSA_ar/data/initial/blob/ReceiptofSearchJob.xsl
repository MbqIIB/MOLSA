<?xml version="1.0" encoding="UTF-8"?>
<!-- BEGIN, CR00357205, PB -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:foa="http://fabio" version="1.0">

 
  <xsl:attribute-set name="Normal_1" foa:class="block">
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <xsl:attribute name="line-height">5mm</xsl:attribute>
    <xsl:attribute name="text-align">right</xsl:attribute>
    <xsl:attribute name="text-indent">50mm</xsl:attribute>
  </xsl:attribute-set>
 <xsl:attribute-set name="Normal_2" foa:class="block">
    <xsl:attribute name="font-size">12.0pt</xsl:attribute>
    <xsl:attribute name="line-height">6mm</xsl:attribute>
    <xsl:attribute name="space-before.optimum">10mm</xsl:attribute>
    <xsl:attribute name="text-align">right</xsl:attribute>
    <xsl:attribute name="margin-right">20mm</xsl:attribute>
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
    <xsl:apply-templates select="STRUCT[SNAME='MOLSAProFormaDocumentData']" />
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
        <fo:flow flow-name="xsl-region-body" font-family="Times New Roman">
       
	<fo:block xsl:use-attribute-sets="Normal_1">السيدة ملاك عبد الله الهاجري    المحترمة</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_1">مدير إدارة القوى العاملة</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_1">الدوحة</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_2">السلام عليكم و رحمة الله و بركاته ... و بعد </fo:block>
	<fo:block xsl:use-attribute-sets="Normal_3"> 
	<fo:inline> نحيل لادارتكم الموقرة الشخص </fo:inline>
	
	<xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='concernRoleName']" />
	</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_5"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='alternateID']"/>   قطري(ة) بموجب البطاقة الشخصية رقم</fo:block>
        <fo:block xsl:use-attribute-sets="Normal_5"> مقدم طلب في نظام الضمان الاجتماعي للبحث له أو لها عن فرصة عمل مناسبة وذلك حسب القوانين والاجراءت المتبعة لديكم </fo:block>
	<fo:block xsl:use-attribute-sets="Normal_6">شاكرين حسن تعاونكم معنا</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_7"><xsl:apply-templates select="FIELD[FNAME='molsaManagerName']"/></fo:block>
	<fo:block xsl:use-attribute-sets="Normal_7">مدير ادارة الضمان الاجتماعي</fo:block>
	
	
	<fo:block xsl:use-attribute-sets="Normal_1" border-top-style="solid" >السيد/ مدير ادارة الضمان الاجتماعي  المحترم</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_2">السلام عليكم و رحمة الله و بركاته ... و بعد </fo:block>
	<fo:block xsl:use-attribute-sets="Normal_3"> 
	<fo:inline> تقدم(ت) الينا </fo:inline>
	<xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='concernRoleName']" /></fo:block>
	<fo:block xsl:use-attribute-sets="Normal_5"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='alternateID']"/>   قطري(ة) بموجب البطاقة الشخصية رقم</fo:block>
        <fo:block xsl:use-attribute-sets="Normal_5">                                   
		
		من ادارتكم الموقرة للبحث له أو لها عن فرصة عمل, نفيدكم بأنه قد تم تسجيل طلبه و سنوافيكم لاحقا بما يستجد فيه
		
		</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_6">شاكرين حسن تعاونكم معنا</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_7">ملاك عبد الله الهاجري</fo:block>
	<fo:block xsl:use-attribute-sets="Normal_7">مدير إدارة القوى العاملة</fo:block>
        </fo:flow>
        <!-- END, CR00352142 -->
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE" />
  </xsl:template>
</xsl:stylesheet>


