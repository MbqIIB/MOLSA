<?xml version="1.0" encoding="ISO-8859-1"?>

<ac:application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns:ac="http://www.curamsoftware.com/curam/util/client/application-config"
 id="MOLSAMAPP"
 logo="MOLSAMAPP.logo"
 title="MOLSAMAPP.title"
 subtitle="MOLSAMAPP.subtitle"
 user-message="MOLSAMAPP.UserMessage">

  <ac:application-menu>
    <ac:preferences title="preferences.title" />
    <ac:help title="help.title" />
    <ac:logout title="logout.title"/>
  </ac:application-menu>

 <ac:application-search default-search-page="Intake_resolveQuickSearch" initial-text="Application.Search.InitialText"/>

  <ac:section-ref id="MOLSAMAPPHomeSection"/>
  <ac:section-ref id="MOLSAMAPPWorkspaceSection"/>
  <ac:section-ref id="DefaultAppInboxSection"/>
  <ac:section-ref id="DefaultAppCalendarSection"/>
  
</ac:application>