<?xml version="1.0" encoding="UTF-8"?> <jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" xmlns:curam="http://www.curamsoftware.com/curam" version="2.0"> <jsp:directive.page import="curam.omega3.user.UserPreferencesFactory"/> <jsp:directive.page import="curam.omega3.user.UserPreferences"/> <jsp:directive.page import="curam.util.client.jsp.JspUtil"/> <jsp:directive.page import="curam.omega3.util.CDEJResources"/> <jsp:directive.page import="curam.util.common.util.JavaScriptEscaper"/> <jsp:directive.page import="curam.util.common.util.xml.XMLEscaper"/> <jsp:directive.page isErrorPage="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" language="java" errorPage="/en/CuramErrorPage.do"/> <jsp:text> <![CDATA[<?xml version="1.0" encoding="UTF-8" ?>]]> </jsp:text> <jsp:text> <![CDATA[<!DOCTYPE html>]]> </jsp:text> <jsp:scriptlet> <![CDATA[ UserPreferences prefs=UserPreferencesFactory.getUserPreferences(session); String locale=prefs.getLocale().toString(); pageContext.setAttribute("pageLocale", locale); String ua=request.getHeader( "User-Agent" ); boolean isIE=( ua != null && ua.indexOf( "MSIE" ) != -1 ); pageContext.setAttribute("o3__serverURL", JspUtil.getServerRootURL()); ]]> </jsp:scriptlet> <curam:userPreferences localeCode="${pageScope.pageLocale}"/> <jsp:scriptlet> <![CDATA[ /** The resource with localized messages. */ final String WORD_FILE_EDIT_RESOURCES="curam.omega3.i18n.WordFileEdit"; /* check the activeX flag to override applet for IE is required */ String useActiveXString=CDEJResources.getConfigProperty( "curam.omega3.ApplicationConfiguration", "fileEditUseActiveXForMSIE"); /* default value is false in case the property is not set */ boolean useActiveX=Boolean.parseBoolean(useActiveXString); /* load the localizable messages */ final StringBuilder localizableMessages=new StringBuilder(); localizableMessages.append("curam.util.WordFileEdit.cantLoadControlMsg = \""); localizableMessages.append(CDEJResources.getProperty(WORD_FILE_EDIT_RESOURCES, "wfejs.cantloadcontrol.nonie")).append("\";\r"); localizableMessages.append("curam.util.WordFileEdit.cantLoadControlMsgIE = \""); localizableMessages.append(CDEJResources.getProperty(WORD_FILE_EDIT_RESOURCES, "wfejs.cantloadcontrol.ie")).append("\";\r"); localizableMessages.append("curam.util.WordFileEdit.cantSubmitMsg = \""); localizableMessages.append(CDEJResources.getProperty(WORD_FILE_EDIT_RESOURCES, "wfejs.cantsubmit")).append("\";\r"); localizableMessages.append("curam.util.WordFileEdit.noJavaInstalled = \""); localizableMessages.append(CDEJResources.getProperty(WORD_FILE_EDIT_RESOURCES, "wfejs.noJavaInstalled")).append("\";\r"); localizableMessages.append("curam.util.WordFileEdit.searchWindowTitlePrefix = \""); localizableMessages.append(CDEJResources.getProperty(WORD_FILE_EDIT_RESOURCES, "wfectl.search")).append("\";\r"); ]]> </jsp:scriptlet> <html dir="${htmlDirection}"> <head> <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/> <script src="CDEJ/jscript/deployJava.js">//dummy</script> <script type="text/javascript" src="CDEJ/jscript/dojotk/dojo/dojo.js" data-dojo-config="async:0,parseOnLoad:true,isDebug:false">//script content</script> <script type="text/javascript">
    <jsp:scriptlet>curam.util.client.jsp.JspUtil.outputJSModulePaths(pageContext);</jsp:scriptlet>
    </script> <script src="CDEJ/jscript/cdej-cm.js" type="text/javascript">//Comment</script> <script src="CDEJ/jscript/cdej.js" type="text/javascript">//Comment</script> <script type="text/javascript">
    	require(["curam/core-uim", "curam/util/WordFileEdit"]);
    
      /* write out the localizable messages */
    	<jsp:scriptlet>
    	<![CDATA[
    		out.print(localizableMessages.toString());
    		if (!useActiveX) {
    		  /* Override browser detection and use applet even for IE
    		  	 if required by the configuration flag.
    		   */
    		  out.print("curam.util.WordFileEdit.useApplet=true;");
    		}
    		]]>
    	</jsp:scriptlet>
    
    	if (curam.util.WordFileEdit.useApplet) {
      	dojo.mixin(curam.util.WordFileEdit.controlAttributes, {
          code: 'curam.util.tools.fileedit.WordIntegrationApplet', 
          codebase: "applet-lib",
          archive: "WordIntegrationApplet.jar, jacob-1.15-M4.jar, commons-codec-1.5.jar, commons-io-2.4.jar",
          width: 0,
          height: 0
      	});
    	}
    </script> <script type="text/javascript">
	 		/* populate parameters to the control */   	
       
	 		<jsp:scriptlet>
       <![CDATA[
				String controlId = request.getParameter("id");
				String documentField = request.getParameter("document-field");
				String detailsField = request.getParameter("details-field");
        
				out.print("jsControlId = curam.util.WordFileEdit.useApplet ? 'theApplet' : '"
            + JavaScriptEscaper.escapeText(controlId, true) + "';");
        out.print("dojo.mixin(curam.util.WordFileEdit.controlParameters, { id: jsControlId});");
        out.print("dojo.mixin(curam.util.WordFileEdit.controlParameters, { 'document-field': '"
            + JavaScriptEscaper.escapeText(documentField, true) + "'});");
        out.print("dojo.mixin(curam.util.WordFileEdit.controlParameters, { 'details-field': '"
            + JavaScriptEscaper.escapeText(detailsField, true) + "'});");

    /* localized strings for the control */
    
    /* The keys are listed here, because currently we have no way
     * of retrieving all key names from a resource file.
     */
    final String[] localizableStringKeys = new String[] {
        "wfectl.docname_existing",
        "wfectl.docname_new",
        "wfectl.search",
        "wfectl.custom",
        "wfectl.pasted",
        "wfectl.wordnotinstalled",
        "wfectl.loaded",
        "wfectl.oleerror",
        "wfectl.tempfile",
        "wfectl.coldnotloadfile",
        "wfectl.error",
        "wfectl.saved",
        "wfectl.badchar",
        "wfectl.1",
        "wfectl.2",
        "wfectl.3",
        "wfectl.4",
        "wfectl.5",
        "wfectl.6",
        "wfectl.7",
        "wfectl.10",
        "wfectl.11",
        "wfectl.12",
        "wfectl.13",
        "wfectl.14",
        "wfectl.15",
        "wfectl.16",
        "wfectl.17",
        "wfectl.18",
        "wfectl.19",
        "wfectl.20",
        "wfectl.21",
        "wfectl.22",
        "wfectl.23",
        "wfectl.24",
        "wfectl.26",
        "wfectl.27",
        "wfectl.28",
        "wfectl.29",
        "wfectl.empty.details",
        "Message.Using.IE",
        "Message.Using.Non.IE",
        "Message.Create.Temp.Word",
        "Message.Cannot.Delete.Temp.File",
        "Message.Load.Event",
        "Message.Unload.Event",
        "Message.Error.Uppercase",
        "Message.Error.Lowercase",
        "Message.Alert.Uppercase",
        "Message.Alert.Lowercase",
        "Message.Trace.Uppercase",
        "Message.Set.Doc.Closing",
        "Message.Set.Doc.Saving",
        "Message.Set.Main.Win.Closing",
        "Message.Set.Applet.Win.Closing",
        "Message.Set.Returning",
        "Message.Set.Returning.Error",
        "Message.Set.Doc.Open",
        "Message.Jacob.Installed",
        "Message.Attempting.Load",
        "Message.Create.Dir",
        "Message.Cannot.Create.Dir",
        "Message.Delete.DLL",
        "Message.Cannot.Delete.DLL",
        "Message.Create.DLL",
        "Message.File.Existed",
        "Message.Populate.DLL",
        "Message.System.Property",
        "Message.IO.Error",
        "Message.Not.Set.DLL.Path",
        "Message.Missing.Param",
        "Message.COM.Event",
        "Message.Evaluate.JavaScript",
        "Message.Cannot.Evaluate.JavaScript",
        "Message.Closing.Applet.IE.Win",
        "Message.Handler.Finished",
        "Message.Not.Implemented",
        "Message.Not.IE.Skipping.Win",
        "Message.Not.HML.Skipping.Win",
        "Message.Exam.Win",
        "Message.Parent.Win",
        "Message.ActiveX.Win",
        "Message.Doc.HTML",
        "Message.Doc.Not.HTML",
        "Message.Not.Implemented.NonIE",
        "Message.Disabled.Save.Event",
        "Message.Opening.Word",
        "Message.Expected.Save.Failure",
        "Message.Closing.Word",
        "Message.Closing.Control.Win",
        "Message.Leave.Control.Win.Open",
        "Message.Skip.Page",
        "Message.Cancel.Navigation",
        "Message.Close.To.Save.Doc",
        "Message.Save.Send.Server",
        "Message.Loading.Into.Textarea",
        "Message.Cancel.Save",
        "Message.Skip.Saving",
        "Message.Doc.Already.Saved",
        "Message.Cancel.Quit.Word",
        "Message.Return.To.Application",
        "Message.Unsaved.Doc",
        "Message.Save.To.Disk",
        "Message.Return.Save.Server",
        "Message.Cancel.Close.Event",
        "Message.Quit.Word",
        "Message.Return.App",
        "Message.Already.Return.App",
        "Message.Loading.Word.Textarea",
        "Message.Applet.IE.OnQuit",
        "Message.Closing.Down.Applet",
        "Messsage.Error.Reading.Property",
        "Message.Call.Ignored",
        "Message.Save.Active.Doc",
        "Message.Restore.Autosave",
        "Message.AutoSave.Restored",
        "Message.Closing.Down.MSWord",
        "Message.Ignoring.Quit.Request",
        "Message.Saving.AutoSave",
        "Message.Saving.AutoSave.Interval",
        "Message.Disabling.AutoSave",
        "Message.Autosave.Disabled",
        "Message.Changing.Username",
        "Message.Set.Username",
        "Message.Username.Valid",
        "Message.Restore.Username",
        "Message.Username.Restored",
        "Message.Autosave.Cannot.Restored",
        "Message.AutoSave.Cannot.Saved",
        "Message.Cannot.Disable.AutoSave",
        "Message.Error.Restore.Username"
    };
    
    StringBuilder joinedKeys = new StringBuilder();
    for (int i = 0; i < localizableStringKeys.length; i++) {
      final String key = localizableStringKeys[i];
      out.print("dojo.mixin(curam.util.WordFileEdit.controlParameters, {'" + key + "': '"
          + CDEJResources.getProperty(WORD_FILE_EDIT_RESOURCES, key).replace("'", "\\\'")
          + "'});");
      joinedKeys.append(key).append(',');
    }
    joinedKeys.deleteCharAt(joinedKeys.length() - 1);
    out.print("dojo.mixin(curam.util.WordFileEdit.controlParameters, { _propertyKeys: '"
        + joinedKeys.toString() + "'});");
    ]]>
    </jsp:scriptlet>
    /* END of localized strings for the control */
    </script> <script type="text/javascript">
    /* The runApplet() function must be called before the page has finished loading! */
    	if (curam.util.WordFileEdit.useApplet) {
  	    curam.util.WordFileEdit.runApplet(jsControlId);
    	}

      dojo.ready(function() {
        curam.util.WordFileEdit.initialize(jsControlId);
    	});
    </script> <jsp:scriptlet> <![CDATA[ out.print("<title>" + CDEJResources.getProperty(WORD_FILE_EDIT_RESOURCES, "wfejsp.title.prefix") + " " + new String(XMLEscaper.escapeXML(controlId)).substring(4,8) + "</title>\n"); ]]> </jsp:scriptlet> <style type="text/css">    
      body {
      background-color:#e6ecf5;
      margin-left:18px;
      font-style:normal;
      font-family:Tahoma;
      font-size:80%;
      line-height:1.6em;}
    </style> </head> <body> <jsp:scriptlet> <![CDATA[ out.print("<span id=\"statustext\">" + CDEJResources.getProperty(WORD_FILE_EDIT_RESOURCES, "wfejsp.statustext") + "</br>"); out.print(CDEJResources.getProperty(WORD_FILE_EDIT_RESOURCES, "wfejsp.message.heading") + "<br>" + CDEJResources.getProperty(WORD_FILE_EDIT_RESOURCES, "wfejsp.message.text") + "<p>&nbsp;<p></span>\n"); if (isIE && useActiveX) { /* output the object tag */ String codebase = "CDEJ/active-x/word-file-edit.cab#version=6,0,0,0"; String classid = "CLSID:35737493-2F9F-49B0-8A6A-6F93111B87DB"; String safeControlIdForXML = XMLEscaper.escapeXML(controlId); out.print("<object codebase=\"" + codebase + "\"" + " classid=\"" + classid + "\"" + " name=\"" + safeControlIdForXML + "\"" + " id=\"" + safeControlIdForXML + "\">"); final JspUtil util = new JspUtil(); out.print(util.getObjectTagParam("id", controlId)); out.print(util.getObjectTagParam("document-field", documentField)); out.print(util.getObjectTagParam("details-field", detailsField)); for (int i = 0; i < localizableStringKeys.length; i++) { final String key = localizableStringKeys[i]; out.print(util.getObjectTagParam(key, CDEJResources.getProperty( WORD_FILE_EDIT_RESOURCES, key))); } out.print(util.getObjectTagParam( "_propertyKeys", joinedKeys.toString())); out.print("</object>"); }]]> </jsp:scriptlet> </body> </html> </jsp:root>