<?xml version="1.0" encoding="UTF-8"?>
<jsp:root xmlns="http://www.w3.org/1999/xhtml"
          xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0">
  <jsp:directive.page isErrorPage="false" pageEncoding="UTF-8"
                      contentType="text/html;charset=UTF-8" language="java" />
  <html lang="@LOCALE@">
    <title>
    <jsp:scriptlet>
    out.print(curam.util.common.util.xml.XMLEscaper.escapeXML(curam.docmaker.tools.help.Messages.getString("Help.Name.Main.Page")));
    </jsp:scriptlet>
    </title>
    
    <jsp:scriptlet>
    String framesetTitle = curam.util.common.util.xml.XMLEscaper.escapeXML(curam.docmaker.tools.help.Messages.getString("HelpServlet.Name.Top.Frameset"));
    String controlsFramesetTitle = curam.util.common.util.xml.XMLEscaper.escapeXML(curam.docmaker.tools.help.Messages.getString("HelpServlet.Name.Controls.Frameset"));
    String logoTitle = curam.util.common.util.xml.XMLEscaper.escapeXML(curam.docmaker.tools.help.Messages.getString("HelpServlet.Name.Logo"));
    String searchFrameTitle = curam.util.common.util.xml.XMLEscaper.escapeXML(curam.docmaker.tools.help.Messages.getString("HelpServlet.Name.Search.Frame"));
    String mainFrameTitle = curam.util.common.util.xml.XMLEscaper.escapeXML(curam.docmaker.tools.help.Messages.getString("HelpServlet.Name.Main.Frame"));
    </jsp:scriptlet>
    
    <frameset name="help" cols="*, 3*" title="${framesetTitle}">
      <jsp:scriptlet><![CDATA[
        String topic = request.getParameter("topicname");
        out.print("<frameset id=\"control\" name=\"control\" "
                  + "rows=\"80, *\" title=\"" + controlsFramesetTitle + "\">");
        if (topic == null) {
          topic = request.getQueryString();
        }
        out.print("<frame name=\"logo\" src=\"help-logo.html\" "
                  + "scrolling=\"no\" title=\"" + logoTitle + "\" />");
        out.print("<frame name=\"search\" src=\"search\" ");
        out.print("title=\"" + searchFrameTitle + "\" />");
        out.print("</frameset>");
        out.print("<frame name=\"main\" src=\"topic");
        if (topic != null && topic.length() > 0) {
          out.print("?topicname=" + topic);
        }
        out.print("\" title=\"" + mainFrameTitle + "\" />");
      ]]></jsp:scriptlet>
      <noframes>
        <body>
          <p>
            <jsp:scriptlet>
            out.print(curam.util.common.util.xml.XMLEscaper.escapeXML(curam.docmaker.tools.help.Messages.getString("Help.Msg.NoFrames")));
            </jsp:scriptlet>
          </p>
        </body>
      </noframes>
    </frameset>
  </html>
</jsp:root>
