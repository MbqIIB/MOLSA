<!--
Copyright 2002-2014 Curam Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Curam
Software, Ltd. ("Confidential Information"). You shall not disclose such
Confidential Information and shall use it only in accordance with the terms
of the license agreement you entered into with Curam Software.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:curam="http://www.curamsoftware.com/curam"
  xmlns:jsp="http://java.sun.com/JSP/Page"
  xmlns:c="http://java.sun.com/jsp/jstl/core"
  xmlns:cing="http://www.curamsoftware.com/curam/jde/client/curam-ng">

  <xsl:output method="xml" indent="no" omit-xml-declaration="no" />

  <xsl:strip-space elements="*" />

  <!--
    The XML data processed by this stylesheet is in XIM format. However,
    the stylesheet may be presented with a single XIM document with a
    "PAGE" root element or multiple XIM documents within a "_PAGES" root
    element containing multiple "PAGE" elements. In the latter case, the
    "jsp:root" elements created will be split into separate documents
    later. The consequences of this are that keys and XPath expressions
    must allow for the presence of other "PAGE" elements within the document.
  -->

  <xsl:param name="preview" />
  <xsl:param name="preview-fail-on-error" />
  <xsl:param name="package-prefix" />
  <xsl:param name="static-content-server-url" />
  <xsl:param name="help-node" />
  <xsl:param name="list-sort-anchor-spantext" />
  <xsl:param name="list-header-detailsrow-spantext" />
  <xsl:param name="list-header-actions-spantext" />
  <xsl:param name="list-header-singleselect-spantext" />
  <xsl:param name="curam-cluster-toggle-spantext" />
  
  <xsl:variable name="image-domains"
    select="document('project:WebContent/WEB-INF/CDEJ/config/ImageMapConfig.xml')
              /map/domain/@name" />
  <xsl:variable name="curam-config"
    select="document('project:WebContent/WEB-INF/curam-config.xml')/APP_CONFIG"/>

  <xsl:variable name="error-page-id"
    select="$curam-config/ERROR_PAGE/@PAGE_ID" />
  
  <!--
  This feature is obsolete. Quickly disabled by ensuring comparison never matches.
  -->
  <xsl:variable name="is-client-validation"
    select="$curam-config/CLIENT_JAVASCRIPT_VALIDATIONS_XXDISABLEDXX = 'true'" />

  <xsl:variable name="clear-icon-multiple"
    select="$curam-config/MULTIPLE_POPUP_DOMAINS/CLEAR_TEXT_IMAGE" />
  <xsl:variable name="clear-icon-single"
    select="$curam-config/POPUP_PAGES/CLEAR_TEXT_IMAGE" />

  <xsl:variable name="pop-up-domains"
    select="$curam-config/POPUP_PAGES/POPUP_PAGE/DOMAIN" />
  <xsl:variable name="multiple-pop-up-domains"
    select="$curam-config/MULTIPLE_POPUP_DOMAINS/MULTIPLE_POPUP_DOMAIN/DOMAIN"/>
  <xsl:variable name="pop-up-domain-names"
    select="$pop-up-domains/text() | $multiple-pop-up-domains/text()" />
  <xsl:variable name="multiple-select-domain-names"
    select="$curam-config/MULTIPLE_SELECT/DOMAIN[@MULTIPLE = 'true']/@NAME" />
  <xsl:variable name="v6-theme-enabled" select="true()" />

  <!--
  This was to disable action set images for the "classic" theme and was set from
  ENABLE_ACTION_SET_IMAGES in curam-config.xml. That setting is now "deprecated"
  for V6. For now, we explicitly set it to "false". Eventually this code will
  have to be removed.
  -->
  <xsl:variable name="action-set-images-enabled" select="'false'" />

  <xsl:variable name="collapsible-clusters-enabled">
    <xsl:choose>
      <!--
        When the configuration setting has not been specified, the default is
        to have collapsible clusters enabled.
      -->
      <xsl:when test="not($curam-config/ENABLE_COLLAPSIBLE_CLUSTERS)">
        <xsl:text>true</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$curam-config/ENABLE_COLLAPSIBLE_CLUSTERS" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <xsl:variable name="colon">
    <xsl:if test="$curam-config/APPEND_COLON = 'true'">
      <xsl:text>:</xsl:text>
    </xsl:if>
  </xsl:variable>

  <!-- Special page style names used by this stylesheet. -->
  <xsl:variable name="duim-host-style"
                select="'curam-util-client::dynamic-uim-host'"/>
  <xsl:variable name="omit-sidebar-style" select="'page-omit-sidebar'"/>

  <!--
    Key used to improve performance when finding duplicate targets. This
    is specific to the PAGE ancestor, so its ID is used as part of the
    key string.
  -->
  <xsl:key name="all-by-target" match="FIELD | WIDGET_PARAMETER"
    use="concat(ancestor::PAGE/@PAGE_ID, '.', @TARGET_BEAN,
                       '.', @TARGET_FIELD)" />

  <xsl:include href="cdej:lib/curam/xml/xsl/jsp/gen-previews.xsl" />
  <xsl:include href="cdej:lib/curam/xml/xsl/jsp/gen-frameset.xsl" />
  <xsl:include href="cdej:lib/curam/xml/xsl/jsp/gen-ng-fields.xsl" />
  <xsl:include href="cdej:lib/curam/xml/xsl/jsp/gen-fragment-page.xsl" />

  <!--
    Catch any "stray" elements or attributes to prevent unnoticed
    errors.
  -->
  <xsl:template match="*">
    <xsl:message terminate="no">
      <xsl:text>WARNING: Unmatched XIM element: </xsl:text>
      <xsl:value-of select="name()" />
    </xsl:message>
  </xsl:template>

  <xsl:template match="@*">
    <xsl:message terminate="no">
      <xsl:text>WARNING: Unmatched XIM attribute: </xsl:text>
      <xsl:value-of select="concat(name(..), '/@', name())" />
    </xsl:message>
  </xsl:template>

  <!--
    Main entry point for processing the XIM document. The root element
    could be a "chunks" element that contains one or more "chunk"
    elements each containing a "PAGE" element, or the root could just be
    a "PAGE" element.
  -->
  <xsl:template match="/">
    <chunks>
      <xsl:apply-templates select="chunks/chunk/PAGE | PAGE" />
    </chunks>
  </xsl:template>

  <!--
    Each JSP page or HTML preview page is placed within a "chunk" for
    later determination of the files to be serialized. Additional chunks
    may be required for frame sets.
  -->
  <xsl:template match="PAGE">
    <xsl:variable name="is-fragment-page"
      select="@COMPONENT_STYLE = 'PAGE_FRAGMENT'"/>
    <xsl:variable name="is-data-service-request"
      select="@COMPONENT_STYLE = 'DATASERVICE'"/>
    <xsl:choose>
      <xsl:when test="$preview = 'true'">
        <chunk type="preview" name="{@PAGE_ID}">
          <xsl:apply-templates select="DISPLAY" mode="preview" />
        </chunk>
      </xsl:when>
      <xsl:otherwise>
        <!-- Generate the frameset chunks if needed. -->
        <xsl:if test="@TYPE = 'SPLIT_WINDOW'">
          <xsl:choose>
            <xsl:when test="INFO/HAS_WIZARD_FRAMESET">
              <xsl:apply-templates select="."
                mode="frameset-wizard" />
            </xsl:when>
            <xsl:when test="INFO/HAS_TREE_FRAMESET">
              <xsl:apply-templates select="."
                mode="frameset-treecontrol" />
            </xsl:when>
          </xsl:choose>
        </xsl:if>
        <xsl:choose>
          <xsl:when test="$is-data-service-request">
            <chunk type="jsp" name="{@PAGE_ID}">
              <xsl:apply-templates select="DISPLAY" mode="data-service" />
            </chunk>
          </xsl:when>
          <xsl:when test="$is-fragment-page">
            <chunk type="jsp" name="{@PAGE_ID}">
              <xsl:apply-templates select="DISPLAY" mode="fragment-page" />
            </chunk>
          </xsl:when>
          <xsl:otherwise>
            <chunk type="jsp" name="{@PAGE_ID}">
              <xsl:apply-templates select="DISPLAY" />
            </chunk>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Create a JSP page. -->
  <xsl:template match="DISPLAY">
    <xsl:variable name="static-page-id" select="ancestor::PAGE/@PAGE_ID"/>
    <xsl:variable name="page-locale" select="../@LOCALE" />
    <xsl:variable name="is-error-page"
        select="$static-page-id = $error-page-id"/>
    <xsl:variable name="has-scriptlet-only"
        select="count(JSP_SCRIPTLET) = 1 and count(*) = 1" />
    <xsl:variable name="is-duim-host-page"
        select="ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style"/>

    <xsl:call-template name="output-copyright" />

    <jsp:root version="2.0">
      <xsl:apply-templates select="." mode="page-directive">
        <xsl:with-param name="page-locale" select="$page-locale" />
        <xsl:with-param name="is-error-page" select="$is-error-page" />
      </xsl:apply-templates>

      <jsp:output omit-xml-declaration="yes" />

      <xsl:choose>
        <xsl:when test="not($has-scriptlet-only)">
          <c:set var="isScriptlet" value="false" scope="page" />
        </xsl:when>
        <xsl:otherwise>
          <c:set var="isScriptlet" value="true" scope="page" />
        </xsl:otherwise>
      </xsl:choose>
      
      <xsl:if test="$is-duim-host-page">
        <jsp:scriptlet>
          <xsl:text>pageContext.setAttribute("isDUIMHost", "true");</xsl:text>
        </jsp:scriptlet>
      </xsl:if>

      <!--
      The "pageId" request attribute will be set on return from this template.
      -->
      <xsl:apply-templates select="." mode="user-preferences">
        <xsl:with-param name="page-locale" select="$page-locale" />
      </xsl:apply-templates>
      <jsp:scriptlet>
          curam.util.common.useragent.UserAgent ua =
          new curam.util.common.useragent.UserAgent(request.getHeader("User-Agent"));
          request.getSession().setAttribute("ua-session-key", ua);
          pageContext.setAttribute("mobileUserAgent", String.valueOf(ua.isMobileBrowser())); 
          if ("true".equals(pageContext.getAttribute("mobileUserAgent"))){ 
            pageContext.setAttribute("mobileClassName", "mobile");
          }
      </jsp:scriptlet>
      <jsp:scriptlet>
        <xsl:text>curam.util.client.jsp.JspUtil.initializeUIM(</xsl:text>
        <xsl:text>pageContext,(String)request.getAttribute("pageId"),</xsl:text>
        <xsl:text>(String)request.getAttribute("__o3WindowOptions"),</xsl:text>
        <xsl:text>(Boolean)request.getAttribute("__o3InPageNavigation")</xsl:text>
        <xsl:text>);</xsl:text>
        curam.omega3.taglib.ScreenContext screenContext =
          (curam.omega3.taglib.ScreenContext) pageContext.getAttribute(
            curam.omega3.taglib.ScreenContext.CTX_ATTR);
      </jsp:scriptlet>
      <c:choose>
        <!--
        Special response from non-"resolve" pages when "o3resolve" is set. When
        the page is a Dynamic UIM host page, the reported page ID is not the ID
        of the host page, but the ID of the Dynamic UIM page.
        -->
        <c:when test="${{param.o3resolve=='true' and !isScriptlet}}">
          <xsl:text>{"pageID": "${requestScope.pageId}", "pageURL": "</xsl:text>
          <jsp:scriptlet>
            out.write(curam.omega3.request.RequestHandlerFactory
                         .getRequestHandler(request).getEncodedURL(false));
          </jsp:scriptlet>
          <xsl:text>"}</xsl:text>
        </c:when>
        <c:otherwise>
          <xsl:if test="not($has-scriptlet-only)">
            <xsl:text>&lt;!DOCTYPE html&gt;</xsl:text>
          </xsl:if>

          <xsl:if test="../ACTION/ACTION_CONTROL/LINK/@PAGE_ID = 'THIS'">
            <xsl:apply-templates select="../ACTION/SERVER_INTERFACE"/>
          </xsl:if>

          <!-- do not add action phase interfaces to the display phase -->
          <xsl:apply-templates select="SERVER_INTERFACE[not(@PHASE='ACTION')]"/>
          <xsl:apply-templates
            select="BEAN_SET_FIELD[not(@TARGET_BEAN = 'BROWSER')]" mode="usual"/>

          <xsl:if test="not($is-error-page) and not($has-scriptlet-only)">
            <!--
            Do not clear messages before server call on error or redirect page.

            Custom tag that clears session scope messages for the display phase.
            Unfortunately this cannot be done by the "callServer" tag because it
            is possible to have multiple display phase calls and messages for
            each of them must be kept. Also, a lot of pages have no display
            phase calls and the messages must still be cleared, hence the need
            for a new custom tag.
            -->
            <curam:removeMessages/>
          </xsl:if>

          <xsl:apply-templates select="CALL_SERVER"/>
          <xsl:if test="$is-duim-host-page">
            <cing:page pageID="${{requestScope.pageId}}" noScripts="true">
              <cing:component style="curam-util-client::duim-si-content"/>
            </cing:page>
          </xsl:if>
          <xsl:apply-templates select="INFORMATIONAL"/>
          <xsl:apply-templates select="." mode="init-frames"/>
          <xsl:choose>
            <xsl:when test="$has-scriptlet-only">
              <xsl:apply-templates select="JSP_SCRIPTLET"/>
            </xsl:when>
            <xsl:otherwise>
              <html lang="${{htmlLanguage}}" dir="${{htmlDirection}}" class="${{htmlDirection}}">

                <xsl:apply-templates select="." mode="html-head">
                  <xsl:with-param name="page-locale" select="$page-locale"/>
                </xsl:apply-templates>

                <xsl:apply-templates select="." mode="html-body">
                  <xsl:with-param name="is-error-page" select="$is-error-page"/>
                </xsl:apply-templates>
              </html>
            </xsl:otherwise>
          </xsl:choose>
        </c:otherwise>
      </c:choose>
    </jsp:root>
  </xsl:template>
  
  <xsl:template name="output-copyright">
<xsl:text><![CDATA[
<!-- 
Generated by IBM Curam JSP Code Generator. 

Licensed Materials - Property of IBM.  
Generator Copyright IBM Corporation 2002, 2012. All Rights Reserved.

US Government User Restricted Rights - Use, duplication 
restricted by GSA ADP Schedule Contract with IBM Corp.
-->]]></xsl:text>
  </xsl:template>

  <!-- Generate the JSP page directive. -->
  <xsl:template match="DISPLAY" mode="page-directive">
    <xsl:param name="page-locale"/>
    <xsl:param name="is-error-page"/>
    <xsl:param name="is-data-service-page"/>

    <jsp:directive.page language="java"
                        isELIgnored="false"
                        contentType="text/html;charset=UTF-8"
                        pageEncoding="UTF-8"
                        isErrorPage="{string($is-error-page)}">
      <xsl:attribute name="buffer">
        <xsl:choose>
          <xsl:when test="../INFO/HAS_FILE_EDIT">
            <xsl:text>128kb</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>32kb</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>

      <xsl:if test="$error-page-id and not($is-error-page)">
        <xsl:attribute name="errorPage">
          <xsl:choose>
            <xsl:when test="not($is-data-service-page)">
              <xsl:value-of
                select="concat('/', '__o3ErrorPage.do')"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="concat('/', 'DataServiceError.jspx')"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xsl:if>
    </jsp:directive.page>
  </xsl:template>

  <!--
  Initialize the user preferences and locale settings and run security checks.
  -->
  <xsl:template match="DISPLAY" mode="user-preferences">
    <xsl:param name="page-locale"/>

    <curam:userPreferences>
      <xsl:apply-templates
          select="SERVER_INTERFACE | ../ACTION/SERVER_INTERFACE"
          mode="security-check"/>
    </curam:userPreferences>

    <!--
    After setting the page ID in the request scope, it can be accessed using
    an EL expression as '${requestScope.pageId}' or using a Java expression
    as '(String) request.getAttribute("pageId")'. Use these forms elsewhere
    in this stylesheet and avoid getting the "PAGE_ID" attribute directly, as
    it will not have the correct value for a dynamic UIM page.
    -->
    <c:set var="pageId" scope="request">
      <xsl:attribute name="value">
        <xsl:choose>
          <xsl:when test="ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style">
            <xsl:text>${param.__o3dpid}</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="ancestor::PAGE/@PAGE_ID"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
    </c:set>

    <!--
    For dynamic modal pages with window options, the '__o3WindowOptions' request
    attribute is set in the window options renderer; in static modal pages with
    window options the request attribute is set here.

    After setting '__o3WindowOptions', it can be accessed using an EL expression
    as '${requestScope.__o3WindowOptions}' or using a Java expression as
    '(String) request.getAttribute("__o3WindowOptions")'.
    -->
    <xsl:choose>
      <xsl:when test="ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style">
        <cing:page pageID="${{requestScope.pageId}}" noScripts="true">
          <cing:component style="curam-util-client::duim-window-options"/>
        </cing:page>
      </xsl:when>
      <xsl:otherwise>
        <c:set var="__o3WindowOptions" scope="request"
               value="{ancestor::PAGE/@WINDOW_OPTIONS}"/>
      </xsl:otherwise>
    </xsl:choose>

    <!--
    For dynamic pages with in page navigation, the '__o3InPageNavigation'
    request attribute is set to 'true' in the set in page navigation renderer;
    in static modal pages with in page navigation the request attribute is set
    to 'true' here.

    For dynamic pages with a description, the '__o3PageDescription' request
    attribute is set to 'true'.

    After setting '__o3InPageNavigation', it can be accessed using an EL
    expression as '${requestScope.__o3InPageNavigation}' or using a Java
    expression as '(String) request.getAttribute("__o3InPageNavigation")'. The
    same applies in order to access the value of the '__o3PageDescription' and
    '__o3PageActionset' request attributes.

    The '__o3InPageNavigation', '__o3PageDescription' and '__o3PageActionset' 
    request attributes default to false.
    -->
    <c:set var="__o3InPageNavigation" scope="request" value="${{false}}"/>
    <c:set var="__o3PageDescription" scope="request" value="${{false}}"/>
    <c:set var="__o3PageActionset" scope="request" value="${{false}}"/>
    <c:set var="__o3WizardBar" scope="request" value="${{false}}"/>

    <xsl:choose>
      <xsl:when test="ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style">
        <cing:page pageID="${{requestScope.pageId}}" noScripts="true">
          <!--  Setting the '__o3InPageNavigation' request attribute for Dynamic
                UIM.-->
          <cing:component
                style="curam-util-client::duim-set-in-page-navigation"/>
          <!--  Setting the '__o3PageDescription' request attribute for Dynamic
               UIM.-->
          <cing:component style="curam-util-client::duim-set-page-description"/>
          <!--  Setting the '__o3PageActionset' request attribute for Dynamic
               UIM.-->
          <cing:component style="curam-util-client::duim-set-page-action-set"/>
          <!--  Setting the '__o3WizardBar' request attribute for Dynamic
               UIM.-->
          <cing:component
                style="curam-util-client::duim-set-wizard-progress-bar"/>
        </cing:page>
      </xsl:when>
      <xsl:otherwise>
        <xsl:if test="MENU[@MODE = 'IN_PAGE_NAVIGATION']">
          <c:set var="__o3InPageNavigation" scope="request" value="${{true}}"/>
        </xsl:if>
      </xsl:otherwise>
    </xsl:choose>

    <xsl:choose>
      <xsl:when test="not(../@HIDE_CONDITIONAL_LINKS)">
        <xsl:choose>
          <xsl:when test="$curam-config/HIDE_CONDITIONAL_LINKS = 'false'">
            <c:set var="hideConditionalLinks" value="false" scope="page"/>
          </xsl:when>
          <xsl:otherwise>
            <c:set var="hideConditionalLinks" value="true" scope="page"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <c:set var="hideConditionalLinks" value="{../@HIDE_CONDITIONAL_LINKS}"
               scope="page"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Initialize various settings if this page will be displayed within a frame set.
  -->
  <xsl:template match="DISPLAY" mode="init-frames">
    <xsl:if test="../@POPUP_PAGE = 'true'">
      <jsp:scriptlet>
       screenContext.addContextBits(curam.omega3.taglib.ScreenContext.POPUP);
       screenContext.clearLayout();
      </jsp:scriptlet>
    </xsl:if>
  </xsl:template>

  <!-- Generate the HTML "head" tag and its content. -->
  <xsl:template match="DISPLAY" mode="html-head">
    <xsl:param name="page-locale"/>

    <jsp:scriptlet>{final curam.omega3.user.UserPreferences prefs =
          curam.omega3.user.UserPreferencesFactory.getUserPreferences(session);
      pageContext.setAttribute("dojoConfig",
          curam.util.client.jsp.JspUtil.getDojoConfig(prefs.getLocale()));}

</jsp:scriptlet>
    <xsl:if test="$v6-theme-enabled">
      <jsp:scriptlet>
        pageContext.setAttribute("theme", "v6", pageContext.APPLICATION_SCOPE);
      </jsp:scriptlet>
    </xsl:if>

    <head>
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
      <meta name="GENERATOR" content="Curam Software Ltd. Curam CDEJ"/>
      <xsl:if test="../INFO/HAS_BAR_CHART">
        <meta http-equiv="imagetoolbar" content="no"/>
      </xsl:if>
      
      <!-- including all CSS files on page -->
      <jsp:include page="../../css-file-links.jsp" />
      <jsp:scriptlet>
        if(pageContext.getAttribute("htmlDirection").equals("rtl")) {
          </jsp:scriptlet><jsp:include page="../../css-file-links_rtl.jsp"/><jsp:scriptlet>
        }
      </jsp:scriptlet>
      
      <!-- TODO: CSS Printing -->
      <!--  <link rel="stylesheet" type="text/css" media="print"
            href="{$static-content-server-url}/themes/classic/css/curam_print.css"/>
      <link rel="stylesheet" type="text/css" media="print"
            href="{$static-content-server-url}/CDEJ/css/custom_print.css"/>
      -->

      <link rel="shortcut icon"
            href="{concat($static-content-server-url,
                          '/themes/classic/images/icons/curam.ico')}"/>
      <link rel="icon"
            href="{concat($static-content-server-url,
                          '/themes/classic/images/icons/curam.ico')}"/>

      <xsl:apply-templates select="BEAN_SET_FIELD[@TARGET_BEAN = 'BROWSER']"
                           mode="browser"/>

      <script type="text/javascript" data-dojo-config="${{pageScope.dojoConfig}}"
          src="/CDEJ/jscript/dojotk/dojo/dojo.js"/>
      <script type="text/javascript" src="/CDEJ/jscript/dojo.layer.js"/>
      <script type="text/javascript">
        <xsl:text>var jsPageID="${requestScope.pageId}";</xsl:text>
      <jsp:scriptlet>curam.util.client.jsp.JspUtil.outputJSModulePaths(pageContext);</jsp:scriptlet>
      </script>
      <jsp:scriptlet>
        <xsl:text>curam.util.client.jsp.JspUtil.outputJSLocalisedValues(pageContext);</xsl:text>
      </jsp:scriptlet>
      <script type="text/javascript" src="/CDEJ/jscript/cdej-cm.js"/>
      <script type="text/javascript" src="/CDEJ/jscript/cdej.js"/>

      <script type="text/javascript">
        /* Load the modules needed by the page itself plus preload some more.
           This is to avoid referencing non-AMD modules which causes poor
           performance */ 
        require(["curam/core-uim"]);
      </script>

       <curam:jsUserPreferences/>

      <script type="text/javascript">curam.util.redirectDirectUrl();</script>
      <script type="text/javascript" src="/CDEJ/jscript/popup-config.js"/>
      <xsl:choose>
        <xsl:when test="../INFO/HAS_TREE_FRAMESET">
          <script type="text/javascript" src="/CDEJ/jscript/dTree/dtree.js"/>
          <link rel="stylesheet" type="text/css" media="all"
                href="../CDEJ/jscript/dTree/dtree.css"/>
        </xsl:when>
        <xsl:otherwise>
          <jsp:scriptlet>
            if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.TREE)) {
          </jsp:scriptlet>
          <script type="text/javascript" src="/CDEJ/jscript/dTree/treecontent.js"/>
          <script type="text/javascript">dojo.addOnLoad(function(){redrawTreeContents()});</script>
          <jsp:scriptlet>}</jsp:scriptlet>
        </xsl:otherwise>
      </xsl:choose>
      <script type="text/javascript">
      <!--
      NB: The include of curam/dialog must be before the call to
      JspUtil.outputJavaScriptInitialization because that method outputs
      modal dialog initialization code.
      -->
      <jsp:scriptlet>if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.MODAL)
                       || screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.POPUP)) {</jsp:scriptlet>
        <xsl:text>require(["curam/dialog"]);</xsl:text>
      <jsp:scriptlet>}</jsp:scriptlet>
        <jsp:scriptlet>
          <xsl:text>curam.util.client.jsp.JspUtil.outputJavaScriptInitialization(pageContext,</xsl:text>
          <xsl:text>(Boolean)request.getAttribute("__o3InPageNavigation")</xsl:text>
          <xsl:text>);</xsl:text>
        </jsp:scriptlet>
      </script>
      <jsp:scriptlet>if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.TAB) &amp;&amp; 
        !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.CONTEXT_PORTLET)) {
      </jsp:scriptlet>
      <!-- If the UIM is opened in a TAB, then we have to "adapt" it to function
           in this context. The "curam.ui.UIMPageAdaptor" JavaScript object
           takes care of this.
        -->
      <script type="text/javascript">
        dojo.addOnLoad(function(){curam.ui.UIMPageAdaptor.initialize();});
      </script>

      <jsp:scriptlet>}</jsp:scriptlet>

      <xsl:apply-templates select="." mode="add-js-widget-support"/>
      <xsl:call-template name="add-js-validation-support">
        <xsl:with-param name="page-locale" select="$page-locale"/>
      </xsl:call-template>

      <xsl:if test="../INFO/HAS_IEG_PLAYER">
        <script type="text/javascript">require(["curam/ieg"]);</script>
      </xsl:if>
      <xsl:if test="../INFO/HAS_TREE_WIDGET">
        <script type="text/javascript" src="/CDEJ/jscript/tree.js"/>
      </xsl:if>
      <xsl:if test="../INFO/HAS_WIZARD_FRAMESET or ../INFO/HAS_WIZARD_SUMMARY">
        <script type="text/javascript" src="/CDEJ/jscript/wizard.js"/>
      </xsl:if>

      <xsl:if test="../INFO/HAS_DECISION_MATRIX">
        <script type="text/javascript"
                src="/CDEJ/jscript/menu-layer.js"/>
        <script type="text/javascript"
                src="/CDEJ/jscript/decisionMatrix_all.js"/>
        <script type="text/javascript">
          require(["curam/decisionmatrixbase", "curam/util/UimDialog"]);
          if (jsScreenContext.hasContextBits('MODAL')) {
            var dialog = curam.util.UimDialog.get();
            dialog.registerOnDisplayHandler(function(){
              curam.matrix.Constants.container.layout();
            });
          }
        </script>
        <link rel="stylesheet" type="text/css" media="all"
                href="{concat($static-content-server-url,
                              '/themes/classic/css/decision_matrix.css')}"/>
      </xsl:if>

      <!-- If there are expandable lists, setup the toggle handler. -->
      <xsl:if test="count(//DETAILS_ROW) &gt; 0">
        <script type="text/javascript">
        <xsl:text>require(["curam/widget/_TabButton"]);</xsl:text>
        <xsl:text>curam.util.ExpandableLists.setupToggleHandler();</xsl:text>
        </script>
      </xsl:if>

      <xsl:apply-templates select="." mode="include-uim-scripts"/>

      <!--
      The host page for a dynamic UIM page may have no title of its own, but
      the dynamic title place-holder still needs to be added, so simply applying
      templates to the "PAGE_TITLE" element is insufficient and a template needs
      to be called here.
      -->
      <xsl:call-template name="add-window-title"/>
      
    </head>
  </xsl:template>

  <!-- Generate the HTML "body" tag and its content. -->
  <xsl:template match="DISPLAY" mode="html-body">
    <xsl:param name="is-error-page"/>

    <xsl:variable name="action-control-exist"
                  select="ACTION_SET" />

    <xsl:variable name="not-in-cluster"
                  select="not(parent::ACTION_SET = CLUSTER)" />
    <xsl:variable name="not-in-list"
                  select="not(parent::ACTION_SET = LIST)" />
    <xsl:variable name="sidebar-omitted"
        select="parent::PAGE/@COMPONENT_STYLE = $omit-sidebar-style"/>

    <!--
    Redirect pages, those containing nothing but a single JSP_SCRIPTLET
    element, do not have a "body" and do not have a page ID. This
    characteristic is exploited when compensating for redirect pages in
    a modal dialog. The page ID on the body can also be used when
    customizing the CSS selectively for a page.
    -->

    <xsl:variable name="is-page-type-details"
      select="../@TYPE = 'DETAILS'"/>

    <xsl:variable name="is-duim-host-page"
      select="ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style"/>

    <body id="Curam_${{requestScope.pageId}}" 
          role="region" 
          aria-label="${{landmarkLabel}}">
      <xsl:attribute name="class">
        <!--
        NOTE: the htmlDirection variable will have a space in it if needed,
        otherwise it will be empty.
         -->
        <xsl:text>${appID} ${bClass} ${htmlLanguage} ${htmlDirection}</xsl:text>
        <xsl:if test="../INFO/HAS_ORG_TREE">
          <xsl:text> orgTreeBody</xsl:text>
        </xsl:if>
        <xsl:if test="$is-page-type-details">
        <xsl:text> details</xsl:text>
        </xsl:if>
        <xsl:if test="$sidebar-omitted">
          <xsl:text> no-sidebar</xsl:text>
        </xsl:if>
        <xsl:if test="not(../INFO/HAS_WIZARD_FRAMESET)
                      or not(../INFO/HAS_ORG_TREE)">
          <xsl:text> soria</xsl:text>
        </xsl:if>
      </xsl:attribute>

      <xsl:attribute name="tabIndex">
        <xsl:text>-1</xsl:text>
      </xsl:attribute>

      <xsl:if test="$is-page-type-details">
        <div id="tab-name" style="display:none">
          <xsl:apply-templates select="TAB_NAME" mode="html-page-title"/>
        </div>
        <div id="tab-title">
          <xsl:call-template name="add-window-title-content-only"/>
        </div>
      </xsl:if>

      <cing:page pageID="${{requestScope.pageId}}">

        <!--
        The SVG widgets do not work "reliably" in a Dojo BorderContainer. The
        only workaround is to disable these containers when an SVG widget exists
        on the page.
        -->
        <xsl:if test="../INFO/HAS_BASIC_SVG">
          <c:set var="page-has-svg-widget" value="true"/>
        </xsl:if>
        <xsl:if test="../INFO/HAS_WIZARD_FRAMESET">
          <c:set var="page-has-wizard" value="true"/>
        </xsl:if>
        <xsl:if test="not(../INFO/HAS_WIZARD_FRAMESET)">
          <xsl:call-template name="add-page-title"/>
        </xsl:if>
        <jsp:scriptlet>
          if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.LIST_ROW_INLINE_PAGE)) {
        </jsp:scriptlet>
          <div class="top">
            <div class="left"></div>
            <div class="center">
              <div class="right"></div>
            </div>
          </div>
        <jsp:scriptlet>}</jsp:scriptlet>


        <xsl:if test="$is-duim-host-page" >
            <cing:component
              style="curam-util-client::duim-wizard-progress-bar"/>
        </xsl:if>
        <xsl:if test="MENU[@MODE = 'WIZARD_PROGRESS_BAR']">
          <xsl:apply-templates
            select="MENU[@MODE = 'WIZARD_PROGRESS_BAR']"/>
        </xsl:if>

        <div>
          <xsl:attribute name="id">
            <xsl:choose>
              <xsl:when test="../INFO/HAS_WIZARD_FRAMESET">
                <xsl:text>wizard-content</xsl:text>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>content</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>
          <xsl:attribute name="class">
            <xsl:text>title-exists </xsl:text>
           <xsl:choose>
              <xsl:when test="PAGE_TITLE/@DESCRIPTION or PAGE_TITLE/DESCRIPTION
                              or ancestor::PAGE//FIELD/@TARGET_FIELD">
                <xsl:text> desc-exists </xsl:text>
              </xsl:when>
              <!--Dynamically adding the CSS class names for dynamic UIM pages
              now as opposed to hardcoding, so that they are added in the same
              way that it is added to static UIM pages. -->
              <xsl:when test="$is-duim-host-page">
                <xsl:text> ${duimDescClass} ${duimActionsetClass} ${duimWizardBar}</xsl:text>
              </xsl:when>
              <xsl:when test="../INFO/HAS_WIZARD_FRAMESET"> orgTreeBody</xsl:when>
            </xsl:choose>
            <xsl:if test="ACTION_SET">
              <xsl:text> action-exists</xsl:text>
            </xsl:if>
            <xsl:if test="MENU[@MODE = 'WIZARD_PROGRESS_BAR']">
              <xsl:text> wizard-exists</xsl:text>
            </xsl:if>
          </xsl:attribute>
          <xsl:attribute name="tabIndex">
            <xsl:text>-1</xsl:text>
          </xsl:attribute>

          <jsp:scriptlet>if (screenContext.hasContextBits(
                                     curam.omega3.taglib.ScreenContext.TREE
                                   | curam.omega3.taglib.ScreenContext.ACTION)
                             &amp;&amp; !screenContext.hasContextBits(
                                      curam.omega3.taglib.ScreenContext.ERROR)
                             &amp;&amp; !screenContext.hasContextBits(
                                   curam.omega3.taglib.ScreenContext.RESOLVE)) {
          </jsp:scriptlet>
            <script id="rScript" type="text/javascript">
              <xsl:text>refreshTree();curam.util.fireRefreshTreeEvent();</xsl:text>
            </script>
          <jsp:scriptlet>}</jsp:scriptlet>

          <script type="text/javascript">
            <xsl:text>var messageTitleAppend="</xsl:text>
            <xsl:text>${o3_messageTitleAppend}</xsl:text>
            <xsl:text>";</xsl:text>
          </script>
          
           <jsp:scriptlet>if (screenContext.hasContextBits(
                               curam.omega3.taglib.ScreenContext.EXTAPP)) {
          </jsp:scriptlet>
            <script type="text/javascript">
              <xsl:text>dojo.addOnLoad(function(){curam.util.addClassToLastNodeInContentArea();});</xsl:text>
            </script>
          <jsp:scriptlet>}</jsp:scriptlet>

          <xsl:apply-templates select="." mode="display-messages">
            <xsl:with-param name="is-error-page" select="$is-error-page"/>
          </xsl:apply-templates>
          
          <!-- In the External App's modal dialog, we need include the page 
               description inside this content DIV to meet the new styling spec.
               So that the page description and the mandatory text will be part
               of the scrolling content when the scrollbar presents. At the 
               same time, we will hide the normal page title by using 
               "display:none" in CSS. -->
          <jsp:scriptlet>if (screenContext.hasContextBits(
                               curam.omega3.taglib.ScreenContext.EXTAPP) 
                             &amp;&amp; screenContext.hasContextBits(
                               curam.omega3.taglib.ScreenContext.MODAL)) {
          </jsp:scriptlet>
            <xsl:if test="not(../INFO/HAS_WIZARD_FRAMESET)">
              <xsl:call-template name="add-page-description-for-external-app-modal"/>
            </xsl:if>
          <jsp:scriptlet>}</jsp:scriptlet>
          
          
          <xsl:choose>
            <xsl:when test="MENU[@MODE = 'IN_PAGE_NAVIGATION']">
              <script type="text/javascript"><jsp:text><![CDATA[
                require(["curam/widget/_TabButton"]);
              ]]></jsp:text></script>
              <xsl:apply-templates select="MENU[@MODE = 'IN_PAGE_NAVIGATION']"/>
              <div class="in-page-nav-contentWrapper">
                <xsl:apply-templates select="." mode="general"/>
              </div>
            </xsl:when>
            <xsl:when test="MENU[@MODE = 'INTEGRATED_CASE']">
              <curam:dynamicMenu type="INTEGRATED_CASE"
                                 sourceBean="{MENU/@SOURCE_BEAN}"
                                 sourceField="{MENU/@SOURCE_FIELD}"/>
              <div class="tab">
                <xsl:apply-templates select="." mode="general"/>
              </div>
            </xsl:when>
            <xsl:when test="MENU[@MODE = 'DYNAMIC']">
              <curam:dynamicMenu type="DYNAMIC"
                                 sourceBean="{MENU/@SOURCE_BEAN}"
                                 sourceField="{MENU/@SOURCE_FIELD}"/>
              <xsl:apply-templates select="." mode="general"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:apply-templates select="." mode="general"/>
            </xsl:otherwise>
          </xsl:choose>
        </div>
        <script type="text/javascript">
          <xsl:text>curam.util.getClusterActionSet();</xsl:text>
        </script>

        <!--
        Only add this content pane if a page level action set exists and if
        that page does not have an SVG widget. See note earlier in this
        template that checks INFO/HAS_BASIC_SVG, for more details.
        -->
        <jsp:scriptlet>
          if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.MODAL) &amp;&amp;
          !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.AGENDA) &amp;&amp;
          !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.TREE)) {
        </jsp:scriptlet>

        <xsl:if test="ACTION_SET and not(../INFO/HAS_BASIC_SVG)">
            <div class="actions-panel" id="modal-actions-panel">
              <!-- Actions that appear in the modal button bar -->
              <xsl:if test="ACTION_SET/ACTION_CONTROL[@ALIGNMENT='LEFT']">
                <div class="action-set left">
                <xsl:choose>
                  <xsl:when test="ACTION_SET/CONDITION">
                    <xsl:apply-templates select="ACTION_SET" mode="conditional">
                      <xsl:with-param name="rounded" select="'true'" />
                    </xsl:apply-templates>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:apply-templates select="ACTION_SET/ACTION_CONTROL[@ALIGNMENT='LEFT']"
                    mode="action-round-corners"/>
                  </xsl:otherwise>
                </xsl:choose>
                </div>
              </xsl:if>
              <xsl:if test="ACTION_SET/ACTION_CONTROL[@ALIGNMENT='RIGHT']">
                <div class="action-set right">
                <xsl:choose>
                  <xsl:when test="ACTION_SET/CONDITION">
                    <xsl:apply-templates select="ACTION_SET" mode="conditional">
                      <xsl:with-param name="rounded" select="'true'" />
                    </xsl:apply-templates>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:apply-templates select="ACTION_SET/ACTION_CONTROL[@ALIGNMENT='RIGHT']"
                    mode="action-round-corners"/>
                  </xsl:otherwise>
                </xsl:choose>
                </div>
              </xsl:if>
              <xsl:if test="ACTION_SET/ACTION_CONTROL[@ALIGNMENT='CENTER']">
                <div class="action-set center">
                <xsl:choose>
                  <xsl:when test="ACTION_SET/CONDITION">
                    <xsl:apply-templates select="ACTION_SET" mode="conditional">
                      <xsl:with-param name="rounded" select="'true'" />
                    </xsl:apply-templates>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:apply-templates select="ACTION_SET/ACTION_CONTROL[@ALIGNMENT='CENTER']"
                    mode="action-round-corners"/>
                  </xsl:otherwise>
                </xsl:choose>
                </div>
              </xsl:if>
            </div>
          </xsl:if>
          <xsl:if test="$is-duim-host-page" >
            <cing:component
              style="curam-util-client::duim-page-modal-action-set"/>
          </xsl:if>
        <jsp:scriptlet>}</jsp:scriptlet>

        <script type="text/javascript">
          <xsl:text>curam.util.adjustActionButtonWidth();</xsl:text>
        </script>

        <jsp:scriptlet>
          if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.LIST_ROW_INLINE_PAGE)) {
        </jsp:scriptlet>
          <div class="bottom">
            <div class="left"></div>
            <div class="center">
              <div class="right"></div>
            </div>
          </div>
        <jsp:scriptlet>}</jsp:scriptlet>

        <script type="text/javascript">
          <xsl:call-template name="include-frame-event-handler"/>
          <xsl:apply-templates select="SCRIPT" mode="add-page-level-events"/>
          <xsl:if test="../INFO/HAS_IEG_PLAYER">
            <xsl:text>dojo.addOnLoad(loadTabs);</xsl:text>
          </xsl:if>
          <xsl:if test="../INFO/HAS_TREE_WIDGET">
            <xsl:text>dojo.addOnLoad(function(){collapseTree('Collapse entry.', 'Entry is collapsed.', '../Images/minus.gif', 'Expand entry.', 'Entry is expanded.', '../Images/plus.gif')});</xsl:text>
          </xsl:if>
          <xsl:if test="../INFO/HAS_HEATMAP">
            <xsl:text>dojo.addOnLoad(function(){heatmapObject.drawMap()});</xsl:text>
          </xsl:if>
          <xsl:if test="../INFO/HAS_TREE_FRAMESET">
            <xsl:text>dojo.addOnLoad(function(){redrawTree()});</xsl:text>
          </xsl:if>
          <!-- Check if any informational messages need to be loaded -->
          <xsl:text>curam.util.loadInformationalMsgs();</xsl:text>

          <xsl:text>curam.util.addContentWidthListener("</xsl:text>
            <xsl:if test="../INFO/HAS_WIZARD_FRAMESET">wizard-</xsl:if>
          <xsl:text>content");</xsl:text>
          
          <jsp:scriptlet>if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.SMART_PANEL)) {</jsp:scriptlet>
          <xsl:text>dojo.addOnLoad(curam.tab.publishSmartPanelContentReady);</xsl:text>
          <jsp:scriptlet>}</jsp:scriptlet>

          <jsp:scriptlet>if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.MODAL)
                           &amp;&amp; !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.TREE)) {</jsp:scriptlet>
          <xsl:text>curam.util.addActionControlClickListener("modal-actions-panel");</xsl:text>
          <jsp:scriptlet>}</jsp:scriptlet>
          <!--
          Struts action class will supply three request parameters containing the
          value and description to be returned from the popup and an indicator to
          say a "submit and dismiss" has taken place. In this case we execute the
          popup mappings and close the window.
          This needs to be the last script so that the CDEJ libraries are included
          and initialized.
          -->
          <xsl:if test="descendant::ACTION_CONTROL[@ACTION_TYPE
                                                   = 'SUBMIT_AND_DISMISS']">
            <jsp:scriptlet>
              String value = request.getParameter("value");
              String desc = request.getParameter("description");
              String submitanddismiss=request.getParameter("o3submitanddismiss");
              if (submitanddismiss != null) {
                out.print("dojo.addOnLoad(function(){");
                out.print("executeOpenerMapping(\"value\",\"" + value + "\");");
                out.print("executeOpenerMapping(\"description\",\""+desc+"\");");
                out.print("setParentFocus(null)");
                out.print("});");
              }
            </jsp:scriptlet>
          </xsl:if>
        </script>
      </cing:page>
    </body>
  </xsl:template>

  <!-- Attach an event handler when the page is within a frame. -->
  <xsl:template name="include-frame-event-handler">
    <jsp:scriptlet>if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.TAB)) {</jsp:scriptlet>
      <xsl:if test="not(../@TYPE = 'SPLIT_WINDOW')">
        <xsl:if test="../@TYPE = 'DETAILS'">
          <c:out escapeXml="false" value="curam.ui.UIMPageAdaptor.setTabTitleAndName();"/>
        </xsl:if>
        <xsl:text>require(["curam/tab"], function(tab) {tab.initContent(window,'${requestScope.pageId}');tab.initTabLinks(window);});</xsl:text>
      </xsl:if>
    <jsp:scriptlet>}</jsp:scriptlet>
    <c:if test="${{inAgenda=='true'}}">
      <xsl:text>curam.util.getFrameRoot(window,"wizard").wizard.setContentReady(jsPageID);</xsl:text>
    </c:if>
  </xsl:template>

  <!-- Include the script files referenced from the UIM documents. -->
  <xsl:template match="DISPLAY" mode="include-uim-scripts">
    <xsl:apply-templates
        select="parent::*[@SCRIPT_FILE]" mode="include-script-file"/>
    <xsl:apply-templates
        select="../descendant::FIELD/SCRIPT[@SCRIPT_FILE]"
        mode="include-script-file"/>
    <xsl:apply-templates
        select="SCRIPT[@SCRIPT_FILE]" mode="include-script-file"/>
    <xsl:apply-templates
        select="../descendant::ACTION_CONTROL/SCRIPT[@SCRIPT_FILE]"
        mode="include-script-file"/>
  </xsl:template>

  <xsl:template match="SCRIPT" mode="add-script-attributes">
    <xsl:attribute name="{@EVENT}">
      <xsl:value-of select="concat('return ', @ACTION, ';')"/>
    </xsl:attribute>
  </xsl:template>

  <xsl:template match="SCRIPT" mode="add-page-level-events">
    <xsl:text>dojo.connect(dojo.body(), '</xsl:text>
    <xsl:value-of select="@EVENT"/>
    <xsl:text>', function(){</xsl:text>
    <xsl:value-of select="@ACTION"/>
    <xsl:text>});</xsl:text>
  </xsl:template>

  <xsl:template match="SCRIPT[@EVENT = 'onload' or @EVENT = 'onunload']"
                mode="add-page-level-events">
    <xsl:text>dojo.</xsl:text>
    <xsl:choose>
      <xsl:when test="@EVENT = 'onunload'">
        <xsl:text>addOnUnload</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>addOnLoad</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
    <xsl:text>(function(){</xsl:text>
    <xsl:value-of select="@ACTION"/>
    <xsl:text>});</xsl:text>
  </xsl:template>

  <!-- Display the error and informational messages. -->
  <xsl:template match="DISPLAY" mode="display-messages">
    <xsl:param name="is-error-page"/>
    <jsp:scriptlet>
      if (!screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.CONTEXT_PANEL)) {
    </jsp:scriptlet>
    
      <div id="error-messages-container">
        <curam:ifMessagesExist>
        <h3 class="message-list" id="error-messages-header">${o3_messageListHeader}</h3>
          <ul id="error-messages" class="messages" tabindex="0" aria-live="assertive">
            <curam:messageLoop>
              <curam:getCurrentMessage/>
            </curam:messageLoop>
          </ul>
        </curam:ifMessagesExist>
      </div>

      <xsl:if test="$is-error-page">
        <!--
        On an error page, we must clear messages AFTER they are displayed by the
        curam:messageLoop tag.
        -->
        <curam:removeMessages/>
        <xsl:text>&lt;!--</xsl:text>
        <!--
        Due to a bug in WebSphere 6.1, the implicit JSP variable "exception"
        cannot reliably be referenced in this scriptlet; it must be accessed
        via the "pageContext" implicit variable.
        -->
        <jsp:scriptlet>final Exception pageEx = pageContext.getException();
        if (pageEx != null) {
          final boolean allowOut = curam.util.client.Trace.isOn()
            || "true".equalsIgnoreCase(curam.omega3.util.CDEJResources
              .getConfigProperty("curam.omega3.ApplicationConfiguration",
                                    "errorpage.stacktrace.output"));
          if (allowOut) {
          final java.io.PrintWriter exOut = new java.io.PrintWriter(out);
          <!--
            if (curam.util.client.Trace.isOn()) {
            exOut = new java.io.PrintWriter(System.out);
            } else {
            exOut = new java.io.PrintWriter(out);
            }
          -->
            if (pageEx instanceof javax.servlet.jsp.JspException
                &amp;&amp; ((javax.servlet.jsp.JspException) pageEx)
                     .getRootCause() != null) {
              ((javax.servlet.jsp.JspException) pageEx).getRootCause()
                  .printStackTrace(exOut);
            }
            pageEx.printStackTrace(exOut);
          }
        }</jsp:scriptlet>
        <xsl:text>--&gt;</xsl:text>
      </xsl:if>

    <jsp:scriptlet>}</jsp:scriptlet><!-- end CONTEXT_PANEL check -->

  </xsl:template>

  <!-- Add JavaScript support for widgets. -->
  <xsl:template match="DISPLAY" mode="add-js-widget-support">
    <xsl:if test="../INFO/HAS_BASIC_SVG">

      <script type="text/javascript" src="/CDEJ/jscript/svgcheck.js"/>
      <script type="text/vbscript" src="/CDEJ/vbscript/svgcheck.vbs"/>  

      <xsl:if test="../INFO/HAS_FULL_SVG">
        <!-- Rules Display related scripts -->
        <script type="text/javascript" src="/CDEJ/jscript/svg-common.js"/>
        <script type="text/javascript" src="/CDEJ/jscript/popup-text.js"/>
        <script type="text/javascript" src="/CDEJ/jscript/text-wrap.js"/>
        <script type="text/javascript" src="/CDEJ/jscript/tree-node.js"/>
      </xsl:if>
    </xsl:if>
  </xsl:template>

  <!-- Add JavaScript support for client-side validations. -->
  <xsl:template name="add-js-validation-support">
    <xsl:param name="page-locale"/>

    <xsl:if test="$is-client-validation">
      <script type="text/javascript"
              src="{concat('/CDEJ/jscript/DomainValidationMessages_',
                           $page-locale, '.js')}"/>
      <script type="text/javascript"
              src="/CDEJ/jscript/domain-validations.js"/>
      <script type="text/javascript" src="/CDEJ/jscript/TypeDefinitions.js"/>
      <script type="text/javascript" src="/CDEJ/jscript/CustomValidation.js"/>
      <script type="text/javascript"
              src="{concat('/CDEJ/jscript/CustomValidationMessages_',
                           $page-locale, '.js')}"/>
      <jsp:scriptlet>
        <xsl:text>pageContext.setAttribute("__o3jsval","true");</xsl:text>
      </jsp:scriptlet>
    </xsl:if>
  </xsl:template>

  <!--
  The DISPLAY section invokes any specified server interfaces and contains the
  main content for the page. If there is an ACTION_CONTROL in the DISPLAY
  section that has a SUBMIT ACTION_TYPE, the main content will be contained in
  a form. The main content can contain an ACTION_SET (to be displayed at the
  top and/or bottom of the content), and a number of CLUSTER and LIST elements.

  There is a special case for dynamic UIM host pages where the form will always
  be generated regardless of the content on that host page.
  -->
  <xsl:template match="DISPLAY" mode="general">
    <xsl:variable name="submit-action-control"
                  select="descendant::ACTION_CONTROL[
                              @ACTION_TYPE = 'SUBMIT'
                              or @ACTION_TYPE = 'SUBMIT_AND_DISMISS']"/>
    <xsl:variable name="is-duim-host-page"
        select="ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style"/>

    <xsl:choose>
      <xsl:when test="$submit-action-control or $is-duim-host-page">
        <cing:form method="post" action="${{requestScope.pageId}}Action.do">
          <xsl:attribute name="returnToSelf">
            <xsl:choose>
              <xsl:when test="$submit-action-control/LINK[@PAGE_ID = 'THIS']">
                <xsl:text>true</xsl:text>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>false</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>

          <xsl:if test="../INFO/HAS_FILE_UPLOAD">
            <!-- File uploads are rare, so this does not need to be fast. -->
            <xsl:attribute name="encodingType">
              <xsl:text>multipart/form-data</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="accept">
              <xsl:for-each select="descendant::WIDGET[@TYPE = 'FILE_UPLOAD']">
                <xsl:value-of select="WIDGET_PARAMETER[@NAME
                                       = 'ACCEPTABLE_CONTENT_TYPES']/@VALUE"/>
                <xsl:if test="position() != last()">
                  <xsl:text>,</xsl:text>
                </xsl:if>
              </xsl:for-each>
            </xsl:attribute>
          </xsl:if>

          <xsl:apply-templates select="HIDDEN_FIELD"/>
          <xsl:apply-templates select="." mode="main-content">
            <xsl:with-param name="is-form" select="'true'"/>
          </xsl:apply-templates>

          <!--
          NB: These functions need to be at the end of the form to ensure the
          JavaScript DOM for the form has been initialized fully.
          -->
          <script type="text/javascript">
            <xsl:if test="not(../INFO/HAS_DECISION_MATRIX)">
              <xsl:text>setFocus();</xsl:text>
            </xsl:if>
            <!-- Hide submit buttons on pages with MS Word control -->
            <xsl:if test="../INFO/HAS_FILE_EDIT">
              <xsl:text>curam.util.WordFileEdit.hideSubmitButtons();</xsl:text>
            </xsl:if>
            <jsp:scriptlet>if (screenContext.hasContextBits(
                                 curam.omega3.taglib.ScreenContext.TREE
                               | curam.omega3.taglib.ScreenContext.ACTION)
                               &amp;&amp; !screenContext.hasContextBits(
                                     curam.omega3.taglib.ScreenContext.ERROR)
                               &amp;&amp; !screenContext.hasContextBits(
                                   curam.omega3.taglib.ScreenContext.RESOLVE)) {
            </jsp:scriptlet>
              refreshTree();
              curam.util.fireRefreshTreeEvent();
            <jsp:scriptlet>}</jsp:scriptlet>
          </script>
        </cing:form>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="." mode="main-content"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="DISPLAY" mode="main-content">
    <xsl:param name="is-form" select="'false'"/>
    <xsl:choose>
      <xsl:when test="../INFO/HAS_BASIC_SVG">
        <!--
        When a page contains an SVG widget, we disable the Dojo widgets on that
        page. See note in DISPLAY mode="html-body" template. As a result of
        disabling these widgets it means we lose the new button bar at the
        bottom of a modal dialog (again see the DISPLAY mode="html-body"
        template for where this is disabled, there is a check for
        INFO/HAS_BASIC_SVG wrapping an ACTION_SET template). Because we don't
        have the button bar, we have to ensure the old style buttons are
        displayed at the bottom of the page. However page level action sets are
        now hidden on modal pages by setting the "page-action-set-position"
        parameter to the ACTION_SET template. Therefore, this apply templates
        intentionally does not pass this parameter to ensure the action set is
        visible. All of these workarounds can be removed when we move actions
        sets to the page title bar as a menu.
        -->
        <xsl:apply-templates select="ACTION_SET" mode="common"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="ACTION_SET[@TOP = 'true']" mode="common">
          <!--  indicate this is the top page-level action set  -->
          <xsl:with-param name="page-action-set-position" select="'top'"/>
        </xsl:apply-templates>
      </xsl:otherwise>
    </xsl:choose>

    <xsl:apply-templates select="CLUSTER | LIST | JSP_SCRIPTLET | FIELD |
                                                     CONTAINER | WIDGET"/>

    <xsl:apply-templates select="ACTION_SET[@BOTTOM = 'true']" mode="common">
      <!-- indicate this is the bottom page-level action set -->
      <xsl:with-param name="page-action-set-position" select="'bottom'"/>
    </xsl:apply-templates>
  </xsl:template>

  <!--START of Data Service related templates-->
  <!--Generate the Data Service handler page-->
  <xsl:template match="DISPLAY" mode="data-service">

    <xsl:variable name="static-page-id" select="ancestor::PAGE/@PAGE_ID"/>
    <xsl:variable name="page-locale" select="../@LOCALE" />
    <xsl:variable name="is-error-page"
        select="$static-page-id = $error-page-id"/>
    
    <xsl:call-template name="output-copyright" />

    <jsp:root version="2.0">
      <xsl:apply-templates select="." mode="page-directive">
        <xsl:with-param name="page-locale" select="$page-locale" />
        <xsl:with-param name="is-error-page" select="$is-error-page" />
        <xsl:with-param name="is-data-service-page" select="true()" />
      </xsl:apply-templates>

      <jsp:output omit-xml-declaration="yes" />

      <xsl:apply-templates select="." mode="data-service-user-preferences">
        <xsl:with-param name="page-locale" select="$page-locale" />
      </xsl:apply-templates>

      <!-- do not add action phase interfaces to the display phase -->
      <xsl:apply-templates select="SERVER_INTERFACE[not(@PHASE='ACTION')]"/>
      <xsl:apply-templates
        select="BEAN_SET_FIELD[not(@TARGET_BEAN = 'BROWSER')]" mode="usual"/>

      <xsl:apply-templates select="CALL_SERVER"/>

      <xsl:apply-templates select="." mode="data-service-body"/>
      
    </jsp:root>

  </xsl:template>

  <!--generate user preferences for Data Service request -->
  <xsl:template match="DISPLAY" mode="data-service-user-preferences">
    <xsl:param name="page-locale"/>

    <curam:userPreferences>
      <xsl:apply-templates
        select="SERVER_INTERFACE | ../ACTION/SERVER_INTERFACE"
        mode="security-check"/>
    </curam:userPreferences>

    <c:set var="pageId" scope="request">
      <xsl:attribute name="value">
        <xsl:choose>
          <xsl:when test="ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style">
            <xsl:text>${param.__o3dpid}</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="ancestor::PAGE/@PAGE_ID"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
    </c:set>

  </xsl:template>

  <xsl:template match="DISPLAY" mode="data-service-body" >
    <jsp:scriptlet>
      <xsl:text>
        curam.omega3.texthelper.DataServiceConverter.initializeDataConverter(
                                    request, response, pageContext, "</xsl:text>
      <xsl:value-of select="SERVER_INTERFACE/@NAME" />
      <xsl:text>");</xsl:text>
    </jsp:scriptlet>
  </xsl:template>
  <!--END of Data Service related templates-->


  <xsl:template match="SCRIPT | PAGE" mode="include-script-file">
    <script type="text/javascript" src="/CDEJ/jscript/{@SCRIPT_FILE}"/>
  </xsl:template>

  <!--
  A HIDDEN_FIELD translates into a <curam:hiddenField> inside the <cing:form>
  of the main body content.
  -->
  <xsl:template match="HIDDEN_FIELD">
    <xsl:choose>
      <xsl:when test="@PARAMETER_NAME and not(@TARGET_BEAN)">
        <curam:hiddenField sourceParameter="{@PARAMETER_NAME}"
                           name="{@PARAMETER_NAME}"/>
      </xsl:when>
      <xsl:when test="@SOURCE_BEAN and @SOURCE_IS_LIST='false'">
        <curam:hiddenField formPrefix="true" isList="false"
                           xsl:use-attribute-sets="target source"/>
      </xsl:when>
      <xsl:when test="@SOURCE_BEAN and @SOURCE_IS_LIST='true'">
        <curam:hiddenField formPrefix="true" isList="true"
                           xsl:use-attribute-sets="target source"/>
      </xsl:when>
      <xsl:when test="@PARAMETER_NAME">
        <curam:hiddenField sourceParameter="{@PARAMETER_NAME}"
                           formPrefix="true" xsl:use-attribute-sets="target"/>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <!--
  A SERVER_INTERFACE in the DISPLAY section must be instantiated, configured,
  and called before any of the main content is displayed.
  -->
  <xsl:template match="SERVER_INTERFACE">
    <curam:useTextHelper beanName="{@NAME}"
        className="{concat($package-prefix, '.interfaces.',
                           @CLASS, 'Pkg.', @CLASS, '_', @OPERATION, '_TH')}"/>
  </xsl:template>

  <xsl:template match="SERVER_INTERFACE" mode="security-check">
    <curam:accessCheck className="{concat(@CLASS, '.', @OPERATION)}"/>
  </xsl:template>

  <xsl:template match="BEAN_SET_FIELD" mode="usual">
    <curam:setField xsl:use-attribute-sets="target">
      <xsl:choose>
        <xsl:when test="@PARAMETER_NAME">
          <xsl:attribute name="sourceParameter">
            <xsl:value-of select="@PARAMETER_NAME"/>
          </xsl:attribute>
        </xsl:when>
        <xsl:when test="@VALUE">
          <xsl:attribute name="value">
            <xsl:value-of select="@VALUE"/>
          </xsl:attribute>
        </xsl:when>
      </xsl:choose>
    </curam:setField>
  </xsl:template>

  <xsl:template match="BEAN_SET_FIELD" mode="browser">
    <curam:jsContextVariable xsl:use-attribute-sets="source"
                             variable="{@TARGET_FIELD}"/>
  </xsl:template>

  <xsl:template match="CALL_SERVER">
    <curam:callServer beanName="{@NAME}"/>
  </xsl:template>

  <xsl:template match="INFORMATIONAL">
    <curam:informationals xsl:use-attribute-sets="source"/>
  </xsl:template>

  <!--
  The PAGE_TITLE and TAB_NAME elements can contain static text and/or dynamic
  values retrieved via the server interface. The "html-page-title" mode does
  not add extra HTML markup to the title values, as this would be treated as
  character data within the HTML "title" element.
  -->
  <xsl:template match="TAB_NAME">
    <xsl:apply-templates select="TITLE_ELEMENT" mode="html-page-title"/>
  </xsl:template>

  <!--
  Produces the window title (the "title" element within the "head"). For a
  normal "static" page, this will use the "PAGE_TITLE" element for the content.
  However, on a special dynamic UIM host page, the "PAGE_TITLE" element is
  ignored (and may not even exist). Instead, creates the necessary place-holder
  for the title of the dynamic page.

  The expected context node is the "DISPLAY" element of a "PAGE". If this is
  not the context node, the "page-title" parameter should be provided.
  -->
  <xsl:template name="add-window-title">
    <xsl:param name="page-title" select="PAGE_TITLE"/>

    <title>
      <xsl:if test="$page-title
                    or ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style">
        <xsl:call-template name="add-window-title-content-only">
          <xsl:with-param name="page-title" select="$page-title"/>
        </xsl:call-template>
      </xsl:if>
      <curam:ifMessagesExist>
          <xsl:text> ${o3_messageTitleAppend}</xsl:text>
      </curam:ifMessagesExist>
    </title>
  </xsl:template>

  <!--
  Produces the content of the page title without the HTML "title" element. The
  content contains no markup that is incompatible with its use within that
  element, though.

  If the page is a host page for dynamic UIM pages, then the title is generated
  at run-time from the title of the dynamic UIM page and not from the title on
  the "static" host page.

  The expected context node is the "DISPLAY" element of a "PAGE". If this is
  not the context node, the "page-title" parameter should be provided.
  -->
  <xsl:template name="add-window-title-content-only">
    <xsl:param name="page-title" select="PAGE_TITLE"/>

    <xsl:choose>
      <xsl:when test="ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style">
        <cing:page pageID="${{requestScope.pageId}}" noScripts="true">
          <cing:component style="curam-util-client::duim-window-title"/>
        </cing:page>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="$page-title/TITLE_ELEMENT"
                             mode="html-page-title"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  
  <!--  The template to add the page description which is specific for the
        external application modal dialog.  -->
  <xsl:template name="add-page-description-for-external-app-modal">
    <xsl:param name="page-title" select="PAGE_TITLE"/>
    
    <!-- If the page has input fields, then we need the mandatory -->
    <xsl:variable name="has-input-fields"
        select="ancestor::PAGE//FIELD/@TARGET_FIELD"/>
    <xsl:variable name="is-duim-host-page"
        select="ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style"/>

    <!--  Invoking the Dynamic UIM player for page descriptions, It will
          also host the HTML for the mandatory indicator legened on the page
          if input field(s) are present on the page -->
    <xsl:if test="$is-duim-host-page">
      <cing:component style="curam-util-client::duim-page-description"/>
    </xsl:if>
      
    <xsl:if test="$page-title/DESCRIPTION or $page-title/@DESCRIPTION
                    or $has-input-fields ">
      <div class="page-header">
        <div class="page-description">
          <!-- Only output this mandatory text when the page 
               has at least one input field -->
          <xsl:if test="$has-input-fields">
            <div class="mandatory-icon-help">
              <xsl:text>${o3_mandatoryIconHelpText}</xsl:text>
            </div>
          </xsl:if>
        
          <!-- Place the text in a separate DIV for easier positioning. -->
          <div>
            <xsl:attribute name="class">
              <xsl:text>description-title</xsl:text>
              <xsl:if test="$has-input-fields">
                <xsl:text> mand-help</xsl:text>
              </xsl:if>
              <!-- Add a specific CSS class to the description title element
                   when there's no text inside it. -->
              <xsl:if test="not ($page-title/DESCRIPTION) and not ($page-title/@DESCRIPTION)">
                <xsl:text> no-desc-text</xsl:text>
              </xsl:if>
            </xsl:attribute>
            <xsl:choose>
              <xsl:when test="$page-title/DESCRIPTION">

                <!-- tooltip support for page description -->
                <xsl:if test="not ($page-title/DESCRIPTION/DESCRIPTION_ELEMENT/@VALUE = '' )" >
                <xsl:attribute name="title">
                  <xsl:apply-templates
                    select="$page-title/DESCRIPTION/DESCRIPTION_ELEMENT"/>
                </xsl:attribute>
                  </xsl:if>
                <xsl:apply-templates
                  select="$page-title/DESCRIPTION/DESCRIPTION_ELEMENT"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:if test="$page-title/@DESCRIPTION">
                  <!-- tooltip support for page description -->
                  <xsl:if test="not($page-title/@DESCRIPTION= '')">
                  <xsl:attribute name="title">
                    <xsl:value-of select="$page-title/@DESCRIPTION"/>
                  </xsl:attribute>
                   </xsl:if>
                  <xsl:value-of select="$page-title/@DESCRIPTION"/>
                </xsl:if>
              </xsl:otherwise>
            </xsl:choose>
          </div>
        </div>
        
      </div>
    </xsl:if>
  </xsl:template>
  
  <!--
  Produces the page title complete with HTML markup to make it suitable for
  presenting the title within the body content of the page. The output is not
  suitable for inclusion within the HTML "title" element.

  If the page is a host page for dynamic UIM pages, then the title is generated
  at run-time from the title of the dynamic UIM page and not from the title on
  the "static" host page.

  The expected context node is the "DISPLAY" element of a "PAGE".
  -->
  <xsl:template name="add-page-title">
    <xsl:param name="page-title" select="PAGE_TITLE"/>
    <div class="page-header">
      <xsl:variable name="is-duim-host-page"
        select="ancestor::PAGE/@COMPONENT_STYLE = $duim-host-style"/>

      <!-- Online help can be applet or html, where html the jsp extension 
           should be used. -->
      <xsl:if test="not(ancestor::PAGE/@TYPE = 'DETAILS')">

      <div class="page-title-bar">
        <!-- Moving the Dynamic UIM player for Page Titles up one level. It was
        always at the wrong level before but because there were changes made in
        static UIM to support tooltips for page titles the CSS styling for
        titles was updated, and hence Dynamic UIM page titles were not being
        diplayed properly for JDE21 (BOS)-->
        <xsl:choose>
          <!--  For Dynamic UIM pages-->
          <xsl:when test="$is-duim-host-page">
            <cing:component style="curam-util-client::duim-content-title"/>
          </xsl:when>
          <!--  For static UIM pages-->
          <xsl:otherwise>
            <xsl:if test="not(ancestor::PAGE/@TYPE = 'DETAILS')">
              <div>
                <xsl:attribute name="class">
                  <xsl:text>title</xsl:text>
                  <xsl:if test="ACTION_SET">
                    <xsl:choose>
                      <xsl:when test="count(ACTION_SET/ACTION_CONTROL) &gt; 2">
                        <xsl:text> page-menu-exist</xsl:text>
                      </xsl:when>
                      <xsl:otherwise>
                        <xsl:text> page-actions-exist</xsl:text>
                      </xsl:otherwise>
                     </xsl:choose>
                  </xsl:if>
                </xsl:attribute>

                <xsl:if test="$page-title/@ICON">
                  <img role="presentation" src="{concat('/', $page-title/@ICON)}"/>
                </xsl:if>
                <h2>
                  <!-- tooltip support for page title -->
                  <!-- As of now only static tooltip is supported -->
                  <xsl:choose>    
                    <xsl:when test="$page-title/TITLE_ELEMENT">
	                 <xsl:if test="not($page-title/TITLE_ELEMENT/@VALUE = '' ) and $page-title/TITLE_ELEMENT/@VALUE">
               	      <xsl:attribute name="title">
               		  <!-- <xsl:value-of select="$page-title/TITLE_ELEMENT/@VALUE"/> -->
                  		<xsl:apply-templates select="$page-title/TITLE_ELEMENT" mode="styled"/>
               		  </xsl:attribute>
                    </xsl:if>
                	<xsl:apply-templates select="$page-title/TITLE_ELEMENT" mode="styled"/>
              	  </xsl:when>
              		<xsl:otherwise>
                 	 <xsl:text>&amp;nbsp;</xsl:text>
              		</xsl:otherwise>
                 </xsl:choose>
                </h2>
              </div>
            </xsl:if>
          </xsl:otherwise>
        </xsl:choose>
        <!-- The Dynamic UIM player for page action menus buttons is being
             invoked if this is a Dynamic UIM page which is not a modal
             page (BOS)
        -->

        <jsp:scriptlet>
          if (!screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.MODAL)
               || screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.TREE)) {
        </jsp:scriptlet>
        <xsl:if test="$is-duim-host-page">
          <cing:component style="curam-util-client::duim-page-action-set"/>
        </xsl:if>
        <jsp:scriptlet>}</jsp:scriptlet>
        <!--  For static UIM (BOS)-->
        <xsl:apply-templates select="ACTION_SET" mode="page-level-actions" />

       <!-- Add the page level toolbar which includes a refresh button, a print
             button and a help button. The help button is optional.
        -->
        <xsl:if test="not(../INFO/HAS_TREE_FRAMESET)">
          <cing:component style="curam-util-client::page-toolbar">
            <xsl:if test="$help-node/@INCLUDE = 'true'">
              <cing:param name="online-help-indicator" >
                <xsl:attribute name="value">
                  <xsl:value-of select="$help-node/@INCLUDE"/>
                </xsl:attribute>
              </cing:param>
              <xsl:if test="$help-node/@ACCESSKEY">
                <cing:param name="online-help-accesskey" >
                  <xsl:attribute name="value">
                    <xsl:value-of select="$help-node/@ACCESSKEY"/>
                  </xsl:attribute>
                </cing:param>
              </xsl:if>
            </xsl:if>
          </cing:component>
        </xsl:if>
        <!-- Temporarily common out the code for help icon, because
             it need to be moved to page level.
         -->
        <!--
        <xsl:if test="$help-node/@INCLUDE = 'true'">
          <div class="help">
            <a>
              <xsl:choose>
                <xsl:when test="$preview = 'false'">
                  <xsl:attribute name="href">
                    <xsl:value-of select="concat($static-content-server-url,
                                               '/../help/index.', $help-ext,
                                               '?', '${requestScope.pageId}')"/>
                  </xsl:attribute>
                  <xsl:if test="not($help-node/@NEW_WINDOW)
                                or $help-node/@NEW_WINDOW != 'false'">
                    <xsl:attribute name="target">_blank</xsl:attribute>
                  </xsl:if>
                  <xsl:if test="$help-node/@ACCESSKEY">
                    <xsl:attribute name="accesskey">
                      <xsl:value-of select="$help-node/@ACCESSKEY"/>
                    </xsl:attribute>
                  </xsl:if>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:attribute name="href">
                    <xsl:text>#</xsl:text>
                  </xsl:attribute>
                </xsl:otherwise>
              </xsl:choose>
              <xsl:if test="$help-node/@ICON">
                <img alt="{$help-node/@ALT}"
                     src="{concat('/', $help-node/@ICON)}"/>
              </xsl:if>
              <xsl:value-of select="$help-node/@TEXT"/>
            </a>
          </div>
        </xsl:if>
        -->
      </div>

      <!-- If the page has input fields, then we need the mandatory -->
      <xsl:variable name="has-input-fields"
        select="ancestor::PAGE//FIELD/@TARGET_FIELD"/>

      <!--  Invoking the Dynamic UIM player for page descriptions, It will
            also host the HTML for the mandatory indicator legened on the page
            if input field(s) are present on the page -->
      <xsl:if test="$is-duim-host-page">
        <cing:component style="curam-util-client::duim-page-description"/>
      </xsl:if>
      <!--
      "static" menus and the mandatory icon help text are both displayed in the
      page description bar.
      -->
      <xsl:if test="$page-title/DESCRIPTION or $page-title/@DESCRIPTION
                    or MENU[@MODE = 'STATIC'] or $has-input-fields ">
        <div class="page-description">
          
          <!-- If in the External App, place the mandatory icon 
               before the description text to meet the new styling 
               requirements. -->
          <jsp:scriptlet>
            if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.EXTAPP)) {
          </jsp:scriptlet>
            <!-- Only output this text when the page has an input field -->
            <xsl:if test="$has-input-fields">
              <div class="mandatory-icon-help">
                <xsl:text>${o3_mandatoryIconHelpText}</xsl:text>
              </div>
            </xsl:if>
          <jsp:scriptlet>}</jsp:scriptlet>
        
          <!-- Place the text in a separate DIV for easier positioning. -->
          <div>
            <xsl:attribute name="class">
              <xsl:text>description-title</xsl:text>
              <xsl:if test="$has-input-fields">
                <xsl:text> mand-help</xsl:text>
              </xsl:if>
              <!-- Add a specific CSS class to the description title element
                   when there's no text inside it. -->
              <xsl:if test="not ($page-title/DESCRIPTION) and not ($page-title/@DESCRIPTION)">
                <xsl:text> no-desc-text</xsl:text>
              </xsl:if>
            </xsl:attribute>
            <xsl:choose>
              <xsl:when test="$page-title/DESCRIPTION">

                <!-- tooltip support for page description -->
                <xsl:if test="not ($page-title/DESCRIPTION/DESCRIPTION_ELEMENT/@VALUE = '' )" >
                <xsl:attribute name="title">
                  <xsl:apply-templates
                    select="$page-title/DESCRIPTION/DESCRIPTION_ELEMENT"/>
                </xsl:attribute>
                  </xsl:if>
                <xsl:apply-templates
                  select="$page-title/DESCRIPTION/DESCRIPTION_ELEMENT"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:if test="$page-title/@DESCRIPTION">
                  <!-- tooltip support for page description -->
                  <xsl:if test="not($page-title/@DESCRIPTION= '')">
                  <xsl:attribute name="title">
                    <xsl:value-of select="$page-title/@DESCRIPTION"/>
                  </xsl:attribute>
                   </xsl:if>
                  <xsl:value-of select="$page-title/@DESCRIPTION"/>
                </xsl:if>
                
                <!-- Do not add the non-breaking space in the External App. -->
                <jsp:scriptlet>if (!screenContext.hasContextBits(
                                  curam.omega3.taglib.ScreenContext.EXTAPP)) {
                </jsp:scriptlet>
                  <!-- Adding non-breaking space to allow page description bar to
                  display correctly when mandatory required field text is displayed
                  in description bar. -->
                  <xsl:if test="$has-input-fields">
                    <xsl:text>&amp;nbsp;</xsl:text>
                  </xsl:if>
                <jsp:scriptlet>}</jsp:scriptlet>
              </xsl:otherwise>
            </xsl:choose>
          </div>
          
          <!-- If in the Internal App, place the mandatory icon 
               after the description text. -->
          <jsp:scriptlet>
            if (!screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.EXTAPP)) {
          </jsp:scriptlet>
            <!-- Only output this text when the page has an input field -->
            <xsl:if test="$has-input-fields">
              <div class="mandatory-icon-help">
                <xsl:text>${o3_mandatoryIconHelpText}</xsl:text>
              </div>
            </xsl:if>
          <jsp:scriptlet>}</jsp:scriptlet>
          <xsl:apply-templates select="MENU[@MODE = 'STATIC']"/>
        </div>
      </xsl:if>
    </xsl:if>
    </div>
  </xsl:template>

  <xsl:template match="MENU[@MODE = 'IN_PAGE_NAVIGATION']">
    <ul class="in-page-navigation-tabs">
      <xsl:apply-templates select="ACTION_CONTROL" mode="in-menu"/>
    </ul>

    <!-- 
    Only want the tab container for IPN tabs within the main content area, as
    no screen context exists for the main content area, we can only exclude other
    screen context types to achieve our goal.
    -->
    <jsp:scriptlet>if (!screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.MODAL)
      &amp;&amp; !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.LIST_ROW_INLINE_PAGE)
      &amp;&amp; !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.ORG_TREE)
      &amp;&amp; !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.NESTED_UIM)
      &amp;&amp; !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.AGENDA)
      &amp;&amp; !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.TREE)) {
    </jsp:scriptlet>
      <div dojoType="curam.layout.TabContainer" class="in-page-nav-tabContainer ipn-page dijitTabContainer dijitContainer dijitTabContainerTop dijitLayoutContainer dijitTabContainerNoLayout tabStrip-disabled" style="width:auto; display:block; visibility:hidden;" doLayout="false">
        <xsl:attribute name="id">
          <xsl:value-of select="concat('in-page-nav-tabContainer-',generate-id())"/>
        </xsl:attribute>
        <div dojoType="dijit.layout.ContentPane">.</div>
          <xsl:apply-templates select="ACTION_CONTROL" mode="in-menu-tab"/>
      </div>
    <jsp:scriptlet>}</jsp:scriptlet>
  </xsl:template>

  <xsl:template match="MENU[@MODE = 'STATIC']">
    <div class="pagemenu">
      <h3>${o3_pageMenuHeaderText}</h3>
      <ul>
        <xsl:apply-templates select="ACTION_CONTROL" mode="in-menu"/>
      </ul>
    </div>
  </xsl:template>

  <xsl:template match="MENU[@MODE = 'WIZARD_PROGRESS_BAR']">
    <cing:component style="curam-util-client::wizard-progress-bar">
      <xsl:choose>
        <xsl:when test="@SOURCE_BEAN">
          <cing:connector>
            <xsl:attribute name="source">
              <xsl:value-of
                select="concat($si-pp, '/', @SOURCE_BEAN, '/', @SOURCE_FIELD)"/>
            </xsl:attribute>
          </cing:connector>
        </xsl:when>
        <xsl:when test="@PARAMETER_NAME">
          <cing:connector>
            <xsl:attribute name="source">
              <xsl:value-of select="concat($param-pp, @PARAMETER_NAME)"/>
            </xsl:attribute>
          </cing:connector>
        </xsl:when>
        <xsl:when test="@VALUE">
          <cing:param name="property-resource-id" value="{@VALUE}"/>
        </xsl:when>
      </xsl:choose>
    </cing:component>
  </xsl:template>

  <xsl:template match="TITLE_ELEMENT" mode="styled">
    <span>
      <xsl:if test="position() &gt; 1">
        <xsl:attribute name="class">sub-title</xsl:attribute>
        <xsl:text> </xsl:text>
      </xsl:if>
      <xsl:apply-templates select="."/>
    </span>
  </xsl:template>

  <xsl:template match="TITLE_ELEMENT" mode="html-page-title">
    <xsl:apply-templates select="."/>
    <!--
    When this element is generated in XIM within a LIST or CLUSTER a separator
    character is added, which defaults to a space. But, when used within a
    PAGE_TITLE element the separator is not added to XIM because the spacing
    is handled by CSS on the HTML span elements which this stylesheet adds in
    the TITLE\TITLE_ELEMENT mode="styled" templates. This inconsistency causes
    problems when generating the title into the XHTML <title> because it will
    not have any space characters. Hence this new mode on TITLE_ELEMENT has
    been introduced which simply adds a space between each title element so it
    displays properly in the browser's title bar.
    -->
    <xsl:if test="position() != last()">
      <xsl:text> </xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template match="TITLE_ELEMENT | DESCRIPTION_ELEMENT">
    <xsl:choose>
      <xsl:when test="@VALUE">
        <xsl:value-of select="@VALUE"/>
      </xsl:when>
      <xsl:when test="$preview = 'true'">
        <!-- No literal value and nothing else can be used for a preview. -->
        <xsl:text>[?]</xsl:text>
      </xsl:when>
      <xsl:when test="@PARAMETER_NAME">
        <curam:getParameter name="{@PARAMETER_NAME}"/>
      </xsl:when>
      <xsl:when test="@SOURCE_BEAN">
        <xsl:choose>
          <xsl:when test="@DOMAIN = 'LOCALIZED_MESSAGE'">
            <curam:getResource xsl:use-attribute-sets="source"
                               localMessage="true"/>
          </xsl:when>
          <xsl:otherwise>
            <curam:getField xsl:use-attribute-sets="source"
                            ignoreEmpty="true"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <!-- These elements can all have an optional CONDITION child element. -->
  <xsl:template match="CLUSTER | LIST | ACTION_CONTROL | ACTION_SET">
    <xsl:param name="is-page-menu" />
    <xsl:param name="rounded" />
    <xsl:variable name="is-page-type-details"
                  select="ancestor::PAGE/@TYPE = 'DETAILS'"/>
    <xsl:choose>
      <xsl:when test="$preview = 'true'">
        <xsl:apply-templates select="." mode="preview"/>
      </xsl:when>
      <xsl:when test="CONDITION">
        <xsl:apply-templates select="." mode="conditional">
           <xsl:with-param name="rounded" select="$rounded" />
           <xsl:with-param name="action-control-sequence" select="position()"/>
        </xsl:apply-templates>
      </xsl:when>
      <!-- Assume CONDITION never used for wizard navigation frame. -->
      <xsl:when test="../../INFO/HAS_WIZARD_FRAMESET">
        <xsl:apply-templates select="." mode="cluster-wizard"/>
      </xsl:when>
      <xsl:when test="$is-page-type-details">
        <xsl:choose>
          <xsl:when test="name(.) = 'CLUSTER' or name(.) = 'LIST'">
            <div>
              <xsl:attribute name="class">
                <xsl:if test="@STYLE">
                  <xsl:value-of select="@STYLE" />
                  <xsl:text>-wrapper</xsl:text>
                </xsl:if>
                <xsl:text> details-cluster-wrapper</xsl:text>
              </xsl:attribute>
              <xsl:apply-templates select="." mode="top-detail-cluster-corner" />
              <xsl:apply-templates select="." mode="common"/>
              <xsl:apply-templates select="." mode="bottom-detail-cluster-corner" />
            </div>
          </xsl:when>
          <xsl:otherwise>
            <xsl:apply-templates select="." mode="common">
              <xsl:with-param name="action-control-sequence" select="position()"/>
            </xsl:apply-templates>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="." mode="common">
          <xsl:with-param name="is-page-menu" select="$is-page-menu"/>
          <xsl:with-param name="rounded" select="$rounded"/>
          <xsl:with-param name="action-control-sequence" select="position()"/>
        </xsl:apply-templates>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="CLUSTER" mode="top-detail-cluster-corner">
    <div class="top">
      <div class="left"></div>
      <div class="center">
        <div class="right"></div>
      </div>
    </div>
  </xsl:template>

  <xsl:template match="CLUSTER" mode="bottom-detail-cluster-corner">
    <div class="bottom">
      <div class="left"></div>
      <div class="center">
        <div class="right"></div>
      </div>
    </div>
  </xsl:template>

  <!--
  Wraps the "common" mode template output with a dynamically evaluated
  conditional element.
  -->
  <xsl:template
    match="CLUSTER | LIST | ACTION_CONTROL | ACTION_SET | DETAILS_ROW | FIELD"
    mode="conditional">

    <xsl:param name="rounded" />
    <xsl:param name="action-control-sequence"/>

    <xsl:variable name="name">
      <xsl:choose>
        <xsl:when test="LINK/CONDITION">
          <xsl:value-of select="LINK/CONDITION//@NAME" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="CONDITION//@NAME" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

   <xsl:variable name="prop">
      <xsl:choose>
        <xsl:when test="LINK/CONDITION">
          <xsl:value-of select="LINK/CONDITION//@PROPERTY" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="CONDITION//@PROPERTY" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:if test="not($name = 'CONTEXT')">
      <curam:setConditionalDisplayValue beanName="{$name}" fieldName="{$prop}"/>
    </xsl:if>

    <xsl:variable name="test-expression">
      <xsl:choose>
        <xsl:when test="CONDITION/IS_TRUE">
          <xsl:text>"true".equals(</xsl:text>
        </xsl:when>
        <xsl:when test="CONDITION/IS_FALSE">
          <xsl:text>"false".equals(</xsl:text>
        </xsl:when>
        <xsl:when test="LINK/CONDITION/IS_TRUE">
          <xsl:text>"true".equals(</xsl:text>
        </xsl:when>
        <xsl:when test="LINK/CONDITION/IS_FALSE">
          <xsl:text>"false".equals(</xsl:text>
        </xsl:when>
      </xsl:choose>
      <xsl:choose>
        <xsl:when test="$name = 'CONTEXT' and $prop = 'inWizard'">
          <xsl:text>pageContext.getAttribute("inAgenda"))</xsl:text>
        </xsl:when>
        <xsl:when test="not($name = 'CONTEXT')">
          <xsl:text>pageContext.getAttribute("value"))</xsl:text>
        </xsl:when>
      </xsl:choose>
    </xsl:variable>

    <!--
    CONDITIONs used in page level ACTION_CONTROLS is common and was contributing
    a lot to the WLS JSP size issue (UDI-1222). Therefore, the JSTL tags have
    been replaced with a simple if statement in a JSP scriptlet. It makes the
    code below slightly harder to follow and care needs to be taken to ensure
    the brackets around the statements are correctly output. However not using
    the JSTL tags provides a significant saving in the generated servlet size
    when conditions are used on page level action sets.
    TODO: At the time of writing, page level action sets are duplicated on the
    page up to 4 times: page top\bottom, modal button bar, page dropdown menu.
    If this duplication can be reduced, then it may be possible to revert to
    using JSTL conditional tags here. However, removing the JSTL tags was the
    best short-term approach.
    -->
    <jsp:scriptlet>
      <!--
      Start of condition. If the condition is true, show the content as it
      would normally be displayed.
      -->
      <xsl:text>if(</xsl:text>
      <xsl:value-of select="$test-expression"/>
      <xsl:text>){</xsl:text>
    </jsp:scriptlet>
    <xsl:choose>
        <xsl:when test="parent::CONTAINER.actioncol and preceding-sibling::*
                      and ../@SEPARATOR" />
        <xsl:when test="parent::FIELD.actioncol and preceding-sibling::*
                      and ../@SEPARATOR" />
         
        <xsl:when test="parent::CONTAINER and preceding-sibling::*
                      and ../@SEPARATOR">
          <!--
          Add the separator, it was not added in the "in-container" mode for
          the element because it had a nested CONDITION.
          -->
          
             <span class="separator">
               <xsl:value-of select="../@SEPARATOR"/>
             </span>
        </xsl:when>
         </xsl:choose>
        <xsl:choose>
          <!-- 
          Page level action controls numbering more than two need to be displayed
          in a dropdown menu. This dropdown will be part of the title bar.
           -->
          <xsl:when test="count(parent::ACTION_SET/ACTION_CONTROL) &gt; 2
                          and (not(ancestor::CLUSTER) and not(ancestor::LIST))">
            <xsl:apply-templates select="." mode="common">
              <xsl:with-param name="is-page-menu" select="'true'" />
              <xsl:with-param name="rounded" select="$rounded" />
            </xsl:apply-templates>
          </xsl:when>
          <xsl:when test="name() = 'ACTION_SET'">
            <xsl:choose>
              <!-- An action set which is either LIST[LIST_ROW_MENU] type or page level with more than 2 action controls -->
              <xsl:when test="(parent::DISPLAY and count(ACTION_CONTROL) &gt; 2) or @TYPE='LIST_ROW_MENU'">
                <xsl:apply-templates select="ACTION_CONTROL" mode="common">
                  <xsl:with-param name="is-page-menu" select="'true'" />
                  <xsl:with-param name="rounded" select="$rounded" />
                </xsl:apply-templates>                  
              </xsl:when>
              <xsl:otherwise>
                <xsl:choose>
                  <xsl:when test="parent::DISPLAY">
                    <xsl:apply-templates select="ACTION_CONTROL" mode="common" >
                      <xsl:with-param name="rounded" select="$rounded" />
                    </xsl:apply-templates>
                  </xsl:when>
                  <xsl:when test="parent::CLUSTER or parent::LIST">
                    <xsl:apply-templates select="../ACTION_SET" mode="common" />
                  </xsl:when>
                </xsl:choose>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:when>
          <xsl:when test="name() = 'ACTION_CONTROL'">
            <xsl:choose>
              <xsl:when test="parent::ACTION_SET[@TYPE='LIST_ROW_MENU']">
                <xsl:apply-templates select="." mode="common">
                  <xsl:with-param name="is-page-menu" select="'true'" />
                  <xsl:with-param name="rounded" select="$rounded" />
                  <xsl:with-param name="action-control-sequence" select="$action-control-sequence"/>
                </xsl:apply-templates> 
              </xsl:when>
              <xsl:otherwise>
                <xsl:apply-templates select="." mode="common">
                  <xsl:with-param name="rounded" select="$rounded" />
                  <xsl:with-param name="action-control-sequence" select="$action-control-sequence"/>
                </xsl:apply-templates>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:when>
          <xsl:otherwise>
            <xsl:apply-templates select="." mode="common"/>
          </xsl:otherwise>
        </xsl:choose>
      <jsp:scriptlet>
        <!-- "else" if the condition is false, we firstly check if we want to
             show the content, but disabled.
        -->
        <xsl:text>}else if("false".equals(pageContext.getAttribute("hideConditionalLinks"))){</xsl:text>
      </jsp:scriptlet>
          <xsl:choose>
            <xsl:when test="parent::CONTAINER">
              <xsl:if test="preceding-sibling::* and ../@SEPARATOR">
                <span class="disabled-link">
                  <xsl:value-of select="../@SEPARATOR"/>
                </span>
              </xsl:if>
              <span class="disabled-link">
                <xsl:value-of select="@LABEL"/>
              </span>
            </xsl:when>

            <!--
              When the condition is set at the action set level, it is applied
              to all child action controls within the action set.
            -->
            <xsl:when test="name() ='ACTION_SET'">
              <xsl:choose>
                <!--
                  If the action set is within a list row menu, return all as
                  menu items.
                -->
                <xsl:when test="@TYPE='LIST_ROW_MENU'">
                  <xsl:for-each select="ACTION_CONTROL">
                    <span dojoType="dijit.MenuItem" disabled="true">
                      <xsl:apply-templates select="." mode="link-text-or-image"/>
                    </span>
                  </xsl:for-each>
                </xsl:when>
                <!--
                  Page level action sets with more than 2 action controls should be
                  displayed as menu items, except for modals and pages within expandable
                  list rows (as both these contexts do not contain a title bar)
                -->
                <xsl:when test="(parent::DISPLAY and count(ACTION_CONTROL) &gt; 2)">
                  <jsp:scriptlet>if ((!screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.MODAL)
                      || screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.TREE))
                    &amp;&amp; !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.LIST_ROW_INLINE_PAGE)) {
                  </jsp:scriptlet>
                    <xsl:for-each select="ACTION_CONTROL">
                      <span dojoType="dijit.MenuItem" disabled="true">
                        <xsl:apply-templates select="." mode="link-text-or-image"/>
                      </span>
                    </xsl:for-each>
                  <jsp:scriptlet>} else {</jsp:scriptlet>
                    <xsl:apply-templates select="." mode="disabled_action_set"/>
                  <jsp:scriptlet>}</jsp:scriptlet>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:choose>
                    <!--
                      Page level action set of two or less action controls, just
                      display disabled text.
                    -->
                    <xsl:when test="parent::DISPLAY and count(ACTION_CONTROL) &lt;= 2">
                      <xsl:for-each select="ACTION_CONTROL">
                        <span class="disabled-link">
                          <xsl:apply-templates select="." mode="link-text-or-image"/>
                        </span>
                      </xsl:for-each>
                    </xsl:when>
                    <xsl:when test="parent::DISPLAY or parent::CLUSTER or parent::LIST">
                      <xsl:apply-templates select="." mode="disabled_action_set"/>
                    </xsl:when>
                  </xsl:choose>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:when>
            <xsl:when test="name() ='ACTION_CONTROL'">
              <xsl:choose>
                <!--
                  If the action control's parent is a list row menu then it has to
                  be output as a disabled dijit MenuItem..
                -->
                <xsl:when test="parent::ACTION_SET[@TYPE='LIST_ROW_MENU']">
                  <span dojoType="dijit.MenuItem" disabled="true">
                    <xsl:apply-templates select="." mode="link-text-or-image"/>
                  </span>
                </xsl:when>                 
                <!--
                If the action control's grand parent is a PAGE and there are more
                than 2 sibling action controls then it is also a disabled dijit MenuItem.
                -->
                <xsl:when test="name(../..) = 'DISPLAY' and count(../ACTION_CONTROL) &gt; 2">
                  <jsp:scriptlet>if (!screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.MODAL)
                    &amp;&amp; !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.LIST_ROW_INLINE_PAGE)) {
                  </jsp:scriptlet>
                    <span dojoType="dijit.MenuItem" disabled="true">
                      <xsl:apply-templates select="." mode="link-text-or-image"/>
                    </span>
                  <jsp:scriptlet>} else {</jsp:scriptlet>
                    <xsl:apply-templates select="." mode="disabled_button"/>
                  <jsp:scriptlet>}</jsp:scriptlet>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:choose>
                    <xsl:when test="(name(../..) = 'DISPLAY' and count(../ACTION_CONTROL) &lt;= 2)">
                      <span class="disabled-link">
                        <xsl:apply-templates select="." mode="link-text-or-image"/> 
                      </span>
                    </xsl:when>   
                    <xsl:when test="name(../..) = 'DISPLAY' or name(../..) = 'CLUSTER' or name(../..) = 'LIST'">
                      <xsl:apply-templates select="." mode="disabled_button"/>    
                    </xsl:when> 
                  </xsl:choose>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:when>
            <xsl:when test="LINK/CONDITION and self::FIELD">
              <span class="disabled-link">
                <xsl:apply-templates select="." mode="check-for-image-map"/>
              </span>
            </xsl:when>
          </xsl:choose>
    <jsp:scriptlet>
      <!--
        Finally, if the condition is false and the hide-conditional-links flag is true
        then we would typically not display anything. However if more than two action
        controls exist and the condition is set at the action set level, then an empty
        drop down menu would be displayed (for page level and row list menu actions sets).
        This empty menu causes a Javascript error when selected, as it contains no menu items.
        A menu item has therefore been added with a title which explains to the user that
        the menu contains no content.
       -->
      <xsl:text>} else {</xsl:text>
    </jsp:scriptlet>

      <jsp:scriptlet>
        if ((!screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.MODAL)
              || screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.TREE))
              &amp;&amp; !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.LIST_ROW_INLINE_PAGE)) {
      </jsp:scriptlet>
      <xsl:if test="name()='ACTION_SET' and (@TYPE='LIST_ROW_MENU'
                    or (parent::DISPLAY and count(ACTION_CONTROL) &gt; 2))">
        <jsp:scriptlet>
          <xsl:text>if(!(</xsl:text>
            <xsl:value-of select="$test-expression"/>
          <xsl:text>)){</xsl:text>
        </jsp:scriptlet>
          <span dojoType="dijit.MenuItem" disabled="true">
            <jsp:scriptlet>
              String emptyMenu = curam.omega3.util.CDEJResources.getProperty("curam.dropdown.emptyMenu");
              out.print(curam.util.common.util.JavaScriptEscaper.escapeText(emptyMenu));
            </jsp:scriptlet>
          </span>
        <jsp:scriptlet>}</jsp:scriptlet>
      </xsl:if>

      <jsp:scriptlet>} }</jsp:scriptlet><!-- End of page check statement and outer if/else -->

  </xsl:template>

  <!--
  Cannot use the existing link generation to display a disabled action control
  button because it includes the anchor tag which will allow navigation. This
  template will therefore generate a wrapper element to represent a disabled
  action set.
  -->
  <xsl:template match="ACTION_SET" mode="disabled_action_set">
    <jsp:scriptlet>
      if (!screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.MODAL)) {
    </jsp:scriptlet>

    <xsl:if test="@ALIGNMENT='LEFT'">
      <div class="disabled-action-set action-set left">
        <xsl:for-each select="ACTION_CONTROL">
          <xsl:apply-templates select="." mode="disabled_button"/>
        </xsl:for-each>
      </div>
    </xsl:if>
    <xsl:if test="@ALIGNMENT='CENTER'">
      <div class="disabled-action-set action-set center">
        <xsl:for-each select="ACTION_CONTROL">
          <xsl:apply-templates select="." mode="disabled_button"/>
        </xsl:for-each>
      </div>
    </xsl:if>
    <xsl:if test="@ALIGNMENT='RIGHT'">
      <div class="disabled-action-set action-set right">
        <xsl:for-each select="ACTION_CONTROL">
          <xsl:apply-templates select="." mode="disabled_button"/>
        </xsl:for-each>
      </div>
    </xsl:if>
    <jsp:scriptlet>} else { </jsp:scriptlet>
        <xsl:for-each select="ACTION_CONTROL">
          <xsl:apply-templates select="." mode="disabled_button"/>
        </xsl:for-each>
    <jsp:scriptlet> } </jsp:scriptlet>
  </xsl:template>

  <!--
  Cannot use the existing link generation to display a disabled action control
  button because it includes the anchor tag which will allow navigation. This
  template will therefore generate the elements to display an action control
  button with no underlying linking logic.
  -->
  <xsl:template match="ACTION_CONTROL" mode="disabled_button">
      <span class="filler">&amp;nbsp;</span>
      <span class="left-corner-disabled">
        <span class="right-corner-disabled">
          <span class="middle-disabled">
            <xsl:apply-templates select="." mode="link-text-or-image"/>
          </span>
        </span>
      </span>
  </xsl:template>

  <!--
  An ACTION_SET contains a group of ACTION_CONTROL elements that are displayed
  horizontally. It can also contain a CONDITION element which determines the
  context in which the ACTION_CONTROL elements should be displayed.
  -->
  <xsl:template match="ACTION_SET" mode="common">
    <xsl:param name="page-action-set-position" select="''"/>
    <div>
    <xsl:choose>
      <xsl:when test="parent::CLUSTER or parent::LIST">
        <!--
        $page-action-set-position will be set to either "top" or "bottom" for
        page level actions sets. This is used to construct the div's id
        attribute.
        -->
        <xsl:attribute name="id">
          <xsl:value-of select="concat('page-action-set-', $page-action-set-position)"/>
        </xsl:attribute>
        <xsl:apply-templates select="." mode="add-css-class">
          <xsl:with-param name="other-classes">
            <xsl:text>blue-action-set</xsl:text>
          </xsl:with-param>
        </xsl:apply-templates>
        <xsl:apply-templates select="ACTION_CONTROL" mode="action-round-corners" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="." mode="add-css-class">
          <xsl:with-param name="other-classes">
            <xsl:text>blue-action-set hidden-action-set</xsl:text>
          </xsl:with-param>
        </xsl:apply-templates>
        <xsl:apply-templates select="ACTION_CONTROL" mode="hidden-action-round-corners" />

      </xsl:otherwise>
    </xsl:choose>
    </div>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL" mode="action-round-corners">
    <xsl:apply-templates select=".">
      <!-- Setting rounded parameter to true. This will indicate to our curam
           tag that rounded corners should be generated. -->
      <xsl:with-param name="rounded" select="'true'" />
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL" mode="hidden-action-round-corners">
    <xsl:apply-templates select="." mode="common" >
      <!-- Setting rounded parameter to true. This will indicate to our curam
           tag that rounded corners should be generated. -->
      <xsl:with-param name="rounded" select="'true'" />
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="ACTION_SET" mode="page-level-actions">

    <jsp:scriptlet>if ((!screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.MODAL)
                        || screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.TREE))
                      &amp;&amp; !screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.LIST_ROW_INLINE_PAGE)) {
    </jsp:scriptlet>
    <div>
      <xsl:attribute name="class">
        <xsl:choose>
          <xsl:when test="$help-node/@INCLUDE = 'true'">
            <xsl:text>page-level-menu</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>page-level-menu help-disabled</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
        <xsl:if test="count(ACTION_CONTROL) = 1">
          <xsl:text> one</xsl:text>
        </xsl:if>
      </xsl:attribute>
    <xsl:choose>
      <xsl:when test="count(ACTION_CONTROL) &gt; 2">
       <div dojoType="curam.widget.DeferredDropDownButton"
            id="page-level-action-menu"
            title="${{pageScope.actionsMenuTitle}}">
         <span>
           <img src="/themes/v6/images/actions-page-nor.png"
                alt="${{pageScope.actionsMenuTitle}}">
           </img>
         </span>
         <script type="text/javascript">
           <xsl:text>require(["curam/widget/DeferredDropDownButton"], function() {
                     if(!curam.widgetTemplates){curam.widgetTemplates={};}
                     curam.widgetTemplates['page-level-action-menu']='&lt;div dojoType="dijit.Menu" class="expand-list-control"&gt;</xsl:text>

          <xsl:choose>
            <xsl:when test="CONDITION">
              <xsl:apply-templates select="../ACTION_SET" mode="conditional"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:apply-templates select="ACTION_CONTROL | SEPARATOR" mode="page-menu-item"/>
            </xsl:otherwise>
          </xsl:choose>

           <xsl:text>&lt;/div&gt;'; });</xsl:text>
         </script>
       </div>
      </xsl:when>
      <xsl:otherwise>
        <xsl:choose>
          <xsl:when test="CONDITION">
            <xsl:apply-templates select="../ACTION_SET" mode="conditional"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:apply-templates select="ACTION_CONTROL"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </div>
  <jsp:scriptlet>}</jsp:scriptlet>
  </xsl:template>

  <xsl:template match="SEPARATOR" mode="page-menu-item">
    <div dojoType="dijit.MenuSeparator"></div>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL" mode="page-menu-item">
    <xsl:apply-templates select="." >
      <xsl:with-param name="is-page-menu" select="'true'" />
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL" mode="in-menu-tab">
      <xsl:if test="parent::MENU/@MODE = 'IN_PAGE_NAVIGATION'">
        <xsl:choose>
          <xsl:when test="@STYLE = 'in-page-current-link'">
            <script type="text/javascript">
            require(["curam/inPageNavigation", "curam/widget/_TabButton"]);
            </script>
            <div dojoType="dijit.layout.ContentPane" title="{@LABEL}" selected="true">
              <xsl:apply-templates select="." mode="common"/>
            </div>
          </xsl:when>
          <xsl:otherwise>
            <div dojoType="dijit.layout.ContentPane" title="{@LABEL}">
              <xsl:apply-templates select="." mode="common"/>
            </div>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:if>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL" mode="common">
    <xsl:param name="is-page-menu" />
    <xsl:param name="rounded" />
    <xsl:param name="action-control-sequence"/>
    
    <xsl:choose>
      <xsl:when test="(@ACTION_TYPE = 'SUBMIT'
                      or @ACTION_TYPE = 'SUBMIT_AND_DISMISS')">
        <xsl:call-template name="create-submit-button" >
          <xsl:with-param name="is-page-menu" select="$is-page-menu" />
          <xsl:with-param name="action-control-sequence" select="$action-control-sequence"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="@ACTION_TYPE = 'ACTION'">
        <xsl:choose>
          <xsl:when test="not(LINK)">
            <!-- No LINK means this is a "Cancel" button. -->
            <curam:link useReturnPageURL="true" title="{@LABEL}">
              <xsl:if test="$is-page-menu = 'true'">
                <xsl:attribute name="pageLevelAction">true</xsl:attribute>
              </xsl:if>
              <!-- If rounded parameter has been set to true by the rounded
                   corner xsl template, set roundedAction flag to
                   true. This indicates to the link tag that span elements need
                   to be generated into the anchor tag. -->
              <xsl:if test="$rounded = 'true'">
                <xsl:attribute name="roundedAction">true</xsl:attribute>
              </xsl:if>
              <xsl:apply-templates select="." mode="link-style">
                <xsl:with-param name="action-control-sequence" 
                                select="$action-control-sequence"/>
              </xsl:apply-templates>
              <xsl:apply-templates select="." mode="link-confirm"/>
              <xsl:apply-templates select="SCRIPT" mode="add-script-attributes"/>
              <xsl:apply-templates select="." mode="link-text-or-image"/>
            </curam:link>
          </xsl:when>
          <xsl:when test="LINK/@HOME_PAGE = 'true'">
            <curam:link homePage="true" title="{@LABEL}">
              <xsl:apply-templates select="." mode="link-style">
              <xsl:with-param name="action-control-sequence" 
                              select="$action-control-sequence"/>
              </xsl:apply-templates>
              <xsl:apply-templates select="." mode="link-text-or-image"/>
            </curam:link>
          </xsl:when>
          <xsl:otherwise>
            <xsl:call-template name="create-curam-link">
              <xsl:with-param name="is-page-menu" select="$is-page-menu" />
              <xsl:with-param name="rounded" select="$rounded" />
              <xsl:with-param name="action-control-sequence" 
                                select="$action-control-sequence"/>
            </xsl:call-template>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="@ACTION_TYPE = 'DISMISS'">
        <curam:popupReturn>
          <xsl:apply-templates select="LINK/LINK_PARAMETER"/>
          <xsl:apply-templates select="." mode="link-text-or-image"/>
        </curam:popupReturn>
      </xsl:when>
      <xsl:when test="@ACTION_TYPE = 'FILE_DOWNLOAD'">
        <curam:link uri="../servlet/FileDownload">
          <xsl:if test="parent::ACTION_SET/@TYPE='LIST_ROW_MENU'">
            <xsl:attribute name="listRowAction">true</xsl:attribute>
          </xsl:if>
          <xsl:if test="$is-page-menu = 'true'">
            <xsl:attribute name="pageLevelAction">true</xsl:attribute>
          </xsl:if>
          <xsl:if test="$rounded = 'true'">
            <xsl:attribute name="roundedAction">true</xsl:attribute>
          </xsl:if>
          <xsl:apply-templates select="." mode="link-style">
            <xsl:with-param name="action-control-sequence" 
                            select="$action-control-sequence"/>
          </xsl:apply-templates>
          <xsl:apply-templates select="SCRIPT" mode="add-script-attributes"/>
          <curam:linkParameter name="pageID" value="${{requestScope.pageId}}"/>
          <xsl:apply-templates select="LINK/LINK_PARAMETER"/>
          <xsl:apply-templates select="." mode="link-text-or-image"/>
        </curam:link>
      </xsl:when>
      <xsl:when test="@ACTION_TYPE = 'CLIPBOARD'">
        <curam:clip label="{@LABEL}">
          <xsl:apply-templates select="." mode="source-attributes"/>
          <xsl:call-template name="add-use-loop"/>
          <xsl:if test="@IMAGE">
            <xsl:attribute name="image">
              <xsl:value-of select="@IMAGE"/>
            </xsl:attribute>
          </xsl:if>
        </curam:clip>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <!-- Template for outputting a curam link. -->
  <xsl:template name="create-curam-link">
    <xsl:param name="is-page-menu"/>
    <xsl:param name="rounded"/>
    <xsl:param name="action-control-sequence"/>
    
    <curam:link newWindow="{LINK/@OPEN_NEW}"
                modalWindow="{LINK/@OPEN_MODAL}"
                windowOptions="{LINK/@WINDOW_OPTIONS}"
                dismissModal="{LINK/@DISMISS_MODAL}"
                useCurrentAsReturnParam="{LINK/@SAVE_LINK}">
      <xsl:choose>
        <xsl:when test="parent::ACTION_SET/@TYPE='LIST_ROW_MENU'">
          <xsl:attribute name="listRowAction">true</xsl:attribute>
        </xsl:when>
        <xsl:otherwise>
          <xsl:if test="count(parent::ACTION_SET/ACTION_CONTROL) &gt; 2
                        and not(ancestor::CLUSTER)
                        and $is-page-menu = 'true'">
            <xsl:attribute name="pageLevelAction">true</xsl:attribute>
          </xsl:if>
          <xsl:if test="$rounded = 'true'">
            <xsl:attribute name="roundedAction">true</xsl:attribute>
          </xsl:if>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:if test="ancestor::DISPLAY/ACTION_SET/ACTION_CONTROL">
          <xsl:attribute name="title">
          	<xsl:value-of select="@LABEL"/>
          </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates select="." mode="link-confirm"/>
      <xsl:apply-templates select="." mode="link-style">
        <xsl:with-param name="action-control-sequence" 
                        select="$action-control-sequence"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="." mode="link-uri"/>
      <xsl:apply-templates select="SCRIPT" mode="add-script-attributes"/>
      <xsl:apply-templates select="LINK/LINK_PARAMETER"/>
      <xsl:apply-templates select="." mode="link-text-or-image"/>
    </curam:link>
  </xsl:template>

  <!--
  Template for outputting a submit button. Must be called where the context
  is an ACTION_CONTROL element
  -->
  <xsl:template name="create-submit-button">
    <xsl:param name="is-page-menu"/>
    <xsl:param name="action-control-sequence"/>
    
    <xsl:variable name="use-image"
                  select="@IMAGE and ($action-set-images-enabled = 'true' or
                                      not(ancestor::ACTION_SET))"/>

    <curam:button name="{@ACTION_IDENTIFIER}">
      <xsl:if test="count(parent::ACTION_SET/ACTION_CONTROL) &gt; 2
                    and not(ancestor::CLUSTER)
                    and $is-page-menu = 'true'">
        <xsl:attribute name="pageLevelAction">true</xsl:attribute>
      </xsl:if>
      <xsl:apply-templates select="." mode="link-confirm"/>
      <xsl:attribute name="cssClass">
        <xsl:text>submit</xsl:text>
        <xsl:if test="$action-set-images-enabled = 'false'
                      and ancestor::ACTION_SET">
          <xsl:text> replace</xsl:text>
        </xsl:if>
        <xsl:if test="@DEFAULT = 'true'">
          <xsl:text> curam-default-action</xsl:text>
        </xsl:if>
        <xsl:if test="$action-control-sequence = 1">
          <xsl:text> first-action-control</xsl:text>
        </xsl:if>
      </xsl:attribute>
      <xsl:if test="$use-image">
        <xsl:attribute name="image">
          <xsl:value-of
                 select="concat($static-content-server-url, '/', @IMAGE)"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="LINK/@DISMISS_MODAL='false'">
        <!-- Do not close modal window when this button is clicked. -->
        <xsl:attribute name="dismissModalPageID">
          <xsl:value-of select="LINK/@PAGE_ID" />
        </xsl:attribute>
      </xsl:if>
      <xsl:attribute name="type">
        <xsl:choose>
          <xsl:when test="$use-image">image</xsl:when>
          <xsl:otherwise>submit</xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <xsl:apply-templates select="SCRIPT" mode="add-script-attributes"/>
      <xsl:value-of select="@LABEL"/>
    </curam:button>

    <xsl:if test="$action-set-images-enabled = 'false'
                  and ancestor::ACTION_SET
                  and not($is-page-menu = 'true')">
      <script type="text/javascript">
        <xsl:text>dojo.addOnLoad(function(){</xsl:text>
        <jsp:scriptlet>if (screenContext.hasContextBits(curam.omega3.taglib.ScreenContext.AGENDA)) {
        </jsp:scriptlet>
          <xsl:text>curam.util.optReplaceSubmitButton</xsl:text>
        <jsp:scriptlet>} else {</jsp:scriptlet>
          <xsl:text>curam.util.replaceSubmitButton</xsl:text>
        <jsp:scriptlet>}</jsp:scriptlet>
        <xsl:text>('</xsl:text>
          <xsl:value-of select="@ACTION_IDENTIFIER"/>
        <xsl:text>')});</xsl:text>
      </script>
    </xsl:if>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL" mode="link-style">
    <xsl:param name="action-control-sequence"/>
    
    <xsl:apply-templates select="." mode="add-css-class">
      <xsl:with-param name="attribute-name" select="'style'"/>
      <xsl:with-param name="other-classes">
        <xsl:if test="parent::MENU/@MODE = 'IN_PAGE_NAVIGATION'">
          <xsl:text>in-page-link</xsl:text>
        </xsl:if>
      </xsl:with-param>
      <xsl:with-param name="action-control-sequence" 
                      select="$action-control-sequence"/>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL" mode="link-confirm">
    <xsl:if test="@CONFIRM">
      <xsl:attribute name="onclick">
        <xsl:text>return confirm('</xsl:text>
        <xsl:value-of select="@CONFIRM"/>
        <xsl:text>')</xsl:text>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL | FIELD" mode="link-uri">
    <xsl:choose>
      <xsl:when test="LINK/@PAGE_ID">
        <xsl:attribute name="uri">
          <xsl:value-of select="concat(LINK/@PAGE_ID, 'Page.do')"/>
        </xsl:attribute>
      </xsl:when>
      <xsl:when test="LINK/@URI_BEAN">
        <xsl:attribute name="uriBean">
          <xsl:value-of select="LINK/@URI_BEAN"/>
        </xsl:attribute>
        <xsl:attribute name="uriField">
          <xsl:value-of select="LINK/@URI_FIELD"/>
        </xsl:attribute>
        <!--
        To set the "useLoop" attribute we need to check the SOURCE_IS_LIST
        attribute of the XIM LINK element. However, this template is currently
        processing either an ACTION_CONTROL or FIELD element, so we can't call
        the generic "add-use-loop" template (which uses the "current" element).
        Instead call a simple wrapper which changes context to the LINK element.
        -->
        <xsl:apply-templates select="LINK" mode="link-uri-add-use-loop" />
        <xsl:attribute name="external">true</xsl:attribute>
      </xsl:when>
      <xsl:otherwise>
        <xsl:attribute name="uri">
          <xsl:value-of select="LINK/@URI"/>
        </xsl:attribute>
        <xsl:attribute name="external">true</xsl:attribute>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  The generic add-use-loop template checks the SOURCE_IS_LIST attribute of the
  current XIM element. This template is a simple wrapper that matches the LINK
  element. It is used only by the  and is used only by the
  match="ACTION_CONTROL | FIELD" mode="link-uri" template above. See comment
  above.
  -->
  <xsl:template match="LINK" mode="link-uri-add-use-loop">
    <xsl:call-template name="add-use-loop"/>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL" mode="link-text-or-image">
    <xsl:choose>
      <!--
      Check first of all that @IMAGE exists AND only display the image if the
      configuration setting is true, OR if it is false and the ACTION_CONTROL
      is not within an ACTION_SET
      -->
      <xsl:when test="@IMAGE and ($action-set-images-enabled = 'true'
                                  or ($action-set-images-enabled = 'false'
                                      and not(ancestor::ACTION_SET)))">
        <img src="/{@IMAGE}" alt="{@LABEL}"/> 
      </xsl:when>
      <xsl:otherwise>
        <!-- image has empty alt tag so that screen reader ignores it. -->
        <img src="/themes/v6/images/meeting-view/blank.png"
             alt="" style="display:none"/>
        <xsl:value-of select="@LABEL"/>
        <!-- ellipsis support to action control which doesnt have IMAGE attribute set but APPEND_ELLIPSIS-->
        <xsl:if test="@APPEND_ELLIPSIS='true' and LINK/@OPEN_MODAL='true'">
          <xsl:text>&#8230;</xsl:text>
        </xsl:if>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL" mode="in-menu">
    <li>
      <xsl:if test="position() &gt; 1
                    and not(parent::MENU[@MODE = 'IN_PAGE_NAVIGATION'])">
        <xsl:text>|</xsl:text>
      </xsl:if>
      <xsl:apply-templates select="."/>
    </li>
  </xsl:template>

  <xsl:template match="IMAGE">
    <img alt="{@LABEL}" src="{concat('/', @IMAGE)}">
      <xsl:if test="@STYLE and not(normalize-space(@STYLE) = '')">
        <xsl:attribute name="class">
        </xsl:attribute>
      </xsl:if>
    </img>
  </xsl:template>

  <!--
  A LINK_PARAMETER adds a parameter to the end of the URI specified in a link.
  This is also used to add parameters to custom tags.
  -->
  <xsl:template match="LINK_PARAMETER">
    <curam:linkParameter name="{@NAME}">
      <xsl:call-template name="add-use-loop"/>
      <xsl:apply-templates select="." mode="source-attributes"/>
      <!--
      For the "description" parameter of pop-up return values, translate any
      code-table codes to their descriptions.
      -->
      <xsl:if test="@NAME = 'description' and ../../@ACTION_TYPE = 'DISMISS'">
        <xsl:attribute name="translate">true</xsl:attribute>
      </xsl:if>
    </curam:linkParameter>
  </xsl:template>

  <!--
  LINK_PARAMETER elements used in the INLINE_PAGE element require different
  processing to "standard" link parameters.
  -->
  <xsl:template match="LINK_PARAMETER" mode="inline-page-parameters">
    <cing:param name="__o3inpageparam.{@NAME}">
      <xsl:attribute name="value">
        <xsl:choose>
          <xsl:when test="@PARAMETER_NAME">
            <xsl:value-of select="concat($param-pp, @PARAMETER_NAME)"/>
          </xsl:when>
          <xsl:when test="@SOURCE_BEAN and @SOURCE_FIELD">
            <xsl:value-of
              select="concat($si-pp, @SOURCE_BEAN, '/', @SOURCE_FIELD)"/>
            <!--
            loopIndex is set in page scoped by the LoopTag. Use expression
            language to get it's value. NB: This is zero based, path's are
            one-based, hence the "+1" below
            -->
            <xsl:if test="@SOURCE_IS_LIST = 'true'">
              <xsl:text>[${pageScope.loopIndex+1}]</xsl:text>
            </xsl:if>
          </xsl:when>
          <xsl:otherwise>INVALID_INPAGE_PATH</xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
    </cing:param>
  </xsl:template>

  <!--
  Copy the contents of a JSP scriptlet into the generated JSP. There is no
  check to see if the scriplet is the only content in the PAGE, and therefore
  to stop the output of the page header, side-bar, recent items list, etc.
  -->
  <xsl:template match="JSP_SCRIPTLET">
    <jsp:scriptlet>
      <xsl:value-of select="."/>
    </jsp:scriptlet>
  </xsl:template>

  <!-- Template for handling the DESCRIPTION element-->
  <xsl:template match="DESCRIPTION">
    <tr class="title">
      <td class="desc">
        <xsl:apply-templates select="DESCRIPTION_ELEMENT"/>
      </td>
    </tr>
  </xsl:template>

  <!--
  A CLUSTER can contain an optional ACTION_SET and any number of CLUSTER_ROW
  elements. The ACTION_SET may be repeated at the top and/or bottom of the
  CLUSTER. Titles and the main content are only generated if they are not
  empty.

  A LIST is displayed as a grid of values. The contained ACTION_CONTROL, FIELD
  and CONTAINER elements form rows that are repeated in a table. The elements'
  LABEL attributes are the headings for the columns in the table. The title or
  main content of the list is not generated if it is empty.
  -->
  <xsl:template match="CLUSTER | LIST" mode="common">
    <xsl:variable name="has-title" select="self::node()[@TITLE or TITLE]"/>
    <xsl:variable name="has-header"
        select="$has-title or self::node()[@DESCRIPTION or DESCRIPTION]"/>

    <xsl:variable name="behavior">
      <xsl:choose>
        <xsl:when test="$collapsible-clusters-enabled = 'false'
                        or @BEHAVIOR = 'NONE'">
          <xsl:value-of select="'NONE'"/>
        </xsl:when>
        <xsl:when test="@BEHAVIOR">
          <xsl:value-of select="@BEHAVIOR"/>
        </xsl:when>
        <xsl:otherwise>EXPANDED</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="collapsible">
      <xsl:choose>
        <xsl:when test="$behavior = 'EXPANDED' or $behavior = 'COLLAPSED'">
          <xsl:text>true</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>false</xsl:text>
          <xsl:value-of select="$behavior"></xsl:value-of>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!--
    LISTs can now have a second type of action set for the new row actions menu.
    Therefore only the "default" action set type should be output here.
    -->
    <xsl:apply-templates
      select="ACTION_SET[@TOP = 'true' and (not(@TYPE) or @TYPE='DEFAULT')]"/>
    <div>
      <xsl:apply-templates select="." mode="add-css-class">
        <xsl:with-param name="other-classes">
          <xsl:choose>
            <xsl:when test="self::CLUSTER and ($has-header and not(TITLE/TITLE_ELEMENT/@VALUE='' or @TITLE=''))">
              <xsl:text> cluster-with-header</xsl:text>
            </xsl:when>
            <xsl:when test="self::LIST and $has-header">
              <xsl:text> list-with-header</xsl:text>
            </xsl:when>
            <xsl:when test="self::CLUSTER and (not($has-header) or ($has-header and (TITLE/TITLE_ELEMENT/@VALUE='' or @TITLE='')))">
              <xsl:text> cluster-with-no-header</xsl:text>
            </xsl:when>
          </xsl:choose>
          <xsl:choose>
            <xsl:when test="$has-title">
              <xsl:choose>
                <xsl:when test="$behavior = 'COLLAPSED'">
                  <xsl:text> init-collapsed is-collapsed</xsl:text>
                </xsl:when>
                <xsl:when test="$behavior = 'EXPANDED'">
                  <xsl:text> is-uncollapsed</xsl:text>
                </xsl:when>
              </xsl:choose>
            </xsl:when>
          </xsl:choose>
          <xsl:if test="self::CLUSTER">
            <xsl:choose>
              <xsl:when test="@LAYOUT_ORDER = 'FIELD'">
                <xsl:text> field-label</xsl:text>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text> label-field</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:if>
        </xsl:with-param>
      </xsl:apply-templates>

      <xsl:if test="@WIDTH">
        <xsl:attribute name="style">
          <xsl:value-of select="concat('width: ', @WIDTH, '%;')"/>
        </xsl:attribute>
      </xsl:if>

      <!-- Adding hasLyout div for scrollbar solution -->
      <div style="zoom:1;">
        <xsl:if test="((@TITLE or TITLE) and not (TITLE/TITLE_ELEMENT/@VALUE = '' or @TITLE = '')) or DESCRIPTION or @DESCRIPTION">
          <div class="header-wrapper">
            <xsl:apply-templates select="." mode="cluster-list-header">
              <xsl:with-param name="collapsible" select="$collapsible"/>
              <xsl:with-param name="behavior" select="$behavior"/>
            </xsl:apply-templates>
              <xsl:attribute name="title">
                <xsl:value-of select="@TITLE"/>
              </xsl:attribute>
          </div>
        </xsl:if>

        <xsl:apply-templates mode="main-content"
            select="self::node()[ACTION_CONTROL or FIELD or CONTAINER
                               or WIDGET or FOOTER_ROW or CLUSTER_ROW]"/>
      </div>
    </div>
    <!--
    LISTs can now have a second type of action set for the new row actions menu.
    Therefore only the "default" action set type should be output here.
    -->
    <xsl:apply-templates
       select="ACTION_SET[@BOTTOM = 'true'
                          and (not(@TYPE) or @TYPE = 'DEFAULT')]"/>
  </xsl:template>

  <xsl:template match="CLUSTER" mode="main-content">
    <xsl:param name="scrollable-id" select="generate-id()"/>

    <xsl:variable name="scrollbar">
      <xsl:choose>
        <xsl:when test="$curam-config/SCROLLBAR_CONFIG
                          /ENABLE_SCROLLBARS[@TYPE = 'CLUSTER']/@MAX_HEIGHT">
          <xsl:choose>
            <xsl:when test="@SCROLL_HEIGHT = -1">
              <xsl:text>false</xsl:text>
            </xsl:when>
            <xsl:otherwise>
              <xsl:text>true</xsl:text>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:otherwise>
          <xsl:choose>
            <xsl:when test="@SCROLL_HEIGHT > 0">
              <xsl:text>true</xsl:text>
            </xsl:when>
            <xsl:otherwise>
              <xsl:text>false</xsl:text>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="maxHeight">
      <xsl:choose>
        <xsl:when test="@SCROLL_HEIGHT > 0">
          <xsl:value-of select="@SCROLL_HEIGHT"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of
            select="$curam-config/SCROLLBAR_CONFIG
                      /ENABLE_SCROLLBARS[@TYPE = 'CLUSTER']/@MAX_HEIGHT"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$scrollbar = 'true'">
        <div class="scrollable">
          <xsl:attribute name="id">
            <xsl:value-of select="concat('scrollable',$scrollable-id)"/>
          </xsl:attribute>
          <xsl:attribute name="style">
            <xsl:value-of select="concat('max-height: ', $maxHeight, 'px;')"/>
          </xsl:attribute>
          <xsl:call-template name="cluster-table"/>
        </div>
        <script type="text/javascript">
          <xsl:value-of select="concat('curam.util.alterScrollableListBottomBorder',
                                       '(&quot;scrollable', $scrollable-id,
                                       '&quot;,', $maxHeight, ');')"/>
        </script>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="cluster-table"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="cluster-table">
    <xsl:variable name="show-labels" select="@SHOW_LABELS = 'true'"/>
    <xsl:variable name="is-field-first" select="@LAYOUT_ORDER = 'FIELD'"/>
    <xsl:variable name="num-cols" select="number(@NUM_COLUMNS)"/>
    <xsl:variable name="label-width" select="@LABEL_WIDTH div $num-cols"/>
    <xsl:variable name="field-width"
                  select="(100 - @LABEL_WIDTH) div $num-cols"/>
    <xsl:variable name="default-field-width" select="100 div $num-cols"/>
    <xsl:variable name="header-id" select="generate-id()"/>

    <table cellspacing="0" cellpadding="0" role="presentation">
      <xsl:if test="CLUSTER_ROW/FIELD/@TARGET_FIELD
                          or CLUSTER_ROW/CONTAINER/FIELD/@TARGET_FIELD">
        <xsl:attribute name="class">input-cluster</xsl:attribute>
      </xsl:if>
     
       <xsl:choose>
         <xsl:when test="@SHOW_LABELS = 'false' or CLUSTER_ROW/CLUSTER
                            or CLUSTER_ROW/LIST" >
           <xsl:if test= "@SHOW_LABELS = 'false' or CLUSTER_ROW/FIELD/@HEIGHT &lt; 2 ">
             <xsl:attribute name="role">presentation</xsl:attribute>
           </xsl:if>
         </xsl:when>
         <xsl:otherwise>
         <!-- 
          Accessibility: 
          Replace title attribute with summary attribute in a CLUSTER table or a
          LIST table. Summary attribute should only be added if table does not
          have a role of presentation.
         -->
         <xsl:choose>
           <xsl:when test="@SUMMARY">
             <xsl:attribute name="summary">
               <xsl:value-of select="@SUMMARY"/>
             </xsl:attribute>
           </xsl:when>
           <xsl:when test="@TITLE">
             <xsl:attribute name="summary">
               <xsl:value-of select="@TITLE"/>
             </xsl:attribute>
           </xsl:when>
         </xsl:choose>
        </xsl:otherwise>
       </xsl:choose>

      <xsl:call-template name="output-col">
        <xsl:with-param name="show-labels" select="$show-labels"/>
        <xsl:with-param name="first-col-width">
          <xsl:choose>
            <xsl:when test="$is-field-first">
              <xsl:value-of select="$field-width"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$label-width"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:with-param>
        <xsl:with-param name="second-col-width">
          <xsl:choose>
            <xsl:when test="$is-field-first">
              <xsl:value-of select="$label-width"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$field-width"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:with-param>
        <xsl:with-param name="label-width" select="$label-width"/>
        <xsl:with-param name="default-field-width"
                        select="$default-field-width"/>
        <xsl:with-param name="count" select="$num-cols"/>
      </xsl:call-template>

      <tbody>
        <xsl:choose>
          <xsl:otherwise>
            <xsl:apply-templates select="CLUSTER_ROW">
              <xsl:with-param name="show-labels" select="$show-labels"/>
              <xsl:with-param name="is-field-first" select="$is-field-first"/>
              <xsl:with-param name="header-id" select="$header-id"/>
            </xsl:apply-templates>
          </xsl:otherwise>
        </xsl:choose>
      </tbody>
    </table>
  </xsl:template>

  <xsl:template name="output-col">
    <xsl:param name="show-labels"/>
    <xsl:param name="first-col-width"/>
    <xsl:param name="second-col-width"/>
    <xsl:param name="label-width"/>
    <xsl:param name="default-field-width"/>
    <xsl:param name="count"/>

    <xsl:if test="$count &gt; 0">
      <xsl:choose>
        <xsl:when test="$show-labels">
          <col width="{$first-col-width}%"/>
          <col width="{$second-col-width}%"/>
        </xsl:when>
        <xsl:when test="$label-width">
          <xsl:choose>
            <xsl:when test="$count mod 2 = 0">
              <col width="{$second-col-width * 2}%"/>
            </xsl:when>
            <xsl:otherwise>
              <col width="{$first-col-width * 2}%"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:otherwise>
          <col width="{$default-field-width}%"/>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:call-template name="output-col">
        <xsl:with-param name="show-labels" select="$show-labels"/>
        <xsl:with-param name="first-col-width" select="$first-col-width"/>
        <xsl:with-param name="second-col-width" select="$second-col-width"/>
        <xsl:with-param name="label-width" select="$label-width"/>
        <xsl:with-param name="default-field-width"
                        select="$default-field-width"/>
        <xsl:with-param name="count" select="$count - 1"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="CLUSTER | LIST" mode="cluster-list-header">
    <xsl:param name="collapsible"/>
    <xsl:param name="behavior"/>
    
    <xsl:if test="TITLE or @TITLE">
      <h3>
        <!-- tooltip  for cluster title-->
        <xsl:if test="@TITLE and not(@TITLE= '')">
        <xsl:attribute name="title"> <xsl:value-of select="@TITLE"/></xsl:attribute>
          </xsl:if>
        <xsl:choose>
          <xsl:when test="$collapsible = 'true'">
            <xsl:attribute name="class">collapse</xsl:attribute>
          </xsl:when>
        </xsl:choose>

        <span>
          <xsl:attribute name="class">
            <xsl:text>collapse-title</xsl:text>
          </xsl:attribute>
          <xsl:choose>
            <xsl:when test="TITLE">
              <xsl:apply-templates select="TITLE/TITLE_ELEMENT"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="@TITLE"/>
              <!-- Add a result count to the title of lists on search pages. -->
              <xsl:variable name="search-page"
                            select="ancestor::PAGE/descendant::ACTION_SET
                                    /ACTION_CONTROL[@ACTION_TYPE = 'SUBMIT']
                                    /LINK[@PAGE_ID = 'THIS']"/>
              <xsl:if test="self::LIST and $search-page">
                <curam:displayRecordNumber sourceBean="{@LOOP_BEAN}"
                                           sourceField="{@LOOP_FIELD}"/>
              </xsl:if>
            </xsl:otherwise>
          </xsl:choose>
        </span>
            <!-- tooltip  for cluster title-->
            <xsl:if test="TITLE and not (TITLE/TITLE_ELEMENT/@VALUE = '' )" >
            <xsl:attribute name="title"><xsl:apply-templates select="TITLE/TITLE_ELEMENT"/></xsl:attribute>
            </xsl:if>
      </h3>
      <span title="${{clusterToggleArrow}}">
          <xsl:attribute name="class">
            <xsl:text>grouptoggleArrow</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="tabIndex">
            <xsl:text>0</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="onclick">
            <xsl:text>toggleCluster(this,arguments[0]);</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="onKeyPress">
              <xsl:text>if(curam.util.enterKeyPress(event)){toggleCluster(this,arguments[0]);}</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="role">
            <xsl:text>button</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="aria-label">
            <xsl:value-of select="$curam-cluster-toggle-spantext"/>
          </xsl:attribute>
          <xsl:attribute name="aria-expanded">
            <xsl:choose>
              <xsl:when test="$behavior = 'COLLAPSED'">
                <xsl:text>false</xsl:text>
              </xsl:when>
              <xsl:when test="$behavior = 'EXPANDED'">
                <xsl:text>true</xsl:text>
              </xsl:when>
            </xsl:choose>
          </xsl:attribute>
          <xsl:text>&amp;nbsp;</xsl:text>
          <span>
          <xsl:attribute name="class">
            <xsl:text>hidden</xsl:text>
          </xsl:attribute>
          <xsl:text></xsl:text>
            <xsl:value-of select="$curam-cluster-toggle-spantext"/>
         </span>
        </span>
    </xsl:if>
    <xsl:if test="DESCRIPTION or @DESCRIPTION">
      <p class="description">
        <xsl:choose>
          <xsl:when test="DESCRIPTION">
            <xsl:apply-templates select="DESCRIPTION/DESCRIPTION_ELEMENT"/>
            <!-- tooltip for cluster description  -->
            <xsl:if test="DESCRIPTION and not (DESCRIPTION/DESCRIPTION_ELEMENT/@VALUE = '' )" >
            <xsl:attribute name="title"><xsl:apply-templates select="DESCRIPTION/DESCRIPTION_ELEMENT"/></xsl:attribute>
             </xsl:if>
          </xsl:when>
          <xsl:otherwise>
            <xsl:if test="@DESCRIPTION and not (@DESCRIPTION = '' )" >
            <xsl:attribute name="title"><xsl:value-of select="@DESCRIPTION"/></xsl:attribute>
             </xsl:if>
            <xsl:value-of select="@DESCRIPTION"/>
          </xsl:otherwise>
        </xsl:choose>
      </p>
    </xsl:if>
  </xsl:template>

  <xsl:template match="CLUSTER" mode="cluster-wizard">
    <div id="wizardHolder" class="cluster-wizard">
      <xsl:apply-templates select="CLUSTER_ROW/FIELD[1]"/>
    </div>
  </xsl:template>

  <xsl:template match="CLUSTER | LIST" mode="in-cluster">
    <xsl:param name="show-labels"/>
    <xsl:param name="is-field-first"/>

    <td>
      <xsl:attribute name="class">
        <xsl:if test="position() = 1">
        <xsl:text>first-col </xsl:text>
        </xsl:if>
        <xsl:if test="position() = last()">
        <xsl:text>last-col </xsl:text>
        </xsl:if>
        <xsl:text>top</xsl:text>
      </xsl:attribute>
      <xsl:if test="$show-labels">
        <xsl:attribute name="colspan">2</xsl:attribute>
      </xsl:if>
      <xsl:apply-templates select="."/>
    </td>
  </xsl:template>

  <xsl:template match="CLUSTER_ROW">
    <xsl:param name="show-labels"/>
    <xsl:param name="is-field-first"/>
    <xsl:param name="header-id"/>

    <!--
    Special handling for certain domains. In these cases, the cluster's <tbody>
    element will be empty and the renderer will be responsible for filling it
    in with rows and cells as needed. Any other fields in the CLUSTER_ROW will
    be ignored.
    -->
    <xsl:variable name="first-field" select="FIELD[1]"/>

    <xsl:choose>
      <xsl:when test="$first-field/@DOMAIN = 'PARAM_TAB_LIST'">
        <xsl:apply-templates select="$first-field"/>
      </xsl:when>
      <xsl:when test="$first-field/@DOMAIN = 'ADDRESS_DATA'">
        <xsl:if test="$first-field/@MANDATORY = 'true' and not($show-labels)">
          <div>
            <img src="/themes/classic/images/icons/mandatory.gif"
                 alt="${o3_mandatoryTooltipText}"
                 title="${o3_mandatoryTooltipText}"/>
          </div>
        </xsl:if>
        <xsl:apply-templates select="$first-field"/>
      </xsl:when>
      <xsl:when test="$first-field/@DOMAIN = 'SCHEDULE_DATA'">
        <xsl:apply-templates select="$first-field" mode="output-schedule"/>
      </xsl:when>
      <xsl:otherwise>
        <tr>
          <xsl:apply-templates mode="in-cluster">
            <xsl:with-param name="show-labels" select="$show-labels"/>
            <xsl:with-param name="is-field-first" select="$is-field-first"/>
            <xsl:with-param name="header-id" select="concat($header-id, '-', position())"/>
          </xsl:apply-templates>

          <xsl:if test="position() = last()">
            <xsl:call-template name="repeat-cell">
              <xsl:with-param name="show-labels" select="$show-labels"/>
              <xsl:with-param name="is-field-first" select="$is-field-first"/>
              <xsl:with-param name="header-id" select="concat($header-id, '-', position())"/>
              <xsl:with-param name="count"
                select="../@NUM_COLUMNS - count(EMPTY_FIELD | FIELD | CONTAINER
                                                | CLUSTER | WIDGET | LIST)"/>
            </xsl:call-template>
          </xsl:if>
        </tr>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="repeat-cell">
    <xsl:param name="show-labels"/>
    <xsl:param name="is-field-first"/>
    <xsl:param name="count"/>
    <xsl:param name="header-id"/>
    <xsl:variable name="full-header-id" 
                  select="concat($header-id, '-', position())" />

    <xsl:if test="$count &gt; 0">
      <xsl:call-template name="repeat-cell">
        <xsl:with-param name="show-labels" select="$show-labels"/>
        <xsl:with-param name="is-field-first" select="$is-field-first"/>
        <xsl:with-param name="count" select="$count - 1"/>
      </xsl:call-template>
      <th id="{$full-header-id}-b">
        <xsl:attribute name="class">
          <xsl:text>cluster-pad</xsl:text>
          <xsl:if test="$count = 1">
            <xsl:text>-first</xsl:text>
          </xsl:if>
        </xsl:attribute>
        <xsl:text>&amp;nbsp;</xsl:text>
      </th>
      <xsl:if test="$show-labels">
        <td class="cluster-pad" headers="{$full-header-id}-b"/>
      </xsl:if>
    </xsl:if>
  </xsl:template>

  <!--
  A CONTAINER can appear in a LIST or a CLUSTER in place of a FIELD and can
  contain FIELD elements and ACTION_CONTROL elements laid out horizontally.
  -->
  <xsl:template match="CONTAINER">
    <xsl:param name="packForPagination" select="'false'" />

    <span>
      <xsl:apply-templates select="." mode="add-css-class"/>
      <xsl:if test="@WIDTH and not(parent::LIST)">
        <xsl:attribute name="style">
          <xsl:value-of select="concat('width: ', @WIDTH, '%;')"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates mode="in-container">
        <xsl:with-param name="packForPagination" select="'true'" />
      </xsl:apply-templates>
    </span>
  </xsl:template>

  <xsl:template match="ACTION_CONTROL | IMAGE | FIELD | WIDGET"
                mode="in-container">
    <xsl:param name="packForPagination" select="'false'" />

    <!--
    Add the separator, but not for "conditional" elements: they will handle
    the separator themselves to ensure it is placed inside the conditional
    block. Note that if the first element is conditional and is not displayed,
    then the next displayed element will add a redundant leading separator;
    there is no easy way to avoid that.
    -->
    <xsl:if test="not(self::*[CONDITION]) and position() != 1">
      <span class="separator">
        <xsl:value-of select="../@SEPARATOR"/>
      </span>
    </xsl:if>
    <xsl:apply-templates select="." mode="add-hidden-label-setter"/>
    <xsl:apply-templates select=".">
      <xsl:with-param name="packForPagination" select="'true'" />
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="LIST" mode="main-content">
    <xsl:param name="scrollable-id" select="generate-id()"/>
    <xsl:param name="pagination-id" select="generate-id()"/>

    <xsl:variable name="scrollbar">
      <xsl:choose>
        <xsl:when test="$curam-config/SCROLLBAR_CONFIG/ENABLE_SCROLLBARS[@TYPE = 'LIST']/@MAX_HEIGHT">
          <xsl:choose>
            <xsl:when test="@SCROLL_HEIGHT = -1"><xsl:text>false</xsl:text></xsl:when>
            <xsl:otherwise><xsl:text>true</xsl:text></xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:otherwise>
          <xsl:choose>
            <xsl:when test="@SCROLL_HEIGHT > 0"><xsl:text>true</xsl:text></xsl:when>
            <xsl:otherwise><xsl:text>false</xsl:text></xsl:otherwise>
          </xsl:choose>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="maxHeight">
      <xsl:choose>
        <xsl:when test="@SCROLL_HEIGHT > 0">
          <xsl:value-of select="@SCROLL_HEIGHT"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$curam-config/SCROLLBAR_CONFIG/ENABLE_SCROLLBARS[@TYPE = 'LIST']/@MAX_HEIGHT" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="listPaginationEnabled">
      <xsl:choose>
        <!-- no pagination for the scrollable list -->
        <xsl:when test="$scrollbar = 'true'">false</xsl:when>
        <!-- no pagination for the MULTISELECT widget currently  -->
        <xsl:when test="child ::CONTAINER/WIDGET[@TYPE = 'MULTISELECT']
                        or child::WIDGET[@TYPE = 'MULTISELECT']">false</xsl:when>
        <xsl:when test="@PAGINATED"><xsl:value-of select="@PAGINATED"/></xsl:when>
        <xsl:otherwise>
          <xsl:choose>
            <xsl:when test="$curam-config/PAGINATION"><xsl:value-of select="$curam-config/PAGINATION/@ENABLED"/></xsl:when>
            <xsl:otherwise><xsl:text>true</xsl:text></xsl:otherwise>
          </xsl:choose>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="listPageHeight">
      <xsl:choose>
        <xsl:when test="$listPaginationEnabled='true'">
          <xsl:choose>
            <xsl:when test="@PAGINATED_HEIGHT"><xsl:value-of select="@PAGINATED_HEIGHT"/></xsl:when>
            <xsl:otherwise>
              <xsl:choose>
                <xsl:when test="$curam-config/PAGINATION and $curam-config/PAGINATION/DEFAULT_PAGE_SIZE">
                  <xsl:value-of select="$curam-config/PAGINATION/DEFAULT_PAGE_SIZE"/>
                </xsl:when>
                <xsl:otherwise><xsl:text>15</xsl:text></xsl:otherwise>
              </xsl:choose>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:otherwise><xsl:text>0</xsl:text></xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="listPageThreshold">
      <xsl:choose>
        <xsl:when test="$listPaginationEnabled='true'">
          <xsl:choose>
            <xsl:when test="@PAGINATED_THRESHOLD">
              <xsl:value-of select="@PAGINATED_THRESHOLD"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:choose>
                <xsl:when test="$curam-config/PAGINATION
                      and $curam-config/PAGINATION/PAGINATION_THRESHOLD">
                  <xsl:value-of
                    select="$curam-config/PAGINATION/PAGINATION_THRESHOLD"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="$listPageHeight"/>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>0</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!-- Put together a unique identifier of the list to be used
     for list-specific data storage. -->
    <xsl:variable name="list-id" select="concat(concat(ancestor::PAGE/@PAGE_ID, '-'), generate-id())"/>
    <xsl:variable name="list-id-class" select="concat('list-id-', $list-id)"/>


    <xsl:choose>
      <xsl:when test="$scrollbar = 'true'">
        <!--
        Scrollable lists are implemented with two tables, one for the
        header the other for the scollable body. First the "header table" is
        ouput.
        -->
        <xsl:apply-templates select="."
          mode="scrollable-list-column-header-table"/>

        <div class="scrollable">
          <xsl:attribute name="id"><xsl:value-of select="concat('scrollable',$scrollable-id)"/></xsl:attribute>
          <xsl:attribute name="style"><xsl:value-of select="concat('height: ', $maxHeight, 'px;')"/></xsl:attribute>
          <xsl:apply-templates select="." mode="list-table">
            <xsl:with-param name="pagination-enabled" select="$listPaginationEnabled"/>
            <xsl:with-param name="listPageHeight" select="$listPageHeight"/>
            <xsl:with-param name="pagination-id" select="$pagination-id"/>
            <xsl:with-param name="list-id-class" select="$list-id-class"/>
            <xsl:with-param name="scrollable-list-body-table" select="'true'"/>
          </xsl:apply-templates>
        </div>
        <script type="text/javascript">
          <xsl:value-of select="concat('curam.util.alterScrollableListBottomBorder(&quot;scrollable', $scrollable-id, '&quot;&#44;', $maxHeight, ');')"/>
        </script>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="." mode="list-table">
          <xsl:with-param name="pagination-enabled" select="$listPaginationEnabled"/>
          <xsl:with-param name="listPageHeight" select="$listPageHeight"/>
          <xsl:with-param name="pagination-id" select="$pagination-id"/>
          <xsl:with-param name="list-id-class" select="$list-id-class"/>
        </xsl:apply-templates>
      </xsl:otherwise>
    </xsl:choose>

    <!-- Add the script that will add pagination. -->
    <xsl:if test="$listPaginationEnabled='true'">
      <script type="text/javascript">
        <xsl:text>require(["curam/pagination"]);</xsl:text>
        <jsp:scriptlet>
          curam.util.client.jsp.JspUtil.outputListPaginationProps(pageContext);
        </jsp:scriptlet>
        <xsl:text>dojo.addOnLoad(function() {</xsl:text>
        <xsl:text>curam.pagination.defaultPageSize=</xsl:text><xsl:value-of select="$listPageHeight"/><xsl:text>;</xsl:text>
        <xsl:text>curam.pagination.threshold=</xsl:text><xsl:value-of select="$listPageThreshold"/><xsl:text>;</xsl:text>
        <xsl:choose>
          <xsl:when test="./DETAILS_ROW">
            <xsl:text>require(["curam/pagination/ExpandableListModel"]);</xsl:text>
            <xsl:text>var listModel = new curam.pagination.ExpandableListModel("</xsl:text>
              <xsl:value-of select="$pagination-id"/><xsl:text>");</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>require(["curam/pagination/DefaultListModel"]);</xsl:text>
            <xsl:text>var listModel = new curam.pagination.DefaultListModel("</xsl:text>
              <xsl:value-of select="$pagination-id"/><xsl:text>");</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
        <xsl:text>curam.pagination.addPagination(listModel, dojo.query("div#pagination-gui-</xsl:text>
        <xsl:value-of select="$pagination-id"/>
        <xsl:text>")[0]);</xsl:text>
        <xsl:text>});</xsl:text>
      </script>
    </xsl:if>

    <xsl:if test="./DETAILS_ROW">
     <script type="text/javascript">
      <!-- Set the minimum allowed height for expanded details row in this list. -->
      <xsl:text>curam.util.ExpandableLists.setMinimumExpandedHeight('</xsl:text>
      <xsl:value-of select="$list-id"/>
      <xsl:text>', </xsl:text>
      <xsl:choose>
        <xsl:when test="./DETAILS_ROW/@MINIMUM_EXPANDED_HEIGHT">
          <xsl:value-of select="./DETAILS_ROW/@MINIMUM_EXPANDED_HEIGHT"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>30</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:text>);</xsl:text>

      <!-- Load data for this list. -->
      <!-- Intentionally running this AFTER the list model is created as they
        both affect the expanded state of detail rows and this code
        must "win". -->
      <xsl:text>curam.util.ExpandableLists.loadStateData('</xsl:text>
      <xsl:value-of select="$list-id"/>
      <xsl:text>');</xsl:text>
    </script>
  </xsl:if>

  </xsl:template>
  <!--
  When a scrollable list is used (SCROLL_HEIGHT attribute), the table headers
  have to remain fixed and table body has to scroll independantly. Browsers do
  not support this behaviour natively so we implement it with two separate
  tables, one for the fixed header, the other for the scrolling body. See
  TEC-3313 for full details.

  This template outputs the table containing the lists column headers.
  -->
  <xsl:template match="LIST" mode="scrollable-list-column-header-table">
    <xsl:variable name="list-content"
      select="ACTION_CONTROL | FIELD | CONTAINER | WIDGET"/>

    <xsl:variable name="column-count"
      select="count($list-content | DETAILS_ROW | ACTION_SET[@TYPE='LIST_ROW_MENU'])"/>

    <table class="scrollable-list-header-table" cellspacing="0" role="presentation"
      aria-ignore="true" aria-hidden="true">
      <xsl:if test="not(@SORTABLE = 'false')">
        <xsl:attribute name="id">
          <xsl:value-of select="concat('sortable_', generate-id(.),'_hdr')"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates select="." mode="scrollable-list-columns"/>
      <xsl:apply-templates select="." mode="list-header">
        <xsl:with-param name="list-content" select="$list-content" />
        <xsl:with-param name="scrollable-list-header-table" select="'true'"/>
        <xsl:with-param name="column-count" select="$column-count"/>
      </xsl:apply-templates>
      <!--  We have to output a dummy body to satisfy (X)HTML validation. -->
      <tbody style="display:none;"><tr><td> </td></tr></tbody>
    </table>
  </xsl:template>

  <xsl:template match="LIST" mode="list-table">
    <xsl:param name="pagination-id"/>
    <xsl:param name="pagination-enabled"/>
    <xsl:param name="listPageHeight"/>
    <xsl:param name="list-id-class"/>
    <xsl:param name="scrollable-list-body-table" select="'false'"/>

    <xsl:variable name="content"
      select="ACTION_CONTROL | FIELD | CONTAINER | WIDGET"/>
    <!--
    The "fixed position" columns for DETAILS_ROW and LIST_ROW_MENU action sets
    have to be included in the column count
    -->
    <xsl:variable name="column-count"
      select="count($content | DETAILS_ROW | ACTION_SET[@TYPE='LIST_ROW_MENU'])"/>

    <table cellspacing="0">
      <xsl:attribute name="class">
        <xsl:choose>
          <!-- If it is expandable list add list id. -->
          <xsl:when test="./DETAILS_ROW">
            <xsl:choose>
              <xsl:when test="not(FIELD[@LABEL]) and not(CONTAINER[@LABEL])">
                <xsl:value-of select="concat($list-id-class, ' no-header paginated-list-id-', $pagination-id)"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="concat($list-id-class, ' paginated-list-id-', $pagination-id)"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:when>
          <xsl:otherwise>
            <xsl:choose>
              <xsl:when test="not(FIELD[@LABEL]) and not(CONTAINER[@LABEL])">
                <xsl:value-of select="concat('no-header paginated-list-id-', $pagination-id)"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="concat('paginated-list-id-', $pagination-id)"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      
      <!-- 
      Accessibility: nethra
      Replace title attribute with summary attribute in a 
      CLUSTER table or a LIST table.
      -->
      <xsl:choose>
        <xsl:when test="@SUMMARY">
          <xsl:attribute name="summary">
            <xsl:value-of select="@SUMMARY"/>
          <xsl:if test="$pagination-enabled='true'">
            <xsl:text>. ${o3_paginationSummaryPrompt}</xsl:text>
         </xsl:if>
         </xsl:attribute>
         </xsl:when>
        <xsl:when test="@TITLE">
          <xsl:attribute name="summary">
            <xsl:value-of select="@TITLE"/>
              <xsl:if test="$pagination-enabled='true'">
                <xsl:text>. ${o3_paginationSummaryPrompt}</xsl:text>
             </xsl:if>
        </xsl:attribute>
        </xsl:when>
      </xsl:choose>

      <!-- Accessibility: If list does not have list headers a role of
           presentation should be added to the table. -->
      <xsl:if
        test="not(FIELD/@LABEL) and not(FIELD/TITLE) and not(CONTAINER/@LABEL)">
        <xsl:attribute name="role">
          <xsl:text>presentation</xsl:text>
        </xsl:attribute>
      </xsl:if>
      
      <xsl:if test="not(@SORTABLE = 'false')">
        <xsl:attribute name="id">
          <xsl:value-of select="concat('sortable_', generate-id(.))"/>
        </xsl:attribute>
      </xsl:if>

      <xsl:apply-templates select="." mode="list-columns">
         <xsl:with-param name="column-count" select="$column-count"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="." mode="list-header">
        <xsl:with-param name="list-content" select="$content"/>
        <xsl:with-param name="scrollable-list-body-table"
                        select="$scrollable-list-body-table"/>
        <xsl:with-param name="column-count" select="$column-count"/>
      </xsl:apply-templates>

      <xsl:if test="FOOTER_ROW">
        <tfoot>
          <!-- There may be more than one footer row. -->
          <xsl:apply-templates select="FOOTER_ROW"/>
        </tfoot>
      </xsl:if>
      <tbody>
        <xsl:choose>
          <xsl:when test="$preview = 'true'">
            <tr>
              <!--
              If a list has a DETAILS_ROW it will always be the first column
              -->
              <xsl:apply-templates select="DETAILS_ROW" mode="in-list"/>
              <xsl:apply-templates select="$content" mode="in-list">
                <xsl:with-param name="column-count" select="$column-count"/>
              </xsl:apply-templates>
              <!--
              If a list has a LIST_ROW_MENU it will always be the last column
              -->
              <xsl:if test="$preview = 'false'">
                <xsl:apply-templates select="ACTION_SET[@TYPE='LIST_ROW_MENU']"
                                     mode="in-list"/>
              </xsl:if>
              <xsl:if test="$preview = 'true'">
                <xsl:apply-templates select="ACTION_SET[@TYPE='LIST_ROW_MENU']"
                                             mode="preview-in-list"/>
              </xsl:if>
            </tr>
          </xsl:when>
          <xsl:otherwise>
          <xsl:choose>
          <xsl:when test="$pagination-enabled='true'">
            <!--
            To improve the performance of paginated lists, the list rows
            which are not displayed are wrapped in script tags (whose content
            is ignored by the browsers) enabling the overall list to load
            faster.

            The configured list page size is used to group the unseen list rows
            into blocks which are then wrapped in script tags. As the user
            selects a page number in the pagination widget, the relevent script
            tag is retrieved, its contents added to the list and the script tag
            removed.
            -->

            <!-- Variable needs to populate script tags. -->
            <c:set var="listPageSize" scope="page">
              <xsl:value-of select="$listPageHeight"/>
            </c:set>
            <jsp:scriptlet>{</jsp:scriptlet>
            <curam:loop>
              <xsl:apply-templates select="." mode="loop-path-attribute"/>

                <jsp:scriptlet>
                int listPageSize = Integer.parseInt((String) pageContext.getAttribute("listPageSize"));
                int index = ((Integer) pageContext.getAttribute("loopIndex")).intValue();</jsp:scriptlet>

                <xsl:variable name="hasRowActions" select="ACTION_SET/@TYPE = 'LIST_ROW_MENU'"/>
                <xsl:choose>
                  <xsl:when test="$hasRowActions">
                    <jsp:scriptlet>String scriptBlockClass = "hidden-list-rows has-row-actions numRows-";</jsp:scriptlet>
                  </xsl:when>
                  <xsl:otherwise>
                    <jsp:scriptlet>String scriptBlockClass = "hidden-list-rows numRows-";</jsp:scriptlet>
                  </xsl:otherwise>
                </xsl:choose>

                <jsp:scriptlet>if(index==0) {</jsp:scriptlet>
                <!-- Add an opening script tag for first page of pagination. -->
                <xsl:text>&lt;script type="list-row-container" class="</xsl:text>
                <jsp:scriptlet>out.print(scriptBlockClass + listPageSize);</jsp:scriptlet><xsl:text>" &gt;</xsl:text>
                <jsp:scriptlet>} else if((index%listPageSize)==0) {</jsp:scriptlet>
                  <!-- For second and subsequent page, create a script tag.
                   Add a closing script tag to close off previous script tag. -->
                  <xsl:text>&lt;/script&gt;&lt;script type="list-row-container" class="</xsl:text>
                  <jsp:scriptlet>out.print(scriptBlockClass + listPageSize);</jsp:scriptlet><xsl:text>" &gt;</xsl:text>
                <jsp:scriptlet>}</jsp:scriptlet>

              <tr>
                <xsl:attribute name="class">
                  <xsl:text>${pageScope.loopIndex%2==0?</xsl:text>
                  <xsl:text>'odd':'even'}</xsl:text>
                  <xsl:text>${pageScope.loopIndex==pageScope.loopIndexLimit?</xsl:text>
                  <xsl:text>'-last-row':''}</xsl:text>
                </xsl:attribute>
                <xsl:attribute name="style">
                  <xsl:text>display:none;</xsl:text>
                </xsl:attribute>
                <!-- If a list has a DETAILS_ROW it will always be the first column -->
                <xsl:apply-templates select="DETAILS_ROW" mode="in-list"/>
                <xsl:apply-templates select="$content" mode="in-list">
                  <xsl:with-param name="packForPagination" select="'true'" />
                  <xsl:with-param name="column-count" select="$column-count"/>
                </xsl:apply-templates>                <!--
                If a list has a LIST_ROW_MENU it will always be the last column
                -->
                <xsl:apply-templates select="ACTION_SET[@TYPE='LIST_ROW_MENU']"
                                     mode="in-list">
                  <xsl:with-param name="packForPagination" select="'true'" />
                </xsl:apply-templates>
              </tr>

              <xsl:if test="DETAILS_ROW">
                <cing:component style="curam-util-client::expandable-list-row">
                  <cing:param name="col-span" value="{$column-count}"/>
                  <xsl:if test="DETAILS_ROW/INLINE_PAGE/@PAGE_ID">
                    <cing:param name="PAGE_ID"
                      value="{DETAILS_ROW/INLINE_PAGE/@PAGE_ID}"/>
                  </xsl:if>
                  <cing:param name="list-row-parity" value="${{pageScope.loopIndex%2==0?'odd':'even'}}" />
                  <xsl:if test="DETAILS_ROW/INLINE_PAGE/@URI_BEAN">
                    <cing:param name="uri-source-path">
                      <xsl:attribute name="value">
                        <xsl:value-of select="concat($si-pp, DETAILS_ROW/INLINE_PAGE/@URI_BEAN, '/', DETAILS_ROW/INLINE_PAGE/@URI_FIELD)"/>
                        <!--
                        loopIndex is set in page scoped by the LoopTag. Use expression
                        language to get it's value. NB: This is zero based, path's are
                        one-based, hence the "+1" below
                        -->
                        <xsl:if test="DETAILS_ROW/INLINE_PAGE/@SOURCE_IS_LIST = 'true'">
                          <xsl:text>[${pageScope.loopIndex+1}]</xsl:text>
                        </xsl:if>
                      </xsl:attribute>
                    </cing:param>
                  </xsl:if>
                  <xsl:apply-templates
                    select="DETAILS_ROW/INLINE_PAGE/LINK_PARAMETER"
                    mode="inline-page-parameters" />
                </cing:component>
              </xsl:if>

              <!-- Add a closing script tag after last row entry to complete
              the wrapping of script tags around hidden list rows.
              -->
              <jsp:scriptlet>
              final Object loopIdxLimit = pageContext.getAttribute("loopIndexLimit");
              if (loopIdxLimit.equals(index)) {</jsp:scriptlet>
              <xsl:text>&lt;/script&gt;</xsl:text>
              <jsp:scriptlet>}</jsp:scriptlet>

            </curam:loop>
            <jsp:scriptlet>}</jsp:scriptlet>
          </xsl:when>
          <xsl:otherwise>
              <curam:loop>
              <xsl:apply-templates select="." mode="loop-path-attribute"/>
              <tr>
                <xsl:attribute name="class">
                  <xsl:text>${pageScope.loopIndex%2==0?</xsl:text>
                  <xsl:text>'odd':'even'}</xsl:text>
                  <xsl:text>${pageScope.loopIndex==pageScope.loopIndexLimit?</xsl:text>
                  <xsl:text>'-last-row':''}</xsl:text>
                </xsl:attribute>
                <xsl:if test="$pagination-enabled='true'">
                  <xsl:attribute name="style">
                    <xsl:text>display:none;</xsl:text>
                  </xsl:attribute>
                </xsl:if>

                <!--
                If a list has a DETAILS_ROW it will always be the first column
                -->
                <xsl:apply-templates select="DETAILS_ROW" mode="in-list"/>
                <xsl:apply-templates select="$content" mode="in-list">
                  <xsl:with-param name="column-count" select="$column-count"/>
                </xsl:apply-templates>
                <!--
                If a list has a LIST_ROW_MENU it will always be the last column
                -->
                <xsl:apply-templates select="ACTION_SET[@TYPE='LIST_ROW_MENU']"
                                     mode="in-list" />
              </tr>
              <xsl:if test="DETAILS_ROW">
                <cing:component style="curam-util-client::expandable-list-row">
                  <cing:param name="col-span" value="{$column-count}"/>
                  <xsl:if test="DETAILS_ROW/INLINE_PAGE/@PAGE_ID">
                    <cing:param name="PAGE_ID"
                      value="{DETAILS_ROW/INLINE_PAGE/@PAGE_ID}"/>
                  </xsl:if>
                  <cing:param name="list-row-parity" value="${{pageScope.loopIndex%2==0?'odd':'even'}}" />
                  <xsl:if test="DETAILS_ROW/INLINE_PAGE/@URI_BEAN">
                    <cing:param name="uri-source-path">
                      <xsl:attribute name="value">
                        <xsl:value-of select="concat($si-pp, DETAILS_ROW/INLINE_PAGE/@URI_BEAN, '/', DETAILS_ROW/INLINE_PAGE/@URI_FIELD)"/>
                        <!--
                        loopIndex is set in page scoped by the LoopTag. Use expression
                        language to get it's value. NB: This is zero based, path's are
                        one-based, hence the "+1" below
                        -->
                        <xsl:if test="DETAILS_ROW/INLINE_PAGE/@SOURCE_IS_LIST = 'true'">
                          <xsl:text>[${pageScope.loopIndex+1}]</xsl:text>
                        </xsl:if>
                      </xsl:attribute>
                    </cing:param>
                  </xsl:if>
                  <xsl:apply-templates
                    select="DETAILS_ROW/INLINE_PAGE/LINK_PARAMETER"
                    mode="inline-page-parameters" />
                </cing:component>
              </xsl:if>
            </curam:loop>
          </xsl:otherwise>
        </xsl:choose>

            <!-- Loop to populate an empty list with one row. -->
            <curam:loop isEmpty="true">
              <xsl:apply-templates select="." mode="loop-path-attribute"/>
              <tr>
                <xsl:attribute name="class">
                  <xsl:text>odd-last-row empty-row</xsl:text>
                </xsl:attribute>
                <xsl:apply-templates select="DETAILS_ROW" mode="in-list">
                  <xsl:with-param name="empty" select="1"/>
                </xsl:apply-templates>
                <xsl:apply-templates select="$content" mode="in-list">
                  <xsl:with-param name="empty" select="1"/>
                  <xsl:with-param name="column-count" select="$column-count"/>
                </xsl:apply-templates>
                <xsl:apply-templates select="ACTION_SET[@TYPE='LIST_ROW_MENU']"
                                     mode="in-list">
                  <xsl:with-param name="empty" select="1"/>
                </xsl:apply-templates>
              </tr>
            </curam:loop>
          </xsl:otherwise>
        </xsl:choose>
      </tbody>
    </table>

    <xsl:if test="$pagination-enabled='true'">
      <div>
        <xsl:attribute name="id">
          <xsl:value-of select="concat('pagination-gui-', $pagination-id)"/>
        </xsl:attribute>
        <xsl:attribute name="class">
          <xsl:text>pagination-gui-container</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="style">
          <xsl:text>display:none;</xsl:text>
        </xsl:attribute>
      </div>
    </xsl:if>

    <xsl:if test="not(@SORTABLE = 'false') and $preview != 'true'">
      <!-- Add the script that will enable sorting by the list's columns. -->
      <script type="text/javascript">
        require(["curam/util/ListSort"]);
        <xsl:choose>
          <xsl:when test="./DETAILS_ROW">
            <xsl:text>curam.util.ListSort.makeSortable("sortable_</xsl:text>
            <xsl:value-of select="generate-id(.)"/>
            <xsl:text>","</xsl:text>
            <xsl:value-of select="$pagination-id"/>
            <xsl:text>",true,"${listSortColAnchorText}");</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>curam.util.ListSort.makeSortable("sortable_</xsl:text>
            <xsl:value-of select="generate-id(.)"/>
            <xsl:text>","</xsl:text>
            <xsl:value-of select="$pagination-id"/>
            <xsl:text>",false,"${listSortColAnchorText}");</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </script>
    </xsl:if>
  </xsl:template>

  <xsl:template match="LIST" mode="list-header">
    <xsl:param name="list-content" />
    <xsl:param name="scrollable-list-header-table" select="'false'"/>
    <xsl:param name="scrollable-list-body-table" select="'false'"/>
    <xsl:param name="column-count" />
    <!-- This parameter indicates if this table header is being output for the
    "body table" of a scrollable list. If so, the header needs to be generated
    but hidden.
    -->
    <xsl:param name="scrollable-list-body-table" select="'false'" />
    <xsl:if
        test="FIELD/TITLE | FIELD/@LABEL | CONTAINER/@LABEL | WIDGET/@LABEL">
      <thead>
        <!--
        See TEC-3313 for details of the "two table" approach to
        providing fixed headers and a scrollable body in a UIM LIST. In the case
        of a scrollable list, the first table will have a visible header but
        no body, the second table will be the opposite with a body and hidden
        header.
        -->
        <xsl:if test="$scrollable-list-body-table = 'true'">
          <xsl:attribute name="class">hidden-table-header</xsl:attribute>
        </xsl:if>
        <!-- There is only one header row. -->
        <tr>
          <!--
          If a list has a DETIALS_ROW it will always be the first column
          -->
          <xsl:apply-templates select="DETAILS_ROW" mode="list-header" />
          <!--
          Indicate to the individual "list-header" tamplates that this is the
          header for the "body table" of a scrollable list. The templates can
          use this for filtering out duplicate content between the "header
          table" and "body table". (e.g. duplicate IDs on "th" cells)
          -->
          <xsl:apply-templates select="$list-content" mode="list-header">
            <xsl:with-param name="scrollable-list-header-table"
                            select="$scrollable-list-header-table"/>
            <xsl:with-param name="column-count" select="$column-count"/>
          </xsl:apply-templates>
          <!--
          If a list has a LIST_ROW_MENU it will always be the last column
          -->
          <xsl:apply-templates select="ACTION_SET[@TYPE = 'LIST_ROW_MENU']"
                               mode="list-header">
           <xsl:with-param name="scrollable-context" 
             select="$scrollable-list-header-table"/>
          </xsl:apply-templates>
          <!--
          In a fixed header, scrollable list (implemented with two tables),
          a dummy column, the width of a standard scrollbar, is added to ensure
          the columns of both tables line up.
          -->
          <xsl:if test="$scrollable-list-header-table = 'true'">
            <th class="scrollable-list-dummy-th"/>
          </xsl:if>
          <xsl:if test="$column-count = 1
                        and not($scrollable-list-header-table = 'true')">
            <th class="last-header dummy-field"/>
          </xsl:if>
        </tr>
      </thead>
    </xsl:if>
  </xsl:template>

  <xsl:template match="LIST" mode="scrollable-list-columns">
    <xsl:apply-templates select="." mode="list-columns" />
    <col class="scrollable-list-dummy-col" />
  </xsl:template>

  <xsl:template match="LIST" mode="list-columns">
    <xsl:param name="column-count" />
    <xsl:variable name="all-content"
                  select="ACTION_CONTROL | FIELD | WIDGET | CONTAINER"/>
    <!--
    DETAILS_ROW elements are always rendered as the first column in the list.
    The width is fixed at the required width for the expand/collapse icon to
    be displayed.
    -->
    <xsl:if test="DETAILS_ROW">
      <col class="list-row-expand-col"/>
    </xsl:if>
    <xsl:apply-templates select="$all-content" mode="list-column"/>
    <xsl:if test="ACTION_SET/@TYPE='LIST_ROW_MENU'">
      <col class="list-expand-action-col"/>
    </xsl:if>
    <xsl:if test="$column-count = 1">
     <col class="dummy-col"/>
   </xsl:if>
  </xsl:template>

  <xsl:template match="FIELD | WIDGET | CONTAINER | ACTION_CONTROL"
                mode="list-column">
    <col>
      <xsl:apply-templates select="." mode="add-css-class"/>
      <xsl:if test="@WIDTH">
        <xsl:attribute name="width">
          <xsl:value-of select="concat(@WIDTH, '%')"/>
        </xsl:attribute>
      </xsl:if>
    </col>
  </xsl:template>

  <!--
  The DETAILS_ROW element has to be handled separately from the other elements
  that make up columns in a list as we have to ensure it is always the first
  column, regardless of it's position in the source UIM document.

  The other columns (FIELD, WIDGET etc.) are handled by the "in-list" mode
  template below.
  -->
  <xsl:template match="DETAILS_ROW" mode="in-list">
    <xsl:param name="empty" select="0"/>
    <!-- Added scope row to solve accessibility issues on expandable lists. -->
    <td scope="row" class="first-field list-details-row-toggle-cell">
      <xsl:choose>
        <xsl:when test="$empty = 0">
          <xsl:choose>
            <xsl:when test="CONDITION">
              <!--
              The "conditional" mode template ends up calling the "common" mode,
              resulting in the toggle button wrapped in conditional logic.
              -->
              <xsl:apply-templates select="." mode="conditional"/>
            </xsl:when>
            <xsl:otherwise>
              <!--
              Just output the toggle button.
              -->
              <xsl:apply-templates select="." mode="common"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>&amp;nbsp;</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </td>
  </xsl:template>
  <!--
  This template only outputs the toggle button for a DETAILS_ROW.
  -->
  <xsl:template match="DETAILS_ROW" mode="common">
    <a role="button" aria-label="${{clusterToggleArrow}}" title="${{clusterToggleArrow}}" class="list-details-row-toggle"
       onclick="curam.util.ExpandableLists.toggleListDetailsRow(event);"
       tabIndex="0">
       <xsl:attribute name="onKeyPress">
         <xsl:text>if(curam.util.enterKeyPress(event)){curam.util.ExpandableLists.toggleListDetailsRow(event);}</xsl:text>
       </xsl:attribute>
      <xsl:text>&amp;nbsp;</xsl:text>
    </a>
  </xsl:template>

  <!--
  The LIST_ROW_MENU action set has to be handled separately from the other
  elements that make up columns in a list as we have to ensure it is always the
  last column, regardless of it's position in the source UIM document.

  The other columns (FIELD, WIDGET etc.) are handled by the "in-list" mode
  template below.
  -->
  <xsl:template match="ACTION_SET[@TYPE='LIST_ROW_MENU']" mode="in-list">
    <xsl:param name="empty" select="0"/>
    <xsl:param name="packForPagination" select="'false'" />

    <xsl:variable name="list-actions-menu-id">
      <xsl:text>list-actions-menu-</xsl:text>
      <xsl:value-of select="generate-id()"/>
    </xsl:variable>

    <!-- Added scope row to solve accessibility issues on expandable lists. -->
    <td scope="row" class="last-field list-row-menu">
      <xsl:choose>
        <xsl:when test="$empty = 0">
          <div dojoType="curam.widget.DeferredDropDownButton"
               class="expand-list-dropdown"
               id="{$list-actions-menu-id}_${{pageScope.loopIndex}}"
               title="${{pageScope.actionsListMenuTitle}}">
            <span>
              <img src="/themes/v6/images/expand-list-action-button.png"
                   alt="${{pageScope.actionsListMenuTitle}}"/>
            </span>
            <xsl:choose>
              <xsl:when test="$packForPagination = 'true'">
                <xsl:text>&lt;!--@pg@</xsl:text>
              </xsl:when>
              <xsl:otherwise>
                <jsp:scriptlet>out.print("&lt;script type=\"text/javascript\"&gt;");</jsp:scriptlet>
              </xsl:otherwise>
            </xsl:choose>
            <xsl:text>require(["curam/widget/DeferredDropDownButton"]);
                       if(!curam.widgetTemplates){curam.widgetTemplates={};}
                       curam.widgetTemplates['</xsl:text>
                       <xsl:value-of select="$list-actions-menu-id" />
                       <xsl:text>_${pageScope.loopIndex}']='&lt;div dojoType="dijit.Menu" class="expand-list-control"&gt;</xsl:text>

          <xsl:choose>
            <xsl:when test="CONDITION">
              <xsl:apply-templates select="../ACTION_SET" mode="conditional"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:apply-templates select="ACTION_CONTROL | SEPARATOR" mode="page-menu-item"/>
            </xsl:otherwise>
          </xsl:choose>

             <xsl:text>&lt;/div&gt;';</xsl:text>
            <xsl:choose>
              <xsl:when test="$packForPagination = 'true'">
                 <xsl:text>@pg@--&gt;</xsl:text>
              </xsl:when>
              <xsl:otherwise>
                 <jsp:scriptlet>out.print("&lt;/script&gt;");</jsp:scriptlet>
              </xsl:otherwise>
            </xsl:choose>
          </div>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>&amp;nbsp;</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </td>
  </xsl:template>

  <!--
  This template handles all list "standard" list columns who's order is based
  on that in the source UIM document. The other "in-list" mode templates above
  handle UIM elements which have special case handling in lists.
  -->
  <xsl:template match="FIELD | WIDGET | CONTAINER | ACTION_CONTROL"
                mode="in-list">
    <xsl:param name="empty" select="0"/>
    <xsl:param name="packForPagination" select="'false'" />
    <xsl:param name="column-count" />

    <!-- Added scope row to solve accessibility issues on expandable lists. -->
    <td scope="row">
      <xsl:apply-templates select="." mode="add-css-class">
        <xsl:with-param name="other-classes">
          <!--
          When list context menus are not disabled, then add a class to the
          "td" element if it contains only a CONTAINER that contains only
          ACTION_CONTROL elements that have a LINK element with the PAGE_ID
          attribute set.
          -->
          <xsl:if test="self::CONTAINER
                        and not(parent::LIST/@BEHAVIOR = 'NONE')
                        and count(ACTION_CONTROL[LINK[@PAGE_ID]]) = count(*)">
            <xsl:value-of select="'actioncol'"/>
          </xsl:if>
         
          <xsl:choose>
             <!--
              If a list has a DETAILS_ROW then it will be the first column so we
              need to ensure the "first-field" CSS class is not output again.
             -->
             <!-- Not handling widgets (or containers with widgets) here, 
                  they are explicitly dealt with below-->
            <xsl:when test="position() = 1 and not(self::WIDGET) 
                            and not(self::CONTAINER/WIDGET)
                            and not(parent::LIST/DETAILS_ROW)">
              <xsl:value-of select="' first-field'"/>
            </xsl:when>
            <!--  In the case of a widget (multiselect or singleselect) it 
                  should be marked as the first cell if there is no expandable 
                  row, otherwise it should be marked with field (so that a line 
                  will not be displayed below the checkbox/radio button when the
                  a row is expanded)-->
            <xsl:when test="self::WIDGET or self::CONTAINER/WIDGET">
              <xsl:choose>
                <xsl:when test="parent::LIST/DETAILS_ROW">
                  <!--  if it's a container with a widget then 'field' is not 
                        technically correct but this conforms with the CSS 
                        conventions elsewhere in the stylesheet. -->
                  <xsl:value-of select="' field'"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="' first-field'"/>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:when>
          </xsl:choose>
          

          <!--
          If a list has a LIST_ROW_MENU action set, then it will be the last
          column so we need to ensure the "last-field" CSS class is not output
          again.
          -->
          <xsl:if test="position() = last()
                        and not(parent::LIST/ACTION_SET/@TYPE='LIST_ROW_MENU')
                        and $column-count &gt; 1">
            <xsl:value-of select="' last-field'"/>
          </xsl:if>

        </xsl:with-param>
      </xsl:apply-templates>
      <xsl:choose>
        <xsl:when test="$empty = 0">
          <xsl:apply-templates select=".">
            <xsl:with-param name="packForPagination" select="$packForPagination" />
          </xsl:apply-templates>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>&amp;nbsp;</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </td>
    <!-- Generate dummy cell in list if column count is 1. This allows for
         roundy corner styling. -->
    <xsl:if test="$column-count = 1">
      <td class="last-field">
        <xsl:text>&amp;nbsp;</xsl:text>
      </td>
    </xsl:if>
  </xsl:template>

  <xsl:template match="FOOTER_ROW">
    <tr>
      <xsl:apply-templates select="." mode="footer-row-contents"/>
    </tr>
  </xsl:template>

  <xsl:template match="FOOTER_ROW" mode="footer-row-contents">
    <xsl:param name="nodes" select="FIELD | EMPTY_FIELD"/>
    <xsl:param name="num-fields" select="0"/>
    <xsl:variable name="col-num" >
      <xsl:choose>
        <xsl:when test="parent::LIST/DETAILS_ROW">
          <xsl:text>2</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>1</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$nodes and $nodes[1][self::FIELD]">
        <xsl:choose>
          <xsl:when test="$nodes[1]/@VALUE">
            <th class="footerheader" colspan="{$num-fields + $col-num}">
              <div class="right">
                <span title="{$nodes[1]/@LABEL}">
                  <xsl:apply-templates select="$nodes[1]"/>
                </span>
              </div>
            </th>
          </xsl:when>
          <xsl:otherwise>
            <td class="footervalue" colspan="{$num-fields + 1}">
              <div>
                <xsl:attribute name="class">
                  <xsl:if test="FIELD[@ALIGNMENT='LEFT']" >
                    <xsl:text>left</xsl:text>
                  </xsl:if>
                  <xsl:if test="FIELD[@ALIGNMENT='CENTER']" >
                    <xsl:text>center</xsl:text>
                  </xsl:if>
                  <xsl:if test="FIELD[@ALIGNMENT='RIGHT']" >
                    <xsl:text>right</xsl:text>
                  </xsl:if>
                </xsl:attribute>
                <span title="{$nodes[1]/@LABEL}">
                  <xsl:apply-templates select="$nodes[1]"/>
                </span>
              </div>
            </td>
          </xsl:otherwise>
        </xsl:choose>
        <xsl:apply-templates select="." mode="footer-row-contents">
          <xsl:with-param name="nodes" select="$nodes[position() &gt; 1]"/>
          <xsl:with-param name="num-fields" select="0"/>
        </xsl:apply-templates>
      </xsl:when>
      <xsl:when test="$nodes and $nodes[1][self::EMPTY_FIELD]">
        <xsl:apply-templates select="." mode="footer-row-contents">
          <xsl:with-param name="nodes" select="$nodes[position() &gt; 1]"/>
          <xsl:with-param name="num-fields" select="$num-fields + 1"/>
        </xsl:apply-templates>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <!--
  Generates the table header column if a list has a DETAILS_ROW. When present,
  this will always be the first column in the list hence we hard code the
  "first-header" CSS class.
  -->
  <xsl:template match="DETAILS_ROW" mode="list-header">
    <!-- Added scope col to solve accessibility issues on expandable lists. -->
    <th scope="col" class="first-header-expanding-list" abbr="TODO: some abbreviation mesage here">
      <!-- Adding a hidden column header when list column contains toggle button -->
      <span>
          <xsl:attribute name="class">hidden</xsl:attribute>
          <xsl:text> </xsl:text>
          <xsl:value-of select="$list-header-detailsrow-spantext"/>
      </span>
    </th>
  </xsl:template>

  <!--
  Generates the table header column if a list has a LIST_ROW_MENU action set.
  When present, this will always be the last column in the list hence we hard
  code the "last-header" CSS class.
  -->
  <!--
  Replace "menu th??" below with a non-breaking space.
  -->
  <xsl:template match="ACTION_SET[@TYPE='LIST_ROW_MENU']" mode="list-header">
    <xsl:param name="scrollable-context" />
    <!-- Added scope col to solve accessibility issues on expandable lists. -->
    <th scope="col">
      <xsl:attribute name="class">
        <xsl:choose>
          <xsl:when test="$scrollable-context = 'true'">
            <xsl:text>field list-row-menu last-header</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>list-row-menu last-header</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <!-- Adding a hidden column header when list column contains action set -->
      <span>
          <xsl:attribute name="class">hidden</xsl:attribute>
          <xsl:text> </xsl:text>
          <xsl:value-of select="$list-header-actions-spantext"/>
      </span>
    </th>   
  </xsl:template>

  <!-- Empty heading over an action control column -->
  <xsl:template match="ACTION_CONTROL" mode="list-header">
    <th>
      <xsl:apply-templates select="." mode="table-header-abbr" />
      <xsl:apply-templates select="." mode="add-css-class">
        <xsl:with-param name="other-classes">
          <xsl:if test="position() = 1 and not(parent::LIST/DETAILS_ROW)">
            <xsl:value-of select="'first-header'"/>
          </xsl:if>
          <xsl:if test="position() = last()
                        and not(parent::LIST/ACTION_SET/@TYPE='LIST_ROW_MENU')">
            <xsl:value-of select="' last-header'"/>
          </xsl:if>
        </xsl:with-param>
      </xsl:apply-templates>
      <span>
        <xsl:value-of select="@LABEL"/>
      </span>
    </th>
  </xsl:template>

  <xsl:template match="FIELD" mode="list-header">
    <xsl:param name="scrollable-list-header-table" />
    <xsl:param name="column-count" />
    <xsl:param name="column-count" />
    
    <!-- Added scope col to solve accessibility issues on expandable lists. -->
    <th scope="col">
      <xsl:apply-templates select="." mode="table-header-abbr" />
      <xsl:apply-templates select="." mode="add-css-class">
        <xsl:with-param name="other-classes">
          <xsl:if test="position() = 1 and not(parent::LIST/DETAILS_ROW)">
            <xsl:choose>
              <xsl:when test="$column-count = 1">
                <xsl:value-of select="'first-header last-content-header '"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="'first-header '"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:if>
          <!-- Add a css class to the last content column when the
               list row menu exists -->
          <xsl:if test="position() = last() and parent::LIST/ACTION_SET/@TYPE='LIST_ROW_MENU' ">
            <xsl:value-of select="'last-content-header'" />
          </xsl:if>
          <xsl:if test="position() = last()
                        and (not(parent::LIST/ACTION_SET/@TYPE='LIST_ROW_MENU')
                        and $column-count &gt; 1)
                        or (parent::LIST/DETAILS_ROW and $column-count = 1)">
            <xsl:value-of select="' last-header'"/>
          </xsl:if>
        </xsl:with-param>
      </xsl:apply-templates>

      <xsl:variable name="col-header-id">
        <xsl:value-of select="generate-id()"/>
            <!--
            scrollable-list-header-table indicates if this list header
            is being generated for "header" table of a scrollable list. If it
            is set to "true" the "_slh" (scroll list header) suffix is added.                
            This is a nameing convention that is used when this list header
            is clicked it knows how to find the "real" list header in the 
            "body" table of the scrollable list. And then programattically 
            click it instead.
             -->
          <xsl:if test="$scrollable-list-header-table = 'true'">_slh</xsl:if>
      </xsl:variable>

      <xsl:choose>
        <xsl:when test="$preview = 'false'">
          <xsl:if test="@SOURCE_FIELD">
            <xsl:attribute name="id">
              <xsl:value-of select="$col-header-id"/>
            </xsl:attribute>
          </xsl:if>
          <span>
            <xsl:choose>
              <xsl:when test="$scrollable-list-header-table = 'true' and @SOURCE_FIELD and not(@SORTABLE = 'false') and $preview != 'true'">
               <!-- 
                For the scrollable list header table we add a specific click
                function that can handle the separate tables used for scrollable
                lists i.e. clicking the header in one table, sorts the columns
                in the second table. Ideally this click handler should have been
                added programatically in the "makeSortable" method but for some
                reason it didn't work. Therefore the onlick handled is defined
                explicitly on the anchor element. TODO: re-visit this and get
                the "makeSortable" method working for scrollable lists.
                -->
                <a href="#"
                   onclick="curam.util.ListSort.sortScrollableList(event, '{$col-header-id}');"
                   aria-ignore="true" aria-hidden="true">
                   <xsl:apply-templates select="." mode="get-label-text"/>
                   <span>
                      <xsl:attribute name="class">hidden</xsl:attribute>
                      <xsl:text> </xsl:text>
                      <xsl:value-of select="$list-sort-anchor-spantext"/>
                    </span>
                </a>
              </xsl:when>
              <xsl:otherwise>
                <xsl:apply-templates select="." mode="get-label-text"/>
              </xsl:otherwise>
            </xsl:choose>
          </span>
        </xsl:when>
        <xsl:otherwise>
          <span>
            <xsl:apply-templates select="." mode="preview-field-list-header"/>
          </span>
        </xsl:otherwise>
      </xsl:choose>
    </th>
  </xsl:template>

  <xsl:template match="WIDGET[@TYPE = 'MULTISELECT']" mode="list-header">
    <th>
      <xsl:apply-templates select="." mode="add-css-class">
        <xsl:with-param name="is-header" select="'true'"/>
      </xsl:apply-templates>
      <xsl:if test="@MANDATORY = 'true' and $curam-config/ENABLE_SELECT_ALL_CHECKBOX = 'true'">
        <span title="mandatory field" class="mandatory-label"></span>
      </xsl:if>
      <xsl:choose>
        <xsl:when test="$curam-config/ENABLE_SELECT_ALL_CHECKBOX = 'true'">
          <curam:multiSelectAllCheckBox
              targetBean="{WIDGET_PARAMETER[@NAME = 'MULTI_SELECT_TARGET']
                           /@TARGET_BEAN}"
              targetField="{WIDGET_PARAMETER[@NAME = 'MULTI_SELECT_TARGET']
                           /@TARGET_FIELD}"/>
        </xsl:when>
      </xsl:choose>
      <xsl:if test="@MANDATORY = 'true' and $curam-config/ENABLE_SELECT_ALL_CHECKBOX = 'false'">
        <span title="mandatory field" class="mandatory-label" style="padding-top: 4px;"></span>
      </xsl:if>
    </th>
  </xsl:template>

  <!-- Adding a hidden column header when list column contains single select widget -->
  <xsl:template match="WIDGET[@TYPE = 'SINGLESELECT']" mode="list-header">
    <th>
      <xsl:apply-templates select="." mode="add-css-class">
        <xsl:with-param name="is-header" select="'true'"/>
      </xsl:apply-templates>
      <span>
            <xsl:attribute name="class">hidden</xsl:attribute>
            <xsl:text> </xsl:text>
            <xsl:value-of select="$list-header-singleselect-spantext"/>
      </span>
    </th>
  </xsl:template>
  
  <xsl:template match="WIDGET" mode="list-header">
    <th>
      <xsl:apply-templates select="." mode="add-css-class">
        <xsl:with-param name="is-header" select="'true'"/>
      </xsl:apply-templates>
    </th>
  </xsl:template>

  <xsl:template match="CONTAINER" mode="list-header">
    <!--
    When list context menus are not disabled, then add a class to the "td"
    element if it contains only a CONTAINER that contains only ACTION_CONTROL
    elements that have a LINK element with the PAGE_ID attribute set.
    -->
    <xsl:param name="column-count" />

    <xsl:variable name="extra-class">
      <xsl:if test="not(parent::LIST/@BEHAVIOR = 'NONE')
                    and count(ACTION_CONTROL[LINK[@PAGE_ID]]) = count(*)">
        <xsl:value-of select="'actioncol'"/>
      </xsl:if>
      <xsl:if test="position() = 1 and not(parent::LIST/DETAILS_ROW)">
        <xsl:choose>
          <xsl:when test="$column-count = 1">
            <xsl:value-of select="'first-header last-content-header '"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="'first-header '"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:if>
      <!-- Removes the border if the container last in a list-->
      <xsl:if test="position() = last() and parent::LIST/ACTION_SET/@TYPE='LIST_ROW_MENU' ">
        <xsl:value-of select="'last-content-header'" />
      </xsl:if>
      <xsl:if test="position() = last()
                    and (not(parent::LIST/ACTION_SET/@TYPE='LIST_ROW_MENU')
                    and $column-count &gt; 1)
                    or (parent::LIST/DETAILS_ROW and $column-count = 1)">
        <xsl:value-of select="' last-header'"/>
      </xsl:if>
     </xsl:variable>
    <xsl:choose>
      <!-- If we should output a Select All checkbox, do that -->
      <xsl:when test="WIDGET[@TYPE = 'MULTISELECT']
                      and $curam-config/ENABLE_SELECT_ALL_CHECKBOX = 'true'">
        <xsl:apply-templates select="WIDGET" mode="list-header"/>
      </xsl:when>
      <!-- Give the widget a chance to provide a label -->
      <xsl:when test="@LABEL and (not(WIDGET[@TYPE = 'MULTISELECT']) and
                                  not(WIDGET[@TYPE = 'SINGLESELECT']))">
        <!-- Added scope col to solve accessibility issues on expandable
        lists. -->
        <th scope="col">
          <xsl:apply-templates select="." mode="table-header-abbr" />
          <xsl:apply-templates select="." mode="add-css-class">
            <xsl:with-param name="other-classes" select="$extra-class"/>
          </xsl:apply-templates>
          <span><xsl:value-of select="@LABEL"/></span>
        </th>
      </xsl:when>
      <xsl:when test="WIDGET">
        <xsl:apply-templates select="WIDGET" mode="list-header"/>
      </xsl:when>
      <xsl:when test="ACTION_CONTROL">
        <th>
          <xsl:apply-templates select="." mode="add-css-class">
            <xsl:with-param name="other-classes" select="$extra-class"/>
          </xsl:apply-templates>
          <!-- Adding a hidden column header when list column contains action control -->
          <span>
              <xsl:attribute name="class">hidden</xsl:attribute>
              <xsl:text></xsl:text>
              <xsl:value-of select="$list-header-actions-spantext"/>
         </span>
        </th>
      </xsl:when>
      <!-- There is no Label -->
      <xsl:otherwise>
        <th>
          <xsl:apply-templates select="." mode="add-css-class">
            <xsl:with-param name="other-classes" select="$extra-class"/>
          </xsl:apply-templates>
        </th>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="FIELD | ACTION_CONTROL | ACTION_SET | CONTAINER
                       | WIDGET | CLUSTER | LIST | PAGE_TITLE"
                mode="add-css-class">
    <xsl:param name="attribute-name" select="'class'"/>
    <xsl:param name="other-classes" select="''"/>
    <xsl:param name="is-header" select="''"/>
    <xsl:param name="action-control-sequence"/>

    <!-- Try to keep these tests in order of probability. -->
    <xsl:variable name="attribute-value">
      <xsl:choose>
        <xsl:when test="self::FIELD">
          <xsl:choose>
            <!-- Class of "multiselect" used for cluster fields -->
            <!--<xsl:when test="@CONTROL='CHECKBOXED_LIST'">multiselect</xsl:when> -->
            <!-- Class of "codetable" used for some cluster fields. -->
            <xsl:when test="@TARGET_CODETABLE">codetable</xsl:when>
            <xsl:when test="@INITIAL_FIELD and not (@HEIGHT &gt; 1)">codetable</xsl:when>
           <xsl:otherwise>field</xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:when test="self::ACTION_CONTROL">
          <xsl:text>ac</xsl:text>
          <xsl:if test="self::ACTION_CONTROL[@ACTION_TYPE = 'FILE_DOWNLOAD']">
            <xsl:text> file-download</xsl:text>
          </xsl:if>
          <xsl:if test="$action-control-sequence = 1">
            <xsl:text> first-action-control</xsl:text>
          </xsl:if>
        </xsl:when>
        <xsl:when test="self::ACTION_SET">action-set</xsl:when>
        <xsl:when test="self::CLUSTER">cluster</xsl:when>
        <xsl:when test="self::LIST">list</xsl:when>
        <xsl:when test="self::PAGE_TITLE">title</xsl:when>
        <!--
        The next condition is for backward-compatibility only and should
        be removed when widgets are no longer hidden within containers.
        -->
        <xsl:when test="self::CONTAINER/WIDGET[@TYPE = 'MULTISELECT']
                        or self::WIDGET[@TYPE = 'MULTISELECT']">
          <xsl:text>multiselect</xsl:text>
          <xsl:if test="position() = 1 and not(ancestor::LIST/DETAILS_ROW)
                        and $is-header = 'true'">
            <xsl:text> first-header</xsl:text>
          </xsl:if>
        </xsl:when>
        <xsl:when test="self::CONTAINER/WIDGET[@TYPE = 'SINGLESELECT']
                        or self::WIDGET[@TYPE = 'SINGLESELECT']">
          <xsl:text> singleselect</xsl:text>
          <xsl:if test="position() = 1 and not(ancestor::LIST/DETAILS_ROW)
                       and $is-header = 'true'">
            <xsl:text> first-header</xsl:text>
          </xsl:if>
        </xsl:when>
        <xsl:when test="self::CONTAINER">container</xsl:when>
        <xsl:when test="self::WIDGET">widget</xsl:when>
      </xsl:choose>

      <!-- Space is normalized later, so it is not a concern here. -->
      <xsl:value-of select="concat(' ', $other-classes)"/>
      <xsl:value-of select="concat(' ', @STYLE)"/>
      <xsl:value-of select="concat(' ', translate(@ALIGNMENT, 'CEFGHILNRT',
                                                  'cefghilnrt'))"/>
    </xsl:variable>

    <xsl:attribute name="{$attribute-name}">
      <!-- Normalize to remove excessive whitespace characters. -->
      <xsl:value-of select="normalize-space($attribute-value)"/>
    </xsl:attribute>
  </xsl:template>

  <xsl:template match="CONTAINER | FIELD | WIDGET" mode="in-cluster">
    <xsl:param name="show-labels"/>
    <xsl:param name="is-field-first"/>
    <xsl:param name="header-id"/>
    
    <xsl:variable name="full-header-id" 
                  select="concat($header-id, '-', position())" />

    <xsl:variable name="is-mandatory"
                  select="@MANDATORY = 'true' or
                          self::CONTAINER/*[@MANDATORY = 'true']"/>

    <xsl:variable name="count">
              <xsl:value-of select="../@NUM_COLUMNS - count(EMPTY_FIELD | FIELD | CONTAINER
                                                | CLUSTER | WIDGET | LIST)"/>
            </xsl:variable>

    <xsl:if test="$show-labels and not($is-field-first)">
      <xsl:call-template name="output-label">
        <xsl:with-param name="is-mandatory" select="$is-mandatory"/>
        <xsl:with-param name="full-header-id" select="$full-header-id"/>
      </xsl:call-template>
    </xsl:if>

    <td>
      <xsl:if test="$show-labels">
        <xsl:attribute name="headers">
          <xsl:value-of select="$full-header-id" />
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates select="." mode="add-css-class">
        <xsl:with-param name="other-classes">
          <xsl:if test="$is-mandatory and not($show-labels)">
            <xsl:text>mandatory-cluster-field</xsl:text>
          </xsl:if>
          <!--
          CLUSTERs in XIM are generated with a similar structure to a HTML
          table. For example, CLUSTER_ROW elements represent table rows.
          However, in the scenario where empty table cells are requried
          to pad out the HTML table, these "padding" cells are not represented
          in XIM. For example, examine the XIM for a 2 column CLUSTER with 3 FIELDs.
          In XIM 2 CLUSTER_ROWs will exist, but the second one will only have
          one FIELD. In this case we do not want the "last-cell" CSS class
          applied to the FIELD's table cell. The following condition handles this.
          Note: The CLUSTER_ROW and "repeat-cell" templates apply the "padding"
          to the HTML table.
          -->
          <xsl:if test="position() = last() and position() = ../../@NUM_COLUMNS">
            <xsl:text> last-cell</xsl:text>
          </xsl:if>
        </xsl:with-param>
      </xsl:apply-templates>
      <xsl:apply-templates select="." mode="add-hidden-label-setter"/>
      <xsl:apply-templates select="."/>
    </td>

    <xsl:if test="$show-labels and $is-field-first">
      <xsl:call-template name="output-label">
        <xsl:with-param name="is-mandatory" select="$is-mandatory"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="EMPTY_FIELD" mode="in-cluster">
    <xsl:param name="show-labels"/>
    <xsl:param name="is-field-first"/>
    <xsl:param name="header-id"/>

    <xsl:variable name="full-header-id" 
                  select="concat($header-id, '-', position())" />
                  
    <xsl:if test="$show-labels and not($is-field-first)">
      <th class="label skip-label" id="{$full-header-id}">
        <xsl:text>&amp;nbsp;</xsl:text>
      </th>
    </xsl:if>
    <td class="skip-field" >
     <xsl:if test="$show-labels">
        <xsl:attribute name="headers">
          <xsl:value-of select="$full-header-id" />
        </xsl:attribute>
      </xsl:if>
    </td>
    <xsl:if test="$show-labels and $is-field-first">
      <th class="label skip-label" id="{$full-header-id}">
        <xsl:text>&amp;nbsp;</xsl:text>
      </th>
    </xsl:if>
  </xsl:template>

  <xsl:template match="FIELD | ACTION_CONTROL | CONTAINER"
                mode="table-header-abbr">
    <xsl:if test="@LABEL_ABBREVIATION">
      <xsl:attribute name="abbr">
        <xsl:value-of select="@LABEL_ABBREVIATION"/>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>

  <!--
  Displays the label and adds a colon to the end if the label is shown first
  and if colons are enabled either globally (curam-config.xml) or locally (on
  the page).
  -->
  <xsl:template name="output-label">
    <xsl:param name="is-mandatory"/>
    <xsl:param name="full-header-id"/>

    <th class="label" id="{$full-header-id}">
      <span>
        <xsl:attribute name="class">
          <xsl:if test="$is-mandatory">
            <!-- Prefix for class name when mandatory. -->
            <xsl:text>mandatory-</xsl:text>
          </xsl:if>
          <xsl:text>label</xsl:text>
        </xsl:attribute>
        <xsl:if test="TITLE | @LABEL">

          <!-- Adds tooltip to the read only fields of cluster -->
          <!-- The tooltip will be displayed based on the label of the element -->

          <xsl:attribute name="title">
            <xsl:apply-templates select="." mode="get-label-text"/>
            </xsl:attribute>

          <xsl:apply-templates select="." mode="get-label-text"/>
          <xsl:choose>
            <xsl:when test="not(ancestor::PAGE/@APPEND_COLON)">
              <!-- Attribute is not set: use application-wide setting. -->
              <xsl:value-of select="$colon"/>
            </xsl:when>
            <xsl:when test="ancestor::PAGE/@APPEND_COLON = 'true'">
              <xsl:text>:</xsl:text>
            </xsl:when>
          </xsl:choose>
        </xsl:if>
      </span>
      <xsl:if test="@DESCRIPTION">
        <div class="description">
          <xsl:value-of select="@DESCRIPTION"/>
        </div>
      </xsl:if>
    </th>
  </xsl:template>

  <!--
  When calling this template the context must be FIELD and it must have a child
  TITLE element or a LABEL attribute. Precendence is given to the child TITLE
  element.
  -->
  <xsl:template match="WIDGET | FIELD | CONTAINER | ACTION_CONTROL"
                mode="get-label-text">
    <xsl:choose>
      <xsl:when test="TITLE">
        <xsl:apply-templates select="TITLE/TITLE_ELEMENT"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:choose>
          <xsl:when test="@LABEL">
            <xsl:value-of select="@LABEL"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="parent::CONTAINER/@LABEL"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="WIDGET">
    <xsl:param name="packForPagination" select="'false'" />

    <xsl:choose>
      <xsl:when test="$preview = 'true'">
        <xsl:apply-templates select="." mode="preview"/>
      </xsl:when>
      <xsl:when test="@TYPE = 'USER_PREFERENCE_EDITOR'">
        <curam:userPreferenceEditor/>
      </xsl:when>
      <xsl:when test="@TYPE = 'IEG_PLAYER'">
        <curam:iegPlayer
            executionIDParam="{WIDGET_PARAMETER[@NAME = 'EXECUTION_ID']
                               /@PARAMETER_NAME}"/>
      </xsl:when>
      <xsl:when test="@TYPE = 'FILE_UPLOAD'">
        <script type="text/javascript">
          <jsp:scriptlet>{String propVal = curam.omega3.util.CDEJResources.getProperty(
            "curam.validation.invalidFilePathToUploadEntered");
             String escapedPropVal 
               = curam.util.common.util.JavaScriptEscaper.escapeText(propVal);
               out.print("curam.validation.invalidPathMsg='" + escapedPropVal + "';");}
          </jsp:scriptlet>
          <xsl:text>curam.validation.FILE_UPLOAD_FLGS.push("</xsl:text>
              <xsl:value-of select="generate-id()"/>
          <xsl:text>");
            curam.validation.activateFileUploadChecker();
            curam.util.addFileUploadResizeListener();</xsl:text>
        </script>
        <!-- the span below is to flag the following fileUpload to speed up later DOM search. -->
        <span>
          <xsl:attribute name="id"><xsl:value-of select="generate-id()"/></xsl:attribute>
          <xsl:attribute name="style">display:none</xsl:attribute>
          c
        </span>
        <curam:fileUpload
            contentTargetBean="{WIDGET_PARAMETER[@NAME = 'CONTENT']
                                /@TARGET_BEAN}"
            contentTargetField="{WIDGET_PARAMETER[@NAME = 'CONTENT']
                                 /@TARGET_FIELD}">
          <xsl:if test="WIDGET_PARAMETER[@NAME = 'CONTENT_TYPE']">
            <xsl:attribute name="contentTypeTargetBean">
              <xsl:value-of select="WIDGET_PARAMETER[@NAME = 'CONTENT_TYPE']
                                    /@TARGET_BEAN"/>
            </xsl:attribute>
            <xsl:attribute name="contentTypeTargetField">
              <xsl:value-of select="WIDGET_PARAMETER[@NAME = 'CONTENT_TYPE']
                                    /@TARGET_FIELD"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="WIDGET_PARAMETER[@NAME = 'FILE_NAME']">
            <xsl:attribute name="fileNameTargetBean">
              <xsl:value-of
                select="WIDGET_PARAMETER[@NAME = 'FILE_NAME']/@TARGET_BEAN"/>
            </xsl:attribute>
            <xsl:attribute name="fileNameTargetField">
              <xsl:value-of select="WIDGET_PARAMETER[@NAME = 'FILE_NAME']
                                    /@TARGET_FIELD"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:value-of select="@LABEL"/>

        </curam:fileUpload>
      </xsl:when>
      <xsl:when test="@TYPE = 'FILE_EDIT'">
        <curam:fileEdit
          sourceBean="{WIDGET_PARAMETER[@NAME = 'DOCUMENT']/@SOURCE_BEAN}"
          sourceField="{WIDGET_PARAMETER[@NAME = 'DOCUMENT']/@SOURCE_FIELD}"
          targetBean="{WIDGET_PARAMETER[@NAME = 'DOCUMENT']/@TARGET_BEAN}"
          targetField="{WIDGET_PARAMETER[@NAME = 'DOCUMENT']/@TARGET_FIELD}"
          detailsSourceBean="{WIDGET_PARAMETER[@NAME = 'DETAILS']/@SOURCE_BEAN}"
          detailsSourceField="{WIDGET_PARAMETER[@NAME = 'DETAILS']
                               /@SOURCE_FIELD}"/>
      </xsl:when>
      <xsl:when test="@TYPE = 'MULTISELECT'">
        <curam:multiSelectCheckBox mode="multiselect"
          targetBean="{WIDGET_PARAMETER[@NAME = 'MULTI_SELECT_TARGET']
                       /@TARGET_BEAN}"
          targetField="{WIDGET_PARAMETER[@NAME = 'MULTI_SELECT_TARGET']
                        /@TARGET_FIELD}"
          selectionSourceBean="{WIDGET_PARAMETER[@NAME = 'MULTI_SELECT_INITIAL']
                                /LINK_PARAMETER/@SOURCE_BEAN}"
          selectionSourceField="{WIDGET_PARAMETER[@NAME='MULTI_SELECT_INITIAL']
                                 /LINK_PARAMETER/@SOURCE_FIELD}">
          <xsl:attribute name="escapeScripts">
            <xsl:choose>
              <xsl:when test="$packForPagination = 'true'"><xsl:text>true</xsl:text></xsl:when>
              <xsl:otherwise><xsl:text>false</xsl:text></xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>
          <xsl:for-each select="WIDGET_PARAMETER[@NAME = 'MULTI_SELECT_SOURCE']
                                /LINK_PARAMETER">
            <curam:linkParameter name="unnamed" useLoop="true"
                                 xsl:use-attribute-sets="source"/>
          </xsl:for-each>
        </curam:multiSelectCheckBox>
      </xsl:when>
      <xsl:when test="@TYPE = 'SINGLESELECT'">
        <curam:multiSelectCheckBox mode="singleselect"
          targetBean="{WIDGET_PARAMETER[@NAME = 'SELECT_TARGET']/@TARGET_BEAN}"
          targetField="{WIDGET_PARAMETER[@NAME = 'SELECT_TARGET']
                        /@TARGET_FIELD}"
          selectionSourceBean="{WIDGET_PARAMETER[@NAME = 'SELECT_INITIAL']
                                /LINK_PARAMETER/@SOURCE_BEAN}"
          selectionSourceField="{WIDGET_PARAMETER[@NAME = 'SELECT_INITIAL']
                                 /LINK_PARAMETER/@SOURCE_FIELD}">
          <xsl:attribute name="escapeScripts">
            <xsl:choose>
              <xsl:when test="$packForPagination = 'true'"><xsl:text>true</xsl:text></xsl:when>
              <xsl:otherwise><xsl:text>false</xsl:text></xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>
          <xsl:for-each select="WIDGET_PARAMETER[@NAME = 'SELECT_SOURCE']
                                /LINK_PARAMETER">
            <curam:linkParameter name="unnamed" useLoop="true"
                                 xsl:use-attribute-sets="source"/>
          </xsl:for-each>
        </curam:multiSelectCheckBox>
      </xsl:when>
      <xsl:when test="@TYPE = 'EVIDENCE_COMPARE'">
        <curam:evidenceCompare
          sourceBean="{WIDGET_PARAMETER[@NAME = 'OLD_EVIDENCE']/@SOURCE_BEAN}"
          oldEvidenceField="{WIDGET_PARAMETER[@NAME = 'OLD_EVIDENCE']
                             /@SOURCE_FIELD}"
          newEvidenceField="{WIDGET_PARAMETER[@NAME = 'NEW_EVIDENCE']
                             /@SOURCE_FIELD}"/>
      </xsl:when>
      <xsl:when test="@TYPE = 'RULES_SIMULATION_EDITOR'">
        <curam:rulesSimulationEditor
          sourceBean="{WIDGET_PARAMETER[@NAME = 'VALUES']/@SOURCE_BEAN}"
          sourceField="{WIDGET_PARAMETER[@NAME = 'VALUES']/@SOURCE_FIELD}"
          targetBean="{WIDGET_PARAMETER[@NAME = 'VALUES']/@TARGET_BEAN}"
          targetField="{WIDGET_PARAMETER[@NAME = 'VALUES']/@TARGET_FIELD}"
          metaDataSourceBean="{WIDGET_PARAMETER[@NAME = 'META_DATA']
                               /@SOURCE_BEAN}"
          metaDataSourceField="{WIDGET_PARAMETER[@NAME = 'META_DATA']
                                /@SOURCE_FIELD}"
          addButtonCaption="{WIDGET_PARAMETER[@NAME = 'ADD_BUTTON_CAPTION']
                             /@VALUE}"
          addButtonImage="{WIDGET_PARAMETER[@NAME = 'ADD_BUTTON_IMAGE']/@VALUE}"
          labelWidth="{ancestor::CLUSTER/@LABEL_WIDTH}"/>
      </xsl:when>
      <xsl:when test="@TYPE = 'RULES_DECISION_TREE'">
        <curam:rules
          sourceBean="{WIDGET_PARAMETER[@NAME = 'DECISION_DATA']
                       /LINK_PARAMETER/@SOURCE_BEAN}"
          sourceField="{WIDGET_PARAMETER[@NAME = 'DECISION_DATA']
                        /LINK_PARAMETER/@SOURCE_FIELD}"
          sourceDecisionIDParameter="{WIDGET_PARAMETER[@NAME = 'DECISION_ID']
                                      /LINK_PARAMETER/@PARAMETER_NAME}"
          targetDecisionIDParameter="{WIDGET_PARAMETER[@NAME = 'DECISION_ID']
                                      /LINK_PARAMETER/@NAME}"
          view="DYNAMIC" width="{@WIDTH}" config="{@CONFIG}"/>
      </xsl:when>
      <xsl:when test="@TYPE = 'RULES_DECISION_FULL_TREE'">
        <curam:rules
          sourceBean="{WIDGET_PARAMETER[@NAME = 'DECISION_DATA']
                       /LINK_PARAMETER/@SOURCE_BEAN}"
          sourceField="{WIDGET_PARAMETER[@NAME = 'DECISION_DATA']
                         /LINK_PARAMETER/@SOURCE_FIELD}"
          sourceDecisionIDParameter="{WIDGET_PARAMETER[@NAME = 'DECISION_ID']
                                      /LINK_PARAMETER/@PARAMETER_NAME}"
          targetDecisionIDParameter="{WIDGET_PARAMETER[@NAME = 'DECISION_ID']
                                      /LINK_PARAMETER/@NAME}"
          view="DYNAMIC_FULL_TREE" width="{@WIDTH}" config="{@CONFIG}"/>
      </xsl:when>
      <xsl:when test="@TYPE = 'DYNAMIC_RULES_EDITOR'">
        <curam:rulesEditor
          sourceBean="{WIDGET_PARAMETER[@NAME = 'DECISION_DATA']
                       /LINK_PARAMETER/@SOURCE_BEAN}"
          sourceField="{WIDGET_PARAMETER[@NAME = 'DECISION_DATA']
                        /LINK_PARAMETER/@SOURCE_FIELD}"
          sourceDecisionIDParameter="{WIDGET_PARAMETER[@NAME = 'DECISION_ID']
                                      /LINK_PARAMETER/@PARAMETER_NAME}"
          targetDecisionIDParameter="{WIDGET_PARAMETER[@NAME = 'DECISION_ID']
                                      /LINK_PARAMETER/@NAME}"
          view="DYNAMIC" width="{@WIDTH}" config="{@CONFIG}"/>
      </xsl:when>
      <xsl:when test="@TYPE = 'FILE_DOWNLOAD'">
        <curam:fileDownload
            sourceBean="{WIDGET_PARAMETER[@NAME = 'LINK_TEXT']/@SOURCE_BEAN}"
            sourceField="{WIDGET_PARAMETER[@NAME = 'LINK_TEXT']/@SOURCE_FIELD}">
          <curam:linkParameter name="pageID" value="${{requestScope.pageId}}"/>
          <xsl:apply-templates
              select="WIDGET_PARAMETER[@NAME = 'PARAMS']/LINK_PARAMETER"/>
        </curam:fileDownload>
      </xsl:when>
      <xsl:when test="@TYPE = 'WIZARD_SUMMARY'">
        <curam:wizardSummary/>
      </xsl:when>
      <xsl:when test="@TYPE = 'CONTENT'">
        <!--
        CONTENT widgets without a component style will probably cause a
        run-time error when the style is not found.
        -->
        <cing:component style="{@COMPONENT_STYLE}">
          <xsl:if test="@CONFIG">
            <cing:param name="config" value="{@CONFIG}"/>
          </xsl:if>
        </cing:component>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <!-- Do nothing for elements other than FIELD and WIDGET. -->
  <xsl:template match="*" mode="add-hidden-label-setter"/>

  <!--
  Adds a tag that will cause the field label to be submitted to the server to
  support error reporting. Labels are added for all WIDGET_PARAMETER elements
  that have targets. NOTE: FIELD labels are not added in this way. Instead the
  "next generation" request handler processes field labels submitted from the
  "o3meta" hidden field (See NGRequestHandler.setBopiPropertyLabels()).
  -->
  <xsl:template match="WIDGET  | FIELD " mode="add-hidden-label-setter">
    <xsl:variable name="has-target"
                  select="self::WIDGET/WIDGET_PARAMETER[@TARGET_BEAN]"/>
     <xsl:choose>
      <xsl:when test="self::FIELD">
        <xsl:if test="$preview = 'false'
                     and @DOMAIN = 'FREQUENCY_PATTERN' 
                     and self::FIELD[@TARGET_BEAN]
                     and @LABEL">



          <curam:fieldLabel xsl:use-attribute-sets="target">
              <xsl:apply-templates select="self::FIELD"
                                   mode="get-label-text"/>
         </curam:fieldLabel>
        </xsl:if>
      </xsl:when>
      <xsl:otherwise>
        <xsl:if test="$preview = 'false' and $has-target and not(ancestor::LIST)
                  and (@LABEL or parent::CONTAINER/@LABEL)">

          <xsl:for-each select="$has-target">
            <curam:fieldLabel xsl:use-attribute-sets="target">
              <xsl:apply-templates select="parent::WIDGET | self::FIELD"
                                   mode="get-label-text"/>
            </curam:fieldLabel>
          </xsl:for-each>
        </xsl:if>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!--
  A FIELD is used for the input or display of data. Fields that have targets
  are displayed as input controls. Fields that do not have targets are
  displayed as plain text output. FIELD elements that are contained in a LOOP
  element will use the loop index.

  If a field contains a LINK with a PAGE_ID or URI or URI_BEAN/URI_FIELD
  attributes, then a <curam:link> tag is used around the field value. It is
  assumed that such fields will not resolve to input controls, etc. This should
  be checked at the earlier validation phase.

  If a field contains a LINK with no PAGE_ID it is assumed to be used to pass
  parameters to a popup page. See the FIELD with the is-popup mode for how this
  is used.
  -->
  <xsl:template match="FIELD">
    <xsl:choose>
      <xsl:when test="LINK/CONDITION">
        <xsl:apply-templates select="." mode="conditional"/>
      </xsl:when>
      <xsl:when test="LINK">
        <xsl:apply-templates select="." mode="common"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="." mode="check-for-image-map"/>
        <!-- ellipsis support to FIELD element. Irrespective of  its child elements(LINK etc) if the FIELD element
          has APPEND_ELLIPSIS  attribute set to true, the ellipsis character will be appended to -->
        <xsl:if test="@APPEND_ELLIPSIS='true'">
          <xsl:text>&#8230;</xsl:text>
        </xsl:if>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="FIELD" mode="common">
    <xsl:choose>
      <xsl:when test="LINK and $preview = 'true'">
        <!-- Add a dummy link for previews. -->
        <a href="#">
          <xsl:apply-templates select="." mode="check-for-image-map"/>
        </a>
      </xsl:when>
      <xsl:when test="LINK/@HOME_PAGE = 'true'">
        <curam:link homePage="true" style="field-link">
          <xsl:attribute name="title">
            <xsl:apply-templates select="." mode="add-tooltip-text"/>
          </xsl:attribute>
          <xsl:apply-templates select="." mode="check-for-image-map"/>
          <!-- ellipsis support to FIELD element. Irrespective of  its child elements(LINK etc) if the FIELD element
            has APPEND_ELLIPSIS  attribute set to true, the ellipsis character will be appended to -->
          <xsl:if test="@APPEND_ELLIPSIS='true'">
            <xsl:text>&#8230;</xsl:text>
          </xsl:if>
        </curam:link>
      </xsl:when>
      <xsl:when test="LINK/@PAGE_ID or LINK/@URI or LINK/@URI_BEAN">
        <curam:link newWindow="{LINK/@OPEN_NEW}" style="field-link"
                    modalWindow="{LINK/@OPEN_MODAL}"
                    windowOptions="{LINK/@WINDOW_OPTIONS}"
                    dismissModal="{LINK/@DISMISS_MODAL}"
                    useCurrentAsReturnParam="{LINK/@SAVE_LINK}">
          <xsl:apply-templates select="." mode="link-uri"/>
          <xsl:apply-templates select="SCRIPT" mode="add-script-attributes"/>
          <xsl:apply-templates select="LINK/LINK_PARAMETER"/>
          <xsl:apply-templates select="." mode="check-for-image-map"/>
          <!-- ellipsis support to FIELD element. Irrespective of  its child elements(LINK etc) if the FIELD element
            has APPEND_ELLIPSIS  attribute set to true, the ellipsis character will be appended to -->
          <xsl:if test="@APPEND_ELLIPSIS='true'">
            <xsl:text>&#8230;</xsl:text>
          </xsl:if>
        </curam:link>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="." mode="check-for-image-map"/>
        <!-- ellipsis support to FIELD element. Irrespective of  its child elements(LINK etc) if the FIELD element
          has APPEND_ELLIPSIS  attribute set to true, the ellipsis character will be appended to -->
        <xsl:if test="@APPEND_ELLIPSIS='true'">
          <xsl:text>&#8230;</xsl:text>
        </xsl:if>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Checks if the values of this field are to be mapped to images. If they are,
  the appropriate tag is produced, otherwise it proceeds to check if the field
  is a pop-up field.
  -->
  <xsl:template match="FIELD" mode="check-for-image-map">
    <xsl:choose>
      <!-- AGENDA_XML is excluded as it handles its own image mappings. -->
      <xsl:when test="@SOURCE_BEAN and @DOMAIN and not(@DOMAIN = 'AGENDA_XML')
                      and @DOMAIN = $image-domains">
        <xsl:apply-templates select="." mode="output-image-map"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="." mode="check-for-pop-up"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--
  Checks if the this field is configured to be a pop-up field. If it is, the
  appropriate tag is produced, otherwise it proceeds to output generic tags
  to render the field. All FIELD elements here will have a target.
  -->
  <xsl:template match="FIELD" mode="check-for-pop-up">
    <xsl:choose>
      <!--
      If the field has a TARGET connection and does not have an INITIAL or
      SOURCE connection to a list property and there is no
      INITIAL_HIDDEN_FIELD, but the set of pop-up domain names contains this
      domain name, then this is a pop-up field.
      -->
      <xsl:when test="@TARGET_BEAN and @DOMAIN
                      and not(@INITIAL_HIDDEN_FIELD)
                      and not(@SOURCE_IS_LIST = 'true')
                      and not(@INITIAL_IS_LIST = 'true')
                      and $pop-up-domain-names = @DOMAIN">
        <xsl:choose>
          <xsl:when test="$preview = 'false'">
            <xsl:apply-templates select="." mode="output-pop-up"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:apply-templates select="." mode="preview-output-pop-up"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:choose>
          <xsl:when test="$preview = 'false'">
            <xsl:apply-templates select="." mode="output-ng-field"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:apply-templates select="." mode="preview-output-field"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Special handling for image-mapped fields. -->
  <xsl:template match="FIELD" mode="output-image-map">
    <xsl:choose>
      <xsl:when test="$preview = 'false'">
        <!-- "sourcePath" -->
        <curam:displayAsImage xsl:use-attribute-sets="source"
                              domain="{@DOMAIN}">
          <xsl:call-template name="add-use-loop"/>
        </curam:displayAsImage>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="." mode="preview-output-image-map"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Special handling for schedule fields. -->
  <xsl:template match="FIELD" mode="output-schedule">
    <!--
    The first three parameters to the link are "special". They represent the
    attributes to the schedule tag. Other parameters are added as
    "curam:linkParameter" elements in the body of the schedule tag.
    -->
    <xsl:choose>
      <xsl:when test="$preview = 'true'">
        <xsl:apply-templates select="." mode="preview-output-schedule"/>
      </xsl:when>
      <xsl:otherwise>
        <curam:schedule sourceBean="{@SOURCE_BEAN}"
                        scheduleSourceField="{@SOURCE_FIELD}"
                        url="{concat(LINK/@PAGE_ID, 'Page.do')}">
          <xsl:for-each select="LINK/LINK_PARAMETER">
            <xsl:choose>
              <xsl:when test="position() = 1">
                <xsl:attribute name="dateSourceField">
                  <xsl:value-of select="@SOURCE_FIELD"/>
                </xsl:attribute>
                <xsl:attribute name="dateTimeParameterName">
                  <xsl:value-of select="@NAME"/>
                </xsl:attribute>
              </xsl:when>
              <xsl:when test="position() = 2">
                <xsl:attribute name="fullNameParameterName">
                  <xsl:value-of select="@NAME"/>
                </xsl:attribute>
              </xsl:when>
              <xsl:when test="position() = 3">
                <xsl:attribute name="usernameSourceField">
                  <xsl:value-of select="@SOURCE_FIELD"/>
                </xsl:attribute>
                <xsl:attribute name="usernameParameterName">
                  <xsl:value-of select="@NAME"/>
                </xsl:attribute>
              </xsl:when>
              <xsl:otherwise>
                <xsl:apply-templates select="."/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:for-each>
        </curam:schedule>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Special handling for pop-up fields. -->
  <xsl:template match="FIELD" mode="output-pop-up">
    <xsl:variable name="domain" select="@DOMAIN"/>
    
    <xsl:if test="not(ancestor::LIST)
                  and (@LABEL or parent::CONTAINER/@LABEL)">

      <curam:fieldLabel xsl:use-attribute-sets="target">
        <xsl:apply-templates select="self::FIELD"
                             mode="get-label-text"/>
      </curam:fieldLabel>
    </xsl:if>
    <curam:standardPopup xsl:use-attribute-sets="target" domain="{$domain}"
                         name="{concat(@TARGET_BEAN, '$', @TARGET_FIELD)}">
      <!-- "targetPath" (above) -->
      <!-- "sourcePath" (hidden value) -->
      <xsl:apply-templates select="." mode="source-attributes"/>

      <xsl:if test="@INITIAL_BEAN">
        <!-- "sourceAliasPath" -->
        <xsl:attribute name="initialBean">
          <xsl:value-of select="@INITIAL_BEAN"/>
        </xsl:attribute>
        <xsl:attribute name="initialField">
          <xsl:value-of select="@INITIAL_FIELD"/>
        </xsl:attribute>
      </xsl:if>

      <xsl:attribute name="width">
        <xsl:call-template name="current-width"/>
      </xsl:attribute>
      <xsl:attribute name="widthUnits">
        <xsl:value-of select="@WIDTH_UNITS"/>
      </xsl:attribute>
      <xsl:attribute name="rows">
        <xsl:value-of select="@HEIGHT"/>
      </xsl:attribute>

      <xsl:variable name="multiple-pop-up-domain"
                    select="$multiple-pop-up-domains[text() = $domain]"/>
      <xsl:choose>
        <xsl:when test="not($multiple-pop-up-domain)">
          <xsl:variable name="pop-up-domain"
                        select="$pop-up-domains[text() = $domain]"/>
          <xsl:if test="$pop-up-domain">
            <xsl:attribute name="popupImage">
              <xsl:value-of select="$pop-up-domain/../IMAGE"/>
            </xsl:attribute>
            <xsl:attribute name="popupHighContrastImage">
            <xsl:value-of select="$pop-up-domain/../HIGH_CONTRAST_IMAGE"/>
          </xsl:attribute>
            <xsl:attribute name="popupImageAlt">
              <xsl:value-of select="$pop-up-domain/../LABEL"/>
            </xsl:attribute>
            <xsl:attribute name="popupImageAltProperty">
              <xsl:value-of select="$pop-up-domain/../LABEL_PROPERTY"/>
            </xsl:attribute>
            <xsl:attribute name="popupImageProperty">
              <xsl:value-of select="$pop-up-domain/../IMAGE_PROPERTY"/>
            </xsl:attribute>
             <xsl:attribute name="popupHighContrastImageProperty">
            <xsl:value-of select="$pop-up-domain/../HIGH_CONTRAST_IMAGE_PROPERTY"/>
          </xsl:attribute>
            <xsl:if test="$clear-icon-single">
              <xsl:attribute name="clearPopupIcon">
                <xsl:value-of select="$clear-icon-single"/>
              </xsl:attribute>
            </xsl:if>
          </xsl:if>
        </xsl:when>
        <xsl:otherwise>
          <!-- Get code-table code from what is set in the preceding field. -->
          <xsl:attribute name="useCTCode">true</xsl:attribute>
          <xsl:attribute name="popupImage">
            <xsl:value-of select="$multiple-pop-up-domain/../IMAGE"/>
          </xsl:attribute>
          <xsl:attribute name="popupHighContrastImage">
            <xsl:value-of select="$multiple-pop-up-domain/../HIGH_CONTRAST_IMAGE"/>
          </xsl:attribute>
          <xsl:attribute name="popupImageAlt">
            <xsl:value-of select="$multiple-pop-up-domain/../LABEL"/>
          </xsl:attribute>
          <xsl:attribute name="popupImageAltProperty">
              <xsl:value-of select="$multiple-pop-up-domain/../LABEL_PROPERTY"/>
          </xsl:attribute>
          <xsl:attribute name="popupImageProperty">
              <xsl:value-of select="$multiple-pop-up-domain/../IMAGE_PROPERTY"/>
          </xsl:attribute>
          <xsl:attribute name="popupHighContrastImageProperty">
            <xsl:value-of select="$multiple-pop-up-domain/../HIGH_CONTRAST_IMAGE_PROPERTY"/>
          </xsl:attribute>
          <xsl:if test="$clear-icon-multiple">
            <xsl:attribute name="clearPopupIcon">
              <xsl:value-of select="$clear-icon-multiple"/>
            </xsl:attribute>
          </xsl:if>
        </xsl:otherwise>
      </xsl:choose>

      <!-- The parameters of the LINK become parameters of the pop-up. -->
      <xsl:apply-templates select="LINK/LINK_PARAMETER"/>
    </curam:standardPopup>
  </xsl:template>

  <!-- Generates the text to use as the tooltips, etc. -->
  <xsl:template match="FIELD" mode="add-tooltip-text">
    <xsl:choose>
      <xsl:when test="@ALT_TEXT">
        <xsl:value-of select="@ALT_TEXT"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="@LABEL"/>
        <xsl:if test="@DESCRIPTION">
          <xsl:text> </xsl:text>
          <xsl:value-of select="@DESCRIPTION"/>
        </xsl:if>
        <xsl:if test="@MANDATORY = 'true'">
          <xsl:text> ${o3_mandatoryTooltipText}</xsl:text>
        </xsl:if>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="FIELD | ACTION_CONTROL | LINK_PARAMETER"
                mode="source-attributes">
    <xsl:choose>
      <xsl:when test="@SOURCE_BEAN">
        <xsl:attribute name="sourceBean">
          <xsl:value-of select="@SOURCE_BEAN"/>
        </xsl:attribute>
        <xsl:attribute name="sourceField">
          <xsl:value-of select="@SOURCE_FIELD"/>
        </xsl:attribute>
      </xsl:when>
      <xsl:when test="@PARAMETER_NAME">
        <xsl:attribute name="sourceParameter">
          <xsl:value-of select="@PARAMETER_NAME"/>
        </xsl:attribute>
      </xsl:when>
      <xsl:when test="@VALUE">
        <xsl:attribute name="value">
          <xsl:value-of select="@VALUE"/>
        </xsl:attribute>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <!--
  Adds the "loopPath" attribute. Where the loop field has an appended extended
  path that contains an empty predicate, no additional empty predicate will be
  appended.
  -->
  <xsl:template match="LIST" mode="loop-path-attribute">
    <xsl:attribute name="loopPath">
      <xsl:value-of select="concat('/data/si/', @LOOP_BEAN, '/', @LOOP_FIELD)"/>
      <xsl:if test="not(contains(@LOOP_FIELD, '[]'))">
        <xsl:value-of select="'[]'"/>
      </xsl:if>
    </xsl:attribute>
   <xsl:apply-templates select="FIELD[1]/@TARGET_FIELD" mode="loop-path-attribute"/>
  </xsl:template>
  
  <xsl:template match="@TARGET_FIELD" mode="loop-path-attribute">
    <xsl:attribute name="firstFieldTargetName">
      <xsl:value-of select="concat(../@TARGET_BEAN, '/', .)"/>
    </xsl:attribute>
  </xsl:template>

  <xsl:attribute-set name="target">
    <xsl:attribute name="targetBean">
      <xsl:value-of select="@TARGET_BEAN"/>
    </xsl:attribute>
    <xsl:attribute name="targetField">
      <xsl:value-of select="@TARGET_FIELD"/>
    </xsl:attribute>
  </xsl:attribute-set>

  <xsl:attribute-set name="source">
    <xsl:attribute name="sourceBean">
      <xsl:value-of select="@SOURCE_BEAN"/>
    </xsl:attribute>
    <xsl:attribute name="sourceField">
      <xsl:value-of select="@SOURCE_FIELD"/>
    </xsl:attribute>
  </xsl:attribute-set>

  <!--
  Adds a "useLoop" attribute with the value "true" only if the "LOOP" attribute
  value is "true", otherwise no attribute is added.
  -->
  <xsl:template name="add-use-loop">
    <xsl:if test="@SOURCE_IS_LIST = 'true'">
      <xsl:attribute name="useLoop">
        <xsl:text>true</xsl:text>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>

  <xsl:template name="current-width">
    <xsl:choose>
      <xsl:when test="parent::CONTAINER">
        <xsl:variable name="preceding-fields"
                      select="preceding-sibling::FIELD"/>
        <xsl:variable name="following-fields"
                      select="following-sibling::FIELD"/>
        <xsl:choose>
          <xsl:when test="sum($preceding-fields/@WIDTH)
                          + sum($following-fields/@WIDTH) + @WIDTH = 0">
            <xsl:value-of
              select="round(100 div (count($preceding-fields)
                                     + count($following-fields) + 1))"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="@WIDTH"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="@WIDTH"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
