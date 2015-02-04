package curam.molsa.programrecommendation.impl;

import com.google.inject.AbstractModule;
import com.google.inject.TypeLiteral;
import com.google.inject.multibindings.MapBinder;
import com.google.inject.multibindings.Multibinder;

import curam.codetable.CASEEVIDENCE;
import curam.codetable.impl.CASEEVIDENCEEntry;
import curam.codetable.impl.PRODUCTTYPEEntry;
import curam.codetable.impl.PROGRAMTYPEEntry;
import curam.core.sl.infrastructure.assessment.event.impl.AssessmentEngineEvent;
import curam.core.sl.infrastructure.impl.EvidenceControllerInterface;
import curam.core.sl.infrastructure.impl.ReciprocalEvidenceConversion;
import curam.creoleprogramrecommendation.impl.AuthorizationEvent;
import curam.creoleprogramrecommendation.impl.CREOLEProgramRecommendationEvent;
import curam.creoleprogramrecommendation.impl.DeliveryCreator;
import curam.molsa.casedetermination.sl.event.impl.MOLSAAssessmentEngineEventListener;
import curam.molsa.core.sl.impl.MOLSAAnonymousMDCreator;
import curam.molsa.core.sl.impl.MOLSAEvidenceControllerInterfaceImpl;
import curam.molsa.core.sl.impl.MOLSAHandicapMDCreator;
import curam.molsa.core.sl.impl.MOLSAMilestoneDeliveryCreator;
import curam.molsa.core.sl.impl.MOLSASeniorMDCreator;
import curam.molsa.creoleprogramrecommendation.sl.event.impl.MOLSAAuthorizationEventListener;
import curam.molsa.evidence.impl.MOLSAHouseholdRelationshipReciprocalConversion;

/**
 * Business interface which contains the juice binding for the program
 * recommendations.
 * 
 */

public class Module extends AbstractModule {
	protected void configure() {

		registerPDCEvidenceEvents();
		MapBinder<PROGRAMTYPEEntry, DeliveryCreator> deliveryCreatorImplementations = MapBinder
				.newMapBinder(binder(), PROGRAMTYPEEntry.class,
						DeliveryCreator.class);

		 // Program Recommendation Event Bindings
	    final Multibinder<CREOLEProgramRecommendationEvent>
	    programRecommendationEventListeners = Multibinder
	        .newSetBinder(binder(),
	            new TypeLiteral<CREOLEProgramRecommendationEvent>() {
	              // type literal - intentionally blank
	            });
	    programRecommendationEventListeners.addBinding().to(
	        MOLSAProgramRecommendationEventListener.class);
		
		deliveryCreatorImplementations.addBinding(
				PROGRAMTYPEEntry.SOCIALASSISTANCE).to(
				MOLSAProductDeliveryCreator.class);

		deliveryCreatorImplementations.addBinding(
				PROGRAMTYPEEntry.FAMILYOFMISSING).to(
				MOLSAFamilyOfMissingAndPrisonPDCreator.class);

		deliveryCreatorImplementations.addBinding(
				PROGRAMTYPEEntry.FAMILYOFPRISONER).to(
				MOLSAFamilyOfMissingAndPrisonPDCreator.class);

		deliveryCreatorImplementations.addBinding(
				PROGRAMTYPEEntry.SENIORCITIZEN).to(
				MOLSASeniorCitizenPDCreator.class);

		final Multibinder<AssessmentEngineEvent> assessmentEngineEventListeners = Multibinder
				.newSetBinder(binder(),
						new TypeLiteral<AssessmentEngineEvent>() {
						});
		assessmentEngineEventListeners.addBinding().to(
				MOLSAAssessmentEngineEventListener.class);

		final Multibinder<EvidenceControllerInterface.EvidenceActivationEvents> evidenceAActivationBinder = Multibinder
				.newSetBinder(
						binder(),
						new TypeLiteral<EvidenceControllerInterface.EvidenceActivationEvents>() {

						});

		evidenceAActivationBinder.addBinding().to(
				MOLSAEvidenceControllerInterfaceImpl.class);

		registerMilestoneDeliveryCreator();
		registerProductDeliveryKey();
		
		
		
		// Authorize Event Bindings
	    final Multibinder<AuthorizationEvent> authorizationEventListeners =
	      Multibinder.newSetBinder(binder(), new TypeLiteral<AuthorizationEvent>() {
	          // type literal - intentionally blank
	        });
	    authorizationEventListeners.addBinding().to(
	        MOLSAAuthorizationEventListener.class);


	}

