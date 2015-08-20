package curam.molsacp.impl;

import com.google.inject.AbstractModule;
import com.google.inject.TypeLiteral;
import com.google.inject.multibindings.Multibinder;

import curam.application.impl.ApplicationEvents;
import curam.citizenworkspace.impl.CWScreeningEvents;
import curam.molsa.intake.impl.MOLSAIntakeApplicationListener;
import curam.molsacp.eventlisteners.impl.MOLSAScreeningEventListener;

/**
 * Business interface which contains the juice binding for the MOLSA universal access.
 */
public class Module extends AbstractModule {

  @Override
  protected void configure() {
    bindCWScreeningListeners();
  }


  /**
   * Binds the CWScreeningEvents to listener.
   */
  private void bindCWScreeningListeners() {
    // Add a listener for the CWScreeningEvents
    final Multibinder<CWScreeningEvents > cwScreeningEventsListener = Multibinder
        .newSetBinder(binder(), new TypeLiteral<CWScreeningEvents>() { /**/
        });

    cwScreeningEventsListener.addBinding().to(MOLSAScreeningEventListener.class);
  }

}
