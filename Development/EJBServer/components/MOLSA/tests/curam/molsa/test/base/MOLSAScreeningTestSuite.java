package curam.molsa.test.base;

import junit.framework.Test;
import junit.framework.TestSuite;
import curam.molsa.test.screening.rules.TestScreeningAnonymousParentsProgram;
import curam.molsa.test.screening.rules.TestScreeningDesertedProgram;
import curam.molsa.test.screening.rules.TestScreeningDivorcedProgram;
import curam.molsa.test.screening.rules.TestScreeningFamilyInNeedProgram;
import curam.molsa.test.screening.rules.TestScreeningFamilyOfMissingProgram;
import curam.molsa.test.screening.rules.TestScreeningFamilyOfPrisonerProgram;
import curam.molsa.test.screening.rules.TestScreeningHandicappedProgram;
import curam.molsa.test.screening.rules.TestScreeningIncapableOfWorkingProgram;
import curam.molsa.test.screening.rules.TestScreeningMaidAssistanceProgram;
import curam.molsa.test.screening.rules.TestScreeningOrphanProgram;
import curam.molsa.test.screening.rules.TestScreeningSeniorAssistanceProgram;
import curam.molsa.test.screening.rules.TestScreeningWidowProgram;

public class MOLSAScreeningTestSuite {

  public static Test suite() {
    TestSuite suite = new TestSuite(MOLSAScreeningTestSuite.class.getName());
    //$JUnit-BEGIN$
    suite.addTestSuite(TestScreeningHandicappedProgram.class);
    suite.addTestSuite(TestScreeningFamilyInNeedProgram.class);
    suite.addTestSuite(TestScreeningSeniorAssistanceProgram.class);
    suite.addTestSuite(TestScreeningFamilyOfPrisonerProgram.class);
    suite.addTestSuite(TestScreeningFamilyOfMissingProgram.class);
    suite.addTestSuite(TestScreeningOrphanProgram.class);
    suite.addTestSuite(TestScreeningIncapableOfWorkingProgram.class);
    suite.addTestSuite(TestScreeningWidowProgram.class);
    suite.addTestSuite(TestScreeningDesertedProgram.class);
    suite.addTestSuite(TestScreeningDivorcedProgram.class);
    suite.addTestSuite(TestScreeningMaidAssistanceProgram.class);
    suite.addTestSuite(TestScreeningAnonymousParentsProgram.class);
    //$JUnit-END$
    return suite;
  }

}
