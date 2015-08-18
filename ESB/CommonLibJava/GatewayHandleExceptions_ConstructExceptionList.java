import com.ibm.broker.javacompute.MbJavaComputeNode;
import com.ibm.broker.plugin.MbElement;
import com.ibm.broker.plugin.MbException;
import com.ibm.broker.plugin.MbMessage;
import com.ibm.broker.plugin.MbMessageAssembly;
import com.ibm.broker.plugin.MbOutputTerminal;
import com.ibm.broker.plugin.MbUserException;


public class GatewayHandleExceptions_ConstructExceptionList extends
		MbJavaComputeNode {

	public void evaluate(MbMessageAssembly assembly) throws MbException {
		MbOutputTerminal out = getOutputTerminal("out");
		MbOutputTerminal alt = getOutputTerminal("alternate");

		try {
			MbMessage message = assembly.getMessage();
			MbElement tmp = null;
			String refNum=null;
			tmp =   assembly.getGlobalEnvironment().getRootElement().getFirstElementByPath("Variables/Org/referenceNum");
			
			if(tmp != null && !"".equals(tmp.getValueAsString())){
				refNum = tmp.getValueAsString();
			}

			
			StringBuilder logMessage = new StringBuilder();		
			String exList  = CommonFunctions.getExceptionString(assembly.getExceptionList(),logMessage);
			String logMessageStr = logMessage.toString();	

			if (refNum != null){
				exList = "<h4>Refernce Num : " +refNum+"</h4>"+exList;
				logMessageStr="Refernce Num : "+refNum+"\n"+logMessageStr;
			}
			assembly.getGlobalEnvironment().getRootElement().evaluateXPath("?Variables/?Log");//?StringException[set-value('"+logMessage+"')]");
			tmp = assembly.getGlobalEnvironment().getRootElement().getFirstElementByPath("Variables/Log") ;
			if(tmp != null ){
				 tmp.createElementAsFirstChild(MbElement.TYPE_NAME_VALUE, "StringException", logMessageStr);
				 tmp.createElementAsFirstChild(MbElement.TYPE_NAME_VALUE, "HTMLException", exList);
			}
		} catch (MbException e) {
		
		} catch (RuntimeException e) {
			
		} catch (Exception e) {
			
		}

		// Change following to propagate the message to the 'out' or 'alt' terminal
		out.propagate(assembly);
	}

}
