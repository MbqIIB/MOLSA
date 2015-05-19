package curam.molsa.useraccount.sms.sl.impl;

import curam.util.type.struct.Struct;

/**
 * 
 * This class keeps count of the records skipped and processed.
 * 
 */
public class MOLSAUserAccountSMSChunkResult extends Struct {

	public static int recordsSkippedCount;
	public static int recordsPropagatedCount;

	/**
	 * Constructor for the class.
	 * 
	 * @param void
	 */
	public MOLSAUserAccountSMSChunkResult() {
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
