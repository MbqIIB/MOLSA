package curam.molsa.moi.sl.impl;

import curam.message.BPOMOLSAINFORMATIONPROVIDERBATCH;
import curam.message.GENERALSEARCH;
import curam.molsa.moi.entity.fact.MOLSAMoiFactory;
import curam.molsa.moi.entity.intf.MOLSAMoi;
import curam.molsa.moi.entity.struct.MOLSAMoiDtls;
import curam.molsa.moi.entity.struct.MOLSAMoiKey;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

/**
 * The class to maintain MOI.
 * 
 */
public abstract class MOLSAMaintainMoi extends curam.molsa.moi.sl.base.MOLSAMaintainMoi {

  /**
   * This Method retrieves the MOI Details.
   * @param arg1 MOLSAMoiKey
   * @return MOI Details
   * @throws AppException
   *           General Exception
   * @throws InformationalException
   *           General Exception
   */
	@Override
	public MOLSAMoiDtls getMoiDetails(MOLSAMoiKey arg1) throws AppException,
			InformationalException {
		MOLSAMoi moiObj =  MOLSAMoiFactory.newInstance();
		MOLSAMoiDtls molsaMoiDtls = new MOLSAMoiDtls();
		try{
		 
		molsaMoiDtls =  moiObj.read(arg1);
		}
		 catch(Exception e){
		   AppException e1=new AppException(GENERALSEARCH.INF_SEARCH_NORECORDSFOUND);
	     throw e1;
     }
		
		return molsaMoiDtls;

	}

}
