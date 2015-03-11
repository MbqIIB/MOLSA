package curam.molsa.test.customfunctions;

import java.util.ArrayList;
import java.util.List;

import curam.datastore.impl.Entity;
import curam.ieg.impl.IEG2Context;
import curam.rules.functions.CustomFunctionCompareDates;
import curam.rules.functions.CustomFunctionGetPersonDetailsFromMOI;
import curam.rules.functions.CustomFunctionIsExistingPerson;
import curam.rules.functions.CustomFunctionIsPersonDetailsAvailable;
import curam.rules.functions.CustomFunctionIsValidApplicationDate;
import curam.rules.functions.CustomFunctionIsValidDate;
import curam.rules.functions.CustomFunctionIsValidDateRange;
import curam.rules.functions.CustomFunctionIsValidEmail;
import curam.rules.functions.CustomFunctionIsValidName;
import curam.rules.functions.CustomFunctionIsValidNumber;
import curam.rules.functions.CustomFunctionIsValidPhoneNumber;
import curam.rules.functions.CustomFunctionIsValidString;
import curam.rules.functions.CustomFunctionPersonInfo;
import curam.rules.functions.CustomFunctionPopulateHouseholdInfo;
import curam.rules.functions.CustomFunctionUpdateAbsentPersonInfo;
import curam.rules.functions.CustomFunctionUpdateEntities;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;
import curam.util.rules.RulesParameters;
import curam.util.rules.functor.Adaptor;
import curam.util.rules.functor.Adaptor.BooleanAdaptor;
import curam.util.rules.functor.AdaptorFactory;
import curam.util.type.Date;

/**
 * This is to Tests for the Custom functions
 */
public class TestCustomFunctionValidators extends MOLSAMockDataStore {

	public final Date KDATEVALID1 = Date.getCurrentDate();
	public final Date KDATEVALID2 = Date.fromISO8601("19000101");
	public final Date KINVALIDATE1 = Date.fromISO8601("20150905");
	public final Date KINVALIDATE2 = Date.fromISO8601("18150905");
	public final Date KZERODATE = Date.kZeroDate;
	public static final String KVALIDNUMBER1 = "12345";
	public static final String KVALIDNUMBER2 = " ";
	public static final String KINVALIDNUMBER1 = "12345a";
	public static final String KINVALIDNUMBER2 = "?>/!";
	public static final String KINVALIDNUMBER3 = "   ";
	public static final String KVALIDNAME1 = "aditi";
	public static final String KVALIDNAME2 = " ";
	public static final String KINVALIDNAME1 = "aditi2";
	public static final String KINVALIDNAME2 = "?aditi";
	public static final String KVALIDNAME3 = "    ";
	public static final String KVALIDArabicCharacter = "بلدية أم صلال, ابن عمران";

	public final Date KDATEVALIDRANGE = Date.fromISO8601("20160101");

	/**
	 * Constructor.
	 * 
	 * @param arg0
	 *            String
	 */
	public TestCustomFunctionValidators(final String arg0) {

		super(arg0);

	}

