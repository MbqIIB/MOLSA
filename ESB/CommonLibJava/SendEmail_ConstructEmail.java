import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import sun.misc.BASE64Encoder;

import com.ibm.broker.javacompute.MbJavaComputeNode;
import com.ibm.broker.plugin.*;

public class SendEmail_ConstructEmail extends MbJavaComputeNode {

	public void evaluate(MbMessageAssembly assembly) throws MbException {
		MbOutputTerminal out = getOutputTerminal("out");
		MbOutputTerminal alt = getOutputTerminal("alternate");

		MbMessage message = assembly.getMessage();


		  // Create a new assembly to propagate out of this node
		  MbMessage outMessage = new MbMessage();
		  copyMessageHeaders(assembly.getMessage(), outMessage);
		  MbMessage outLocalEnv = new MbMessage(assembly.getLocalEnvironment());
		  MbMessage outExceptionList = new MbMessage(assembly.getExceptionList());
		  MbMessageAssembly outAssembly = new MbMessageAssembly(assembly, outLocalEnv, outExceptionList, outMessage);
		  MbElement localEnv = outAssembly.getLocalEnvironment().getRootElement();

		  // Create the EmailOutputHeader parser. This is where we add recipient,
		  // sender and subject information.
		  MbElement root = outMessage.getRootElement();
		  MbElement SMTPOutput = root.createElementAsLastChild("EmailOutputHeader");

		  // Add recipient information to EmailOutputHeader
//		  SMTPOutput.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "To", "tamerm@qa.gbm.ihost.com,tamer_latif77@yahoo.com");

		  // Add sender information to EmailOutputHeader
//		  SMTPOutput.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "From", "GBMMW@qiib.com.qa");
		  

		  // Add subject information to EmailOutputHeader
		  
		  String subject = assembly.getLocalEnvironment().getRootElement().getFirstElementByPath("Varaibles/EmailData/Subject").getValue().toString();
		  String body = assembly.getLocalEnvironment().getRootElement().getFirstElementByPath("Varaibles/EmailData/Body").getValue().toString();

		  ESBEmail esbEmail=SubsituteVariables(subject, body, assembly);
		  esbEmail.subject=filterConstantKeywords(esbEmail.subject);
		  esbEmail.body=filterConstantKeywords(esbEmail.body);

		  SMTPOutput.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "Subject",esbEmail.subject);

		  // Create Destination.Email. This is where we add SMTP server information.
//		  MbElement Destination = localEnv.createElementAsLastChild(MbElement.TYPE_NAME, "Destination", null);
//		  MbElement destinationEmail = Destination.createElementAsLastChild(MbElement.TYPE_NAME, "Email", null);
//		  destinationEmail.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "SMTPServer", "meganta.qiibonline.com:2525");

		  // Set last child of root (message body) as MIME.
		  MbElement MIME = root.createElementAsLastChild("MIME");

