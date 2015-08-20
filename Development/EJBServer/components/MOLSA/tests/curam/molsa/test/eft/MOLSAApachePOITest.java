package curam.molsa.test.eft;

import java.io.FileOutputStream;

import org.apache.poi.xwpf.usermodel.Borders;
import org.apache.poi.xwpf.usermodel.BreakClear;
import org.apache.poi.xwpf.usermodel.BreakType;
import org.apache.poi.xwpf.usermodel.LineSpacingRule;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.TextAlignment;
import org.apache.poi.xwpf.usermodel.UnderlinePatterns;
import org.apache.poi.xwpf.usermodel.VerticalAlign;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.STOnOff;

import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.evidence.sl.struct.MonthYearDetails;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTDetail;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTDetailList;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTParam;
import curam.molsa.message.MOLSABPOGENERATEEFT;
import curam.molsa.test.framework.CuramServerTest;
import curam.molsa.util.impl.MOLSAGenerateEFTHelper;
import curam.molsa.util.impl.MOLSAGenerateEFTHelper.TextOrientation;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.resources.Configuration;
import curam.util.type.Date;
import curam.util.type.DateTime;
import curam.util.type.Money;

/**
 * 
 * This is to test the MOI function.
 * 
 */
public class MOLSAApachePOITest extends CuramServerTest {


  /**
   * Constructor.
   * 
   * @param arg0
   *          String
   */
  public MOLSAApachePOITest(String arg0) {
    super(arg0);
  }