	/**
	 * Registers the PDC evidence event listeners.
	 */
	protected void registerPDCEvidenceEvents() {

		// Register ReciprocalEvidenceConversion implementations
		final MapBinder<CASEEVIDENCEEntry, ReciprocalEvidenceConversion> reciprocalEvidenceConversionMapBinder = MapBinder
				.newMapBinder(binder(), CASEEVIDENCEEntry.class,
						ReciprocalEvidenceConversion.class);

		reciprocalEvidenceConversionMapBinder.addBinding(
				CASEEVIDENCEEntry.get(CASEEVIDENCE.HOUSEHOLDRELATIONSHIP)).to(
				MOLSAHouseholdRelationshipReciprocalConversion.class);

	}

	/**
	 * Registers program specific Milestone delivery creator.
	 */
	protected void registerMilestoneDeliveryCreator() {
		MapBinder<PRODUCTTYPEEntry, MOLSAMilestoneDeliveryCreator> milestoneCreatorImplementations = MapBinder
				.newMapBinder(binder(), PRODUCTTYPEEntry.class,
						MOLSAMilestoneDeliveryCreator.class);

		milestoneCreatorImplementations.addBinding(PRODUCTTYPEEntry.HANDICAP)
				.to(MOLSAHandicapMDCreator.class);
		milestoneCreatorImplementations.addBinding(
				PRODUCTTYPEEntry.DIVORCEDLADY).to(MOLSASeniorMDCreator.class);
		milestoneCreatorImplementations.addBinding(PRODUCTTYPEEntry.WIDOW).to(
				MOLSASeniorMDCreator.class);
		milestoneCreatorImplementations.addBinding(
				PRODUCTTYPEEntry.FAMILYOFPRISONER).to(
				MOLSASeniorMDCreator.class);
		milestoneCreatorImplementations.addBinding(
				PRODUCTTYPEEntry.FAMILYINNEED).to(MOLSASeniorMDCreator.class);
		milestoneCreatorImplementations.addBinding(
				PRODUCTTYPEEntry.ANONYMOUSPARENTS).to(
				MOLSAAnonymousMDCreator.class);

	}

	/**
	 * Register product delivery key
	 */
	protected void registerProductDeliveryKey() {

		// bind(MOLSARegisterProductDeliveryKey.class).annotatedWith(MOLSAProductDeliveryDefault.class).to(MOLSASocialAssistanceRegisterPDKey.class);

		MapBinder<PRODUCTTYPEEntry, MOLSARegisterProductDeliveryKey> registerKeyImplementations = MapBinder
				.newMapBinder(binder(), PRODUCTTYPEEntry.class,
						MOLSARegisterProductDeliveryKey.class);
		registerKeyImplementations.addBinding(PRODUCTTYPEEntry.SENIORCITIZEN)
				.to(MOLSASeniorCitizenRegisterPDKey.class);
		registerKeyImplementations.addBinding(PRODUCTTYPEEntry.FAMILYOFMISSING)
				.to(MOLSAFamilyOfMissingRegisterPDKey.class);
		registerKeyImplementations
				.addBinding(PRODUCTTYPEEntry.FAMILYOFPRISONER).to(
						MOLSAFamilyOfPrisonnerRegisterPDKey.class);
		registerKeyImplementations.addBinding(PRODUCTTYPEEntry.WIDOW).to(
				MOLSASocialAssistanceRegisterPDKey.class);
		registerKeyImplementations
				.addBinding(PRODUCTTYPEEntry.ANONYMOUSPARENTS).to(
						MOLSASocialAssistanceRegisterPDKey.class);
		registerKeyImplementations.addBinding(PRODUCTTYPEEntry.DESERTEDWIFE)
				.to(MOLSASocialAssistanceRegisterPDKey.class);
		registerKeyImplementations.addBinding(PRODUCTTYPEEntry.DIVORCEDLADY)
				.to(MOLSASocialAssistanceRegisterPDKey.class);
		registerKeyImplementations.addBinding(PRODUCTTYPEEntry.FAMILYINNEED)
				.to(MOLSAFamilyInNeedRegisterPDKey.class);
		registerKeyImplementations.addBinding(PRODUCTTYPEEntry.HANDICAP).to(
				MOLSASocialAssistanceRegisterPDKey.class);
		registerKeyImplementations.addBinding(PRODUCTTYPEEntry.ORPHAN).to(
				MOLSASocialAssistanceRegisterPDKey.class);
		registerKeyImplementations.addBinding(PRODUCTTYPEEntry.MAIDALLOWANCE)
				.to(MOLSASocialAssistanceRegisterPDKey.class);
		registerKeyImplementations.addBinding(
				PRODUCTTYPEEntry.INCAPABLEOFWORKING).to(
						MOLSAIncapableOfWorkingRegisterPDKey.class);
		registerKeyImplementations.addBinding(
				PRODUCTTYPEEntry.MOLSADETERMINEPRODUCT).to(
				MOLSASocialAssistanceRegisterPDKey.class);

	}
}