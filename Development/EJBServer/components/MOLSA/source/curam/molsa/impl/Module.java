package curam.molsa.impl;

import com.google.inject.AbstractModule;
import com.google.inject.multibindings.Multibinder;

import curam.application.impl.ApplicationEvents;
import curam.molsa.intake.impl.MOLSAIntakeApplicationListener;

/**
 * Business interface which contains the juice binding for the manage program
 * interface.
 */
public class Module extends AbstractModule {

  @Override
  protected void configure() {
    configureIntakeApplicationPrePopulation();
    configureIntakeApplicationSubmission();
    configurePasswordGenerator();
  }

  /**
   * Configures MOLSA Application Mapping from Case
   */
  private void configureIntakeApplicationPrePopulation() {

    bind(curam.application.impl.Application.class).to(
        curam.molsa.application.impl.MOLSAApplicationImpl.class);
  }

  /**
 * Configures Intake Application submission.
 */
  private void configureIntakeApplicationSubmission() {

    final Multibinder<ApplicationEvents> applicationEventBinder = Multibinder
        .newSetBinder(binder(), ApplicationEvents.class);
    applicationEventBinder.addBinding().to(
        MOLSAIntakeApplicationListener.class);

  }
  
  /**
   * Configures user account password generator.
   */
  private void configurePasswordGenerator(){
  	 bind(curam.citizenworkspace.security.impl.CWPasswordGenerationStrategy.class).to(
  			 curam.molsa.useraccount.sms.sl.impl.MOLSACWPasswordGenerator.class);
  }

}
