<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright 2003-2005, 2007 Cúram Software Ltd.
All rights reserved.

This software is the confidential and proprietary information of Cúram
Software, Ltd. ("Confidential Information"). You shall not disclose
such Confidential Information and shall use it only in accordance with the
terms of the license agreement you entered into with Cúram Software.
-->
<!--
This stylesheet interacts with many templates in gen-jsp.xsl. Many of
those templates add <jsp:text> and other tags to the output. These
tags will not be recognised by the browser and ignored. This makes it
safe to have these tags in the HTML output and reduces the need to
duplicate templates or add extra logic to avoid the tags. However, if the
tags contain body content, the text nodes in the body content would be
displayed, so the tags or their content may have to be selectively
excluded.
-->
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:curam="http://www.curamsoftware.com/curam"
    xmlns:jsp="http://java.sun.com/JSP/Page"
    xmlns:exsl="http://exslt.org/common">
  
  <xsl:param name="mandatory-icon-help-text"/>
  
  <xsl:variable name="domain-defaults"
     select="document(
                'projectTolerant:components/Core/domain-defaults.xml', /)"/>

  <xsl:template match="DISPLAY" mode="preview">
    <xsl:text>&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;</xsl:text>
    <xsl:call-template name="output-copyright" />
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <link rel="stylesheet" type="text/css"
          href="../themes/v6/css/v6_main.css" media="all" />
                    
        <script type="text/javascript" data-dojo-config="async:0,parseOnLoad:true,isDebug:false"
            src="/CDEJ/jscript/dojotk/dojo/dojo.js">// script content</script>
        <script type="text/javascript" src="/CDEJ/jscript/dojo.layer.js">// script content</script>
	<script type="text/javascript">
	          dojo.registerModulePath("curam", "../../curam");
	          dojo.registerModulePath("cm", "../../cm");
	</script>
	<script type="text/javascript" src="/CDEJ/jscript/cdej.js">// script content c</script>
	<script type="text/javascript" src="/CDEJ/jscript/cdej-cm.js">// script content d</script>
	<script type="text/javascript">var jsDF="d/M/yyyy";var jsDFs="d/M/yyyy";var jsDTFs="HH:mm";var jsTF="d/M/yyyy HH:mm";var jsTS=":";var modalMinimumHeight=100;var jsL="en";var jsModals=true;var jsHelpEnabled=true;var jsHelpExtension='jsp';</script><script type="text/javascript">LOCALIZED_MONTH_NAMES = new Array();LOCALIZED_MONTH_NAMES[0]='January';LOCALIZED_MONTH_NAMES[1]='February';LOCALIZED_MONTH_NAMES[2]='March';LOCALIZED_MONTH_NAMES[3]='April';LOCALIZED_MONTH_NAMES[4]='May';LOCALIZED_MONTH_NAMES[5]='June';LOCALIZED_MONTH_NAMES[6]='July';LOCALIZED_MONTH_NAMES[7]='August';LOCALIZED_MONTH_NAMES[8]='September';LOCALIZED_MONTH_NAMES[9]='October';LOCALIZED_MONTH_NAMES[10]='November';LOCALIZED_MONTH_NAMES[11]='December';</script>
        <script type="text/javascript">LOCALIZED_SHORT_MONTH_NAMES = new Array();LOCALIZED_SHORT_MONTH_NAMES[0]='Jan';LOCALIZED_SHORT_MONTH_NAMES[1]='Feb';LOCALIZED_SHORT_MONTH_NAMES[2]='Mar';LOCALIZED_SHORT_MONTH_NAMES[3]='Apr';LOCALIZED_SHORT_MONTH_NAMES[4]='May';LOCALIZED_SHORT_MONTH_NAMES[5]='Jun';LOCALIZED_SHORT_MONTH_NAMES[6]='Jul';LOCALIZED_SHORT_MONTH_NAMES[7]='Aug';LOCALIZED_SHORT_MONTH_NAMES[8]='Sep';LOCALIZED_SHORT_MONTH_NAMES[9]='Oct';LOCALIZED_SHORT_MONTH_NAMES[10]='Nov';LOCALIZED_SHORT_MONTH_NAMES[11]='Dec';</script>
        <script type="text/javascript">var jsBaseURL = curam.util.retrieveBaseURL();</script>
        <script type="text/javascript">var jsScreenContext = new curam.util.ScreenContext();jsScreenContext.setContext('4096');jsScreenContext.clear("ACTION");jsScreenContext.clear("ERROR|RESOLVE");require(["curam/util/onLoad"]);curam.util.onLoad.addPublisher(function(context){context.pageID = jsPageID;context.messageTitleAppend = messageTitleAppend;context.title = window.document.title;context.helpEnabled = jsHelpEnabled;context.helpExtension = jsHelpExtension;});curam.util.setupSubmitEventPublisher();</script>
        <script type="text/javascript">
          dojo.addOnLoad(function(){curam.ui.UIMPageAdaptor.initialize();});
        </script>	    
	<link rel="stylesheet" type="text/css" media="all" href="../CDEJ/jscript/dojotk/dijit/themes/soria/soria.css"/>
        <title>Cúram V6 User Interface</title>
      </head>
      
      <body class="DefaultApp basic en soria">
        <xsl:apply-templates select="." mode="preview-body"/>               
      </body>
    </html>
  </xsl:template>
  
  <xsl:template match="DISPLAY" mode="preview-body">         
        <div class="page-header">
           <div class="page-title-bar">
            <div class="title">
              <h1><xsl:apply-templates select="PAGE_TITLE" mode="styled"/></h1>
            </div>
            <xsl:apply-templates select="ACTION_SET" mode="page-level-actions" />
            
            <div id="__o3uid114" class="page-toolbar">
              <a title="Refresh" id="refresh_a" href="#" class="refresh"><xsl:text>&#160;</xsl:text></a>
              <a title="Print" id="print_a" href="#" class="print"><xsl:text>&#160;</xsl:text></a>
              <a title="Help" id="help_a" href="#" class="help"><xsl:text>&#160;</xsl:text></a>
            </div>
          </div>
          
         <!-- If the page has input fields, then we need the mandatory -->
         <xsl:variable name="has-input-fields"
             select="ancestor::PAGE//FIELD/@TARGET_FIELD"/>
        
        
        <xsl:if test="PAGE_TITLE/@DESCRIPTION
                    or MENU[@MODE = 'STATIC'] or $has-input-fields">
          <div class="page-description">
            <!-- Place the text in a separate DIV for easier positioning. -->
            <div>
              <xsl:attribute name="class">
                <xsl:text>description-title</xsl:text>
                <xsl:if test="$has-input-fields">
                  <xsl:text> mand-help</xsl:text>
                </xsl:if>
              </xsl:attribute>
              <xsl:if test="PAGE_TITLE/@DESCRIPTION">
                <xsl:value-of select="PAGE_TITLE/@DESCRIPTION"/>
               </xsl:if>
               <!-- Adding non-breaking space to allow page description bar to
                display correctly when mandatory required field text is displayed
                in description bar. -->
               <xsl:if test="$has-input-fields">
                 <xsl:text>&amp;nbsp</xsl:text>
               </xsl:if>
                
            </div>
            <!-- Only output this text when the page has an input field -->
            <xsl:if test="$has-input-fields">
              <div class="mandatory-icon-help">
                <xsl:value-of select="$mandatory-icon-help-text"/>
              </div>
            </xsl:if>
          </div>
          </xsl:if>
                         
        </div>
        
        <div id="content">
          
          <xsl:attribute name="class">
	    <xsl:choose>
	      <xsl:when test="PAGE_TITLE or ancestor::PAGE//FIELD/@TARGET_FIELD">
	        <xsl:if test="PAGE_TITLE">
	          <xsl:text>title-exists</xsl:text>
	        </xsl:if>
	        <xsl:if test="PAGE_TITLE/@DESCRIPTION or PAGE_TITLE/DESCRIPTION
	                                or ancestor::PAGE//FIELD/@TARGET_FIELD">
	          <xsl:text> desc-exists</xsl:text>
	        </xsl:if>
	      </xsl:when>
	      <xsl:otherwise>
	        <xsl:text>no-title-desc</xsl:text>
	      </xsl:otherwise>
	    </xsl:choose>
	    <xsl:if test="ACTION_SET">
	      <xsl:text> action-exists</xsl:text>
	    </xsl:if>
	  </xsl:attribute>

          <xsl:apply-templates select="MENU[@MODE = 'DYNAMIC']"
                               mode="preview-dynamic"/>
          <div>
             <xsl:apply-templates select="CLUSTER | LIST"/>
          </div>
          
          <xsl:if test="MENU[@MODE = 'IN_PAGE_NAVIGATION']">
            <div>
               <xsl:apply-templates select="MENU[@MODE = 'IN_PAGE_NAVIGATION']" mode="preview"/>
            </div>
          </xsl:if>
        </div>
  </xsl:template>
  
  <xsl:template match="MENU[@MODE = 'IN_PAGE_NAVIGATION']" mode="preview">
    <div style="top:50px;"><xsl:text>In Page Navigation Tabs:&amp;nbsp;</xsl:text>
      <xsl:apply-templates select="ACTION_CONTROL" mode="preview-in-page"/>
    </div>
  </xsl:template>

  <xsl:template name="preview-default-domain-value">
    <xsl:param name="domain-name" />
    <xsl:param name="fallback-value" />
    <xsl:variable name="domain-default"
      select="$domain-defaults/DOMAIN_DEFAULTS/DOMAIN[@NAME = $domain-name]"/>
    <xsl:choose>
      <xsl:when test="$domain-default">
        <xsl:value-of select="$domain-default/@DEFAULT"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:if test="$preview-fail-on-error = 'true'">
          <xsl:message terminate="yes">
            <xsl:text>ERROR: There is no default value to use when previewing the </xsl:text>
              <xsl:value-of select="$domain-name"/>
              <xsl:text> domain.</xsl:text>
          </xsl:message>
        </xsl:if>
        <xsl:message>
          <xsl:text>WARNING: There is no default value to use when previewing the </xsl:text>
            <xsl:value-of select="$domain-name"/>
            <xsl:text> domain.</xsl:text>
        </xsl:message>
        <xsl:value-of select="$fallback-value"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- This template must be maintained to match the entries in
       "domain-table.xml". This arrangement will suffice for now. -->
  <xsl:template match="FIELD" mode="preview-output-field">
    <xsl:variable name="output-for-specific-domain">
      <xsl:apply-templates select="." mode="preview-output-field-one-domain">
        <xsl:with-param name="domain-name" select="@DOMAIN"/>
      </xsl:apply-templates>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="not(exsl:node-set($output-for-specific-domain)/node())">
        <xsl:variable name="output-for-base-domain">
          <xsl:apply-templates select="." mode="preview-output-field-one-domain">
            <xsl:with-param name="domain-name" select="@BASE_DOMAIN"/>
          </xsl:apply-templates>
        </xsl:variable>
        <xsl:choose>
          <xsl:when test="not(exsl:node-set($output-for-base-domain)/node())">
            <!-- Handle other field controls. -->
            <xsl:apply-templates select="." mode="preview-output-field-generic"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:copy-of select="$output-for-base-domain"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="$output-for-specific-domain"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- This template must be maintained to match the entries in
       "domain-table.xml". This arrangement will suffice for now. -->
  <xsl:template match="FIELD" mode="preview-output-field-one-domain">
    <xsl:param name="domain-name" select="@DOMAIN"/>

    <xsl:variable name="mode">
      <xsl:choose>
        <xsl:when test="@TARGET_BEAN">target</xsl:when>
        <xsl:when test="@SOURCE_BEAN">source</xsl:when>
      </xsl:choose>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$domain-name = 'SVR_BOOLEAN'">
        <xsl:choose>
          <xsl:when test="$mode = 'target'">
            <!-- [boolean-input] -->
            <input type="checkbox" />
          </xsl:when>
          <xsl:otherwise>
            <!-- [boolean-output] -->
            <xsl:call-template name="preview-default-domain-value">
              <xsl:with-param name="domain-name" select="$domain-name"/>
              <xsl:with-param name="fallback-value">
                <xsl:text>[yes-or-no]</xsl:text>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$domain-name = 'SVR_DATE'">
        <xsl:choose>
          <xsl:when test="$mode = 'target'">
            <!-- [date-input] -->
            <table style="border-collapse:collapse;">
              <tbody>
                <tr>
                  <td style="padding:0;">
                    <input type="text"/>
                  </td>
                  <td style="width: 20px;">
                    <img src="/themes/classic/images/icons/date-selector.gif"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </xsl:when>
          <xsl:otherwise>
            <!-- [date-output] -->
            <xsl:call-template name="preview-default-domain-value">
              <xsl:with-param name="domain-name" select="$domain-name"/>
              <xsl:with-param name="fallback-value">
                <xsl:text>[date]</xsl:text>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$domain-name = 'SVR_DATETIME'">
        <xsl:choose>
          <xsl:when test="$mode = 'target'">
            <!-- [datetime-input] -->
            <table style="border-collapse:collapse;">
              <tbody>
                <tr>
                  <td>
                    <input type="text"/>
                  </td>
                  <td style="width: 20px;">
                    <img src="/themes/classic/images/icons/date-selector.gif"/>
                  </td>
                  <td>
                    <select>
                      <option><xsl:text>00</xsl:text></option>
                      <option><xsl:text>01</xsl:text></option>
                      <option><xsl:text>02</xsl:text></option>
                      <option><xsl:text>03</xsl:text></option>
                      <option><xsl:text>04</xsl:text></option>
                      <option><xsl:text>05</xsl:text></option>
                      <option><xsl:text>06</xsl:text></option>
                      <option><xsl:text>07</xsl:text></option>
                      <option><xsl:text>08</xsl:text></option>
                      <option><xsl:text>09</xsl:text></option>
                      <option><xsl:text>10</xsl:text></option>
                      <option><xsl:text>11</xsl:text></option>
                      <option><xsl:text>12</xsl:text></option>
                      <option><xsl:text>13</xsl:text></option>
                      <option><xsl:text>14</xsl:text></option>
                      <option><xsl:text>15</xsl:text></option>
                      <option><xsl:text>16</xsl:text></option>
                      <option><xsl:text>17</xsl:text></option>
                      <option><xsl:text>18</xsl:text></option>
                      <option><xsl:text>19</xsl:text></option>
                      <option><xsl:text>20</xsl:text></option>
                      <option><xsl:text>21</xsl:text></option>
                      <option><xsl:text>22</xsl:text></option>
                      <option><xsl:text>23</xsl:text></option>
                    </select>
                    <xsl:text>:</xsl:text>
                    <select>
                      <option><xsl:text>00</xsl:text></option>
                      <option><xsl:text>10</xsl:text></option>
                      <option><xsl:text>20</xsl:text></option>
                      <option><xsl:text>30</xsl:text></option>
                      <option><xsl:text>40</xsl:text></option>
                      <option><xsl:text>50</xsl:text></option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </xsl:when>
          <xsl:otherwise>
            <!-- [datetime-output] -->
            <xsl:call-template name="preview-default-domain-value">
              <xsl:with-param name="domain-name" select="$domain-name"/>
              <xsl:with-param name="fallback-value">
                <xsl:text>[date-and-time]</xsl:text>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$domain-name = 'FREQUENCY_PATTERN'">
        <xsl:choose>
          <xsl:when test="$mode = 'target'">
            <span class="popup-field">
              <span class="desc">&amp;nbsp;</span>
              <span class="popup-actions">
                <a href="#" class="popup-action">
                  <img alt="Click here to select a frequency pattern" src="/themes/v6/images/freq-pattern-icon.png"/>
                </a>
                <a class="popup-action" href="#">
                  <img alt="Click here to clear the selected value" src="/themes/v6/images/clear.png"/>
                </a>
              </span>
            </span>
          </xsl:when>
          <xsl:otherwise>
            <!-- [frequency-pattern-output] -->
            <xsl:call-template name="preview-default-domain-value">
              <xsl:with-param name="domain-name" select="$domain-name"/>
              <xsl:with-param name="fallback-value">
                <xsl:text>[frequency-pattern]</xsl:text>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$domain-name = 'CALENDAR_XML_STRING' and $mode = 'source'">
        <!-- [calendar-output] -->
        <img src="/themes/classic/images/previews/calendar.gif" />
      </xsl:when>
      <xsl:when test="$domain-name = 'EVIDENCE_TEXT' and $mode = 'source'">
        <!-- [rules-evidence-output] -->
        <img src="/themes/classic/images/previews/rules-evidence.gif" />
      </xsl:when>
      <xsl:when test="$domain-name = 'SEC_PASSWORD'">
        <xsl:choose>
          <xsl:when test="$mode = 'target'">
            <!-- [password-input] -->
            <input type="password" />
          </xsl:when>
          <xsl:otherwise>
            <xsl:call-template name="preview-default-domain-value">
              <xsl:with-param name="domain-name" select="$domain-name"/>
              <xsl:with-param name="fallback-value">
                <xsl:text>[password]</xsl:text>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$domain-name = 'REASSESSMENT_RESULT_TEXT'
                      and $mode = 'source'">
        <!-- [payment-statement-output] -->
        <img src="/themes/classic/images/previews/payment-statement.gif" />
      </xsl:when>
      <xsl:when test="$domain-name = 'ADDRESS_DATA'">
        <tr>
          <td>
            <xsl:choose>
              <xsl:when test="$mode = 'target'">
                <!-- [address-input] -->
                <xsl:choose>
                  <xsl:when test="@FIELD_CODETABLE">
                    <select>
                      <option>
                        <xsl:call-template name="preview-default-domain-value">
                          <xsl:with-param name="domain-name" select="$domain-name"/>
                          <xsl:with-param name="fallback-value">
                            <xsl:text>[address-data]</xsl:text>
                          </xsl:with-param>
                        </xsl:call-template>
                      </option>
                    </select>
                  </xsl:when>
                  <xsl:otherwise>
                    <input type="text" />
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:when>
              <xsl:otherwise>
                <xsl:call-template name="preview-default-domain-value">
                  <xsl:with-param name="domain-name" select="$domain-name"/>
                  <xsl:with-param name="fallback-value">
                    <xsl:text>[address-data]</xsl:text>
                  </xsl:with-param>
                </xsl:call-template>
              </xsl:otherwise>
            </xsl:choose>
          </td>
        </tr>
      </xsl:when>
      <xsl:when test="$domain-name = 'RATE_TABLE_DATA' and $mode = 'source'">
        <!-- [rate-table-output] -->
        <img src="/themes/classic/images/previews/rates-table.gif" />
      </xsl:when>
      <xsl:when test="$domain-name = 'RULES_DEFINITION' and $mode = 'source'
                      and @CONTROL = 'DEFAULT'">
        <!-- rules editor default view -->
        <img src="/themes/classic/images/previews/rules-editor-default.gif" />
      </xsl:when>
      <xsl:when test="$domain-name = 'RULES_DEFINITION' and $mode = 'source'
                      and @CONTROL = 'DYNAMIC'">
        <!-- rules editor dynamic view -->
        <img src="/themes/classic/images/previews/rules-editor-dynamic.gif" />
      </xsl:when>
      <xsl:when test="$domain-name = 'RESULT_TEXT' and $mode = 'source'
                      and @CONTROL = 'DEFAULT'">
        <!-- rules editor dynamic view -->
        <img src="/themes/classic/images/previews/rules-result.gif" />
      </xsl:when>
      <xsl:when test="$domain-name = 'RESULT_TEXT' and $mode = 'source'
                      and @CONTROL = 'SUMMARY'">
        <!-- rules summary view -->
        <img src="/themes/classic/images/previews/rules-result-summary.gif" />
      </xsl:when>
      <xsl:when test="$domain-name = 'RESULT_TEXT' and $mode = 'source'
                      and @CONTROL = 'DYNAMIC'">
        <!-- rules dynamic summary view -->
        <img
          src="/themes/classic/images/previews/rules-definition-summary.gif"/>
      </xsl:when>
      <xsl:when test="$domain-name = 'RESULT_TEXT' and $mode = 'source'
                      and @CONTROL = 'DYNAMIC_FULL_TREE'">
        <!-- rules dynamic full tree view -->
        <img
          src="/themes/classic/images/previews/rules-definition-full-tree.gif"/>
      </xsl:when>
      <xsl:when test="$domain-name = 'SCHEDULE_DATA'">
        <tr>
          <td>
            <img src="/themes/classic/images/previews/schedule.gif"/>
          </td>
        </tr>
      </xsl:when>
      <xsl:when test="$domain-name = 'PARAM_TAB_LIST'">
        <!-- batch function (the mode is ignored) -->
        <tr>
          <td class="label"><xsl:text>sampleBatchParameter1</xsl:text></td>
          <td class="field"><input type="text"/></td>
        </tr>
        <tr>
          <td class="label"><xsl:text>sampleBatchParameter2</xsl:text></td>
          <td class="field"><input type="text"/></td>
        </tr>
        <tr>
          <td class="label"><xsl:text>sampleBatchParameter3</xsl:text></td>
          <td class="field"><input type="text"/></td>
        </tr>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="FIELD" mode="preview-output-field-generic">
    <xsl:choose>
      <xsl:when test="@INITIAL_IS_LIST">
        <!-- Input selection from a list. -->
        <select>
          <option>
            <xsl:call-template name="preview-default-domain-value">
              <xsl:with-param name="domain-name" select="@DOMAIN"/>
              <xsl:with-param name="fallback-value">
                <xsl:text>[list-item]</xsl:text>
              </xsl:with-param>
            </xsl:call-template>
          </option>
        </select>
      </xsl:when>
      <xsl:when test="@TARGET_CODETABLE">
        <!-- Input selection from a code-table list. -->
        <select style="width:98%;">
          <option>
            <xsl:call-template name="preview-default-domain-value">
              <xsl:with-param name="domain-name" select="@DOMAIN"/>
              <xsl:with-param name="fallback-value">
                <xsl:text>[code-table-value]</xsl:text>
              </xsl:with-param>
            </xsl:call-template>
          </option>
        </select>
      </xsl:when>
      <xsl:when test="@TARGET_BEAN">
        <!-- Generic input using a text field. -->
        <input type="text" class="text">
          <xsl:if test="@HEIGHT &gt; 1">
            <xsl:attribute name="size">
              <xsl:value-of select="@HEIGHT"/>
            </xsl:attribute>
          </xsl:if>
        </input>
      </xsl:when>
      <xsl:when test="@SOURCE_BEAN">
        <!-- Domain-based output value. -->
        <xsl:call-template name="preview-default-domain-value">
          <xsl:with-param name="domain-name" select="@DOMAIN"/>
          <xsl:with-param name="fallback-value">
            <xsl:text>[field-value]</xsl:text>
          </xsl:with-param>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="@PARAMETER_NAME">
        <xsl:text>[parameter-value]</xsl:text>
      </xsl:when>
      <xsl:when test="@VALUE">
        <xsl:value-of select="@VALUE"/>
      </xsl:when>
      <xsl:otherwise>&amp;nbsp;</xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="FIELD" mode="preview-output-image-map">
    <xsl:text>[mapped-image]</xsl:text>
  </xsl:template>

  <xsl:template match="FIELD" mode="preview-output-pop-up">
    <!-- [input-data-value-with-popup] -->
    <xsl:variable name="domain" select="@DOMAIN"/>
    <xsl:variable name="multiple-domain-lookup"
      select="$curam-config/MULTIPLE_POPUP_DOMAINS
                           /MULTIPLE_POPUP_DOMAIN[DOMAIN = $domain]"/>
    <xsl:variable name="popup-pages-lookup"
      select="$curam-config/POPUP_PAGES/POPUP_PAGE[DOMAIN = $domain]"/>
    <xsl:variable name="multiple-domain-clear-icon"
      select="$curam-config/MULTIPLE_POPUP_DOMAINS/CLEAR_TEXT_IMAGE" />
    <xsl:variable name="popup-pages-clear-icon"
      select="$curam-config/POPUP_PAGES/CLEAR_TEXT_IMAGE" />
    <span class="popup-field">
      <span style="width: 100px">&#160;</span>
      <xsl:choose>
        <xsl:when test="$popup-pages-lookup">
          <img>
            <xsl:attribute name="src">
              <xsl:value-of
                   select="concat('/', $popup-pages-lookup/IMAGE)"/>
            </xsl:attribute>
          </img>
          <xsl:if test="$popup-pages-clear-icon">
            <img>
              <xsl:attribute name="src">
                <xsl:value-of
                     select="concat('/', $popup-pages-clear-icon)"/>
              </xsl:attribute>
            </img>
          </xsl:if>
        </xsl:when>
        <xsl:when test="$multiple-domain-lookup">
          <img>
            <xsl:attribute name="src">
              <xsl:value-of
                   select="concat('/', $multiple-domain-lookup/IMAGE)"/>
            </xsl:attribute>
          </img>
          <xsl:if test="$multiple-domain-clear-icon">
            <img>
              <xsl:attribute name="src">
                <xsl:value-of
                     select="concat('/', $multiple-domain-clear-icon)"/>
              </xsl:attribute>
            </img>
          </xsl:if>
        </xsl:when>
      </xsl:choose>
    </span>
  </xsl:template>

  <xsl:template match="FIELD" mode="preview-field-list-header">
    <xsl:value-of select="@LABEL"/>
  </xsl:template>

  <xsl:template match="MENU" mode="preview-dynamic">
    <xsl:text>[dynamic-menu]</xsl:text>
  </xsl:template>

  
  <xsl:template match="ACTION_CONTROL" mode="preview">
      <a href="#"><xsl:apply-templates select="." mode="link-text-or-image"/></a>
  </xsl:template>
 
  <xsl:template match="ACTION_CONTROL" mode="preview-in-page">
    <!-- Wrap with an anchor tag to make it a dummy link.... -->
    <a href="#"><xsl:apply-templates select="." mode="link-text-or-image"/></a>
    <xsl:text>&amp;nbsp;</xsl:text>
  </xsl:template>

  <xsl:template match="CLUSTER | LIST" mode="preview">
    <xsl:apply-templates select="." mode="common"/>
  </xsl:template>

  <xsl:template match="WIDGET" mode="preview" >
    <xsl:choose>
      <xsl:when test="@TYPE = 'FILE_UPLOAD'">
        <input type="file" />
      </xsl:when>
      <xsl:when test="@TYPE = 'FILE_EDIT'">
        <!-- No content. -->
      </xsl:when>
      <xsl:when test="@TYPE = 'MULTISELECT'">
        <input type="checkbox" />
      </xsl:when>
      <xsl:when test="@TYPE = 'EVIDENCE_COMPARE'">
        <img src="/themes/classic/images/previews/rules-compare.gif" />
      </xsl:when>
      <xsl:when test="@TYPE = 'RULES_SIMULATION_EDITOR'">
        <img src="/themes/classic/images/previews/rules-simulation.gif" />
      </xsl:when>
      <xsl:when test="@TYPE = 'RULES_DECISION_TREE'">
        <img
          src="/themes/classic/images/previews/rules-definition-summary.gif"/>
      </xsl:when>
      <xsl:when test="@TYPE = 'RULES_DECISION_FULL_TREE'">
        <img
          src="/themes/classic/images/previews/rules-definition-full-tree.gif"/>
      </xsl:when>
    </xsl:choose>
  </xsl:template>
    
  <xsl:template match="ACTION_CONTROL" mode="preview-in-list">
      <!-- Wrap with an anchor tag to make it a dummy link.... -->
      <a href="#" dojoType="dijit.MenuItem"  class="ac one right"><xsl:apply-templates select="." mode="link-text-or-image"/></a>
  </xsl:template>
  
  <xsl:template match="ACTION_CONTROL" mode="preview-action-round-corners">
    <A class="ac one center" 
      href="#">
      <SPAN class="left-corner">
        <SPAN class="right-corner">
          <SPAN class="middle">
            <IMG style="DISPLAY: none" src="../themes/v6/images/meeting-view/blank.png"/>
            <xsl:value-of select="@LABEL"/>
          </SPAN>
        </SPAN>
      </SPAN>
    </A>
    
  </xsl:template>
  
  
    <xsl:template match="ACTION_SET" mode="preview">
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
                <xsl:apply-templates select="ACTION_CONTROL" mode="preview-action-round-corners" />
              </xsl:when>
              <xsl:otherwise>
		<xsl:attribute name="class">
		  <xsl:text>page-level-menu</xsl:text>
		  <xsl:if test="count(ACTION_CONTROL) = 1">
		    <xsl:text> one</xsl:text>
		  </xsl:if>
		</xsl:attribute>
		<xsl:choose>
		<xsl:when test="count(ACTION_CONTROL) &gt; 2">
		 <div dojoType="curam.widget.DeferredDropDownButton" 
		      id="page-level-action-menu"
		      title="Click to display actions menu">
		   <span>
		     <img src="/themes/v6/images/actions-page-nor.png"
			  alt="${{pageLevelMenu}}">
		     </img>
		   </span>
		   <script type="text/javascript">
		     <xsl:text>require(["curam/widget/DeferredDropDownButton"]);
			       if(!curam.widgetTemplates){curam.widgetTemplates={};}
			       curam.widgetTemplates['page-level-action-menu']='&lt;div dojoType="dijit.Menu" class="expand-list-control"&gt;</xsl:text>

		    <xsl:choose>
		      <xsl:when test="CONDITION">
			<xsl:apply-templates select="../ACTION_SET" mode="conditional"/>
		      </xsl:when>
		      <xsl:otherwise>
			<xsl:apply-templates select="ACTION_CONTROL | SEPARATOR" mode="preview-in-list"/>
		      </xsl:otherwise>
		    </xsl:choose>

		     <xsl:text>&lt;/div&gt;';</xsl:text>
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
	    </xsl:otherwise>
	 </xsl:choose>
    </div>
  </xsl:template>
  
  
  
  <xsl:template match="ACTION_SET[@TYPE='LIST_ROW_MENU']" mode="preview-in-list">
      <xsl:param name="empty" select="0"/>
      <xsl:param name="packForPagination" select="'false'" />
      
      <xsl:variable name="list-actions-menu-id">
        <xsl:text>list-actions-menu-</xsl:text>
        <xsl:value-of select="generate-id()"/>
      </xsl:variable>
  
      <td class="last-field list-row-menu">
        <xsl:choose>
          <xsl:when test="$empty = 0">
            <div dojoType="curam.widget.DeferredDropDownButton"
                 class="expand-list-dropdown"
                 id="{$list-actions-menu-id}_${{pageScope.loopIndex}}"
                 title="Click to display list actions menu">
              <span>
                <img src="/themes/v6/images/expand-list-action-button.png"/>
              </span>
              <xsl:text>&lt;script type="text/javascript"&gt;</xsl:text>
              <xsl:text>require(["curam/widget/DeferredDropDownButton"]);
                         if(!curam.widgetTemplates){curam.widgetTemplates={};}
                         curam.widgetTemplates['</xsl:text>
                         <xsl:value-of select="$list-actions-menu-id" />
                         <xsl:text>_${pageScope.loopIndex}']='&lt;div dojoType="dijit.Menu" class="expand-list-control"&gt;</xsl:text>
                
            
              <!--<xsl:when test="CONDITION">
                <xsl:apply-templates select="../ACTION_SET" mode="conditional"/>
              </xsl:when>
              <xsl:otherwise>-->
                <xsl:apply-templates select="ACTION_CONTROL | SEPARATOR" mode="preview-in-list"/>
              <!--</xsl:otherwise>-->
            
            
              <xsl:text>&lt;/div&gt;';</xsl:text>
              <xsl:text>&lt;/script&gt;</xsl:text>
            </div>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>&amp;nbsp;</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </td>
  </xsl:template>
  
</xsl:stylesheet>
