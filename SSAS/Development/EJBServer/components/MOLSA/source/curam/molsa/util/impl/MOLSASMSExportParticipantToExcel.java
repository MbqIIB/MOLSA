package curam.molsa.util.impl;

import java.io.File;
import java.io.FileOutputStream;
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

import curam.core.impl.CuramConst;
import curam.core.impl.EnvVars;
import curam.message.MOLSASMSSERVICE;
import curam.molsa.message.MOLSABPOGENERATEEFT;
import curam.molsa.sms.facade.struct.MOLSAParticipantDetails;
import curam.molsa.sms.sl.struct.MOLSAParticipantDetailsList;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.resources.Configuration;
import curam.util.transaction.TransactionInfo;
import curam.util.type.DateTime;

/**
 * The helper class to generate the Excel.
 * 
 */

public class MOLSASMSExportParticipantToExcel {

  public void generateExel(MOLSAParticipantDetailsList molsaParticipantDetailsList, String exelName) {

    XSSFWorkbook workbook = populateExel(molsaParticipantDetailsList);
    createExel(workbook, exelName);
  }

  /**
   * This method will create the Work book for creating the Excel Sheet.
   * 
   * @param MOLSAParticipantDetailsList
   *          molsaParticipantDetailsList
   * @return XSSFWorkbook
   */
  private XSSFWorkbook populateExel(MOLSAParticipantDetailsList molsaParticipantDetailsList) {

    List<String> headerRow = new ArrayList<String>();
    headerRow.add(MOLSASMSSERVICE.LIST_LABEL_NAME.getMessageText());
    headerRow.add(MOLSASMSSERVICE.LIST_LABEL_ADDRESS.getMessageText());
    headerRow.add(MOLSASMSSERVICE.LIST_LABEL_DATEOFBIRTH.getMessageText());

    // The list should start from the next line from the normal Rows.
    int kLineNumberForDetailHeaderStart = 1;

    List<List<String>> rowList = new ArrayList<List<String>>();
    List<String> eachRow;

    for (MOLSAParticipantDetails molsaParticipantDetails : molsaParticipantDetailsList.dtls.dtls.items()) {
      eachRow = new ArrayList<String>();
      eachRow.add(molsaParticipantDetails.participantName);
      eachRow.add(molsaParticipantDetails.addressString);
      eachRow.add(molsaParticipantDetails.dateOfBirth.toString());
      rowList.add(eachRow);
    }

    // Blank workbook
    XSSFWorkbook workbook = new XSSFWorkbook();

    // Create a blank sheet
    XSSFSheet sheet = workbook.createSheet(MOLSABPOGENERATEEFT.WORK_SHEET_NAME.getMessageText());

    CellStyle style = workbook.createCellStyle();// Create style
    Font font = workbook.createFont();// Create font
    font.setBoldweight(Font.BOLDWEIGHT_BOLD);// Make font bold
    style.setFont(font);// set it to bold
    style.setBorderBottom(HSSFCellStyle.BORDER_MEDIUM);
    style.setBorderTop(HSSFCellStyle.BORDER_MEDIUM);
    style.setBorderRight(HSSFCellStyle.BORDER_MEDIUM);
    style.setBorderLeft(HSSFCellStyle.BORDER_MEDIUM);

    CellStyle style1 = workbook.createCellStyle();// Create style
    Font font3 = workbook.createFont();// Create font
    font3.setColor(HSSFColor.GREEN.index);
    style1.setFont(font3);

    Object[] eachObjectValue = new Object[headerRow.size()];
    List<Object[]> objectList = new ArrayList<Object[]>();

    eachObjectValue = new Object[headerRow.size()];
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

    int rowID = 0;
    // This data needs to be written (Object[])
    Map<String, Object[]> data1 = new LinkedHashMap<String, Object[]>();

    for (Object[] eachObject : objectList) {
      data1.put(rowID + "", eachObject);
      rowID++;
    }

    int rownum = 0;
    // Iterate over data and write to sheet
    Set<String> keyset1 = data1.keySet();
    for (String key : keyset1) {
      Row row = sheet.createRow(rownum++);

      Object[] objArr = data1.get(key);
      int cellnum = 0;
      for (Object obj : objArr) {
        Cell cell = row.createCell(cellnum++);
        // Only for the First Row
        if (rownum == kLineNumberForDetailHeaderStart) {
          cell.setCellStyle(style);
        } else {
          cell.setCellStyle(style1);
        }

        if (obj instanceof String) {
          cell.setCellValue((String) obj);
        } else if (obj instanceof Integer) {
          cell.setCellValue((Integer) obj);
        }
      }
    }
    if (molsaParticipantDetailsList.dtls.dtls.size() > 0) {
      // Auto size all the columns
      for (int x = 0; x < sheet.getRow(kLineNumberForDetailHeaderStart).getPhysicalNumberOfCells(); x++) {
        sheet.autoSizeColumn(x);
      }
    }
    return workbook;
  }

  /**
   * This method write the Excel to the disk
   * 
   * @param workbook
   *          XSSFWorkbook
   * @param exelName
   *          String
   */

  private void createExel(XSSFWorkbook workbook, String exelName) {
    try {
      // Write the workbook in file system
      String fileName = Configuration.getProperty(EnvVars.SMS_EXPORTED_PARTICIPANT_FOLDER) + exelName;
      FileOutputStream out = new FileOutputStream(new File(fileName));
      workbook.write(out);
      out.close();
      System.out.println(fileName + " written successfully on disk.");
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * The helper method to return the excel name.
   * 
   * @return The excel Name
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General ExceptionList
   */
  public static String getExelName() throws AppException, InformationalException {

    String exelName = CuramConst.gkEmpty;

    DateTime dateTime = TransactionInfo.getSystemDateTime();
    String dateTiimeString = dateTime.toString();
    String dotStr = dateTiimeString.replaceAll(":", "_");
    String slashStr = dotStr.replaceAll("/", "_");
    String dateTimeStr = slashStr.replaceAll("\\s+", "_");
    exelName = MOLSASMSSERVICE.FILTER_PARTICIPANT_EXCEL_NAME.getMessageText() + "_" + dateTimeStr + ".xlsx";
    return exelName;
  }
}