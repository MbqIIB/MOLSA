package curam.molsa.test.moi;


import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.entity.struct.MOLSAMoiKey;
import curam.molsa.moi.facade.fact.MOLSAMoiFactory;
import curam.molsa.moi.facade.intf.MOLSAMoi;
import curam.molsa.test.framework.CuramServerTest;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.type.Date;


/**
 * 
 * This is to test the MOI function.
 * 
 */
public class MOLSAMoiTest extends CuramServerTest {
  /* QID of a Person */
  public static final String KQID = "30000";
  /* Name in Arabic */
   public static final String KFIRSTNAME_AR = "firstName_ar";
   public static final String KFULLNAME_AR = "fullName_ar";
   public static final String KFIFTHNAME_AR = "fifthName_ar";
   public static final String KFOURTHNAME_AR = "fourthName_ar";
   public static final String KTHIRDNAME_AR = "thirdName_ar";
   public static final String KSECONDNAME_AR = "secondName_ar";
   /* Name is English*/
   public static final String KFIRSTNAME_EN = "firstName_en";
   public static final String KFULLNAME_EN = "fullName_en";
   public static final String KFIFTHNAME_EN = "fifthName_en";
   public static final String KFOURTHNAME_EN = "fourthName_en";
   public static final String KTHIRDNAME_EN = "thirdName_en";
   public static final String KSECONDNAME_EN = "secondName_en";
   public static final String KNATIONALITYCODE = "NT2110";
   public static final String KPREVNATIONALITY = "qatari";
   public static final int KDAYSIN = 0;
   public static final int KDAYSOUT = 0;
   public static final String KNATIONALITYTYPE = "african";
   public static final String KSTATUSCODE = "statusCode";
   public static final String KCLASSCODE = "classCode";
   public static final int KVERSIONNUMBER = 123;
   public final Date KOB=Date.fromISO8601("20000905");
   public final Date KNATIONALITYDATE=Date.fromISO8601("20100905");
   public final Date KSTATUSDATE=Date.getCurrentDate();
   public final Date KIDCARDEXPIRATIONDATE=Date.fromISO8601("20141205");
   public final Date KBATCHRUNDATE=Date.fromISO8601("20100905");
   public final Date KBUSUPDATEDDATE=Date.fromISO8601("20101005");
  /**
   * Constructor.
   * 
   * @param arg0
   *          String
   */
  public MOLSAMoiTest(String arg0) {
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
  public void testGetMoiDetails() throws AppException, InformationalException {
  
    MOLSAMoi moiObj = MOLSAMoiFactory.newInstance();
    MOLSAMoiKey moiKey = new MOLSAMoiKey();
    moiKey.qid = KQID;
    MOLSAMoiDtls moiDtls = moiObj.getMoiDetails(moiKey);
    assertEquals(KFIRSTNAME_AR, moiDtls.firstName_ar);
    assertEquals(KFULLNAME_AR, moiDtls.fullName_ar);
    assertEquals(KFIFTHNAME_AR, moiDtls.fifthName_ar);
    assertEquals(KFOURTHNAME_AR, moiDtls.fourthName_ar);
    assertEquals(KTHIRDNAME_AR, moiDtls.thirdName_ar);
    assertEquals(KSECONDNAME_AR, moiDtls.secondName_ar);
    assertEquals(KFIRSTNAME_EN, moiDtls.firstName_en);
    assertEquals(KFULLNAME_EN, moiDtls.fullName_en);
    assertEquals(KFIFTHNAME_EN, moiDtls.fifthName_en);
    assertEquals(KFOURTHNAME_EN, moiDtls.fourthName_en);
    assertEquals(KTHIRDNAME_EN, moiDtls.thirdName_en);
    assertEquals(KSECONDNAME_EN, moiDtls.secondName_en);
    assertEquals(KSTATUSCODE, moiDtls.statusCode);
    assertEquals(KVERSIONNUMBER, moiDtls.versionNo);
    assertEquals(KOB, moiDtls.dateOfBirth);
    assertEquals(KSTATUSDATE, moiDtls.statusDate);
    assertEquals(KIDCARDEXPIRATIONDATE, moiDtls.idCardExpirationDate);
    assertEquals(KBATCHRUNDATE, moiDtls.batchRunDate);
    assertEquals(KBUSUPDATEDDATE, moiDtls.lastUpdated);
  }

}
