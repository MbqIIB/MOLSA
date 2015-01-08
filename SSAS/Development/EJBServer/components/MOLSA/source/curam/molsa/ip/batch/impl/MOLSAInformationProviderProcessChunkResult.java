package curam.molsa.ip.batch.impl;
import curam.util.type.struct.Struct;

public class MOLSAInformationProviderProcessChunkResult extends Struct {

  public static int recordsSkippedCount;
  public static int recordsPropagatedCount;
  
  
  public MOLSAInformationProviderProcessChunkResult()
  {
     caseProcessCount = 0;
     fcProcessCount = 0;
    casesSkippedCount = 0;
    iliCreatedCount = 0;
  }
  public int caseProcessCount;
  public int fcProcessCount;
  public int casesSkippedCount;
  public int iliCreatedCount;
  private static final long serialVersionUID = 404544178L;
}
