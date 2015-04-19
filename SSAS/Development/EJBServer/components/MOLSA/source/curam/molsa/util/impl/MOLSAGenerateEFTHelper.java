package curam.molsa.util.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;

import org.openxmlformats.schemas.wordprocessingml.x2006.main.STOnOff;

import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.dynamicevidence.sl.struct.impl.MonthCodeDetails;
import curam.dynamicevidence.sl.struct.impl.MonthCodeKey;
import curam.dynamicevidence.sl.struct.impl.MonthDescriptionDetails;
import curam.dynamicevidence.sl.struct.impl.MonthNumberDetails;
import curam.dynamicevidence.sl.struct.impl.YearValueKey;
import curam.dynamicevidence.util.impl.DateUtil;
import curam.evidence.sl.struct.MonthYearDetails;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTDetail;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTDetailList;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTMsWordDetail;
import curam.molsa.eft.batch.struct.MOLSAGenerateEFTParam;
import curam.molsa.message.MOLSABPOGENERATEEFT;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.exception.LocalisableString;
import curam.util.resources.Configuration;
import curam.util.resources.Trace;
import curam.util.type.Date;
import curam.util.type.DateTime;

/**
 * The helper class to generate the Exel.
 * 
 */
public class MOLSAGenerateEFTHelper {
  

  /**
   * Private Constructor
   */
  private MOLSAGenerateEFTHelper(){
    
  }
  /**
   * Return the new instance
   * @return this
   */
  public static MOLSAGenerateEFTHelper newInstance() {
    return new MOLSAGenerateEFTHelper();
  }
  /**
   * Generates the Exel Sheet.
   * 
   * @param generateEFTDetailList MOLSAGenerateEFTDetailList
   * @param generateEFTParam MOLSAGenerateEFTParam
   * @param exelName String
   */
  public void generateExel(MOLSAGenerateEFTDetailList generateEFTDetailList, 
      MOLSAGenerateEFTParam generateEFTParam, String exelName) throws AppException, InformationalException {
    XSSFWorkbook workbook = populateExel(generateEFTDetailList, generateEFTParam);
    createExel(workbook, exelName);
  }
  
  /**
   * Helper method to return the msword name.
   * @param monthYearDetails MonthYearDetails
   * @return The exel Name
   * @throws AppException
   *          General Exception
   * @throws InformationalException 
   *          General ExceptionList
   */
  public static String getMsWordName(MonthYearDetails monthYearDetails) throws AppException, InformationalException {
    String msWordName=CuramConst.gkEmpty;    
      msWordName= MOLSABPOGENERATEEFT.MSWORD_DOCUMENT_NAME.getMessageText() 
      +monthYearDetails.monthCode
      +"_"
      + monthYearDetails.year 
      +"("
      + getCurrentTimeStamp()
      +")"
      + ".docx";
  
    return msWordName;
  }
  
  /**
   * Return the timestamp in String format for the file name
   * @return String
   */
  private static String getCurrentTimeStamp(){
    return DateTime.getCurrentDateTime().toString().replaceAll("/", "_") .replaceAll(":", "_");
  }
  /**
   * Helper method to return the exel name, depending on if it is for Bank or for Finance.
   * @param isForBank boolean
   * @param monthYearDetails MonthYearDetails
   * @return The exel Name
   * @throws AppException
   *          General Exception
   * @throws InformationalException 
   *          General ExceptionList
   */
  public static String getExelName(boolean isForBank, MonthYearDetails monthYearDetails) throws AppException, InformationalException {
    String exelName=CuramConst.gkEmpty;
    
    if(isForBank) {
      exelName= MOLSABPOGENERATEEFT.WORK_SHEET_NAME_FOR_BANK.getMessageText() 
      +monthYearDetails.monthCode
      +"_"
      + monthYearDetails.year 
      +"("
      + getCurrentTimeStamp()
      +")"
      + ".xlsx";
    } else {
      exelName= MOLSABPOGENERATEEFT.WORK_SHEET_NAME_FOR_FINANCE.getMessageText() 
      + monthYearDetails.monthCode
      +"_"
      +  monthYearDetails.year 
      +"("
      + getCurrentTimeStamp()
      +")"
      + ".xlsx";
    }
    return exelName;
  }
  
