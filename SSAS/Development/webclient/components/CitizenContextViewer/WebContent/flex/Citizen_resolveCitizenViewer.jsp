<?xml version="1.0" encoding="UTF-8"?>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0">

 
  <jsp:directive.page buffer="32kb" contentType="text/html; charset=UTF-8"
                      pageEncoding="UTF-8"/>
  <jsp:output omit-xml-declaration="yes"/>
  <jsp:text><![CDATA[<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">]]></jsp:text>
 
 
   <!--<script type="text/javascript" src="../../Context/ContextViewerPopup.js">//content</script>-->
   <script type="text/javascript">
   function setTitle(title){
      document.title=title;
   
   }
   </script> 
      
 <style>
body { margin: 0px; }
</style>

 <html bgcolor="#d2d2d2" >
 
 
  <jsp:scriptlet>
  <![CDATA[
  String contextType =request.getParameter("contextType");
  if(contextType==null){
    contextType = "";
  }
  String concernRoleID =request.getParameter("concernRoleID");
  
  String encodedConcernRoleID = curam.omega3.request.RequestUtils.escapeURL(concernRoleID); 
  String encodedContextType = curam.omega3.request.RequestUtils.escapeURL(contextType);
           
  String flashObj = 	
 "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'"+
	"id='CitizenContext' width='100%' height='500'"+
	"codebase='https://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab'>"+
	"<param name='src' value='../flex/CitizenContext.swf' />"+
	"<param name='align' value='left' />"+
	"<param name='flashVars' value='concernRoleID="+encodedConcernRoleID+"&contextType="+encodedContextType+"'/>"+
	"<param name='quality' value='high' />"+
	"<param name='bgcolor' value='#d2d2d2' />"+
	"<param name='autoStart' value='-1'>"+
	"<param name='allowScriptAccess' value='sameDomain' />"+
	"<embed flashVars=concernRoleID="+encodedConcernRoleID+"&contextType="+encodedContextType+""+
	" src='../flex/CitizenContext.swf' swliveconnect='true' quality='high' bgcolor='#d2d2d2'"+
		"width='100%' height='500' name='CitizenContext' align='middle'"+
		"play='true'"+
		"loop='false'"+
		"allowScriptAccess='sameDomain'"+
		"type='application/x-shockwave-flash'"+
		"pluginspage='https://www.adobe.com/go/getflashplayer'></embed></object>";
	
	out.print(flashObj.toString());	
	
]]>
  
</jsp:scriptlet>
 
<head>


<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Citizen Context Viewer</title>

<script src="../CDEJ/jscript/AC_OETags.js" language="javascript"></script>
<style>
body { margin: 0px; overflow:hidden }
</style>
<script language="JavaScript" type="text/javascript">

</script>

</head>
<body scroll="no">

<script language="JavaScript" type="text/javascript">
</script>

</body>
 
</html>

</jsp:root>