  /**
   * Method to test the MOI Details
   * 
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  /*
  public void testGenerateExel1() throws AppException, InformationalException {

    String headerNames = Configuration.getProperty("curam.molsa.eft.qnbExelColumnNames");
    List<String> headerNameList = new ArrayList<String>(Arrays.asList(headerNames.split(",")));

    List<String> headerRow = new ArrayList<String>();
    for (String columnName : headerNameList) {
      headerRow.add(columnName);
    }

    List<List<String>> rowList = new ArrayList<List<String>>();

    List<String> eachRow = new ArrayList<String>();
    eachRow.add("QNB");
    eachRow.add("12345");
    eachRow.add("James AR");
    eachRow.add("James EN");
    eachRow.add("QA01 QNBA 0000 0000 1234 1234 1234 1");
    eachRow.add("1000 QAR");
    rowList.add(eachRow);
    eachRow = new ArrayList<String>();
    eachRow.add("QNB");
    eachRow.add("12346");
    // eachRow.add("Linda AR");
    // eachRow.add("Linda EN");
    eachRow.add("QA01 QNBA 0000 0000 1234 1234 1234 2");
    eachRow.add("2000 QAR");
    rowList.add(eachRow);
    eachRow = new ArrayList<String>();
    eachRow.add("Citi Bank");
    eachRow.add("12347");
    eachRow.add("Robert AR");
    eachRow.add("Robert EN");
    eachRow.add("QA01 QNBA 0000 0000 1234 1234 1234 3");
    eachRow.add("1000 QAR");
    rowList.add(eachRow);
    eachRow = new ArrayList<String>();
    eachRow.add("Axis Bank");
    eachRow.add("12348");
    eachRow.add("Ryan AR");
    eachRow.add("Ryan EN");
    eachRow.add("QA01 QNBA 0000 0000 1234 1234 1234 4");
    eachRow.add("5000 QAR");
    rowList.add(eachRow);

    // Blank workbook
    XSSFWorkbook workbook = new XSSFWorkbook();

    // Create a blank sheet
    XSSFSheet sheet = workbook.createSheet("MOLSA Benefit");

    Object[] eachObjectValue = new Object[headerRow.size()];
    List<Object[]> objectList = new ArrayList<Object[]>();
    int i = 0;
    for (String eachHeader : headerRow) {
      eachObjectValue[i] = eachHeader;
      i++;
    }

    objectList.add(eachObjectValue);

    for (List<String> eachRowGroup : rowList) {
      i = 0;
      eachObjectValue = new Object[headerRow.size()];
      for (String eachRowValue : eachRowGroup) {
        eachObjectValue[i] = eachRowValue;
        i++;
      }
      objectList.add(eachObjectValue);
    }

    // This data needs to be written (Object[])
    Map<String, Object[]> data = new TreeMap<String, Object[]>();

    i = 0;
    for (Object[] eachObject : objectList) {
      data.put(i + "", eachObject);
      i++;
    }
    
     // data.put("1", new Object[] {"ID", "NAME", "LASTNAME"});
    // data.put("2", new Object[] {1, "Amit", "Shukla"});
     //data.put("3", new Object[] {2, "Lokesh", "Gupta"});
     // data.put("4", new Object[] {3, "John", "Adwards"});
     //data.put("5", new Object[] {4, "Brian", "Schultz"});
    

    CellStyle style = workbook.createCellStyle();// Create style
    Font font = workbook.createFont();// Create font
    font.setBoldweight(Font.BOLDWEIGHT_BOLD);// Make font bold
    style.setFont(font);// set it to bold
    style.setFillForegroundColor(HSSFColor.YELLOW.index);
    style.setFillPattern(CellStyle.SOLID_FOREGROUND);

    // Iterate over data and write to sheet
    Set<String> keyset = data.keySet();
    int rownum = 0;
    for (String key : keyset) {
      Row row = sheet.createRow(rownum++);

      Object[] objArr = data.get(key);
      int cellnum = 0;
      for (Object obj : objArr) {
        Cell cell = row.createCell(cellnum++);
        // Only for the First Row
        if (rownum == 1) {
          cell.setCellStyle(style);
        }
        if (obj instanceof String)
          cell.setCellValue((String) obj);
        else if (obj instanceof Integer)
          cell.setCellValue((Integer) obj);
      }
    }

    // Auto size all the columns
    for (int x = 0; x < sheet.getRow(0).getPhysicalNumberOfCells(); x++) {
      sheet.autoSizeColumn(x);
    }

    try {
      // Write the workbook in file system
      String fileName = Configuration.getProperty("curam.molsa.eft.exelGenerationFolder") + "MOLSA" + DateTime.getCurrentDateTime().asLong() + ".xlsx";
      FileOutputStream out = new FileOutputStream(new File(fileName));
      workbook.write(out);
      out.close();
      System.out.println(fileName + " written successfully on disk.");
    } catch (Exception e) {
      e.printStackTrace();
    }

  }
  */