	/**
	 * Tests for Custom function which Validates the Date to Current Date.
	 */
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidDate1() {

		CustomFunctionIsValidDate customFunctionIsValidDate = new CustomFunctionIsValidDate();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor date = AdaptorFactory.getDateAdaptor(KDATEVALID1);

		dtls.add(date);

		try {

			customFunctionIsValidDate.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunctionIsValidDate
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * Tests for Custom function which Validates the Date to 1900-01-01.
	 */
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidDate2() {

		CustomFunctionIsValidDate customFunction = new CustomFunctionIsValidDate();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor date = AdaptorFactory.getDateAdaptor(KDATEVALID2);

		dtls.add(date);

		try {

			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunction
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			e.getMessage();
		}

	}

	/**
	 * Tests for Custom function which Validates the Date which is not between
	 * 1900-01-01 to Current Date.
	 * 
	 */
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsInValidDate() {

		CustomFunctionIsValidDate customFunction = new CustomFunctionIsValidDate();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor date = AdaptorFactory.getDateAdaptor(KINVALIDATE1);
		dtls.add(date);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertFalse(((BooleanAdaptor) customFunction
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * Tests for Custom function which Validates the String Containing only
	 * numbers
	 */
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidNumber1() {
		final CustomFunctionIsValidNumber customFunction = new CustomFunctionIsValidNumber();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor number = AdaptorFactory.getStringAdaptor(KVALIDNUMBER1);

		dtls.add(number);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	/**
	 * Tests for Custom function which Validates the String Containing only
	 * Characters
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidString1() {

		final CustomFunctionIsValidString customFunction = new CustomFunctionIsValidString();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor characters = AdaptorFactory.getStringAdaptor(KVALIDNAME1);
		dtls.add(characters);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * Tests for Custom function which Validates the String which is not
	 * Containing only numbers
	 * 
	 * @throws AppException
	 *             General Exception
	 * @throws InformationalException
	 *             General Exception
	 */
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsInValidNumber1() {
		final CustomFunctionIsValidNumber customFunction = new CustomFunctionIsValidNumber();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor number = AdaptorFactory.getStringAdaptor(KINVALIDNUMBER1);
		dtls.add(number);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertFalse(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * Tests for Custom function which Validates the String which is Containing
	 * special characters rather than numbers
	 */
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsInValidNumber2() {
		final CustomFunctionIsValidNumber customFunction = new CustomFunctionIsValidNumber();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor number = AdaptorFactory.getStringAdaptor(KINVALIDNUMBER2);
		dtls.add(number);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertFalse(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * Tests for Custom function which Validates the String Containing a number
	 * rather than only the characters
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionIsInValidString1() {

		final CustomFunctionIsValidString customFunction = new CustomFunctionIsValidString();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor characters = AdaptorFactory
				.getStringAdaptor(KINVALIDNAME1);
		dtls.add(characters);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertFalse(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * This is to test for the invalid string containing special characters
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionIsInValidString2() {

		final CustomFunctionIsValidString customFunction = new CustomFunctionIsValidString();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor characters = AdaptorFactory
				.getStringAdaptor(KINVALIDNAME2);
		dtls.add(characters);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertFalse(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * This is to Test for the Invalid Zero Date
	 */
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsVaildForZeroDate() {

		CustomFunctionIsValidDate customFunction = new CustomFunctionIsValidDate();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor date = AdaptorFactory.getDateAdaptor(KZERODATE);

		dtls.add(date);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertFalse(((BooleanAdaptor) customFunction
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * This is to test for the invalid date which is not between 1900-01-01 and
	 * current date
	 */
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsInValidDate2() {

		CustomFunctionIsValidDate customFunction = new CustomFunctionIsValidDate();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor date = AdaptorFactory.getDateAdaptor(KINVALIDATE2);
		dtls.add(date);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertFalse(((BooleanAdaptor) customFunction
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * This is to test for the valid String containing single space
	 */
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidNumber2() {
		final CustomFunctionIsValidNumber customFunction = new CustomFunctionIsValidNumber();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor number = AdaptorFactory.getStringAdaptor(KVALIDNUMBER2);

		dtls.add(number);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * 
	 * This is to test the Invalid number having more than one space
	 * 
	 */
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidNumber3() {
		final CustomFunctionIsValidNumber customFunction = new CustomFunctionIsValidNumber();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor number = AdaptorFactory.getStringAdaptor(KINVALIDNUMBER3);

		dtls.add(number);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertFalse(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * This is to test the valid String in custom function containing single
	 * space
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidString2() {

		final CustomFunctionIsValidString customFunction = new CustomFunctionIsValidString();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor characters = AdaptorFactory.getStringAdaptor(KVALIDNAME2);
		dtls.add(characters);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * This is to test for the valid String containing more than one space
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidString3() {

		final CustomFunctionIsValidString customFunction = new CustomFunctionIsValidString();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor characters = AdaptorFactory.getStringAdaptor(KVALIDNAME3);
		dtls.add(characters);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidDateRange() {

		CustomFunctionIsValidDate customFunctionIsValidDate = new CustomFunctionIsValidDate();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor date = AdaptorFactory.getDateAdaptor(KDATEVALIDRANGE);

		dtls.add(date);

		try {

			customFunctionIsValidDate.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertFalse(((BooleanAdaptor) customFunctionIsValidDate
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	/**
	 * Tests for Custom function which Validates the String Containing only
	 * Characters
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidArabicName() {

		final CustomFunctionIsValidName customFunction = new CustomFunctionIsValidName();
		final RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor characters = AdaptorFactory
				.getStringAdaptor(KVALIDArabicCharacter);
		dtls.add(characters);
		try {
			customFunction.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunction
					.getAdaptorValue(rulesParameters))
					.getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail();
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	@SuppressWarnings("restriction")
	public void testCustomFunctionIsValidDateRange2() {

		CustomFunctionIsValidDateRange customFunctionIsValidDate = new CustomFunctionIsValidDateRange();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();

		final Adaptor date = AdaptorFactory.getDateAdaptor(KDATEVALIDRANGE);

		dtls.add(date);

		try {

			customFunctionIsValidDate.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertFalse(((BooleanAdaptor) customFunctionIsValidDate
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	/**
	 * Compares start and end dates.
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionCompareDates() {
		CustomFunctionCompareDates customFunctionCompareDates = new CustomFunctionCompareDates();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor date = AdaptorFactory.getDateAdaptor(KDATEVALIDRANGE);
		dtls.add(date);
		dtls.add(AdaptorFactory.getDateAdaptor(Date.getCurrentDate().addDays(10)));
		try {
			customFunctionCompareDates.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertFalse(((BooleanAdaptor) customFunctionCompareDates
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	
	/**
	 * Compares start and end dates.
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionCompareDatesNegative() {
		CustomFunctionCompareDates customFunctionCompareDates = new CustomFunctionCompareDates();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor date = AdaptorFactory.getDateAdaptor(KDATEVALIDRANGE);
		dtls.add(date);
		dtls.add(AdaptorFactory.getDateAdaptor(Date.kZeroDate));
		try {
			customFunctionCompareDates.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertTrue(((BooleanAdaptor) customFunctionCompareDates
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	/**
	 * Get Details from MOI.
	 */

	@SuppressWarnings("restriction")
	public void testGetPersonDetailsFromMOI() {
		CustomFunctionGetPersonDetailsFromMOI customFunctionGetPersonDetailsFromMOI = new CustomFunctionGetPersonDetailsFromMOI();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor qid = AdaptorFactory.getStringAdaptor("12345678901");
		dtls.add(qid);
		try {
			customFunctionGetPersonDetailsFromMOI.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertTrue(((BooleanAdaptor) customFunctionGetPersonDetailsFromMOI
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	/**
	 * Get Details from MOI.
	 */

	@SuppressWarnings("restriction")
	public void testGetPersonDetailsFromMOINegative() {
		CustomFunctionGetPersonDetailsFromMOI customFunctionGetPersonDetailsFromMOI = new CustomFunctionGetPersonDetailsFromMOI();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor qid = AdaptorFactory.getStringAdaptor("92345678901");
		dtls.add(qid);
		try {
			customFunctionGetPersonDetailsFromMOI.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
		} catch (AppException e) {
			// TODO Auto-generated catch block
			assertTrue(true);
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	
	/**
	 * Checks if person is there in datastore.
	 */

	@SuppressWarnings("restriction")
	public void testIsExistingPerson() {
		CustomFunctionIsExistingPerson customFunctionIsExistingPerson = new CustomFunctionIsExistingPerson();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor qid = AdaptorFactory.getStringAdaptor("1234567899");
		dtls.add(qid);
		try {
			customFunctionIsExistingPerson.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertFalse(((BooleanAdaptor) customFunctionIsExistingPerson
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	

	/**
	 * Checks if person is there in datastore.
	 */

	@SuppressWarnings("restriction")
	public void testIsExistingPersonNegative() {
		CustomFunctionIsExistingPerson customFunctionIsExistingPerson = new CustomFunctionIsExistingPerson();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor qid = AdaptorFactory.getStringAdaptor("1234567879");
		dtls.add(qid);
		try {
			customFunctionIsExistingPerson.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertTrue(((BooleanAdaptor) customFunctionIsExistingPerson
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	

	/**
	 * Checks if person details are valid.
	 */

	@SuppressWarnings("restriction")
	public void testIsValidPersonDetailsAvailable() {
		CustomFunctionIsPersonDetailsAvailable customFunctionIsPersonDetailsAvailable = new CustomFunctionIsPersonDetailsAvailable();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor qid = AdaptorFactory.getStringAdaptor("1234567899");
		dtls.add(qid);
		try {
			customFunctionIsPersonDetailsAvailable.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertFalse(((BooleanAdaptor) customFunctionIsPersonDetailsAvailable
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	/**
	 * Checks if person details are valid.
	 */

	@SuppressWarnings("restriction")
	public void testIsValidPersonDetailsAvailableNegative() {
		CustomFunctionIsPersonDetailsAvailable customFunctionIsPersonDetailsAvailable = new CustomFunctionIsPersonDetailsAvailable();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor qid = AdaptorFactory.getStringAdaptor("1234567879");
		dtls.add(qid);
		try {
			customFunctionIsPersonDetailsAvailable.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertFalse(((BooleanAdaptor) customFunctionIsPersonDetailsAvailable
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));
		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	
	/**
	 * Checks valid application date.
	 */

	@SuppressWarnings("restriction")
	public void testIsValidApplicationDate() {

		CustomFunctionIsValidApplicationDate customFunctionIsValidApplicationDate = new CustomFunctionIsValidApplicationDate();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor date = AdaptorFactory.getDateAdaptor(KDATEVALIDRANGE);
		dtls.add(date);
		try {
			customFunctionIsValidApplicationDate.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertFalse(((BooleanAdaptor) customFunctionIsValidApplicationDate
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	/**
	 * Checks valid application date.
	 */

	@SuppressWarnings("restriction")
	public void testIsInValidApplicationDate() {
		CustomFunctionIsValidApplicationDate customFunctionIsValidApplicationDate = new CustomFunctionIsValidApplicationDate();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor date = AdaptorFactory.getDateAdaptor(Date.kZeroDate);
		dtls.add(date);
		try {
			customFunctionIsValidApplicationDate.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());
			assertTrue(((BooleanAdaptor) customFunctionIsValidApplicationDate
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	/**
	 * Checks valid email.
	 */

	@SuppressWarnings("restriction")
	public void testIsValidEmail() {
		CustomFunctionIsValidEmail customFunctionIsValidEmail = new CustomFunctionIsValidEmail();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor email = AdaptorFactory.getStringAdaptor("xyz@gmail.com");
		dtls.add(email);
		try {
			customFunctionIsValidEmail.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunctionIsValidEmail
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	
	/**
	 * Checks in valid email.
	 */

	@SuppressWarnings("restriction")
	public void testIsInValidEmail() {
		CustomFunctionIsValidEmail customFunctionIsValidEmail = new CustomFunctionIsValidEmail();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor email = AdaptorFactory.getStringAdaptor("xyz@gmail");
		dtls.add(email);
		try {
			customFunctionIsValidEmail.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertFalse(((BooleanAdaptor) customFunctionIsValidEmail
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	
	/**
	 * Checks valid phone number.
	 */

	@SuppressWarnings("restriction")
	public void testIsValidPhoneNumber() {
		CustomFunctionIsValidPhoneNumber customFunctionIsValidPhoneNumber = new CustomFunctionIsValidPhoneNumber();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor email = AdaptorFactory.getStringAdaptor("88889999");
		dtls.add(email);
		try {
			customFunctionIsValidPhoneNumber.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunctionIsValidPhoneNumber
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	/**
	 * Checks valid phone number.
	 */

	@SuppressWarnings("restriction")
	public void testIsInValidPhoneNumber() {
		CustomFunctionIsValidPhoneNumber customFunctionIsValidPhoneNumber = new CustomFunctionIsValidPhoneNumber();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor email = AdaptorFactory.getStringAdaptor("8888999");
		dtls.add(email);
		try {
			customFunctionIsValidPhoneNumber.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertFalse(((BooleanAdaptor) customFunctionIsValidPhoneNumber
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	/**
	 * Checks update of Person Info.
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionPersonInfo() {
		CustomFunctionPersonInfo customFunctionPersonInfo = new CustomFunctionPersonInfo();
		RulesParameters rulesParameters = new RulesParameters();
		try {
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunctionPersonInfo
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	
	
	/**
	 * Checks update of Person Info.
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionUpdatePersonInfo() {
		CustomFunctionUpdateAbsentPersonInfo customFunctionUpdatePersonInfo = new CustomFunctionUpdateAbsentPersonInfo();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor qid = AdaptorFactory.getStringAdaptor("12345678901");
		dtls.add(qid);
		try {
			customFunctionUpdatePersonInfo.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunctionUpdatePersonInfo
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
	
	/**
	 * Checks update of Person Info.
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionPopulateHouseholdInfo() {
		CustomFunctionPopulateHouseholdInfo customFunctionPopulateHouseholdInfo = new CustomFunctionPopulateHouseholdInfo();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor qid = AdaptorFactory.getStringAdaptor("12345678901");
		dtls.add(qid);
		try {
			customFunctionPopulateHouseholdInfo.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunctionPopulateHouseholdInfo
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}

	
	/**
	 * Checks update of Person Info.
	 */

	@SuppressWarnings("restriction")
	public void testCustomFunctionUpdateEntities() {
		CustomFunctionUpdateEntities customFunctionUpdateEntities = new CustomFunctionUpdateEntities();
		RulesParameters rulesParameters = new RulesParameters();
		final List<Adaptor> dtls = new ArrayList<Adaptor>();
		final Adaptor qid = AdaptorFactory.getStringAdaptor("12345678901");
		dtls.add(qid);
		try {
			customFunctionUpdateEntities.setParameters(dtls);
			final Entity rootDatastoreEntity = getMOLSAMockDataStore();
			final IEG2Context ieg2Context = new IEG2Context();
			ieg2Context.setRootEntityID(rootDatastoreEntity.getUniqueID());

			assertTrue(((BooleanAdaptor) customFunctionUpdateEntities
					.getAdaptorValue(ieg2Context)).getValue(rulesParameters));

		} catch (AppException e) {
			// TODO Auto-generated catch block
			fail(e.getMessage());
		} catch (InformationalException e) {
			// TODO Auto-generated catch block
			fail();
		}

	}
}
