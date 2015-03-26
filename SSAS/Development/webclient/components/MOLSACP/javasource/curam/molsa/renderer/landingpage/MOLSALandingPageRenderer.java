package curam.molsa.renderer.landingpage;

import curam.molsa.renderer.util.XmlTools;
import curam.ieg.player.PlayerUtils;
import curam.omega3.util.CDEJResources;
import curam.util.client.BidiUtils;
import curam.util.client.ClientException;
import curam.util.client.domain.render.view.AbstractViewRenderer;
import curam.util.client.model.ComponentBuilderFactory;
import curam.util.client.model.Container;
import curam.util.client.model.ContainerBuilder;
import curam.util.client.model.Field;
import curam.util.client.view.RendererContext;
import curam.util.client.view.RendererContract;
import curam.util.common.path.DataAccessException;
import curam.util.common.plugin.PlugInException;
import curam.util.dom.html2.HTMLUtils;
import curam.util.exception.AppRuntimeException;
import javax.xml.xpath.XPathExpressionException;
import org.w3c.dom.Document;
import org.w3c.dom.DocumentFragment;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import com.ibm.trl.acf.api.ActiveContentProcessor;
import com.ibm.trl.acf.api.ActiveContentProcessorException;
import com.ibm.trl.acf.api.ActiveContentProcessorFactory;
import com.ibm.trl.acf.api.ContentTypeNotSupportedException;
import com.ibm.trl.acf.lookup.ActiveContentProcessorFactoryHome;
import java.io.IOException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MOLSALandingPageRenderer extends AbstractViewRenderer
{
  private static final String propertiesFileName = "LandingPage";

  public void render(Field field, DocumentFragment fragment, RendererContext context, RendererContract contract)
    throws ClientException, DataAccessException, PlugInException
  {
    boolean renderLoginPanel = false;
    boolean triageEnabled = false;
    boolean hcEnabled = false;

    Document rendererFieldDocument = XmlTools.getRendererFieldDocument(field, context);

    String loggedInUserXPathExpression = "/landing-page/logged-in-user";
    String displayTriageXPathExpression = "/landing-page/display-triage";
    String displayContrastSelectorXPathExpression = "/landing-page/display-high-contrast";
    try
    {
      boolean externalLogonEnabled = Boolean.valueOf(CDEJResources.getApplicationDataProperty("curam.citizenworkspace.use.external.login.page")).booleanValue();

      NodeList loggedInUserlist = XmlTools.getXMLNodeList("/landing-page/logged-in-user", rendererFieldDocument);

      boolean loggedInUser = new Boolean(loggedInUserlist.item(0).getTextContent()).booleanValue();

      renderLoginPanel = (!loggedInUser) && (!externalLogonEnabled);
      renderLoginPanel = false;
      
      NodeList displayTriagelist = XmlTools.getXMLNodeList("/landing-page/display-triage", rendererFieldDocument);

      triageEnabled = new Boolean(displayTriagelist.item(0).getTextContent()).booleanValue();

      NodeList displayHighContrastlist = XmlTools.getXMLNodeList("/landing-page/display-high-contrast", rendererFieldDocument);

      hcEnabled = new Boolean(displayHighContrastlist.item(0).getTextContent()).booleanValue();
    }
    catch (XPathExpressionException e)
    {
      throw new AppRuntimeException(e);
    }

    Element landingPageContainer = fragment.getOwnerDocument().createElement("div");

    landingPageContainer.setAttribute("id", "lp-container");
    landingPageContainer.setAttribute("class", "lp-container");
    attachWaiAriaAttr(landingPageContainer, "Main Container");

    fragment.appendChild(landingPageContainer);

    Element landingPageBannerWrapper = fragment.getOwnerDocument().createElement("div");

    landingPageBannerWrapper.setAttribute("id", "lp-banner-wrapper");
    landingPageBannerWrapper.setAttribute("class", "lp-banner-wrapper");
    attachWaiAriaAttr(landingPageBannerWrapper, "Banner Wrapper");

    landingPageContainer.appendChild(landingPageBannerWrapper);

    Element landingPageBanner = fragment.getOwnerDocument().createElement("div");

    landingPageBanner.setAttribute("id", "lp-banner");
    landingPageBanner.setAttribute("class", "lp-banner");
    attachWaiAriaAttr(landingPageBanner, "Banner");

    landingPageBannerWrapper.appendChild(landingPageBanner);

    renderBannerText(field, landingPageBanner, context, contract, hcEnabled);

    Element actionsContainer = fragment.getOwnerDocument().createElement("div");

    actionsContainer.setAttribute("id", "lp-actions-container");
    actionsContainer.setAttribute("class", "lp-actions-container");
    attachWaiAriaAttr(actionsContainer, "Action Container");

    landingPageContainer.appendChild(actionsContainer);

    Element loginPanel = fragment.getOwnerDocument().createElement("div");

    HTMLUtils.appendComment(loginPanel, "comment");

    attachWaiAriaAttr(loginPanel, "Login Panel");

    if (renderLoginPanel)
    {
      loginPanel.setAttribute("dojoType", "cwtk.widget.FragmentPane");

      loginPanel.setAttribute("uim", "CitizenWorkspace_loginFragment");

      loginPanel.setAttribute("id", "loginPane");
    }

    Element actionLinksContainer = fragment.getOwnerDocument().createElement("div");

    actionLinksContainer.setAttribute("id", "lp-action-links-container");
    attachWaiAriaAttr(actionLinksContainer, "Action Link Container");

    if (renderLoginPanel)
      actionLinksContainer.setAttribute("class", "lp-action-links-container");
    else {
      actionLinksContainer.setAttribute("class", "lp-action-links-container-no-login");
    }

    Element govSectionContainer = fragment.getOwnerDocument().createElement("div");

    govSectionContainer.setAttribute("id", "gov-section-container");
    attachWaiAriaAttr(govSectionContainer, "Section Container");

    if (renderLoginPanel)
      govSectionContainer.setAttribute("class", "section-container");
    else {
      govSectionContainer.setAttribute("class", "section-container-no-login");
    }

    renderGovBenefitsInfo(govSectionContainer, context, contract);

    actionLinksContainer.appendChild(govSectionContainer);

    if (triageEnabled)
    {
      Element commSectionContainer = fragment.getOwnerDocument().createElement("div");

      attachWaiAriaAttr(commSectionContainer, "Section Container");

      commSectionContainer.setAttribute("id", "community-section-container");
      if (renderLoginPanel)
        commSectionContainer.setAttribute("class", "section-container");
      else {
        commSectionContainer.setAttribute("class", "section-container-no-login");
      }

      renderCommunityServicesInfo(commSectionContainer, context, contract);

      actionLinksContainer.appendChild(commSectionContainer);
    }

    Element commSectionContainer = fragment.getOwnerDocument().createElement("div");

    attachWaiAriaAttr(commSectionContainer, "Section Container");

    commSectionContainer.setAttribute("id", "community-section-container");
    if (renderLoginPanel)
      commSectionContainer.setAttribute("class", "section-container");
    else {
      commSectionContainer.setAttribute("class", "section-container-no-login");
    }

    renderDocumentsInfo(commSectionContainer, context, contract);

    actionLinksContainer.appendChild(commSectionContainer);
    
    if (renderLoginPanel) {
      actionsContainer.appendChild(loginPanel);
    }

    actionsContainer.appendChild(actionLinksContainer);
  }
 
  
  private void renderBannerText(Field field, Element landingPageBanner, RendererContext context, RendererContract contract, boolean displayHCSelector)
    throws ClientException, DataAccessException, PlugInException
  {
    if (displayHCSelector)
    {
      Element contrastModePanel = landingPageBanner.getOwnerDocument().createElement("div");

      HTMLUtils.appendComment(contrastModePanel, "Contrast Mode Selector");
      attachWaiAriaAttr(contrastModePanel, "Contrast Mode Selector");

      contrastModePanel.setAttribute("dojoType", "cwtk.widget.FragmentPane");
      contrastModePanel.setAttribute("uim", "CitizenWorkspace_contrastSelectorFragment");

      contrastModePanel.setAttribute("id", "contrastModeSelector");
      landingPageBanner.appendChild(contrastModePanel);
    }
    Element languageDiv = landingPageBanner.getOwnerDocument().createElement("div");

    Element headerLine1 = landingPageBanner.getOwnerDocument().createElement("h2");

    headerLine1.setAttribute("class", "lp-welcome-line1");
    headerLine1.setAttribute("id", "lp-welcome-line1");
/*
    DocumentFragment langPickerFragment = landingPageBanner.getOwnerDocument().createDocumentFragment();

    renderLangPicker(field, langPickerFragment, context, contract);
    landingPageBanner.appendChild(langPickerFragment);
    */

    ContainerBuilder descBuilder = ComponentBuilderFactory.createClusterBuilder();

    descBuilder.setStyle(context.getStyle("rich-text"));
    String titlePart1 = PlayerUtils.getProperty("LandingPage", "Welcome.Message.Line1", context);

    String filteredTitlePart1 = filterACF(titlePart1);
    if (!BidiUtils.isBidi())
      descBuilder.setDescription(filteredTitlePart1);
    else {
      descBuilder.setDescription(BidiUtils.addEmbedingUCC(filteredTitlePart1));
    }
    descBuilder.setParameter("wrap-content", "true");

    Container descRichText = (Container)descBuilder.getComponent();
    DocumentFragment descFragment = landingPageBanner.getOwnerDocument().createDocumentFragment();

    context.render(descRichText, descFragment, contract);
    headerLine1.setTextContent(filteredTitlePart1);

    landingPageBanner.appendChild(languageDiv);

    landingPageBanner.appendChild(headerLine1);

    Element headerLine2 = landingPageBanner.getOwnerDocument().createElement("h2");

    headerLine2.setAttribute("class", "lp-welcome-line2");
    headerLine2.setAttribute("id", "lp-welcome-line2");

    ContainerBuilder descBuilder2 = ComponentBuilderFactory.createClusterBuilder();

    descBuilder2.setStyle(context.getStyle("rich-text"));

    String titlePart2 = PlayerUtils.getProperty("LandingPage", "Welcome.Message.Line2", context);

    String filteredTitlePart2 = filterACF(titlePart2);
    if (!BidiUtils.isBidi())
      descBuilder2.setDescription(filteredTitlePart2);
    else {
      descBuilder2.setDescription(BidiUtils.addEmbedingUCC(filteredTitlePart2));
    }
    descBuilder2.setParameter("wrap-content", "true");

    Container descRichText2 = (Container)descBuilder2.getComponent();
    DocumentFragment descFragment2 = landingPageBanner.getOwnerDocument().createDocumentFragment();

    context.render(descRichText2, descFragment2, contract);

    headerLine2.setTextContent(filteredTitlePart2);
    landingPageBanner.appendChild(headerLine2);

    Element headerLine3 = landingPageBanner.getOwnerDocument().createElement("h2");

    headerLine3.setAttribute("class", "lp-welcome-line3");
    headerLine3.setAttribute("id", "lp-welcome-line3");

    String titlePart3 = PlayerUtils.getProperty("LandingPage", "Welcome.Message.Line3", context);

    ContainerBuilder descBuilder3 = ComponentBuilderFactory.createClusterBuilder();

    descBuilder3.setStyle(context.getStyle("rich-text"));

    String filteredTitlePart3 = filterACF(titlePart3);
    if (!BidiUtils.isBidi())
      descBuilder3.setDescription(filteredTitlePart3);
    else {
      descBuilder3.setDescription(BidiUtils.addEmbedingUCC(filteredTitlePart3));
    }
    descBuilder3.setParameter("wrap-content", "true");

    Container descRichText3 = (Container)descBuilder3.getComponent();
    DocumentFragment descFragment3 = landingPageBanner.getOwnerDocument().createDocumentFragment();

    context.render(descRichText3, descFragment3, contract);
    headerLine3.setTextContent(filteredTitlePart3);
    landingPageBanner.appendChild(headerLine3);
  }

  
	private void renderDocumentsInfo(Element commSectionContainer,
			RendererContext context, RendererContract contract)
			throws PlugInException, ClientException, DataAccessException {
		Element header = commSectionContainer.getOwnerDocument().createElement(
				"h2");

		attachWaiAriaAttr(header, "Header");
		header.setAttribute("class", "lp-h2");

		String title = PlayerUtils.getProperty("LandingPage", "Document.title",
				context);

		if (!BidiUtils.isBidi())
			header.setTextContent(title);
		else {
			header.setTextContent(BidiUtils.addEmbedingUCC(title));
		}
		commSectionContainer.appendChild(header);

		ContainerBuilder descBuilder = ComponentBuilderFactory
				.createClusterBuilder();

		descBuilder.setStyle(context.getStyle("rich-text"));

		String description = PlayerUtils.getProperty("LandingPage",
				"Document.Description", context);

		String filteredDescription = filterACF(description);
		if (!BidiUtils.isBidi())
			descBuilder.setDescription(filteredDescription);
		else {
			descBuilder.setDescription(BidiUtils
					.addEmbedingUCC(filteredDescription));
		}
		descBuilder.setParameter("wrap-content", "true");
		Container descRichText = (Container) descBuilder.getComponent();
		DocumentFragment descFragment = commSectionContainer.getOwnerDocument()
				.createDocumentFragment();

		context.render(descRichText, descFragment, contract);

		commSectionContainer.appendChild(descFragment);

		Element buttonDiv = commSectionContainer.getOwnerDocument()
				.createElement("div");

		attachWaiAriaAttr(buttonDiv, "Button Section");
		commSectionContainer.appendChild(buttonDiv);

		String buttonText = PlayerUtils.getProperty("LandingPage",
				"Document.Button.Text", context);

		String buttonAltText = PlayerUtils.getProperty("LandingPage",
				"Document.Button.Alt.Text", context);

		String htmlDirection = PlayerUtils
				.getHtmlPresentationDirection(getLocale());

		boolean isRTL = "rtl".equals(htmlDirection);

		Element triageButtonWrapper = commSectionContainer.getOwnerDocument()
				.createElement("div");

		attachWaiAriaAttr(commSectionContainer, "Document Button");
		triageButtonWrapper.setAttribute(
				"style",
				new StringBuilder().append("float: ")
						.append(isRTL ? "right" : "left").toString());

		Element triageButton = commSectionContainer.getOwnerDocument()
				.createElement("span");

		attachWaiAriaAttr(triageButton, "Document Button");
		HTMLUtils.appendComment(triageButton, "comment");

		triageButton.setAttribute("data-dojo-type", "dijit/form/Button");
		triageButton.setAttribute("label", buttonText);
		triageButton.setAttribute("title", buttonAltText);
		triageButton.setAttribute("onClick",
				"displayContent({pageID:'MOLSADisplayDocuments'})");

		triageButton.setAttribute("class", "idxSpecialButton");

		if (BidiUtils.isBidi()) {
			BidiUtils.setTextDirForElement(triageButton);
		}
		triageButtonWrapper.appendChild(triageButton);

		buttonDiv.appendChild(triageButtonWrapper);
	}
  
  
  
  
  private void renderCommunityServicesInfo(Element commSectionContainer, RendererContext context, RendererContract contract)
    throws PlugInException, ClientException, DataAccessException
  {
    Element header = commSectionContainer.getOwnerDocument().createElement("h2");

    attachWaiAriaAttr(header, "Header");
    header.setAttribute("class", "lp-h2");

    String title = PlayerUtils.getProperty("LandingPage", "Services.Title", context);

    if (!BidiUtils.isBidi())
      header.setTextContent(title);
    else {
      header.setTextContent(BidiUtils.addEmbedingUCC(title));
    }
    commSectionContainer.appendChild(header);

    ContainerBuilder descBuilder = ComponentBuilderFactory.createClusterBuilder();

    descBuilder.setStyle(context.getStyle("rich-text"));

    String description = PlayerUtils.getProperty("LandingPage", "Services.Description", context);

    String filteredDescription = filterACF(description);
    if (!BidiUtils.isBidi())
      descBuilder.setDescription(filteredDescription);
    else {
      descBuilder.setDescription(BidiUtils.addEmbedingUCC(filteredDescription));
    }
    descBuilder.setParameter("wrap-content", "true");
    Container descRichText = (Container)descBuilder.getComponent();
    DocumentFragment descFragment = commSectionContainer.getOwnerDocument().createDocumentFragment();

    context.render(descRichText, descFragment, contract);

    commSectionContainer.appendChild(descFragment);

    Element buttonDiv = commSectionContainer.getOwnerDocument().createElement("div");

    attachWaiAriaAttr(buttonDiv, "Button Section");
    commSectionContainer.appendChild(buttonDiv);

    String buttonText = PlayerUtils.getProperty("LandingPage", "Triage.Button.Text", context);

    String buttonAltText = PlayerUtils.getProperty("LandingPage", "Triage.Button.Alt.Text", context);

    String htmlDirection = PlayerUtils.getHtmlPresentationDirection(getLocale());

    boolean isRTL = "rtl".equals(htmlDirection);

    Element triageButtonWrapper = commSectionContainer.getOwnerDocument().createElement("div");

    attachWaiAriaAttr(commSectionContainer, "Triage Button");
    triageButtonWrapper.setAttribute("style", new StringBuilder().append("float: ").append(isRTL ? "right" : "left").toString());

    Element triageButton = commSectionContainer.getOwnerDocument().createElement("span");

    attachWaiAriaAttr(triageButton, "Triage Button");
    HTMLUtils.appendComment(triageButton, "comment");

    triageButton.setAttribute("data-dojo-type", "dijit/form/Button");
    triageButton.setAttribute("label", buttonText);
    triageButton.setAttribute("title", buttonAltText);
    triageButton.setAttribute("onClick", "displayContent({pageID:'PagePlayerResolveWrapper', param: [{paramKey: \"page\", paramValue: \"SetupTriage\"}]})");

    triageButton.setAttribute("class", "idxSpecialButton");

    if (BidiUtils.isBidi()) {
      BidiUtils.setTextDirForElement(triageButton);
    }
    triageButtonWrapper.appendChild(triageButton);

    buttonDiv.appendChild(triageButtonWrapper);
  }

  private void renderGovBenefitsInfo(Element govSectionContainer, RendererContext context, RendererContract contract)
    throws PlugInException, ClientException, DataAccessException
  {
    Element header = govSectionContainer.getOwnerDocument().createElement("h2");

    attachWaiAriaAttr(header, "Header");
    header.setAttribute("class", "lp-h2");

    String title = PlayerUtils.getProperty("LandingPage", "Government.Benefits.Title", context);

    if (!BidiUtils.isBidi())
      header.setTextContent(title);
    else {
      header.setTextContent(BidiUtils.addEmbedingUCC(title));
    }
    govSectionContainer.appendChild(header);

    ContainerBuilder descBuilder = ComponentBuilderFactory.createClusterBuilder();

    descBuilder.setStyle(context.getStyle("rich-text"));
    String description = PlayerUtils.getProperty("LandingPage", "Government.Benefits.Description", context);

    String filteredDescription = filterACF(description);
    if (!BidiUtils.isBidi())
      descBuilder.setDescription(filteredDescription);
    else {
      descBuilder.setDescription(BidiUtils.addEmbedingUCC(filteredDescription));
    }
    descBuilder.setParameter("wrap-content", "true");
    Container descRichText = (Container)descBuilder.getComponent();
    DocumentFragment descFragment = govSectionContainer.getOwnerDocument().createDocumentFragment();

    context.render(descRichText, descFragment, contract);
    govSectionContainer.appendChild(descFragment);

    Element buttonDiv = govSectionContainer.getOwnerDocument().createElement("div");

    attachWaiAriaAttr(buttonDiv, "Button Section");
    govSectionContainer.appendChild(buttonDiv);

    String screeningButtonText = PlayerUtils.getProperty("LandingPage", "Screening.Button.Text", context);

    String screeningButtonAltText = PlayerUtils.getProperty("LandingPage", "Screening.Button.Alt.Text", context);

    Element screeningButtonWrapper = govSectionContainer.getOwnerDocument().createElement("div");

    String htmlDirection = PlayerUtils.getHtmlPresentationDirection(getLocale());

    boolean isRTL = "rtl".equals(htmlDirection);
    attachWaiAriaAttr(govSectionContainer, "Screening Buttons");
    screeningButtonWrapper.setAttribute("style", new StringBuilder().append("float: ").append(isRTL ? "right" : "left").toString());

    Element screeningButton = govSectionContainer.getOwnerDocument().createElement("span");

    attachWaiAriaAttr(screeningButton, "Screening Button");
    HTMLUtils.appendComment(screeningButton, "comment");

    screeningButton.setAttribute("data-dojo-type", "dijit/form/Button");
    screeningButton.setAttribute("label", screeningButtonText);
    screeningButton.setAttribute("title", screeningButtonAltText);
    screeningButton.setAttribute("onClick", "displayContent({pageID:'PagePlayerResolveWrapper', param: [{paramKey: \"page\", paramValue: \"SetupScreening\"}]})");

    screeningButton.setAttribute("class", "idxSpecialButton");

    buttonDiv.appendChild(screeningButtonWrapper);

    screeningButtonWrapper.appendChild(screeningButton);

    String applyButtonText = PlayerUtils.getProperty("LandingPage", "Apply.Button.Text", context);

    String applyButtonAltText = PlayerUtils.getProperty("LandingPage", "Apply.Button.Alt.Text", context);

    Element appplyButtonWrapper = govSectionContainer.getOwnerDocument().createElement("div");

    attachWaiAriaAttr(appplyButtonWrapper, "Apply Button Wrapper");
    appplyButtonWrapper.setAttribute("style", new StringBuilder().append("float: ").append(isRTL ? "right" : "left").toString());

    Element applyButton = govSectionContainer.getOwnerDocument().createElement("span");

    attachWaiAriaAttr(applyButton, "Apply Button");
    HTMLUtils.appendComment(applyButton, "comment");

    applyButton.setAttribute("data-dojo-type", "dijit/form/Button");
    applyButton.setAttribute("label", applyButtonText);
    applyButton.setAttribute("title", applyButtonAltText);
    applyButton.setAttribute("onClick", "displayContent({pageID:'PagePlayerResolveWrapper', param: [{paramKey: \"page\", paramValue: \"SetupIntake\"}]})");

    applyButton.setAttribute("class", "idxSpecialButton");

    // buttonDiv.appendChild(appplyButtonWrapper);

    // appplyButtonWrapper.appendChild(applyButton);

    if (BidiUtils.isBidi()) {
      BidiUtils.setTextDirForElement(screeningButton);
      BidiUtils.setTextDirForElement(applyButton);
    }
  }

  private void renderLangPicker(Field field, DocumentFragment fragment, RendererContext context, RendererContract contract)
    throws ClientException, DataAccessException, PlugInException
  {
    Element languagePickerDiv = fragment.getOwnerDocument().createElement("div");

    languagePickerDiv.setAttribute("class", "lp-welcome-langPicker");
    languagePickerDiv.setAttribute("dojoType", "cwtk.widget.FragmentPane");
    languagePickerDiv.setAttribute("uim", "CitizenWorkspace_langSelectFragment");

    languagePickerDiv.setAttribute("id", "langSelectPane");
    attachWaiAriaAttr(languagePickerDiv, "Language Picker");
    HTMLUtils.appendNbsp(languagePickerDiv);

    fragment.appendChild(languagePickerDiv);
  }
  
	public static void attachWaiAriaAttr(Element element, String label)
			throws ClientException, DataAccessException {
		element.setAttribute("role", "region");
		element.setAttribute("aria-label", label);
	}
	
	  public static String filterACF(String unfilteredText)
	  {
	    if (null == unfilteredText) {
	      return unfilteredText;
	    }

	    String filteredText = new String();
	    try
	    {
	      ActiveContentProcessorFactory factory = ActiveContentProcessorFactoryHome.getActiveContentProcessorFactory();

	      Properties properties = new Properties();

	      properties.put(ActiveContentProcessorFactory.PROPERTY_USE_ANNOTATION, "true");

	      ActiveContentProcessor processor = factory.getActiveContentProcessor("text/html", properties);

	      String encoding = "UTF-8";

	      filteredText = processor.process(unfilteredText, encoding);

	      if (filteredText.trim().length() != unfilteredText.trim().length()) {
	        String malicious = processor.validate(unfilteredText, encoding);

	        if (malicious != null) {
	          Logger.getAnonymousLogger().log(Level.SEVERE, "Malicious code filtered: \"" + malicious + "\" from string \"" + unfilteredText + "\"");
	        }

	      }

	    }
	    catch (ContentTypeNotSupportedException e)
	    {
	      Logger.getAnonymousLogger().log(Level.WARNING, e.getMessage());
	    }
	    catch (ActiveContentProcessorException e) {
	      Logger.getAnonymousLogger().log(Level.WARNING, e.getMessage());
	    }
	    catch (ClassNotFoundException e) {
	      Logger.getAnonymousLogger().log(Level.WARNING, e.getMessage());
	    }
	    catch (InstantiationException e) {
	      Logger.getAnonymousLogger().log(Level.WARNING, e.getMessage());
	    }
	    catch (IllegalAccessException e) {
	      Logger.getAnonymousLogger().log(Level.WARNING, e.getMessage());
	    }
	    catch (IOException e) {
	      Logger.getAnonymousLogger().log(Level.WARNING, e.getMessage());
	    }

	    return filteredText;
	  }
	
}