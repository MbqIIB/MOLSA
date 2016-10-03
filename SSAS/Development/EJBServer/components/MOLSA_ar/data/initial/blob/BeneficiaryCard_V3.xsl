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
              >
                
                <fo:region-body margin="0mm"/>    
                <fo:region-after region-name="xsl-region-after" extent=".13in"/>
            </fo:simple-page-master>
            
        </fo:layout-master-set>
        
        <fo:page-sequence master-reference="A4">
            
            <fo:static-content flow-name="xsl-region-after" margin-bottom="0mm">
                <fo:block font-size="0pt" line-height="0mm" margin-bottom="0mm" >
                    
                    <fo:external-graphic src="MOLSA/footer_V2.png" content-width="scale-to-fit" content-height="100%" width="100%"/>
                </fo:block>
                
            </fo:static-content>
            
            <fo:flow flow-name="xsl-region-body"  font-family="Times New Roman" >
                <fo:block background-color="rgb(255,229,78)" font-size="0pt" line-height="0mm">
                    <fo:external-graphic src="MOLSA/molsa_beneficiary_logo_V3.png"  content-width="scale-to-fit" content-height="100%" width="100%"/>
                </fo:block>
                
                <fo:block   font-size="10pt"   text-align="right" margin-left="5mm" margin-right="5mm" margin-top="4mm" >
                    <fo:inline font-weight="bold" color="rgb(157,33,65)">
					الاسم :  
					</fo:inline> 
					<xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='concernRoleName']"/>
                </fo:block> 
                
                <fo:block     font-size="10pt"    text-align="right" margin-left="5mm" margin-right="5mm" space-before="1mm" space-after="1mm">
                    <fo:inline font-weight="bold" color="rgb(157,33,65)">
					الرقم الشخصي :
					</fo:inline> 
					<xsl:apply-templates select="./FIELD[FNAME='dtls']/STRUCT[SNAME='ProFormaDocumentData']/FIELD[FNAME='alternateID']"/>
                </fo:block>
                
                <fo:table border-color="white" border-style="solid" border-width="0pt" width="100%">
                    <fo:table-column column-width="40%"/>
                    <fo:table-column column-width="proportional-column-width(1)"/>
                    <fo:table-column column-width="proportional-column-width(1)"/>
                    <fo:table-column column-width="proportional-column-width(1)"/>
                    
                    <fo:table-body font-weight="normal" font-size="10pt">
                        <fo:table-row line-height="12pt">
                            <fo:table-cell border-width="1pt" border-color="white" border-style="solid" >
                                <fo:block text-align="right">
								<!--<xsl:apply-templates select="FIELD[FNAME='locationName']" /> -->
								</fo:block>
                            </fo:table-cell>
                            <fo:table-cell border-width="1pt" border-color="white" border-style="solid" font-weight="bold">
                                <fo:block text-align="left" color="rgb(157,33,65)">
						<!--		<fo:inline>:</fo:inline>
								الفرع -->
								</fo:block>
                            </fo:table-cell> 
                           <fo:table-cell border-width="1pt" border-color="white" border-style="solid" >
                                <fo:block text-align="right">
								<xsl:apply-templates select="FIELD[FNAME='caseReferenceID']" />
								</fo:block>
                            </fo:table-cell>
                            <fo:table-cell border-width="1pt" border-color="white" border-style="solid" font-weight="bold" margin-right="5mm">
                                <fo:block text-align="right" color="rgb(157,33,65)" >
								<fo:inline>:</fo:inline> 
								 الملف
								</fo:block>
                            </fo:table-cell> 
                        </fo:table-row>
                        
                        
                    </fo:table-body>
                </fo:table>
                
                <fo:block    font-size="10pt"    text-align="right" margin-left="5mm" margin-right="5mm" space-before="1mm">
                    <fo:inline font-weight="bold" color="rgb(157,33,65)">
					اسم البنك  :  
					</fo:inline> 
					<xsl:apply-templates select="FIELD[FNAME='bankName']" />
                </fo:block>
                
                <fo:block    font-size="10pt"    text-align="right" break-after="page" margin-left="5mm" margin-right="5mm" space-before="1mm">
                    <xsl:apply-templates select="FIELD[FNAME='iban']" /> 
					
                    <fo:inline font-size="10pt" font-weight="bold" color="rgb(157,33,65)">
                       : رقم الحساب     
					</fo:inline> 
                </fo:block>
                
                
                <fo:block    font-size="9pt"    text-align="right" text-decoration="underline" font-weight="bold" margin-top="5mm"  margin-left="5mm" margin-right="5mm">
                    بناء  على نص المادة (١١) من القانون رقم ( ٨ ٣) لسنة ١٩٩٥ م بشأن الضمان الاجتماعي
                    
                </fo:block>
                
                <fo:block    font-size="8pt"    text-align="right" margin-top="2mm" margin-left="5mm" margin-right="5mm">
                    يرجى من المستحق للمعاش أو وكيله أن يخطر الادارة فورا لكل تغيير يطرء على حالته الاجتماعية أو المالية يكون من شأنه عدم إستحقاق للمعاش أو تعديل قيمته وكذلك عن كل تغيير في محل اقامته 
                </fo:block>
                
                <fo:block  border-color="black"  font-size="6pt"    text-align="right" margin-top="1mm" margin-left="5mm" margin-right="5mm" border-style="solid" border-width="0.2mm" padding-left="2mm" padding-right="2mm" padding-top="2mm" padding-bottom="1mm">
                    
                    <fo:table border-color="white" border-style="solid" border-width="0pt" >
                        <fo:table-column column-width="45%"/>
                        <fo:table-column column-width="55%"/>
                        
                        
                        <fo:table-body font-weight="normal" font-size="8pt">
                            <fo:table-row line-height="12pt">
                                <fo:table-cell border-width="1pt" border-color="white" border-style="solid" font-weight="bold" color="rgb(157,33,65)">
                                    <fo:block text-align="right">
									توقيع المدير  
									</fo:block>
                                </fo:table-cell>
                                
                                <fo:table-cell border-width="1pt" border-color="white" border-style="solid" font-weight="bold" color="rgb(157,33,65)">
                                    <fo:block text-align="right">
									تاريخ إنتهاء البطاقة
									</fo:block>
                                </fo:table-cell>
                                
                                
                            </fo:table-row>
                            <fo:table-row line-height="12pt">
                                <fo:table-cell border-width="1pt" border-color="white" border-style="solid" font-weight="bold">
                                    <fo:block>
                                        
                                        <fo:external-graphic src="MOLSA/signature-black.png"  content-height="scale-to-fit" content-width="scale-to-fit"  width="100%" scaling="uniform" scaling-method="auto"/>
                                    </fo:block> 
                                </fo:table-cell>
                                
                                <fo:table-cell border-width="1pt" border-color="white" border-style="solid" padding-top="2mm">
                                    <fo:block text-align="right">
									<xsl:apply-templates select="FIELD[FNAME='cardExpiryDate']" />
									</fo:block>
                                </fo:table-cell>
                                
                            </fo:table-row>
                            
                            
                        </fo:table-body>
                    </fo:table>
                </fo:block>
				 <fo:block    font-size="5pt"    text-align="right" border-top-style="solid" border-top-color="white" margin-top="1mm" padding-top="1mm">                  
                </fo:block>
                <fo:block    font-size="5pt"    text-align="right"  margin-top="1mm" padding-top="1mm" margin-right="3mm" color="rgb(157,33,65)">
                    فى حالة العثور على هذه البطاقة يرجى تسليمها الى وزارة التنمية الادارية والعمل والشؤون الاجتماعية * 
                                                  
                </fo:block>
                
                
                
                
                
                
            </fo:flow>      
        </fo:page-sequence>  
        
    </fo:root>
 

	</xsl:template>
  
  
  
  
  
  <xsl:template match="FIELD">
    <xsl:value-of select="VALUE" />
  </xsl:template>
</xsl:stylesheet>


