<?xml version="1.0" encoding="UTF-8"?>
<!-- BEGIN, CR00357205, PB -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:foa="http://fabio" version="1.0">

  <xsl:attribute-set name="Normal_1" foa:class="block">
    <xsl:attribute name="font-size">25.0pt</xsl:attribute>
	<xsl:attribute name="font-weight">bold</xsl:attribute>
	<xsl:attribute name="margin-bottom">2mm</xsl:attribute>
  </xsl:attribute-set>
 <xsl:attribute-set name="Normal_2" foa:class="block">
    <xsl:attribute name="font-size">18.0pt</xsl:attribute>
    <xsl:attribute name="line-height">6mm</xsl:attribute>
    <xsl:attribute name="space-before.optimum">10mm</xsl:attribute>
    <xsl:attribute name="text-align">right</xsl:attribute>
    <xsl:attribute name="margin-right">20mm</xsl:attribute>
   </xsl:attribute-set>
 <xsl:attribute-set name="Normal_3" foa:class="block">
     <xsl:attribute name="font-size">18.0pt</xsl:attribute>
     <xsl:attribute name="line-height">7mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="border-width">2mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_4" foa:class="block">
   <xsl:attribute name="font-size">9.0pt</xsl:attribute>
     <xsl:attribute name="line-height">5mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="border-width">2mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_5" foa:class="block">
    <xsl:attribute name="font-size">18.0pt</xsl:attribute>
     <xsl:attribute name="line-height">7mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="border-width">2mm</xsl:attribute>
     <xsl:attribute name="text-align">right</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_6" foa:class="block">
    <xsl:attribute name="font-size">18.0pt</xsl:attribute>
     <xsl:attribute name="line-height">10mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="margin-left">35mm</xsl:attribute>
     <xsl:attribute name="text-align">left</xsl:attribute>
	 <xsl:attribute name="space-after">10mm</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_7" foa:class="block">
     <xsl:attribute name="font-size">18.0pt</xsl:attribute>
     <xsl:attribute name="line-height">5mm</xsl:attribute>
     <xsl:attribute name="space-before">5mm</xsl:attribute>
     <xsl:attribute name="text-align">left</xsl:attribute>
  </xsl:attribute-set>
  <xsl:attribute-set name="Normal_8" foa:class="block">
     <xsl:attribute name="font-size">15.0pt</xsl:attribute>
     <xsl:attribute name="line-height">5mm</xsl:attribute>
     <xsl:attribute name="text-align">left</xsl:attribute>
	  <xsl:attribute name="space-after">10mm</xsl:attribute>
  </xsl:attribute-set>	
  <!-- END, CR00352142 -->
  <xsl:template match="DOCUMENT">
    <xsl:apply-templates select="DATA" />
  </xsl:template>
  <xsl:template match="DATA">
    <xsl:apply-templates select="STRUCT[SNAME='MOLSAProFormaDocumentData']" />
  </xsl:template>
 
  
  <xsl:template match="STRUCT">
    
  <fo:root>
    <fo:layout-master-set>
      <fo:simple-page-master master-name="only" page-height="297mm" page-width="210mm"   margin-top="50mm" margin-bottom="20mm" margin-left="15mm" margin-right="15mm">
          <fo:region-body /> 
		<fo:region-after region-name="xsl-region-after" extent=".5in"/>		  
      </fo:simple-page-master>
      </fo:layout-master-set>
		<fo:page-sequence master-reference="only">	          
            <fo:flow flow-name="xsl-region-body"  font-family="Times New Roman" >
                <fo:block  xsl:use-attribute-sets="Normal_8" >
                    <fo:inline>تاريخ الاصدار</fo:inline>
					<fo:inline> : </fo:inline>
                    <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='currentDate']"/>                    
                </fo:block>                 
                <fo:block  xsl:use-attribute-sets="Normal_1" margin-bottom="10mm" font-weight="bold" text-align="center">
                    شهــادة لمـن يهـمه الأمــر
                </fo:block>  
				  <fo:block  border-after-style="inset" border-after-width=".5pt"></fo:block>  
                
                <fo:block   font-size="20pt"   text-align="right" margin-top="20mm" >
                    
                    <fo:inline>  تشهد إدارة الضمان الاجتماعي بأن السيد/السيدة </fo:inline>
                    
                  
                    <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='concernRoleName']"/> 
                    
                    
                    <fo:inline>  قطري/قطرية بموجب البطاقة الشخصية رقم  </fo:inline>
                  
                    <xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='alternateID']"/> 
                    
                    <fo:inline>  يتقاضى معاشاً شهرياً من قبل الادارة مقداره </fo:inline>
                   
                    
                    <!-- Salary Ammount -->
                   <xsl:apply-templates select="FIELD[FNAME='mainProductAmount']"/> 
                    <fo:inline> ريال لكونه </fo:inline>
                    <!-- Program Name-->
                    <xsl:apply-templates select="FIELD[FNAME='mainProductName']"/>
                    </fo:block>  
                
               
               
                <fo:block   font-size="15pt"   text-align="right" margin-top="15mm" >
                    
                    
                     وقد أعطي له/لها هذه الشهادة بناءً على طلبه/طلبها دون أدنى مسؤولية على الادارة 
                    
                </fo:block> 
                
                
                <fo:block   font-size="20pt"  font-weight="bold" text-align="center" margin-top="5mm" margin-bottom="30mm" >
                    
                    و السلام عليكم ورحمة الله وبركاته 
                    
                </fo:block>  
                <fo:block>
				<fo:external-graphic src="MOLSA/signature-blue.png"  content-height="scale-to-fit" height="10.96mm" padding-left="13mm"/> </fo:block>
                
                <fo:block   font-size="20pt"  font-weight="bold" text-align="left" margin-top="5mm" margin-left="15mm" >
                    
                    <xsl:apply-templates select="FIELD[FNAME='molsaManagerName']"/> 
                    
                </fo:block>  
                
                <fo:block   font-size="20pt"  font-weight="bold" text-align="left" margin-top="3mm" >
                    
                    مدير إدارة الضمان  الاجتماعي 
                    
                </fo:block>  
                
                <fo:block   font-size="11pt"   text-align="right" margin-top="20mm"  margin-left="15mm">
                    
                    تنتهي صلاحيات هذه الشهادة بعد مرور ثلاثة أشهر من تاريخ الاصدار 
                </fo:block> 
                <fo:block   font-size="11pt"   text-align="right" margin-top="2mm"  >                    
                    <fo:inline>نسخة لملف الحالة رقم:</fo:inline>
                    <xsl:apply-templates select="FIELD[FNAME='caseReferenceID']" />                    
                </fo:block> 
                
                <fo:block   font-size="11pt"   text-align="right" margin-top="2mm" >
                    
                    <fo:inline> :الباحث</fo:inline>
                    <xsl:apply-templates select="FIELD[FNAME='caseWorkerName']"/>
                    
                </fo:block> 
 
            </fo:flow>      
        </fo:page-sequence>  
        
    </fo:root>
 

	</xsl:template>
  
  
  
  
  
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE" />
  </xsl:template>
</xsl:stylesheet>