		  // Create the Content-Type child of MIME explicitly to ensure the correct order.
		  MIME.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "Content-Type", "multipart/mixed; boundary=myBoundary");
		  MIME.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "Content-ID", "new MIME document");
		  MbElement parts = MIME.createElementAsLastChild(MbElement.TYPE_NAME, "Parts", null);
		  MbElement part, data, blob;

		  // First part:
		  //   Create the body of the email.
		  //   The body of the email has the text 'This is the main body of the email.'.
		  String ContentType =  assembly.getLocalEnvironment().getRootElement().getFirstElementByPath("Varaibles/EmailData/ContentType").getValue().toString();
		  
		  part = parts.createElementAsLastChild(MbElement.TYPE_NAME, "Part", null);
		  part.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "Content-Type", ContentType+"; charset=utf-8");
		  part.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "Content-Transfer-Encoding", "8bit");
		  data = part.createElementAsLastChild(MbElement.TYPE_NAME, "Data", null);
		  blob = data.createElementAsLastChild("BLOB");
		  try {
			blob.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "BLOB", esbEmail.subject.getBytes("UTF8"));
		  } catch (UnsupportedEncodingException e) {
			//fail.propagate(outAssembly);
		  }
		  
		  // check if attachments exists
		  
			List attachs =  (List)  assembly.getLocalEnvironment().getRootElement().evaluateXPath("Varaibles/EmailData/Attachment");
			
			for(int i=0 ; i<attachs.size();i++){
				MbElement att = (MbElement) attachs.get(i);
				String attachmentName= att.getFirstElementByPath("Name").getValueAsString();
				if (attachmentName==null){
					attachmentName="attachment_" + i+1;
				}
				MbElement relativePath = att.getFirstElementByPath("Path");
				if ( relativePath == null || relativePath.getValueAsString() == null ||  relativePath.getValueAsString() == ""){
					continue;
				}
				String attContent= getAttachmentContent(att.getFirstElementByPath("Path").getValueAsString(), assembly);
			    if (attContent == null){
			    	continue;
			    }
			  // Second part:
			  //   Create the attachment of an email.
			  //   The attachment is called 'attachment.txt' and contains the text 'This is an attachment.'.
			  part = parts.createElementAsLastChild(MbElement.TYPE_NAME, "Part", null);
			  part.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "Content-Type", "application/octet-stream; charset=utf-8;name="+attachmentName);
			  part.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "Content-Transfer-Encoding", "base64");
			  data = part.createElementAsLastChild(MbElement.TYPE_NAME, "Data", null);
			  blob = data.createElementAsLastChild("BLOB");
			  try {
				blob.createElementAsLastChild(MbElement.TYPE_NAME_VALUE, "BLOB", attContent.getBytes());
			  } catch (Exception e) {
//						fail.propagate(outAssembly);
			  }
			    	
			}
		  MIME.getFirstElementByPath("Content-Type").setValue("multipart/mixed; boundary=myBoundary");
		
		  outMessage.finalizeMessage(MbMessage.FINALIZE_VALIDATE);
		  out.propagate(outAssembly);
		  
	}


	public void copyMessageHeaders(MbMessage inMessage, MbMessage outMessage)
			throws MbException {
		MbElement outRoot = outMessage.getRootElement();

		// iterate though the headers starting with the first child of the root
		// element
		MbElement header = inMessage.getRootElement().getFirstChild();
		while (header != null && header.getNextSibling() != null) // stop before
																	// the last
																	// child
																	// (body)
		{
			// copy the header and add it to the out message
			outRoot.addAsLastChild(header.copy());
			// move along to next header
			header = header.getNextSibling();
		}
	}

	private String filterConstantKeywords(String input) throws MbException{
		String out = input;
		out = replaceString(out, "\\$date\\$", formatTime(new Date(), "EEE, d MMM yyyy"));
		out = replaceString(out, "\\$time\\$", formatTime(new Date(), "H:mm z"));
		out = replaceString(out, "\\$datetime\\$", formatTime(new Date(), "EEE, d MMM yyyy H:mm z"));
		return out;
	}

	private String replaceString(String source, String patern, String replaceWith){
		replaceWith = (replaceWith == null) ? "" : replaceWith;
		String output = "";
		Pattern pattern = Pattern.compile(patern,Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(source);
		output = matcher.replaceAll(replaceWith);		
		return output;
	}
	
	private String formatTime(Date timeStamp, String formatter){
		if(timeStamp == null){
			return "";
		}
		SimpleDateFormat sdf = new SimpleDateFormat(formatter);
		return sdf.format(timeStamp);
		
	}
	
	private ESBEmail SubsituteVariables(String subject,String body, MbMessageAssembly assembly) throws MbException{

		ESBEmail esbEmail = new ESBEmail(subject, body);
		List vars =  (List)  assembly.getLocalEnvironment().getRootElement().evaluateXPath("Varaibles/EmailData/subt");
		
		if(vars.size() <= 0){
			return esbEmail;
		}

		MbElement tmp = ((MbElement) vars.get(0)).getFirstChild();
		
		while(tmp != null){
			try{
				String var = tmp.getName();
				esbEmail.subject = replaceString(esbEmail.subject, "\\$"+var+"\\$", tmp.getValueAsString());
				esbEmail.body = replaceString(esbEmail.body, "\\$"+var+"\\$", tmp.getValueAsString());				
				tmp = tmp.getNextSibling();
			}catch(Exception e){
				throw new MbUserException(this, "evaluate()", "", "", e.toString(),
						null);			}			
		}		
		
		return esbEmail;		
		
	}		

	protected MbElement getFirstElementByXPath2(MbElement el,String xpath) {
		try {
			List elements =  (List) el.evaluateXPath(xpath);
			if(elements.size() != 0){
				return (MbElement) elements.get(0);
			}
		} catch (Exception e) {
		}
		return null;
	}

	private String getBase64Encoded(MbElement el) throws MbException{
		try {
			byte[] bytes= (byte[]) el.getValue();
			BASE64Encoder encoder= new BASE64Encoder();
			return encoder.encode(bytes);
		} catch (Exception e) {
		}
		return null;
	}
	private String getAttachmentContent(String xpath, MbMessageAssembly assembly) throws MbException{

		MbElement e1 =getFirstElementByXPath2(assembly.getMessage().getRootElement(),xpath);
		if(e1 !=null){
			return getBase64Encoded(e1);
		}

		 e1 =getFirstElementByXPath2(assembly.getGlobalEnvironment().getRootElement(),xpath);
		if(e1 !=null){
			return getBase64Encoded(e1);
		}

		 e1 =getFirstElementByXPath2(assembly.getLocalEnvironment().getRootElement(),xpath);
		if(e1 !=null){
			return getBase64Encoded(e1);
		}
		
		return null;
	}		
	protected class ESBEmail{
		String subject;
		String body;
		
		public ESBEmail(){
			
		}
		
		public ESBEmail( String subject, String body){
			this.subject = subject;
			this.body = body;
		}
	}


}