  /**
   * Return the month and year details of a date.
   * @param date Date
   * @return The Month Year Code
   * @throws AppException
   *            General Exception
   * @throws InformationalException
   *            General ExceptionList
   */
  public static MonthYearDetails getMonthYearDetail(Date date) throws AppException, InformationalException{
    MonthYearDetails monthYearDetails = new MonthYearDetails();
    MonthCodeKey monthCodeKey = new MonthCodeKey();
    monthCodeKey.date=date;    
    MonthCodeDetails monthCodeDetails = DateUtil.getMonthCode(monthCodeKey);    
    monthYearDetails.monthCode = monthCodeDetails.monthCode;
    
    YearValueKey yearValueKey = new YearValueKey();
    yearValueKey.date = date;   
    monthYearDetails.year = Integer.parseInt(DateUtil.getYearCode(yearValueKey).yearValue);
    
    MonthDescriptionDetails monthDescriptionDetails = new MonthDescriptionDetails();
    monthDescriptionDetails.monthDescription = monthCodeDetails.monthCode;
    MonthNumberDetails monthNumberDetails = DateUtil.getMonthInInt(monthDescriptionDetails);
    
    monthYearDetails.monthCode=(monthNumberDetails.monthNumber+1)+"";

    if(monthYearDetails.monthCode.length()<2) {
      monthYearDetails.monthCode="0"+monthYearDetails.monthCode;
    }
    return monthYearDetails;
  }
  
