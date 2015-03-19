package curam.molsa.test.base;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.google.inject.Inject;

import curam.core.sl.infrastructure.assessment.codetable.impl.CASEDETERMINATIONASSESSMENTSTATUSEntry;
import curam.core.sl.infrastructure.assessment.impl.CREOLECaseAssessmentDeterminationAccessor;
import curam.core.sl.infrastructure.assessment.impl.CREOLECaseAssessmentDeterminationAccessorDAO;
import curam.core.sl.infrastructure.assessment.impl.CREOLECaseDeterminationAccessor;
import curam.core.sl.infrastructure.assessment.impl.Determination;
import curam.core.sl.infrastructure.product.creole.impl.CREOLEProductDecisionDisplayCategoryAccessor;
import curam.creole.database.fact.CREOLERuleSetFactory;
import curam.creole.database.struct.CREOLERuleSetDtls;
import curam.creole.database.struct.CREOLERuleSetKey;
import curam.creole.value.Timeline;
import curam.intake.infrastructure.entity.fact.IntakeProcessConfigurationFactory;
import curam.intake.infrastructure.entity.intf.IntakeProcessConfiguration;
import curam.intake.infrastructure.entity.struct.IntakeProcessConfigurationDtls;
import curam.intake.infrastructure.entity.struct.IntakeProcessConfigurationKey;
import curam.piwrapper.caseheader.impl.ProductDelivery;
import curam.piwrapper.caseheader.impl.ProductDeliveryDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.internal.resources.fact.AppResourceFactory;
import curam.util.internal.resources.intf.AppResource;
import curam.util.internal.resources.struct.AppResourceDtls;
import curam.util.internal.resources.struct.AppResourceKey;
import curam.util.persistence.GuiceWrapper;
import curam.util.transaction.TransactionInfo;
import curam.util.type.Blob;
import curam.util.type.Date;

/**
 * This Junit class tests the method in ACESAttachment Facade class.
 */
public class TestMOLSA extends curam.molsa.test.framework.CuramServerTest {

  @Inject
  private ProductDeliveryDAO productDeliveryDAO;

  @Inject
  private CREOLECaseAssessmentDeterminationAccessorDAO
    creoleCaseAssessmentDeterminationAccessorDAO;


  /**
   * Default Constructor.
   * 
   * @param arg0
   *          default argument.
   */
  public TestMOLSA(String arg0) {
    super(arg0);
    GuiceWrapper.getInjector().injectMembers(this);

  }
  /**
   * To insert in to APPRESOURCE
   * 
   * @throws AppException
   * @throws InformationalException
   * @throws IOException
   */
  public void testInsertResourceUIMs() throws AppException, InformationalException, IOException {

    AppResource appResourcesObj = AppResourceFactory.newInstance();

    // file
    AppResourceDtls appResourceDtls = new AppResourceDtls();
    // AppResourceDtls appResourceDtls = appResourcesObj.read(appResourceKey);

    File file =
        new File(
            "D:/MOLSASVN/SSAS/Development/EJBServer/components/MOLSA/data/initial/clob/Intake/MOLSAApplicationMapping.xml");
    InputStream is = new FileInputStream(file);
    long length = file.length();
    byte[] bytes = new byte[(int) length];
    // Read in the bytes
    int offset = 0;
    int numRead = 0;
    while (offset < bytes.length && (numRead = is.read(bytes, offset, bytes.length - offset)) >= 0) {
      offset += numRead;
    }
    // Ensure all the bytes have been read in
    if (offset < bytes.length) {

    }
    // Close the input stream and return bytes
    is.close();
    Blob b = new Blob(bytes);
    appResourceDtls.content = b;
    appResourceDtls.resourceID = 45085;
    appResourceDtls.name = "MOLSAApplicationMapping";
    appResourceDtls.contentType = "text/xml";
    appResourceDtls.contentDisposition = "inline";
    appResourceDtls.internal = false;
    appResourceDtls.versionNo = 1; 
    AppResourceKey appResourceKey = new AppResourceKey();
    appResourceKey.resourceID = 45085;

    appResourcesObj.modify(appResourceKey,appResourceDtls);
    appResourceDtls = appResourcesObj.read(appResourceKey);
 
    Blob ob = new Blob(appResourceDtls.content.copyBytes());

    OutputStream out = new FileOutputStream("D:/Temp/MOLSAApplicationMapping.xml");
    out.write(appResourceDtls.content.copyBytes());
    out.close();

    TransactionInfo.getInfo().commit();

  }

  
  /**
   * To insert in to APPRESOURCE
   * 
   * @throws AppException
   * @throws InformationalException
   * @throws IOException
   */
  public void testSaveResourceFiles() throws AppException, InformationalException, IOException {

    AppResource appResourcesObj = AppResourceFactory.newInstance();

    // file
    AppResourceDtls appResourceDtls = new AppResourceDtls();
  
    AppResourceKey appResourceKey = new AppResourceKey();
    appResourceKey.resourceID = 45085;

    appResourceDtls = appResourcesObj.read(appResourceKey);
 
    Blob ob = new Blob(appResourceDtls.content.copyBytes());

    OutputStream out = new FileOutputStream("D:/Temp/MOLSAApplicationMapping.xml");
    out.write(appResourceDtls.content.copyBytes());
    out.close();

   // TransactionInfo.getInfo().commit();

  }

}