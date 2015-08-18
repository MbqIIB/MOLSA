import java.util.List;

import com.ibm.broker.plugin.MbElement;
import com.ibm.broker.plugin.MbException;
import com.ibm.broker.plugin.MbMessage;


public class CommonFunctions {

	public static String getExceptionString(MbMessage exceptionList, StringBuilder logMessage) throws MbException{
		StringBuilder excpMessage = new StringBuilder();		
		List excpList =  (List) exceptionList.getRootElement().evaluateXPath("/*");		
		for(int i=0 ; i<excpList.size();i++){
			MbElement el = (MbElement) excpList.get(i);
			// Check element type
			if(el.getFirstChild() != null){
				excpMessage.append("<b>"+el.getName()+"</b><br />");
				logMessage.append(el.getName()+"\n");
				excpMessage.append(getInnerException(el,logMessage));
			}else{
				excpMessage.append(el.getName() + ": " + el.getValueAsString());
				logMessage.append(el.getName() + ": " + el.getValueAsString());
				excpMessage.append("<br />");
				logMessage.append("\n");
			}			
		}
		return excpMessage.toString();
	}
	
	public static String getInnerException(MbElement el, StringBuilder logMessage) throws MbException{
		StringBuilder message = new StringBuilder();
		
		List childs = (List) el.evaluateXPath("*");
		for(int i=0;i<childs.size();i++){
			MbElement child = (MbElement) childs.get(i);
			if(child.getFirstChild() != null){
				// HACK! recursion coming up. Get the values of Inserts		
				message.append("&nbsp;&nbsp;<b>"+child.getName()+"</b><br />");
				logMessage.append("  "+child.getName()+"\n");
				message.append(getInnerException(child,logMessage));
			}else{
				message.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +child.getName()  +":"+ child.getValueAsString());
				logMessage.append("     " +child.getName()  +":"+ child.getValueAsString());
				message.append("<br />");
				logMessage.append("\n");
			}
				
		}
		
		return message.toString();
	}
}