  /**
   * Creates the Work book for creating the Exel Sheet.
   * @param generateEFTDetailList MOLSAGenerateEFTDetailList
   * @param generateEFTParam MOLSAGenerateEFTParam
   * @return XSSFWorkbook
   */  
  private XSSFWorkbook populateExel(MOLSAGenerateEFTDetailList generateEFTDetailList, 
      MOLSAGenerateEFTParam generateEFTParam) {
    

    List<String> headerRow = new ArrayList<String>();
    headerRow.add(MOLSABPOGENERATEEFT.LIST_LABEL_DEPT_CODE.getMessageText());
    headerRow.add(MOLSABPOGENERATEEFT.LIST_LABEL_STAFF_NUMBER.getMessageText());
    headerRow.add(MOLSABPOGENERATEEFT.LIST_LABEL_BANK_SWIFT.getMessageText());
    headerRow.add(MOLSABPOGENERATEEFT.LIST_LABEL_ACCOUNT_NUMBER.getMessageText());
    headerRow.add(MOLSABPOGENERATEEFT.LIST_LABEL_CUR_CODE.getMessageText());
    headerRow.add(MOLSABPOGENERATEEFT.LIST_LABEL_AMOUNT.getMessageText());
    headerRow.add(MOLSABPOGENERATEEFT.LIST_LABEL_NAME.getMessageText());
    
    

    List<List<String>> initialRowList = new ArrayList<List<String>>();
    List<String> initialEachRow = new ArrayList<String>();

    initialEachRow.add(MOLSABPOGENERATEEFT.LABEL_COMP_CODE.getMessageText());
    initialEachRow.add(generateEFTDetailList.compCode);
    initialRowList.add(initialEachRow);

    initialEachRow = new ArrayList<String>();
    initialEachRow.add(MOLSABPOGENERATEEFT.LABEL_BANK_CODE.getMessageText());
    initialEachRow.add(generateEFTDetailList.bankCode);
    initialRowList.add(initialEachRow);

    initialEachRow = new ArrayList<String>();
    initialEachRow.add(MOLSABPOGENERATEEFT.LABEL_FILE_DESC.getMessageText());
    initialEachRow.add(generateEFTDetailList.fileDesc);
    initialRowList.add(initialEachRow);
    
   
    
    initialEachRow = new ArrayList<String>();
    initialEachRow.add(MOLSABPOGENERATEEFT.LABEL_DUE_DATE.getMessageText());
    SimpleDateFormat dateFormat = new SimpleDateFormat(Configuration
			.getProperty(EnvVars.EFT_DATE_FORMAT));
    initialEachRow.add(dateFormat.format(generateEFTDetailList.dueDate.getCalendar().getTime()));    
    initialRowList.add(initialEachRow);

    initialEachRow = new ArrayList<String>();
    initialEachRow.add(MOLSABPOGENERATEEFT.LABEL_COMP_ACCOUNT.getMessageText());
    initialEachRow.add(generateEFTDetailList.compAccount);
    initialRowList.add(initialEachRow);

    initialEachRow = new ArrayList<String>();
    initialEachRow.add(MOLSABPOGENERATEEFT.LABEL_REMARKS.getMessageText());
    initialEachRow.add(generateEFTDetailList.remarks);
    initialRowList.add(initialEachRow);

    //The list should start from the next line from the normal Rows.    
    int kLineNumberForDetailHeaderStart = initialRowList.size()+1;
    
    List<List<String>> rowList = new ArrayList<List<String>>();
    List<String> eachRow;
    
    List<List<String>> rowSuspendedList = new ArrayList<List<String>>();
    List<String> eachSuspendedRow;

    for (MOLSAGenerateEFTDetail generateEFTDetail1 : generateEFTDetailList.dtls.items()) {
      eachRow = new ArrayList<String>();
      eachSuspendedRow = new ArrayList<String>();
      if(generateEFTDetail1.isSuspended) {
        eachSuspendedRow.add(generateEFTDetail1.deptCode);
        eachSuspendedRow.add(generateEFTDetail1.staffNumber);
        eachSuspendedRow.add(generateEFTDetail1.bankSwift);
        eachSuspendedRow.add(generateEFTDetail1.accountNumber);
        eachSuspendedRow.add(generateEFTDetail1.currencyCode);
        eachSuspendedRow.add(generateEFTDetail1.amount+"");
        if(generateEFTParam.inEnglishLocale) {
          eachSuspendedRow.add(generateEFTDetail1.fullname_en);
        } else {
          eachSuspendedRow.add(generateEFTDetail1.fullname_ar);
        }            
        rowSuspendedList.add(eachSuspendedRow);
      } else {
        eachRow.add(generateEFTDetail1.deptCode);
        eachRow.add(generateEFTDetail1.staffNumber);
        eachRow.add(generateEFTDetail1.bankSwift);
        eachRow.add(generateEFTDetail1.accountNumber);
        eachRow.add(generateEFTDetail1.currencyCode);
        eachRow.add(generateEFTDetail1.amount+"");
        if(generateEFTParam.inEnglishLocale) {
          eachRow.add(generateEFTDetail1.fullname_en);
        } else {
          eachRow.add(generateEFTDetail1.fullname_ar);
        }            
        rowList.add(eachRow);
      }  
    }

    // Add the Last Row
    eachRow = new ArrayList<String>();
    eachRow.add(Configuration.getProperty(EnvVars.EFT_END_OF_FILE));
    eachRow.add("");
    eachRow.add("");
    eachRow.add("");
    eachRow.add("");
    eachRow.add(generateEFTDetailList.totalAmount+"");
    eachRow.add("");
    rowList.add(eachRow);
    
    // Blank workbook
    XSSFWorkbook workbook = new XSSFWorkbook();

    // Create a blank sheet
    XSSFSheet sheet = workbook.createSheet(MOLSABPOGENERATEEFT.WORK_SHEET_NAME.getMessageText());

    CellStyle style = workbook.createCellStyle();// Create style
    Font font = workbook.createFont();// Create font
    font.setBoldweight(Font.BOLDWEIGHT_BOLD);// Make font bold
    style.setFont(font);// set it to bold
    //style.setFillForegroundColor(HSSFColor.YELLOW.index);
    //style.setFillPattern(CellStyle.SOLID_FOREGROUND);
    style.setBorderBottom(HSSFCellStyle.BORDER_MEDIUM);
    style.setBorderTop(HSSFCellStyle.BORDER_MEDIUM);
    style.setBorderRight(HSSFCellStyle.BORDER_MEDIUM);
    style.setBorderLeft(HSSFCellStyle.BORDER_MEDIUM);

    
    CellStyle style1 = workbook.createCellStyle();// Create style
    Font font1 = workbook.createFont();// Create font
    font1.setColor(HSSFColor.BROWN.index);
    style1.setFont(font1);
    
    CellStyle style2 = workbook.createCellStyle();// Create style
    Font font2 = workbook.createFont();// Create font
    font2.setBoldweight(Font.BOLDWEIGHT_BOLD);// Make font bold
    style2.setFont(font);// set it to bold

    CellStyle style3 = workbook.createCellStyle();// Create style
    Font font3 = workbook.createFont();// Create font
    font3.setColor(HSSFColor.RED.index);
    style3.setFont(font3);
    
    

    Object[] firstEachObjectValue = new Object[headerRow.size()];
    List<Object[]> firstObjectList = new ArrayList<Object[]>();
    int i = 0;

    for (List<String> eachRowGroup : initialRowList) {
      i = 0;
      firstEachObjectValue = new Object[2];
      for (String eachRowValue : eachRowGroup) {
        firstEachObjectValue[i] = eachRowValue;
        i++;
      }
      firstObjectList.add(firstEachObjectValue);
    }

    // This data needs to be written (Object[])
    Map<String, Object[]> data = new LinkedHashMap<String, Object[]>();
    int rowID = 0;
    for (Object[] eachObject : firstObjectList) {
      data.put(rowID + "", eachObject);
      rowID++;
    }

    // Iterate over data and write to sheet
    Set<String> keyset = data.keySet();
    int rownum = 0;
    for (String key : keyset) {
      Row row = sheet.createRow(rownum++);

      Object[] objArr = data.get(key);
      int cellnum = 0;
      for (Object obj : objArr) {
        Cell cell = row.createCell(cellnum++);
        if (rownum < kLineNumberForDetailHeaderStart) {
          if (cellnum == 1) {
            cell.setCellStyle(style2);
          } else {
            cell.setCellStyle(style3);
          }
        }

        if (obj instanceof String) {
          cell.setCellValue((String) obj);
        } else if (obj instanceof Integer) {
          cell.setCellValue((Integer) obj);
        }
      }
    }

    // Auto size all the columns
    for (int x = 0; x < sheet.getRow(0).getPhysicalNumberOfCells(); x++) {
      sheet.autoSizeColumn(x);
    }

    Object[] eachObjectValue = new Object[headerRow.size()];
    List<Object[]> objectList = new ArrayList<Object[]>();

    eachObjectValue = new Object[headerRow.size()];
    i = 0;
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
    
    int rowForSuspendedCase = objectList.size()+rownum+1;
    
    for (List<String> eachRowGroup : rowSuspendedList) {
      i = 0;
      eachObjectValue = new Object[headerRow.size()];
      for (String eachRowValue : eachRowGroup) {
        eachObjectValue[i] = eachRowValue;
        i++;
      }
      objectList.add(eachObjectValue);
    }

    // This data needs to be written (Object[])
    Map<String, Object[]> data1 = new LinkedHashMap<String, Object[]>();

    for (Object[] eachObject : objectList) {
      data1.put(rowID + "", eachObject);
      rowID++;
    }

    // Iterate over data and write to sheet
    Set<String> keyset1 = data1.keySet();
    // int rownum = 0;
    for (String key : keyset1) {
      Row row = sheet.createRow(rownum++);

      Object[] objArr = data1.get(key);
      int cellnum = 0;
      for (Object obj : objArr) {
        Cell cell = row.createCell(cellnum++);
        // Only for the First Row
        if (rownum == kLineNumberForDetailHeaderStart) {
          cell.setCellStyle(style);
        } else if (rownum >= rowForSuspendedCase) {
          cell.setCellStyle(style1);
        } else {
          cell.setCellStyle(style3);
        }

        if (obj instanceof String){
          cell.setCellValue((String) obj);
        } else if (obj instanceof Integer) {
          cell.setCellValue((Integer) obj);
        }
      }
    }

    if(generateEFTDetailList.dtls.size()>0) {
      // Auto size all the columns
      for (int x = 0; x < sheet.getRow(kLineNumberForDetailHeaderStart).getPhysicalNumberOfCells(); x++) {
        sheet.autoSizeColumn(x);
      }
    }
    return workbook;
  }
  


