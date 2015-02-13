<?xml version="1.0" encoding="UTF-8"?>

<ac:application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns:ac="http://www.curamsoftware.com/curam/util/client/application-config"
 id="MOLSASUAPP"
 logo="MolsaSupervisorApp.logo"
 title="MolsaSupervisorApp.title"
 subtitle="MolsaSupervisorApp.subtitle"
 user-message="MolsaSupervisorApp.UserMessage">

  <ac:application-menu>
    <ac:preferences title="preferences.title"/>
    <ac:help title="help.title"/>
    <ac:logout title="logout.title"/>
  </ac:application-menu>

  <ac:application-search default-search-page="Organization_resolveApplicationSearch" initial-text="Application.Search.InitialText"/>

  <ac:section-ref id="MOLSASUPERAPPHomeSection"/>
  <ac:section-ref id="MOLSASUPERAPPSection"/>
  <ac:section-ref id="DefaultAppInboxSection"/>
  <ac:section-ref id="DefaultAppCalendarSection"/>
  
</ac:application>