package curam.molsa.test.eligibility.framework;

import curam.creole.value.Interval;
import curam.creole.value.Timeline;
import curam.util.type.Date;
/**
 * 
 * Creole Constant Interface.
 *
 */
public interface MOLSACreoleTestConstants {
  /**
   * to indicate if we should use interpreted mode
   */
  String INTERPRETED = "INTERPRETED";

  /**
   * To indicate if we should use the strongly typed mode
   */
  String STRONGLY_TYPED = "STRONGLY_TYPED";

  /**
   * to indicate if we should use interpreted mode
   */
  String XML_EXT = ".xml";

  @SuppressWarnings({ "rawtypes", "unchecked" })
  Timeline TRUE_TIMELINE = new Timeline<Boolean>(
  // first interval, application from the "start of time"
      new Interval<Boolean>(null, true));

  @SuppressWarnings({ "rawtypes", "unchecked" })
  Timeline FALSE_TIMELINE = new Timeline<Boolean>(
  // first interval, application from the "start of time"
      new Interval<Boolean>(null, false)

  );

  @SuppressWarnings({ "rawtypes", "unchecked" })
  Timeline NUMBER_TIMELINE = new Timeline<Number>(
  // first interval, application from the "start of time"
      new Interval<Number>(null, 1)

  );

  /**
   * Date to run the assessment date on. This date should be used to access
   * the majority of time lines in the unit tests. The base class also has
   * a method assessmentDate(). This date should be used as the start date
   * for most evidence succession sets. It makes it easier to write and debug
   * tests if you know you are checking everything on one date.
   * 
   * If you need to write more complicated unit tests around timelines
   * you can do so in your own test.
   */
  Date assessmentDate = Date.fromISO8601("20100101");
}