  /**
   * Writes the Exel to the disk
   * @param workbook XSSFWorkbook
   * @param exelName String
   */
  
  private void createExel(XSSFWorkbook workbook,String exelName) throws AppException, InformationalException{
    try {
      // Write the workbook in file system
      String fileName = Configuration.getProperty("curam.molsa.financial.eft.exelGenerationFolder") 
      + exelName;
      FileOutputStream out = new FileOutputStream(new File(fileName));
      workbook.write(out);
      out.close();
      Trace.kTopLevelLogger.info(fileName + " written successfully on disk.");
    } catch (Exception e) {
      Trace.kTopLevelLogger.error(
          "Error Occurred while writting the Exel to the disk. " + e, e.getCause());
      throw new AppException(MOLSABPOGENERATEEFT.ERR_WORD_FILE_WRITE);
      
    }
  }
  
  /**
   * Generates the MsWord Sheet.
   * @param generateEFTMsWordDetail MOLSAGenerateEFTMsWordDetail
   * @param mswordName String
   */
  public void generateMsWord(MOLSAGenerateEFTMsWordDetail generateEFTMsWordDetail, String mswordName) 
  throws AppException, InformationalException{
    XWPFDocument document = populateMsWord(generateEFTMsWordDetail);
    createMsWord(document, mswordName);
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
  
  /**
   * Creates the Work book for creating the MsWord Document.
   * @param generateEFTMsWordDetail MOLSAGenerateEFTMsWordDetail
   * @return XWPFDocument
   */  
  private XWPFDocument populateMsWord(MOLSAGenerateEFTMsWordDetail generateEFTMsWordDetail) {
    XWPFDocument doc = new XWPFDocument();
    
    XWPFParagraph p1 = doc.createParagraph();
    setOrientation(p1 , TextOrientation.RTL);
    p1.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r1 = p1.createRun();
    r1.setTextPosition(20);    
    LocalisableString addLine1 = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_TO_ADDRESS_LINE1); 
    LocalisableString addLine1Prefix = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_TO_ADDRESS_LINE1_PREFIX); 
    r1.setTextPosition(20);
    r1.setText(addLine1.getMessage()
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+addLine1Prefix.getMessage());
    
    
    XWPFParagraph p2 = doc.createParagraph();
    setOrientation(p2 , TextOrientation.RTL);
    p2.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r2 = p2.createRun();
    r2.setTextPosition(20);    
    LocalisableString addLine2 = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_TO_ADDRESS_LINE2); 
    r2.setTextPosition(20);
    r2.setText(addLine2.getMessage());
    r2.addBreak();
    
    XWPFParagraph p3 = doc.createParagraph();
    setOrientation(p3 , TextOrientation.RTL);
    p3.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r3 = p3.createRun();
    r3.setTextPosition(20);    
    LocalisableString addLine3 = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_TO_ADDRESS_LINE3); 
    r3.setTextPosition(20);
    r3.setText(addLine3.getMessage());
    r3.addBreak();
    
    XWPFParagraph p4 = doc.createParagraph();
    setOrientation(p4 , TextOrientation.RTL);
    p4.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r4 = p4.createRun();
    r4.setTextPosition(20);    
    LocalisableString salute = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_SALUTATION); 
    r4.setTextPosition(20);
    r4.setText(salute.getMessage());
    r4.addBreak();
    
    
    XWPFParagraph p5 = doc.createParagraph();
    setOrientation(p5 , TextOrientation.RTL);
    p5.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r5 = p5.createRun();
    r5.setTextPosition(20);    
    LocalisableString content = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_CONTENT);
    content.arg(generateEFTMsWordDetail.transferAmount);
    content.arg(generateEFTMsWordDetail.forMonth);
    content.arg(generateEFTMsWordDetail.compAccount);
    content.arg(generateEFTMsWordDetail.dueDate);    
    r5.setText(content.getMessage());
    r5.addBreak();
    
    
    XWPFParagraph p6 = doc.createParagraph();
    setOrientation(p6 , TextOrientation.RTL);
    p6.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r6 = p6.createRun();
    r6.setTextPosition(20);    
    LocalisableString saluteEnd = new LocalisableString(MOLSABPOGENERATEEFT.MSWORD_SALUTATION_END);   
    r6.setText(CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+ saluteEnd.getMessage());
    r6.addBreak();
    
    XWPFParagraph p7 = doc.createParagraph();
    setOrientation(p7, TextOrientation.RTL);
    p7.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r7 = p7.createRun();
    r7.setTextPosition(20);
    r7.setText(generateEFTMsWordDetail.socialAffairMinisterName
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+generateEFTMsWordDetail.securityDirectorName);
    r7.addBreak();
    
    XWPFParagraph p8 = doc.createParagraph();
    setOrientation(p8 , TextOrientation.RTL);
    p8.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r8 = p8.createRun();
    r8.setTextPosition(20);
    r8.setText("");
    r8.addBreak();
    
    XWPFParagraph p9 = doc.createParagraph();
    setOrientation(p9 , TextOrientation.RTL);
    p9.setAlignment(ParagraphAlignment.LEFT);
    XWPFRun r9 = p9.createRun();
    r9.setTextPosition(20);    
    
    String signature1 = Configuration.getProperty(EnvVars.EFT_MSWORD_SIGNATURE_TITLE_ONE);
    String signature2 = Configuration.getProperty(EnvVars.EFT_MSWORD_SIGNATURE_TITLE_TWO);
    r9.setText(signature1
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+CuramConst.gkTabDelimiter
    		+signature2);
    r9.addBreak();
    
    return doc;
  }
  /**
   * Writes the Msword to the disk
   * @param document XWPFDocument
   * @param mswordName String
   */
  
  private void createMsWord(XWPFDocument document,String mswordName) throws AppException, InformationalException{
    try {
      // Write the workbook in file system
      String fileName = Configuration.getProperty(EnvVars.EFT_EXEL_GENERATION_FOLDER) 
      + mswordName;
      FileOutputStream out = new FileOutputStream(new File(fileName));
      document.write(out);
      out.close();
      Trace.kTopLevelLogger.info(fileName + " written successfully on disk.");
    } catch (Exception e) {
      Trace.kTopLevelLogger.error(
          "Error Occurred while writting the MSWord to the disk. " + e, e.getCause());
      throw new AppException(MOLSABPOGENERATEEFT.ERR_WORD_FILE_WRITE);
    }
  }
  
 
    
  
}
