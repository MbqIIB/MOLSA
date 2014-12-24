<?xml version="1.0" encoding="UTF-8"?> <jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" xmlns:curam="http://www.curamsoftware.com/curam" version="2.0"> <jsp:directive.page contentType="text/html; charset=UTF-8" errorPage="/en/CuramErrorPage.do" isErrorPage="false" language="java" pageEncoding="UTF-8"/> <jsp:directive.page import="curam.omega3.user.InfrastructureUserPreferences"/> <jsp:directive.page import="curam.omega3.user.UserPreferencesFactory"/> <jsp:directive.page import="curam.omega3.user.UserPreferences"/> <jsp:directive.page import="curam.util.client.jsp.JspUtil"/> <jsp:directive.page import="curam.util.common.util.JavaScriptEscaper"/> <jsp:output omit-xml-declaration="yes"/> <jsp:text><![CDATA[<!DOCTYPE html>]]></jsp:text> <jsp:scriptlet> UserPreferences prefs = UserPreferencesFactory.getUserPreferences(session); pageContext.setAttribute("landmarkLabel", curam.omega3.util.CDEJResources.getProperty("modal.panel.frame.title")); pageContext.setAttribute("pageLocale", prefs.getLocale().toString()); pageContext.setAttribute("dojoConfig", JspUtil.getDojoConfig(prefs.getLocale())); try { pageContext.setAttribute("highContrastMode", prefs.getUserPreference(InfrastructureUserPreferences.HIGH_CONTRAST_MODE)); } catch (final curam.util.common.JDEException e) { pageContext.setAttribute("highContrastMode", "false"); } pageContext.setAttribute("o3__serverURL", JspUtil.getServerRootURL(2)); </jsp:scriptlet> <curam:userPreferences localeCode="${pageScope.pageLocale}"/> <html lang="${htmlLanguage}" dir="${htmlDirection}"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title><jsp:scriptlet><![CDATA[out.print( curam.omega3.util.CDEJResources.getProperty( "curam.omega3.i18n.DateTimeSelector", "dateSelector.title"));]]></jsp:scriptlet></title> <link rel="stylesheet" type="text/css" media="screen, print" href="${pageScope.o3__serverURL}themes/v6/css/v6_main.css"/> <link rel="stylesheet" type="text/css" media="screen, print" href="${pageScope.o3__serverURL}CDEJ/jscript/dojotk/dijit/themes/soria/soria.css"/> <link rel="stylesheet" type="text/css" media="screen, print" href="${pageScope.o3__serverURL}themes/soria/css/soria_main.css"/> <jsp:text><![CDATA[<!--[if IE]>]]></jsp:text> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_cc_IE.css"/> <jsp:text><![CDATA[<![endif]-->]]></jsp:text> <jsp:text><![CDATA[<!--[if IE 8]>]]></jsp:text> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_cc_IE8.css"/> <jsp:text><![CDATA[<![endif]-->]]></jsp:text> <jsp:text><![CDATA[<!--[if !IE]>]]></jsp:text> <link rel="stylesheet" type="text/css" media="all" href="${pageScope.o3__serverURL}themes/v6/css/v6_cc_notIE.css"/> <link rel="stylesheet" type="text/css" media="all" href="${pageScope.o3__serverURL}themes/v6/css/v6_cc_IE10.css"/> <jsp:text>~<![CDATA[<![endif]-->]]></jsp:text> <jsp:scriptlet> if ("true".equals(pageContext.getAttribute("highContrastMode"))){ pageContext.setAttribute("highContrastClassName", "high-contrast"); </jsp:scriptlet> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_high_contrast.css"/> <jsp:scriptlet>}</jsp:scriptlet> <jsp:scriptlet> if ("true".equals(pageContext.getAttribute("mobileUserAgent"))){ </jsp:scriptlet> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/mobile/css/mobile_main.css"/> <jsp:scriptlet>}</jsp:scriptlet> <curam:jsUserPreferences/> <script type="text/javascript" data-dojo-config="${pageScope.dojoConfig}" src="${pageScope.o3__serverURL}CDEJ/jscript/dojotk/dojo/dojo.js">// script content</script> <script type="text/javascript" src="${pageScope.o3__serverURL}CDEJ/jscript/dojotk/dijit/dijit.js">
//script content</script> <script type="text/javascript">
<jsp:scriptlet>JspUtil.outputJSModulePaths(pageContext);</jsp:scriptlet>
</script> <script type="text/javascript" src="${pageScope.o3__serverURL}CDEJ/jscript/cdej-cm.js">// script content</script> <script type="text/javascript" src="${pageScope.o3__serverURL}CDEJ/jscript/cdej.js">// script content</script> <script type="text/javascript">
  <jsp:text><![CDATA[	
      require(["curam/core-uim", "curam/dateSelectorUtil", "dijit/form/FilteringSelect", "curam/dialog"]);
  		curam.dateSelectorUtil.topic=']]></jsp:text>
  <jsp:scriptlet>
      Object safeTopicId = JavaScriptEscaper.escapeText(
          pageContext.getRequest().getParameter("topicId"), true);
      if (safeTopicId != null) {
        out.print(safeTopicId);
      }
  </jsp:scriptlet>
  <jsp:text><![CDATA[';]]></jsp:text>
</script> <script type="text/javascript">
    var jsBaseURL = curam.util.retrieveBaseURL();
    var jsScreenContext = new curam.util.ScreenContext();
    jsScreenContext.setContext('POPUP|MODAL');
  </script> <script type="text/javascript">
  <jsp:text>LOCALIZED_MONTH_NAMES = [];</jsp:text>
  <jsp:scriptlet><![CDATA[
    for (int i = 0; i < 12; i++) {
      String monthName
        = curam.omega3.util.CDEJResources.getProperty("Text.month" + (i + 1));
      out.print("LOCALIZED_MONTH_NAMES[" + i + "]='"
	  + curam.util.common.util.JavaScriptEscaper.escapeText(monthName) + "';");
    }
  ]]></jsp:scriptlet>
  <jsp:text>LOCALIZED_SHORT_MONTH_NAMES = [];</jsp:text>
  <jsp:scriptlet><![CDATA[
    for (int i = 0; i < 12; i++) {
      String shortMonthName
         = curam.omega3.util.CDEJResources.getProperty("Text.shortMonth" + (i + 1));
      out.print("LOCALIZED_SHORT_MONTH_NAMES[" + i + "]='"
	    + curam.util.common.util.JavaScriptEscaper.escapeText(shortMonthName) + "';");
  }
  ]]>
  
    out.print("LOCALISED_CURRENT_DAY = \"" + 
	  curam.util.common.util.JavaScriptEscaper.escapeText(curam.omega3.util.CDEJResources
           .getProperty("date.selector.today.alt")) + "\";");
    out.print("LOCALISED_SELECTED_DAY = \""
	+ curam.util.common.util.JavaScriptEscaper.escapeText(curam.omega3.util.CDEJResources
        .getProperty("date.selector.selected.alt")) + "\";");
  </jsp:scriptlet>
</script> <script type="text/javascript">
<jsp:text>
<![CDATA[
	curam.dialog.initModal('date-selector');

  // register publisher for the page height information
  curam.util.onLoad.addPublisher(function(context) {
    context.height = curam.util.getPageHeight();
    context.title = window.document.title;
  });
  dojo.addOnLoad(curam.util.onLoad.execute);

  dojo.addOnLoad(curam.dateSelectorUtil.initCalendar);

  curam.dateSelectorUtil.startDayOfWeek = ]]></jsp:text>
    <jsp:scriptlet>
        java.util.Locale aLocale = curam.omega3.user.UserPreferencesFactory
                                     .getUserPreferences(pageContext.getSession())
                               .getLocale();
        int startDayOfWeek = java.util.Calendar.SUNDAY;
        try {
                if (Boolean.parseBoolean(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources",
                        "enable.locale.aware.startdayofweek"))) {
                        startDayOfWeek = new java.util.GregorianCalendar(aLocale).getFirstDayOfWeek();
                }

                // Default back to Sunday if day is other than Monday.
                if (startDayOfWeek != java.util.Calendar.MONDAY) {
                        startDayOfWeek = java.util.Calendar.SUNDAY;
                }
         } catch (Exception e) {
                // Default to Sunday if property not found.
         }

        out.print(startDayOfWeek + ";");
    </jsp:scriptlet>
	curam.util.setupGenericKeyHandler();
</script> </head> <body id="Curam_date-selector" class="${htmlLanguage} soria ${highContrastClassName} ${mobileClassName}" role="region" aria-label="${landmarkLabel}"> <div id="content" aria-live="polite"> <table class="month-year-selector" role="presentation"> <tr> <td> <jsp:scriptlet> <![CDATA[ out.print("<select maxHeight=\"147\" aria-controls=\"content\" dojoType=\"dijit.form.FilteringSelect\" title=\"" + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.DateTimeSelector", "dateSelector.input.month") + "\"" + " id=\"month\" name=\"month\" class=\"codetable widget-medium\"" + " invalidMessage=\"\">"); ]]></jsp:scriptlet> <option value="0"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month1"));</jsp:scriptlet></option> <option value="1"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month2"));</jsp:scriptlet></option> <option value="2"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month3"));</jsp:scriptlet></option> <option value="3"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month4"));</jsp:scriptlet></option> <option value="4"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month5"));</jsp:scriptlet></option> <option value="5"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month6"));</jsp:scriptlet></option> <option value="6"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month7"));</jsp:scriptlet></option> <option value="7"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month8"));</jsp:scriptlet></option> <option value="8"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month9"));</jsp:scriptlet></option> <option value="9"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month10"));</jsp:scriptlet></option> <option value="10"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month11"));</jsp:scriptlet></option> <option value="11"><jsp:scriptlet>out.print(curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.month12"));</jsp:scriptlet></option> <jsp:scriptlet> <![CDATA[ out.print("</select>"); out.print("<input title=\"" + curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.DateTimeSelector", "dateSelector.input.year") + "\"" + " id=\"year\" aria-controls=\"content\" name=\"year\" class=\"widget-small\" type=\"text\">"); ]]></jsp:scriptlet> </td> </tr> </table> <table id="calendarData" class="calendar"> <thead> <tr class="day-names"> <jsp:scriptlet><![CDATA[ /* Maps the labels defined in CDEJResources.properties on java.util.Calendar indexs. Protects against JDK changes. */ java.util.HashMap daysOfWeek = new java.util.HashMap(); daysOfWeek.put(Integer.valueOf(java.util.Calendar.MONDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.shortDay" + 1)); daysOfWeek.put(Integer.valueOf(java.util.Calendar.TUESDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.shortDay" + 2)); daysOfWeek.put(Integer.valueOf(java.util.Calendar.WEDNESDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.shortDay" + 3)); daysOfWeek.put(Integer.valueOf(java.util.Calendar.THURSDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.shortDay" + 4)); daysOfWeek.put(Integer.valueOf(java.util.Calendar.FRIDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.shortDay" + 5)); daysOfWeek.put(Integer.valueOf(java.util.Calendar.SATURDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.shortDay" + 6)); daysOfWeek.put(Integer.valueOf(java.util.Calendar.SUNDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.shortDay" + 7)); java.util.HashMap daysOfWeekLong = new java.util.HashMap(); daysOfWeekLong.put(Integer.valueOf(java.util.Calendar.MONDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.longDay" + 1)); daysOfWeekLong.put(Integer.valueOf(java.util.Calendar.TUESDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.longDay" + 2)); daysOfWeekLong.put(Integer.valueOf(java.util.Calendar.WEDNESDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.longDay" + 3)); daysOfWeekLong.put(Integer.valueOf(java.util.Calendar.THURSDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.longDay" + 4)); daysOfWeekLong.put(Integer.valueOf(java.util.Calendar.FRIDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.longDay" + 5)); daysOfWeekLong.put(Integer.valueOf(java.util.Calendar.SATURDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.longDay" + 6)); daysOfWeekLong.put(Integer.valueOf(java.util.Calendar.SUNDAY), curam.omega3.util.CDEJResources.getProperty("curam.omega3.i18n.CDEJResources", "Text.longDay" + 7)); /*The calendar will have seven different columns.*/ for (int i=0; i<7; i++) { /*For each column, create a <th> with a class of day.*/ String nbsp = "&nbsp;"; out.print("<th class=\"day\">"); if ((startDayOfWeek + i)%7 == 0) { String day = (String) daysOfWeek.get(Integer.valueOf(7)); out.println((day.length() == 0 ? nbsp : day.substring(0,1))); /*For each th, create a <abbr> for the purpose of screen readers to read out the day of the week.*/ String dayLong = (String) daysOfWeekLong.get(Integer.valueOf(7)); out.print("<abbr class=\"hidden\" title=\"" + dayLong + "\">"); out.println(dayLong.length() == 0 ? nbsp : dayLong); out.print("</abbr>"); } else { int index = ((startDayOfWeek + i)%7); String day = (String) daysOfWeek.get(Integer.valueOf(index)); out.println((day.length() == 0 ? nbsp : day.substring(0,1))); /*For each th, create a <abbr> for the purpose of screen readers to read out the day of the week.*/ String dayLong = (String) daysOfWeekLong.get(Integer.valueOf(index)); out.print("<abbr class=\"hidden\" title=\"" + dayLong + "\">"); out.println(dayLong.length() == 0 ? nbsp : dayLong); out.print("</abbr>"); } out.print("</th>"); } ]]></jsp:scriptlet> </tr> </thead> <tr class="week-one"> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> </tr> <tr> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> </tr> <tr> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> </tr> <tr> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> </tr> <tr> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> </tr> <tr> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> <td class="calendar-value">&amp;nbsp;</td> </tr> </table> <div id="bottom-bar"></div> </div> </body> </html> </jsp:root>