  /**
   * Method to test the MOI Details
   * 
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
  public void testGenerateExel() throws AppException, InformationalException {

    MOLSAGenerateEFTDetailList generateEFTDetailList = new MOLSAGenerateEFTDetailList();
    generateEFTDetailList.compCode="104";
    generateEFTDetailList.bankCode="QNB";
    generateEFTDetailList.compAccount="QA01 QNBA 0000 0000 1234 1234 1234 1";
    generateEFTDetailList.dueDate=Date.fromISO8601("20141030");
    generateEFTDetailList.remarks="Salary for the Month July 2014";
    generateEFTDetailList.fileDesc="Sal";
    
    MOLSAGenerateEFTDetail generateEFTDetail = new MOLSAGenerateEFTDetail();
    generateEFTDetail.accountNumber="QA01 QNBA 0000 0000 1234 1234 1234 1";
    generateEFTDetail.amount=new Money(1000);
    generateEFTDetail.fullname_ar="James AR";
    generateEFTDetail.fullname_en ="James EN";
    generateEFTDetail.bankSwift="IBAN1";
    generateEFTDetail.currencyCode="QR";
    generateEFTDetail.deptCode="DEPT1";
    generateEFTDetail.staffNumber="QID1";
    generateEFTDetailList.dtls.addRef(generateEFTDetail);
    
    generateEFTDetail = new MOLSAGenerateEFTDetail();
    generateEFTDetail.accountNumber="QA01 QNBA 0000 0000 1234 1234 1234 2";
    generateEFTDetail.amount=new Money(2000);
    generateEFTDetail.fullname_ar="Linda AR";
    generateEFTDetail.fullname_en ="Linda EN";
    generateEFTDetail.bankSwift="IBAN2";
    generateEFTDetail.currencyCode="QR";
    generateEFTDetail.deptCode="DEPT2";
    generateEFTDetail.staffNumber="QID2";
    generateEFTDetailList.dtls.addRef(generateEFTDetail);
    
    generateEFTDetail = new MOLSAGenerateEFTDetail();
    generateEFTDetail.accountNumber="QA01 QNBA 0000 0000 1234 1234 1234 3";
    generateEFTDetail.amount=new Money(2000);
    generateEFTDetail.fullname_ar="Robert AR";
    generateEFTDetail.fullname_en ="Robert EN";
    generateEFTDetail.bankSwift="IBAN3";
    generateEFTDetail.currencyCode="QR";
    generateEFTDetail.deptCode="DEPT3";
    generateEFTDetail.staffNumber="QID3";
    generateEFTDetailList.dtls.addRef(generateEFTDetail);
    
    generateEFTDetail = new MOLSAGenerateEFTDetail();
    generateEFTDetail.accountNumber="QA01 QNBA 0000 0000 1234 1234 1234 4";
    generateEFTDetail.amount=new Money(5000);
    generateEFTDetail.fullname_ar="Ryan AR";
    generateEFTDetail.fullname_en ="Ryan EN";
    generateEFTDetail.bankSwift="IBAN3";
    generateEFTDetail.currencyCode="QR";
    generateEFTDetail.deptCode="DEPT4";
    generateEFTDetail.staffNumber="QID4";
    generateEFTDetailList.dtls.addRef(generateEFTDetail);
    MOLSAGenerateEFTParam generateEFTParam = new MOLSAGenerateEFTParam();  
    boolean isExelGeneratedSuccessfully = false;
    try{
      MonthYearDetails monthYearDetails= MOLSAGenerateEFTHelper.getMonthYearDetail(Date.getCurrentDate());
      MOLSAGenerateEFTHelper.newInstance().generateExel(generateEFTDetailList, 
          generateEFTParam, 
          MOLSAGenerateEFTHelper.getExelName(true, monthYearDetails));
      //Generated Exel sheet without any Error
      isExelGeneratedSuccessfully = true;
    } catch (Exception e) {
      //Error Occurred while generating the Exel
      isExelGeneratedSuccessfully = false;
      e.printStackTrace();
    }
    
    assertTrue(isExelGeneratedSuccessfully);
  }

  
  public void testGenerateMSWord() throws AppException, InformationalException {
    XWPFDocument doc = new XWPFDocument();

   
    /*
    XWPFRun r1 = p1.createRun();
    r1.setBold(true);
    r1.setText("The quick brown fox");
    r1.setBold(true);
    r1.setFontFamily("Courier");
    r1.setUnderline(UnderlinePatterns.DOT_DOT_DASH);
    r1.setTextPosition(100);

    XWPFParagraph p2 = doc.createParagraph();
    p2.setAlignment(ParagraphAlignment.RIGHT);

    // BORDERS
    p2.setBorderBottom(Borders.DOUBLE);
    p2.setBorderTop(Borders.DOUBLE);
    p2.setBorderRight(Borders.DOUBLE);
    p2.setBorderLeft(Borders.DOUBLE);
    p2.setBorderBetween(Borders.SINGLE);

    XWPFRun r2 = p2.createRun();
    r2.setText("jumped over the lazy dog");
    r2.setStrike(true);
    r2.setFontSize(20);

    XWPFRun r3 = p2.createRun();
    r3.setText("and went away");
    r3.setStrike(true);
    r3.setFontSize(20);
    r3.setSubscript(VerticalAlign.SUPERSCRIPT);

    XWPFParagraph p3 = doc.createParagraph();
    p3.setWordWrap(true);
    p3.setPageBreak(true);

    // p3.setAlignment(ParagraphAlignment.DISTRIBUTE);
    p3.setAlignment(ParagraphAlignment.BOTH);
    p3.setSpacingLineRule(LineSpacingRule.EXACT);

    p3.setIndentationFirstLine(600);
*/
    
