package curam.molsa.application.tab.impl;

import java.util.Map;

import com.google.inject.Inject;

import curam.intake.navigation.impl.NavigationConst;
import curam.molsa.constants.impl.MOLSAConstants;
import curam.piwrapper.user.impl.User;
import curam.piwrapper.user.impl.UserDAO;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.persistence.GuiceWrapper;
import curam.util.tab.impl.DynamicMenuStateLoader;
import curam.util.tab.impl.MenuState;
import curam.util.transaction.TransactionInfo;

public class MOLSAIntegratedCaseLoader implements DynamicMenuStateLoader {



	@Inject
	private UserDAO userDAO;


	public MOLSAIntegratedCaseLoader() {
		super();
		GuiceWrapper.getInjector().injectMembers(this);
	}
	@Override
	public MenuState loadMenuState(MenuState menu,
			Map<String, String> pageParameters, String[] idsToUpdate)
	throws AppException, InformationalException {
		// TODO Auto-generated method stub

		final User user = userDAO.get(TransactionInfo.getProgramUser());

		if (user.getRole().equals(MOLSAConstants.kMolsaCaseWorkerRole)) {
			menu.setEnabled(false,MOLSAConstants.kMOLSACloseCase);
		}
		return menu;
	}

}
