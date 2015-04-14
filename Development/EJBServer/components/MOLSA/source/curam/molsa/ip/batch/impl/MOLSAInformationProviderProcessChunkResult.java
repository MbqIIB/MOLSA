package curam.molsa.ip.batch.impl;

import curam.util.type.struct.Struct;

/**
 * 
 * This class keeps count of the records skipped and processed.
 * 
 */
public class MOLSAInformationProviderProcessChunkResult extends Struct {

	public static int recordsSkippedCount;
	public static int recordsPropagatedCount;

	/**
	 * Constructor for the class.
	 * 
	 * @param void
	 */
	public MOLSAInformationProviderProcessChunkResult() {
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
