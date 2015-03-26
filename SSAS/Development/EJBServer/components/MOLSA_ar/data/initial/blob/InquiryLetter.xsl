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
        <fo:flow flow-name="xsl-region-body" font-family="WT Sans ME">
        
    <fo:block xsl:use-attribute-sets="Normal_8"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='currentDate']"/>  :تاريخ تقديم الطلب </fo:block>
	<fo:block xsl:use-attribute-sets="Normal_8"> <xsl:apply-templates select="FIELD[FNAME='caseReferenceID']" />  :رقم الطلب </fo:block>
	
	
	<fo:block xsl:use-attribute-sets="Normal_3"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='concernRoleName']"/>  :اسم مقدم الطلب </fo:block>
    <fo:block xsl:use-attribute-sets="Normal_5"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='alternateID']"/>  :رقم البطاقة</fo:block>
    <fo:block xsl:use-attribute-sets="Normal_3"> <xsl:apply-templates select="FIELD[FNAME='programNames']"/>  :نوع الحالة</fo:block>
    <fo:block xsl:use-attribute-sets="Normal_5"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='concernRoleName']"/>  :اسم صاحب الطلب</fo:block>
    <fo:block xsl:use-attribute-sets="Normal_3"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='alternateID']"/>  البطاقة </fo:block>
    <fo:block xsl:use-attribute-sets="Normal_5"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='currentDate']"/>  :تاريخ المراجعة</fo:block>
    <fo:block xsl:use-attribute-sets="Normal_3">   للاستفسار عن سير المعاملة يرجى الاتصال على </fo:block>
    <fo:block xsl:use-attribute-sets="Normal_5"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='userFullName']"/>  :الباحث</fo:block>
    <fo:block xsl:use-attribute-sets="Normal_7">نسخة مقدم الطلب</fo:block>
	
	
	
	<fo:block xsl:use-attribute-sets="Normal_3" border-top-style="solid"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='concernRoleName']"/>  :اسم مقدم الطلب </fo:block>
    <fo:block xsl:use-attribute-sets="Normal_5"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='alternateID']"/>  :رقم البطاقة</fo:block>
    <fo:block xsl:use-attribute-sets="Normal_3"> <xsl:apply-templates select="FIELD[FNAME='programNames']"/>  :نوع الحالة</fo:block>
    <fo:block xsl:use-attribute-sets="Normal_5"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='concernRoleName']"/>  :اسم صاحب الطلب</fo:block>
    <fo:block xsl:use-attribute-sets="Normal_3"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='alternateID']"/>  البطاقة </fo:block>
    <fo:block xsl:use-attribute-sets="Normal_5"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='currentDate']"/>  :تاريخ المراجعة</fo:block>
    <fo:block xsl:use-attribute-sets="Normal_3">   للاستفسار عن سير المعاملة يرجى الاتصال على </fo:block>
    <fo:block xsl:use-attribute-sets="Normal_5"> <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='userFullName']"/>  :الباحث</fo:block>
    <fo:block xsl:use-attribute-sets="Normal_7"><xsl:apply-templates select="FIELD[FNAME='caseReferenceID']" /> :نسخة لملف الحالة رقم</fo:block>
	
	
	
        </fo:flow>
        <!-- END, CR00352142 -->
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE" />
  </xsl:template>
</xsl:stylesheet>


