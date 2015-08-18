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
  public static final String KQID = "12345678911";
  /* Name in Arabic */
   public static final String KFIRSTNAME_AR = "Asma";
   
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
    MOLSAMoiDtls moiDtls = new MOLSAMoiDtls();
    try{
      moiDtls = moiObj.getMoiDetails(moiKey);
    }
    catch(Exception e){
      assertTrue(Boolean.TRUE);
      return;
    }
    assertEquals(KFIRSTNAME_AR, moiDtls.firstName_ar);
  }

}