    XWPFParagraph p1 = doc.createParagraph();
    p1.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r1 = p1.createRun();
    r1.setTextPosition(20);    
    LocalisableString addLine1 = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_TO_ADDRESS_LINE1); 
    r1.setTextPosition(20);
    r1.setText(addLine1.getMessage());
    
    XWPFParagraph p2 = doc.createParagraph();
    p2.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r2 = p2.createRun();
    r2.setTextPosition(20);    
    LocalisableString addLine2 = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_TO_ADDRESS_LINE2); 
    r2.setTextPosition(20);
    r2.setText(addLine2.getMessage());
    r2.addBreak();
    
    XWPFParagraph p3 = doc.createParagraph();
    p3.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r3 = p3.createRun();
    r3.setTextPosition(20);    
    LocalisableString salute = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_SALUTATION); 
    r3.setTextPosition(20);
    r3.setText(salute.getMessage());
    r3.addBreak();
    
    
    XWPFParagraph p4 = doc.createParagraph();
    p4.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r4 = p4.createRun();
    r4.setTextPosition(20);    
    LocalisableString content = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_CONTENT);
    content.arg("First Parameter");
    content.arg("Second Parameter");
    content.arg("Third Parameter");
    content.arg(Date.getCurrentDate());    
    r4.setText(content.getMessage());
    r4.addBreak();
    
    XWPFParagraph p5 = doc.createParagraph();
    p5.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r5 = p5.createRun();
    r5.setTextPosition(20);
    r5.setText("Name Name");
    
    XWPFParagraph p6 = doc.createParagraph();
    setOrientation(p6 , TextOrientation.RTL);
    p6.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r6 = p6.createRun();
    r6.setTextPosition(20);
    r6.setText("");
    r6.addBreak();
    
    XWPFParagraph p7 = doc.createParagraph();
    setOrientation(p7 , TextOrientation.RTL);
    p7.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r7 = p7.createRun();
    r7.setTextPosition(20);    
    //LocalisableString signature = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_SIGNATURE_TEXT); 
    String signature1 = Configuration.getProperty(EnvVars.EFT_MSWORD_SIGNATURE_TITLE_ONE);
    String signature2 = Configuration.getProperty(EnvVars.EFT_MSWORD_SIGNATURE_TITLE_TWO);
    r7.setText(signature1+CuramConst.gkTabDelimiter+" / "+CuramConst.gkTabDelimiter+signature2);
    //r6.setText(signature.getMessage());
    r7.addBreak();
  
    // This would imply that this break shall be treated as a simple line break, and break the line after that word:

//    r5.addBreak(BreakClear.ALL);

    try {
      String fileName = Configuration.getProperty("curam.molsa.financial.eft.exelGenerationFolder") + "MOLSA" + DateTime.getCurrentDateTime().asLong() + ".docx";
      FileOutputStream out = new FileOutputStream(fileName);
      doc.write(out);
      out.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
 
  
  private static void setOrientation(XWPFParagraph par, TextOrientation orientation) {
      if ( par.getCTP().getPPr()==null ) {
          par.getCTP().addNewPPr();
      }
      if ( par.getCTP().getPPr().getBidi()==null ) {
         par.getCTP().getPPr().addNewBidi();
      }
      par.getCTP().getPPr().getBidi().setVal(orientation==TextOrientation.RTL?STOnOff.ON:STOnOff.OFF);
   }
  
  public enum TextOrientation {
      LTR,
      RTL
   }
}
