package curam.molsa.useraccount.sms.sl.impl;

import java.util.Random;

import curam.citizenworkspace.security.impl.CWPasswordGenerationStrategy;
import curam.core.impl.EnvVars;
import curam.util.resources.Configuration;
import curam.util.type.StringHelper;

public class MOLSACWPasswordGenerator extends CWPasswordGenerationStrategy {

	private char[] chars;
	private char[] specialChars;

	@Override
	public String generatePasswordForCitizen() {

		this.chars = new String(
				"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1324567890")
				.toCharArray();
		this.specialChars = new String("!$^*()@").toCharArray();

		setCharacters();

		Random charRandomizer = new Random();

		Random specCharRandomizer = new Random();

		Random positionRandomizer = new Random();

		Integer minPasswordLength = Configuration
				.getIntProperty(EnvVars.ENV_CW_PASSWORD_MIN_LENGTH);

		Integer maxPasswordLength = Configuration
				.getIntProperty(EnvVars.ENV_CW_PASSWORD_MAX_LENGTH);

		Integer passwordMinSpecialChars = Configuration
				.getIntProperty(EnvVars.ENV_CW_PASSWORD_MIN_SPECIAL_CHARS);

		int thisPasswordLength = minPasswordLength.intValue() + 1;

		if (thisPasswordLength > maxPasswordLength.intValue()) {
			thisPasswordLength = minPasswordLength.intValue();
		}

		char[] values = new char[thisPasswordLength];

		for (int i = 0; i < thisPasswordLength; ++i) {
			values[i] = this.chars[charRandomizer.nextInt(this.chars.length)];
		}

		for (int i = 0; i < passwordMinSpecialChars.intValue(); ++i) {
			values[positionRandomizer.nextInt(thisPasswordLength)] = this.specialChars[specCharRandomizer
					.nextInt(this.specialChars.length)];

		}

		String returnObj = new String();

		for (char c : values) {
			if (!(StringHelper.isEmpty(String.valueOf(c)))) {
				returnObj = returnObj + c;
			}
		}

		return returnObj;
	}

	public void setCharacters() {
		if (Configuration
				.getBooleanProperty(EnvVars.MOLSA_USERACCOUNT_ARABICPASSWORDS)) {
			this.chars = new String(
					Configuration.getProperty(EnvVars.MOLSA_USERACCOUNT_ARABICCHARACTERS))
					.toCharArray();
		}
	}
}
