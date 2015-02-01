<?xml version="1.0" encoding="UTF-8"?>
 
<ac:application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ac="http://www.curamsoftware.com/curam/util/client/application-config" id="CITWSAPP" mode="external">
  <ac:landing-page title="landing.title" icon="landing.logo" page-id="CitizenWorkspace_landingPage"/>

  <ac:navigation id="StandardUser" width="navbar.width"/>
  
  <ac:navigation id="CitizenAccount" width="navbar.width"/>
  
  <ac:banner-menu type="mega" title="mega.title">
      
    <ac:menu-item id="screening" title="menu.screening.title" text="menu.screening.text" icon="menu.screening.icon" page-id="PagePlayerResolveWrapper">
      <ac:param name="page" value="SetupScreening" description=""/>
    </ac:menu-item>  
    
   <!-- <ac:menu-item id="intake" title="menu.intake.title" text="menu.intake.text" icon="menu.intake.icon" page-id="CitizenWorkspace_apply"/>

    <ac:menu-item id="triage" title="menu.triage.title" text="menu.triage.text" icon="menu.triage.icon" page-id="PagePlayerResolveWrapper">
      <ac:param name="page" value="SetupTriage" description=""/>
    </ac:menu-item>  --> 

    <ac:menu-item id="screening1" title="menu.screening.title1" text="menu.screening.text1" icon="menu.screening.icon"  page-id="MOLSADisplayDocuments">
   </ac:menu-item>
  
  </ac:banner-menu>
  
  <ac:banner-menu type="print" title="print.title"/>
  
  <ac:banner-menu type="help" title="menu.help.title">
  
    <ac:menu-item id="contactUs" title="menu.contactus.title" text="menu.contactus.text" icon="menu.contactus.icon" page-id="CitizenWorkspace_ContactUs"/>
    
    <ac:menu-item id="faq" title="menu.faq.title" text="menu.faq.text" icon="menu.faq.icon" page-id="CitizenWorkspace_FAQ"/>
    
  </ac:banner-menu>

  <ac:banner-menu type="person" title="person.title" page-id="CitizenWorkspace_userHomeResolver">      
    
    <ac:menu-item id="p1" title="menu.resetpassword.title" text="menu.resetpassword.text" page-id="PagePlayerWrapper">
      <ac:param name="page" value="ResetPasswordExistingPassword" description=""/>
    </ac:menu-item>
    
    <ac:menu-item id="logout" title="menu.logout.title" text="menu.logout.text" page-id="LogoutWrapper"/>
  </ac:banner-menu>
  
</ac:application>