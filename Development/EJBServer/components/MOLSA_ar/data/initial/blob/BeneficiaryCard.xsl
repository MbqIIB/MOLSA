<?xml version="1.0" encoding="UTF-8"?>
<!-- BEGIN, CR00357205, PB -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:foa="http://fabio" version="1.0">

 
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
    
  <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
        <fo:layout-master-set>
            <fo:simple-page-master master-name="A4" page-width="85.6mm"
                page-height="53.98mm" margin-top="0mm" margin-bottom="0mm"
                margin-left="5mm" margin-right="5mm">
                <fo:region-body margin="0mm"/>        
            </fo:simple-page-master>
            
        </fo:layout-master-set>
        
        <fo:page-sequence master-reference="A4">
            <fo:flow flow-name="xsl-region-body"  font-family="Times New Roman" >
                <fo:block>
					<fo:external-graphic src="MOLSA/molsa_beneficiary_logo.png"  content-height="scale-to-fit" height="15.96mm"  content-width="75.6mm" scaling="non-uniform"/>
                </fo:block>
                
                <fo:block   font-size="14pt"  font-weight="bold" text-align="center" margin-bottom="2mm">
                    بطاقة الضمان الاجتماعي 
                </fo:block>  
                
                <fo:block   font-size="10pt"   text-align="right" >
                    <fo:inline font-weight="bold">
					الاسم :  
					</fo:inline> 
					<xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='concernRoleName']"/>
                </fo:block> 
                
                <fo:block     font-size="10pt"    text-align="right" >
                    <fo:inline font-weight="bold">
					الرقم الشخصي :
					</fo:inline> 
					<xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='alternateID']"/>
                </fo:block>
                
                <fo:table border-color="white" border-style="solid" border-width="0pt" >
                    <fo:table-column />
                    <fo:table-column />
                    <fo:table-column />
                    <fo:table-column />
                    
                    <fo:table-body font-weight="normal" font-size="10pt">
                        <fo:table-row line-height="12pt">
                            <fo:table-cell border-width="1pt" border-color="white" border-style="solid" >
                                <fo:block text-align="right">
								<xsl:apply-templates select="FIELD[FNAME='locationName']" />
								</fo:block>
                            </fo:table-cell>
                            <fo:table-cell border-width="1pt" border-color="white" border-style="solid" font-weight="bold">
                                <fo:block text-align="right">
								<fo:inline>:</fo:inline>
								الفرع
								</fo:block>
                            </fo:table-cell>
                            <fo:table-cell border-width="1pt" border-color="white" border-style="solid" >
                                <fo:block text-align="right">
								<xsl:apply-templates select="FIELD[FNAME='caseReferenceID']" />
								</fo:block>
                            </fo:table-cell>
                            <fo:table-cell border-width="1pt" border-color="white" border-style="solid" font-weight="bold">
                                <fo:block text-align="right">
								<fo:inline>:</fo:inline> 
								رقم الملف
								</fo:block>
                            </fo:table-cell>
                        </fo:table-row>
                        
                        
                    </fo:table-body>
                </fo:table>
                
                <fo:block    font-size="10pt"    text-align="right" >
                    <fo:inline font-weight="bold">
					اسم البنك  :  
					</fo:inline> 
					<xsl:apply-templates select="FIELD[FNAME='bankName']" />
                </fo:block>
                
                <fo:block    font-size="10pt"    text-align="right" break-after="page">
                    <xsl:apply-templates select="FIELD[FNAME='iban']" /> 
					
					<fo:inline font-size="9pt" font-weight="bold">
					رقم البنك   
					</fo:inline> 
                </fo:block>
                
                
                <fo:block    font-size="9pt"    text-align="right" text-decoration="underline" font-weight="bold" margin-top="5mm">
                    بناء  على نص المادة (١١) من القانون رقم ( ٨ ٣) لسنة ١٩٩٥ م بشأن الضمان الاجتماعي
                    
                </fo:block>
                
                <fo:block    font-size="8pt"    text-align="right" margin-top="2mm">
                    يرجى من المستحق للمعاش أو وكيله أن يخطر الادارة فورا لكل تغيير يطرء على حالته الاجتماعية أو المالية يكون من شأنه عدم إستحقاق للمعاش أو تعديل قيمته وكذلك عن كل تغيير في محل اقامته 
                </fo:block>
                
                <fo:block    font-size="9pt"    text-align="right" margin-top="1mm" margin-left="1mm" margin-right="1mm" border-style="solid" border-width="0.2mm" padding-left="3mm" padding-right="3mm" padding-top="2mm" padding-bottom="1mm">
                    
                    <fo:table border-color="white" border-style="solid" border-width="0pt" >
                        <fo:table-column />
                        <fo:table-column />
                        
                        
                        <fo:table-body font-weight="normal" font-size="10pt">
                            <fo:table-row line-height="12pt">
                                <fo:table-cell border-width="1pt" border-color="white" border-style="solid" font-weight="bold">
                                    <fo:block text-align="right">
									توقيع المدير  
									</fo:block>
                                </fo:table-cell>
                                
                                <fo:table-cell border-width="1pt" border-color="white" border-style="solid" font-weight="bold">
                                    <fo:block text-align="right">
									تاريخ إنتهاء البطاقة
									</fo:block>
                                </fo:table-cell>
                                
                                
                            </fo:table-row>
                            <fo:table-row line-height="12pt">
                                <fo:table-cell border-width="1pt" border-color="white" border-style="solid" font-weight="bold">
                                    <fo:block>
                                        
                                        <fo:external-graphic src="MOLSA/signature.png"  content-height="scale-to-fit" height="10.96mm" />
                                    </fo:block> 
                                </fo:table-cell>
                                
                                <fo:table-cell border-width="1pt" border-color="white" border-style="solid" padding-top="5mm">
                                    <fo:block text-align="right">
									<xsl:apply-templates select="FIELD[FNAME='cardExpiryDate']" />
									</fo:block>
                                </fo:table-cell>
                                
                            </fo:table-row>
                            
                            
                        </fo:table-body>
                    </fo:table>
                </fo:block>
                <fo:block    font-size="5pt"    text-align="right" border-top-style="solid" margin-top="1mm" padding-top="1mm">
                    في حال العثور على هذه البطاقة يرجى تسليمها لوزارة العمل والشؤون الاجتماعية * 
                    
                </fo:block>
                
                
                
                
                
                
            </fo:flow>      
        </fo:page-sequence>  
        
    </fo:root>
 

	</xsl:template>
  
  
  
  
  
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE" />
  </xsl:template>
</xsl:stylesheet>


