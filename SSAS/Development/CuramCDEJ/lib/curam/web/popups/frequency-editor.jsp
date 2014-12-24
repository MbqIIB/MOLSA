<?xml version="1.0" encoding="UTF-8"?> <jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" xmlns:curam="http://www.curamsoftware.com/curam" version="2.0"> <jsp:directive.page contentType="text/html; charset=UTF-8" errorPage="/en/CuramErrorPage.do" isErrorPage="false" language="java" pageEncoding="UTF-8"/> <jsp:directive.page import="curam.omega3.user.InfrastructureUserPreferences"/> <jsp:directive.page import="curam.omega3.user.UserPreferencesFactory"/> <jsp:directive.page import="curam.omega3.user.UserPreferences"/> <jsp:directive.page import="curam.util.common.util.JavaScriptEscaper"/> <jsp:directive.page import="curam.util.client.jsp.JspUtil"/> <jsp:output omit-xml-declaration="yes"/> <jsp:text><![CDATA[<!DOCTYPE html>]]></jsp:text> <curam:userPreferences localeCode="@LOCALE@"/> <jsp:scriptlet> <![CDATA[ UserPreferences prefs=UserPreferencesFactory.getUserPreferences(session); java.util.Locale locale=prefs.getLocale(); try { pageContext.setAttribute("highContrastMode", prefs.getUserPreference(InfrastructureUserPreferences.HIGH_CONTRAST_MODE)); } catch (final curam.util.common.JDEException e) { pageContext.setAttribute("highContrastMode", "false"); } pageContext.setAttribute("o3__serverURL", JspUtil.getServerRootURL(1)); String frequencyPatternData=""; String frequencyPatternText=""; String formActivated="false"; if(request.getParameter("formActivated") != null) { curam.omega3.util.FrequencySummary freq=new curam.omega3.util.FrequencySummary(locale); String patternStringFromRequest=request.getParameter("patternString"); /* Check if the patternString from the request is valid or not * to resolve its security vulnerabilities, e.g. XSS attack. * * The pattern string can only be in a 9 digit string representation, so * here we use a regular expression of it to check the pattern string * coming from the request. */ boolean isValid=patternStringFromRequest.matches("[0-9]{9}"); if (isValid) { freq.setPattern(patternStringFromRequest); frequencyPatternData=patternStringFromRequest; frequencyPatternText=freq.getText(); formActivated="true"; } } java.text.DateFormatSymbols symbols; String [] daysOfWeek; int [] dayConstants={java.util.Calendar.MONDAY, java.util.Calendar.TUESDAY, java.util.Calendar.WEDNESDAY, java.util.Calendar.THURSDAY, java.util.Calendar.FRIDAY, java.util.Calendar.SATURDAY, java.util.Calendar.SUNDAY}; String [] months; int [] monthConstants={java.util.Calendar.JANUARY, java.util.Calendar.FEBRUARY, java.util.Calendar.MARCH, java.util.Calendar.APRIL, java.util.Calendar.MAY, java.util.Calendar.JUNE, java.util.Calendar.JULY, java.util.Calendar.AUGUST, java.util.Calendar.SEPTEMBER, java.util.Calendar.OCTOBER, java.util.Calendar.NOVEMBER, java.util.Calendar.DECEMBER}; symbols=new java.text.DateFormatSymbols(locale); daysOfWeek=symbols.getWeekdays(); months=symbols.getMonths(); pageContext.setAttribute("daysOfWeek", daysOfWeek); pageContext.setAttribute("dayConstants", dayConstants); pageContext.setAttribute("months", months); pageContext.setAttribute("monthConstants", monthConstants); pageContext.setAttribute("landmarkLabel", curam.omega3.util.CDEJResources.getProperty("modal.panel.frame.title")); ]]> </jsp:scriptlet> <html lang="${htmlLanguage}" dir="${htmlDirection}"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>@FrequencySelector.title@</title> <link rel="stylesheet" type="text/css" media="screen, print" href="${pageScope.o3__serverURL}themes/v6/css/v6_main.css"/> <link rel="stylesheet" href="${pageScope.o3__serverURL}CDEJ/jscript/dojotk/dijit/themes/soria/soria.css"/> <link rel="stylesheet" type="text/css" media="screen, print" href="${pageScope.o3__serverURL}themes/soria/css/soria_main.css"/> <jsp:text><![CDATA[<!--[if IE 8]>]]></jsp:text> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_cc_IE8.css"/> <jsp:text><![CDATA[<![endif]-->]]></jsp:text> <jsp:text><![CDATA[<!--[if IE 9]>]]></jsp:text> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_cc_IE9.css"/> <jsp:text><![CDATA[<![endif]-->]]></jsp:text> <jsp:text><![CDATA[<!--[if !IE]>-->]]></jsp:text> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_cc_notIE.css"/> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_cc_IE10.css"/> <jsp:text><![CDATA[<![endif]-->]]></jsp:text> <jsp:scriptlet> if ("true".equals(pageContext.getAttribute("highContrastMode"))){ pageContext.setAttribute("highContrastClassName", "high-contrast"); </jsp:scriptlet> <jsp:scriptlet> if ("true".equals(pageContext.getAttribute("mobileUserAgent"))){ </jsp:scriptlet> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/mobile/css/mobile_main.css"/> <jsp:scriptlet>}</jsp:scriptlet> <link rel="stylesheet" href="${pageScope.o3__serverURL}themes/v6/css/v6_high_contrast.css"/> <jsp:scriptlet>}</jsp:scriptlet> <script type="text/javascript">
            var djConfig = {
                parseOnLoad: false,
                isDebug: false
            };
      </script> <jsp:scriptlet> String weekend = JavaScriptEscaper.escapeText("@Error.weekend@"); String dayNum = JavaScriptEscaper.escapeText("@Error.dayNum@"); String dayDiff = JavaScriptEscaper.escapeText("@Error.dayDiff@"); String freqPattern = JavaScriptEscaper.escapeText("@Error.freqPattern@"); String monthNum = JavaScriptEscaper.escapeText("@Error.monthNum@"); String dayNumAnd = JavaScriptEscaper.escapeText("@Error.dayNumAnd@"); String everyDay = JavaScriptEscaper.escapeText("@Error.everyDay@"); String everyWeek = JavaScriptEscaper.escapeText("@Error.everyWeek@"); String noDaySelected = JavaScriptEscaper.escapeText("@Error.noDaySelected@"); String dayString = JavaScriptEscaper.escapeText("@Error.dayString@"); String dayOfWeekMask = JavaScriptEscaper.escapeText("@Error.dayOfWeekMask@"); String firstDayString = JavaScriptEscaper.escapeText("@Error.firstDayString@"); String secondDayString = JavaScriptEscaper.escapeText("@Error.secondDayString@"); String weekdayString = JavaScriptEscaper.escapeText("@Error.weekend@"); String monthString = JavaScriptEscaper.escapeText("@Error.monthString@"); String dayStringForMonthly = JavaScriptEscaper.escapeText("@Error.dayStringForMonthly@"); String dayStringForYearly = JavaScriptEscaper.escapeText("@Error.dayStringForYearly@"); String dayOfWeekMaskForMonthly = JavaScriptEscaper.escapeText("@Error.dayOfWeekMaskForMonthly@"); String dayOfWeekMaskForYearly = JavaScriptEscaper.escapeText("@Error.dayOfWeekMaskForYearly@"); </jsp:scriptlet> <script type="text/javascript">
          <jsp:scriptlet>
            <![CDATA[
              out.print("var formActivated = " + formActivated + ";");
              out.print("var patternString = '" + frequencyPatternData + "';");
              out.print("var translatedPatternString = '" + frequencyPatternText + "';");
              out.print("var errorMsgs = {};");
              out.print("errorMsgs.weekend = '" + weekend + "';");
              out.print("errorMsgs.dayNum = '" + dayNum + "';");
              out.print("errorMsgs.dayDiff = '" + dayDiff + "';");
              out.print("errorMsgs.freqPattern = '" + freqPattern + "';");
              out.print("errorMsgs.monthNum = '" + monthNum + "';");
              out.print("errorMsgs.dayNumAnd = '" + dayNumAnd + "';");
              out.print("errorMsgs.everyDay = '" + everyDay + "';");
              out.print("errorMsgs.everyWeek = '" + everyWeek + "';");
              out.print("errorMsgs.noDaySelected = '" + noDaySelected + "';");
              out.print("errorMsgs.dayString = '" + dayString + "';");
              out.print("errorMsgs.dayOfWeekMask = '" + dayOfWeekMask + "';");
              out.print("errorMsgs.firstDayString = '" + firstDayString + "';");
              out.print("errorMsgs.secondDayString = '" + secondDayString + "';");
              out.print("errorMsgs.weekdayString = '" + weekdayString + "';");
              out.print("errorMsgs.monthString = '" + monthString + "';");
              out.print("errorMsgs.dayStringForMonthly = '" + dayStringForMonthly + "';");
              out.print("errorMsgs.dayStringForYearly = '" + dayStringForYearly + "';");
              out.print("errorMsgs.dayOfWeekMaskForMonthly = '" + dayOfWeekMaskForMonthly + "';");
              out.print("errorMsgs.dayOfWeekMaskForYearly = '" + dayOfWeekMaskForYearly + "';");
            ]]>
          </jsp:scriptlet>
        </script> <script src="${pageScope.o3__serverURL}CDEJ/jscript/dojotk/dojo/dojo.js" data-dojo-config="async:0,parseOnLoad:false,isDebug:false" type="text/javascript">// script content</script> <script type="text/javascript">
	        <jsp:scriptlet>curam.util.client.jsp.JspUtil.outputJSModulePaths(pageContext);</jsp:scriptlet>
          var jsPageID="frequency-editor";
        </script> <script type="text/javascript" src="${pageScope.o3__serverURL}CDEJ/jscript/cdej.js">// script content</script> <script type="text/javascript" src="${pageScope.o3__serverURL}CDEJ/jscript/cdej-cm.js">// script content</script> <script type="text/javascript">
        	require(["curam/core-uim", "curam/dialog", "curam/util/FrequencyEditor", "dijit/form/FilteringSelect"]);
          cfe = curam.util.FrequencyEditor;

          <jsp:text>var jsBaseURL = curam.util.retrieveBaseURL();</jsp:text> 
          <jsp:text>var jsScreenContext = new curam.util.ScreenContext();</jsp:text>
          jsScreenContext.setContext('POPUP|MODAL');
          cfe.addInputListener();
          curam.dialog.initModal('frequency-editor');

          // register publisher for the page height information
          curam.util.onLoad.addPublisher(function(context) {
            context.height = curam.util.getPageHeight();
            context.title = window.document.title;
          });

          require(["dojo/parser"]);
          dojo.addOnLoad(function() {
            cfe.replacePlaceholderWithDomNode();
            dojo.parser.parse();
            if (cfe.initPage()) {
              curam.util.onLoad.execute();
              dojo.removeClass(dojo.body(), "hidden");
            }
          });

          curam.util.setupGenericKeyHandler();
        </script> </head> <body id="Curam_frequency-editor" class="DefaultApp basic modal ${htmlLanguage} soria ${highContrastClassName} ${mobileClassName} hidden" dir="ltr" role="region" aria-label="${landmarkLabel}"> <div id="content" class="title-exists"> <form name="theForm" id="mainForm" method="post" action="frequency-editor.jsp"> <input type="hidden" name="formActivated" value="true"/> <input type="hidden" name="patternString" value="000000000"/> <input type="hidden" id="o3ctx" name="o3ctx" value="515|256"/> <div class="action-set hidden-action-set center"> <a class="ac" href="#">Save</a> <span class="filler">&amp;nbsp;</span> <input type="submit" name="__o3btn.submit" value="Save" onclick="return cfe.createPatternString()" id="__o3btn.submit" title="Save" class="hidden-button" tabindex="-1"/> <a class="ac" href="#">Cancel</a> <span class="filler">&amp;nbsp;</span> <input type="button" name="__o3btn.cancel" value="Cancel" onclick="curam.dialog.closeModalDialog();" id="__o3btn.cancel" title="Cancel" class="hidden-button" tabindex="-1"/> </div> <table cellspacing="0" summary="@FrequencySelector.title@"> <tr class="white"> <th class="type" rowspan="2"> <input onclick="cfe.setDefaultOption(cfe.DAILY_FREQUENCY)" id="dailyFreq" type="radio" name="freqType" value="daily" title="@Text.daily@"/> <label for="dailyFreq">@Text.daily@</label> </th> <td class="top frequency" colspan="4"> <input onclick="cfe.setSelectedFreqType(cfe.DAILY_FREQUENCY, this)" type="radio" name="daily_select_type" value="every_n_days" title="@Text.daily.radio@"/> <span>@Text.daily.freq.type.one@</span> <input class="text node-needs-replacement %dayInterval%" onclick="cfe.setSelectedFreqType(cfe.DAILY_FREQUENCY, this)" type="text" name="daily_num" size="2" maxlength="2" value="1" title="@Text.nth@ @Text.days@"/> </td> </tr> <tr class="white"> <td class="bottom frequency" colspan="4"> <input onclick="cfe.setSelectedFreqType(cfe.DAILY_FREQUENCY, this)" type="radio" name="daily_select_type" value="every_weekday" title="@Text.everyWeekDay@"/> <span>@Text.daily.freq.type.two@</span> </td> </tr> <tr class="blue"> <th class="type" rowspan="3"> <input onclick="cfe.setDefaultOption(cfe.WEEKLY_FREQUENCY)" type="radio" id="weeklyFreq" name="freqType" value="weekly" title="@Text.weekly@"/> <label for="weeklyFreq">@Text.weekly@</label> </th> <td class="top recur frequency weekly-frequency" colspan="4"> <span>@Text.weekly.freq.type@</span> <input class="text node-needs-replacement %weekInterval%" onclick="cfe.setSelectedFreqType(cfe.WEEKLY_FREQUENCY)" type="text" name="weekly_num" size="2" maxlength="2" value="1" title="@Text.nth@ @Text.weeks@"/> </td> </tr> <tr class ="blue"> <td class="day"> <input onclick="cfe.setSelectedFreqType(cfe.WEEKLY_FREQUENCY)" type="checkbox" name="weekly_select_mon" value="1" title="${daysOfWeek[dayConstants[0]]}"/> <jsp:text>${daysOfWeek[dayConstants[0]]}</jsp:text> </td> <td class="day"> <input onclick="cfe.setSelectedFreqType(cfe.WEEKLY_FREQUENCY)" type="checkbox" name="weekly_select_tue" value="2" title="${daysOfWeek[dayConstants[1]]}"/> <jsp:text>${daysOfWeek[dayConstants[1]]}</jsp:text> </td> <td class="day"> <input onclick="cfe.setSelectedFreqType(cfe.WEEKLY_FREQUENCY)" type="checkbox" name="weekly_select_wed" value="4" title="${daysOfWeek[dayConstants[2]]}"/> <jsp:text>${daysOfWeek[dayConstants[2]]}</jsp:text> </td> <td class="day"> <input onclick="cfe.setSelectedFreqType(cfe.WEEKLY_FREQUENCY)" type="checkbox" name="weekly_select_thur" value="8" title="${daysOfWeek[dayConstants[3]]}"/> <jsp:text>${daysOfWeek[dayConstants[3]]}</jsp:text> </td> </tr> <tr class="blue"> <td class="bottom day"> <input onclick="cfe.setSelectedFreqType(cfe.WEEKLY_FREQUENCY)" type="checkbox" name="weekly_select_fri" value="16" title="${daysOfWeek[dayConstants[4]]}"/> <jsp:text>${daysOfWeek[dayConstants[4]]}</jsp:text> </td> <td class="bottom day"> <input onclick="cfe.setSelectedFreqType(cfe.WEEKLY_FREQUENCY)" type="checkbox" name="weekly_select_sat" value="32" title="${daysOfWeek[dayConstants[5]]}"/> <jsp:text>${daysOfWeek[dayConstants[5]]}</jsp:text> </td> <td class="bottom day"> <input onclick="cfe.setSelectedFreqType(cfe.WEEKLY_FREQUENCY)" type="checkbox" name="weekly_select_sun" value="64" title="${daysOfWeek[dayConstants[6]]}"/> <jsp:text>${daysOfWeek[dayConstants[6]]}</jsp:text> </td> <td class="bottom day"><jsp:scriptlet> <![CDATA[ out.print("&nbsp;"); ]]> </jsp:scriptlet></td> </tr> <tr class="white"> <th class="type" rowspan="3"> <input onclick="cfe.setDefaultOption(cfe.MONTHLY_FREQUENCY)" id="monthlyFreq" type="radio" name="freqType" value="monthly" title="@Text.monthly@"/> <label for="monthlyFreq">@Text.monthly@</label> </th> <td class="top frequency" colspan="4"> <input onclick="cfe.setSelectedFreqType(cfe.MONTHLY_FREQUENCY, this)" type="radio" name="monthlyFreqType" value="start_date" title="@Text.monthly.radio.1@"/> <span>@Text.monthly.freq.type.startDate@</span> <input class="text node-needs-replacement %monthInterval%" onclick="cfe.setSelectedFreqType(cfe.MONTHLY_FREQUENCY, this)" type="text" name="monthly0_month_interval" size="2" maxlength="2" value="1" title="@Text.nth@ @Text.month@"/> </td> </tr> <tr class="white"> <td class="middle frequency" colspan="4"> <input onclick="cfe.setSelectedFreqType(cfe.MONTHLY_FREQUENCY, this)" type="radio" name="monthlyFreqType" value="numbered_day" title="@Text.monthly.radio.1@"/> <span>@Text.monthly.freq.type.one@</span> <input class="text node-needs-replacement %dayInterval%" onclick="cfe.setSelectedFreqType(cfe.MONTHLY_FREQUENCY, this)" type="text" name="monthly1_day_num" size="2" maxlength="2" value="1" title="@Text.nth@ @Text.days@"/> <input class="text node-needs-replacement %monthInterval%" onclick="cfe.setSelectedFreqType(cfe.MONTHLY_FREQUENCY, this)" type="text" name="monthly1_month_interval" size="2" maxlength="2" value="1" title="@Text.nth@ @Text.month@"/> </td> </tr> <tr class="white"> <td class="bottom frequency" colspan="4"> <input onclick="cfe.setSelectedFreqType(cfe.MONTHLY_FREQUENCY, this)" type="radio" name="monthlyFreqType" value="select_day" title="@Text.monthly.radio.2@"/> <span>@Text.monthly.freq.type.two@</span> <select class="codetable node-needs-replacement %ordinal%" dojoType="dijit.form.FilteringSelect" invalidMessage="" onclick="cfe.setSelectedFreqType(cfe.MONTHLY_FREQUENCY, this)" title="@Text.nth@" name="monthly2_select_day_num" id="monthly2_select_day_num"> <option value="32">@ordinal.first@</option> <option value="33">@ordinal.second@</option> <option value="34">@ordinal.third@</option> <option value="35">@ordinal.fourth@</option> <option value="36">@ordinal.last@</option> </select> <select class="codetable node-needs-replacement %dayOfWeekExtended%" dojoType="dijit.form.FilteringSelect" invalidMessage="" onclick="cfe.setSelectedFreqType(cfe.MONTHLY_FREQUENCY, this)" title="@Text.days@" name="monthly2_select_day" id="monthly2_select_day"> <option value="201">@Text.day@</option> <option value="202">@Text.weekDay@</option> <option value="203">@Text.weekendDay@</option> <option value="1">${daysOfWeek[dayConstants[0]]}</option> <option value="2">${daysOfWeek[dayConstants[1]]}</option> <option value="4">${daysOfWeek[dayConstants[2]]}</option> <option value="8">${daysOfWeek[dayConstants[3]]}</option> <option value="16">${daysOfWeek[dayConstants[4]]}</option> <option value="32">${daysOfWeek[dayConstants[5]]}</option> <option value="64">${daysOfWeek[dayConstants[6]]}</option> </select> <input class="text node-needs-replacement %monthInterval%" onclick="cfe.setSelectedFreqType(cfe.MONTHLY_FREQUENCY, this)" type="text" name="monthly2_month_interval" size="2" maxlength="2" value="1" title="@Text.nth@ @Text.month@"/> </td> </tr> <tr class="blue"> <th class="type" rowspan="2"> <input onclick="cfe.setDefaultOption(cfe.BIMONTHLY_FREQUENCY)" id="bimonthlyFreq" type="radio" name="freqType" value="bimonthly" title="@Text.bimonthly@"/> <label for="bimonthlyFreq">@Text.bimonthly@</label> </th> <td class="top frequency" colspan="4"> <input onclick="cfe.setSelectedFreqType(cfe.BIMONTHLY_FREQUENCY - cfe.CORRECTOR, this)" type="radio" name="bimonthlyFreqType" value="numbered_day" title="@Text.bimonthly.radio.1@"/> <span>@Text.bimonthly.freq.type.one@</span> <input class="text node-needs-replacement %dayIntervalOne%" onclick="cfe.setSelectedFreqType(cfe.BIMONTHLY_FREQUENCY - cfe.CORRECTOR, this)" type="text" name="bimonthly1_day1_num" size="2" maxlength="2" value="1" title="@Text.nth@ @Text.days@"/> <input class="text node-needs-replacement %dayIntervalTwo%" onclick="cfe.setSelectedFreqType(cfe.BIMONTHLY_FREQUENCY - cfe.CORRECTOR, this)" type="text" name="bimonthly1_day2_num" size="2" maxlength="2" value="1" title="@Text.nth@ @Text.days@"/> </td> </tr> <tr class="blue"> <td class="bottom frequency" colspan="4"> <input onclick="cfe.setSelectedFreqType(cfe.BIMONTHLY_FREQUENCY - cfe.CORRECTOR, this)" type="radio" name="bimonthlyFreqType" value="select_day" title="@Text.bimonthly.radio.2@"/> <span>@Text.bimonthly.freq.type.two@</span> <select class="codetable node-needs-replacement %ordinalOne%" dojoType="dijit.form.FilteringSelect" invalidMessage="" onclick="cfe.setSelectedFreqType(cfe.BIMONTHLY_FREQUENCY - cfe.CORRECTOR, this)" title="@Text.nth@" name="bimonthly2_select_day1_num" id="bimonthly2_select_day1_num"> <option value="32">@ordinal.first@</option> <option value="33">@ordinal.second@</option> <option value="34">@ordinal.third@</option> <option value="35">@ordinal.fourth@</option> </select> <select class="codetable node-needs-replacement %ordinalTwo%" dojoType="dijit.form.FilteringSelect" invalidMessage="" onclick="cfe.setSelectedFreqType(cfe.BIMONTHLY_FREQUENCY - cfe.CORRECTOR, this)" title="@Text.nth@" name="bimonthly2_select_day2_num" id="bimonthly2_select_day2_num"> <option value="33">@ordinal.second@</option> <option value="34">@ordinal.third@</option> <option value="35">@ordinal.fourth@</option> <option value="36">@ordinal.last@</option> </select> <select class="codetable node-needs-replacement %dayOfWeek%" dojoType="dijit.form.FilteringSelect" invalidMessage="" onclick="cfe.setSelectedFreqType(cfe.BIMONTHLY_FREQUENCY - cfe.CORRECTOR, this)" title="@Text.days@" name="bimonthly2_select_weekday" id="bimonthly2_select_weekday"> <option value="1">${daysOfWeek[dayConstants[0]]}</option> <option value="2">${daysOfWeek[dayConstants[1]]}</option> <option value="4">${daysOfWeek[dayConstants[2]]}</option> <option value="8">${daysOfWeek[dayConstants[3]]}</option> <option value="16">${daysOfWeek[dayConstants[4]]}</option> <option value="32">${daysOfWeek[dayConstants[5]]}</option> <option value="64">${daysOfWeek[dayConstants[6]]}</option> </select> </td> </tr> <tr class="white"> <th class="type last" rowspan="2"> <input onclick="cfe.setDefaultOption(cfe.YEARLY_FREQUENCY)" id="yearlyFreq" type="radio" name="freqType" value="yearly" title="@Text.yearly@"/> <label for="yearlyFreq">@Text.yearly@</label> </th> <td class="top frequency" colspan="4"> <input onclick="cfe.setSelectedFreqType(cfe.YEARLY_FREQUENCY + cfe.CORRECTOR, this)" type="radio" name="yearlyFreqType" value="select_month_day_num" title="@Text.yearly.radio.1@"/> <span>@Text.yearly.freq.type.one@</span> <select class="codetable node-needs-replacement %monthOfYear%" dojoType="dijit.form.FilteringSelect" invalidMessage="" title="@Text.month@" name="yearly1_select_month" id="yearly1_select_month" onclick="cfe.setSelectedFreqType(cfe.YEARLY_FREQUENCY + cfe.CORRECTOR, this)"> <option value="1">${months[monthConstants[0]]}</option> <option value="2">${months[monthConstants[1]]}</option> <option value="3">${months[monthConstants[2]]}</option> <option value="4">${months[monthConstants[3]]}</option> <option value="5">${months[monthConstants[4]]}</option> <option value="6">${months[monthConstants[5]]}</option> <option value="7">${months[monthConstants[6]]}</option> <option value="8">${months[monthConstants[7]]}</option> <option value="9">${months[monthConstants[8]]}</option> <option value="10">${months[monthConstants[9]]}</option> <option value="11">${months[monthConstants[10]]}</option> <option value="12">${months[monthConstants[11]]}</option> </select> <input class="text node-needs-replacement %dayInterval%" type="text" name="yearly1_day_num" size="2" maxlength="2" value="1" onclick="cfe.setSelectedFreqType(cfe.YEARLY_FREQUENCY + cfe.CORRECTOR, this)" title="@Text.nth@ @Text.days@"/> </td> </tr> <tr class="white"> <td class="bottom last frequency" colspan="4"> <input type="radio" name="yearlyFreqType" onclick="cfe.setSelectedFreqType(cfe.YEARLY_FREQUENCY + cfe.CORRECTOR, this)" value="select_month_day" title="@Text.yearly.radio.2@"/> <span>@Text.yearly.freq.type.two@</span> <select class="codetable node-needs-replacement %ordinal%" dojoType="dijit.form.FilteringSelect" invalidMessage="" title="@Text.nth@" name="yearly2_select_day_num" id="yearly2_select_day_num" onclick="cfe.setSelectedFreqType(cfe.YEARLY_FREQUENCY + cfe.CORRECTOR, this)"> <option value="32">@ordinal.first@</option> <option value="33">@ordinal.second@</option> <option value="34">@ordinal.third@</option> <option value="35">@ordinal.fourth@</option> <option value="36">@ordinal.last@</option> </select> <select class="codetable node-needs-replacement %dayOfWeekExtended%" dojoType="dijit.form.FilteringSelect" invalidMessage="" title="@Text.days@" name="yearly2_select_day" id="yearly2_select_day" onclick="cfe.setSelectedFreqType(cfe.YEARLY_FREQUENCY + cfe.CORRECTOR, this)"> <option value="201">@Text.day@</option> <option value="202">@Text.weekDay@</option> <option value="203">@Text.weekendDay@</option> <option value="1">${daysOfWeek[dayConstants[0]]}</option> <option value="2">${daysOfWeek[dayConstants[1]]}</option> <option value="4">${daysOfWeek[dayConstants[2]]}</option> <option value="8">${daysOfWeek[dayConstants[3]]}</option> <option value="16">${daysOfWeek[dayConstants[4]]}</option> <option value="32">${daysOfWeek[dayConstants[5]]}</option> <option value="64">${daysOfWeek[dayConstants[6]]}</option> </select> <select class="codetable node-needs-replacement %monthOfYear%" dojoType="dijit.form.FilteringSelect" invalidMessage="" onclick="cfe.setSelectedFreqType(cfe.YEARLY_FREQUENCY + cfe.CORRECTOR, this)" title="@Text.month@" name="yearly2_select_month" id="yearly2_select_month"> <option value="1">${months[monthConstants[0]]}</option> <option value="2">${months[monthConstants[1]]}</option> <option value="3">${months[monthConstants[2]]}</option> <option value="4">${months[monthConstants[3]]}</option> <option value="5">${months[monthConstants[4]]}</option> <option value="6">${months[monthConstants[5]]}</option> <option value="7">${months[monthConstants[6]]}</option> <option value="8">${months[monthConstants[7]]}</option> <option value="9">${months[monthConstants[8]]}</option> <option value="10">${months[monthConstants[9]]}</option> <option value="11">${months[monthConstants[10]]}</option> <option value="12">${months[monthConstants[11]]}</option> </select> </td> </tr> </table> </form> </div> <div id="actions-panel" class="actions-panel" title="" style="bottom: 0px; left: 0px; right: 0px;"> <div class="action-set buttons"> <curam:button name="submit" cssClass="submit replace" type="submit" onclick="return cfe.createPatternString()"> <jsp:text>@Button.ok@</jsp:text> </curam:button> <jsp:scriptlet> <![CDATA[ out.print("<script type=\"text/javascript\">");
          out.print("dojo.addOnLoad(function(){curam.util.replaceSubmitButton('submit')});");
          out.print("</script>"); ]]> </jsp:scriptlet> <curam:button name="cancel" cssClass="submit replace" type="button" onclick="curam.dialog.closeModalDialog();"> <jsp:text>@Button.cancel@</jsp:text> </curam:button> <jsp:scriptlet> <![CDATA[ out.print("<script type=\"text/javascript\">");
        out.print("dojo.addOnLoad(function(){curam.util.replaceSubmitButton('cancel')});");
        out.print("</script>"); ]]> </jsp:scriptlet> </div> </div> </body> </html> </jsp:root>