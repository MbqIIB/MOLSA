import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Properties;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import com.ibm.broker.javacompute.MbJavaComputeNode;
import com.ibm.broker.plugin.MbElement;
import com.ibm.broker.plugin.MbException;
import com.ibm.broker.plugin.MbMessage;
import com.ibm.broker.plugin.MbMessageAssembly;
import com.ibm.broker.plugin.MbOutputTerminal;
import com.ibm.broker.plugin.MbUserException;
import com.ibm.broker.plugin.MbXPath;


public class FileLogMsgflow_FileLogging extends MbJavaComputeNode {

	private  String defaultFileSize = "1";
	private  String DefaultLogDirectory = "C:/WMBLog";
	private  String DefaultServiceName = "unknownService";
	private  String Namespace = "urn:esb.com/gbo/xml/schemas/v1_0/";
	private  String  header=" "; 
	private static String fileSeparator = "/";
	
	public void evaluate(MbMessageAssembly inAssembly) throws MbException {
		MbOutputTerminal out = getOutputTerminal("out");
		MbOutputTerminal alt = getOutputTerminal("alternate");

		MbMessage inMessage = inAssembly.getMessage();

		// create new message
		MbMessage outMessage = new MbMessage(inMessage);
		MbMessageAssembly outAssembly = new MbMessageAssembly(inAssembly,
				outMessage);

		try {
			// ----------------------------------------------------------
			// Add user code below	
			
//			String logMessage = new String(inMessage.getBuffer());
//			logMessage = logMessage.substring(logMessage.indexOf("<"));	
//			String logMessage = new String ( (byte[]) inAssembly.getLocalEnvironment().getRootElement().getFirstElementByPath("Variables/Data").getValue());
			String logMessage = inAssembly.getLocalEnvironment().getRootElement().getFirstElementByPath("Variables/Data").getValueAsString();
			Object value =  inMessage.getRootElement().getLastChild().getLastChild().toString();
			Object value2 =  inMessage.getRootElement().getLastChild().toString();
//			String logMessage =  new String(inMessage.getRootElement().getLastChild().getLastChild().getValue());
			
			String logDirName =inAssembly.getLocalEnvironment().getRootElement().getFirstElementByPath("Variables/logDirectory").getValueAsString();
			String ServiceName =inAssembly.getLocalEnvironment().getRootElement().getFirstElementByPath("Variables/serviceName").getValueAsString();
			ServiceName = (ServiceName == null || "".equals(ServiceName)) ? DefaultServiceName : ServiceName;
			String fileSize = "1";
			String channelName = inAssembly.getLocalEnvironment().getRootElement().getFirstElementByPath("Variables/clientChannel").getValueAsString();;
			String encryptionEnabled = "N";
			
			header="Broker:"+getBroker().getName();
			String suffix = ServiceName+".log";
			String fullLogDirectory ="";
			if ("trace".equals(ServiceName) || "errors".equals(ServiceName) || ServiceName.contains("trace") )
				fullLogDirectory=logDirName;			
			else
				fullLogDirectory = logDirName + fileSeparator +  channelName ;
 
			String logFileName = fullLogDirectory + fileSeparator + suffix;
			checkDirectory(fullLogDirectory);
			try {				
				if(fileSize == null || "".equals(fileSize))
					fileSize = defaultFileSize;
				File logFile = createLogFile(logFileName, Integer.parseInt(fileSize));
								
				if("Y".equalsIgnoreCase(encryptionEnabled)){
					logMessage = encrypt(logMessage);
				}
				
				writeIntoFile(logMessage, logFile, true);
				
			} catch (NumberFormatException e) {
				e.printStackTrace();	
				throw e;
			} catch (IOException e) {
				e.printStackTrace();	
				throw new MbUserException(e.getClass().getName(), null, null, null, null, e.getStackTrace());
			} catch (InvalidKeyException e) {
				e.printStackTrace();
				throw new MbUserException(e.getClass().getName(), null, null, null, null, e.getStackTrace());
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
				throw new MbUserException(e.getClass().getName(), null, null, null, null, e.getStackTrace());
			} catch (NoSuchPaddingException e) {
				e.printStackTrace();
				throw new MbUserException(e.getClass().getName(), null, null, null, null, e.getStackTrace());
			} catch (IllegalBlockSizeException e) {
				e.printStackTrace();
				throw new MbUserException(e.getClass().getName(), null, null, null, null, e.getStackTrace());
			} catch (BadPaddingException e) {
				e.printStackTrace();
				throw new MbUserException(e.getClass().getName(), null, null, null, null, e.getStackTrace());
			}			

			// End of user code
			// ----------------------------------------------------------

			// The following should only be changed
			// if not propagating message to the 'out' terminal
			out.propagate(outAssembly);

		} finally {
			// clear the outMessage
			outMessage.clearMessage();
		}
	}
	
	private void checkDirectory(String directory){
		File dir = new File(directory);
		if (dir.exists() && dir.isDirectory())
			return;
		else
			dir.mkdirs();
	}
	
	private File createLogFile(String fileName, int maxFileSize) throws IOException{
		File logFile =new File(fileName); 
		
		if (logFile.exists() && logFile.isFile()){
			if((logFile.length()/1024) > (maxFileSize * 1024)){
				String newFileName = fileName.substring(0, fileName.indexOf(".log")) + "_" + getCurrentTime() + ".log";
				logFile.renameTo(new File(newFileName));
				logFile = new File(fileName);
				logFile.createNewFile();
			}			
		}else{
			logFile.createNewFile();
		}			
		
		return logFile;
	}
	
	private String getCurrentTime(){
		DateFormat dateFormat=new SimpleDateFormat("dd-MMM-yyyy HH.mm.ss.SSS");
		Calendar c=new GregorianCalendar();
		Date currentDate =c.getTime();
		return dateFormat.format(currentDate);
	}
	
	private String getDateHeaderLog(){
		DateFormat dateFormat=new SimpleDateFormat("dd-MMM-yyyy HH.mm.ss.SSS");
		Calendar c=new GregorianCalendar();
		Date currentDate =c.getTime();
		String inputXML=new String();
		inputXML="===================================[ DateTime :"+dateFormat.format(currentDate).split(" ")[0]+", "+dateFormat.format(currentDate).split(" ")[1]+" ]"+"["+header+"]==========================================";
		return inputXML;
	}
	
	private String getTodayDate(){
		DateFormat dateFormat=new SimpleDateFormat("ddMMyyyy");
		Calendar c=new GregorianCalendar();
		Date currentDate =c.getTime();
		return dateFormat.format(currentDate);
	}
	
	private void writeIntoFile(String logMessage,File file,boolean append) throws IOException, MbException {
		
		BufferedWriter out;
		out = new BufferedWriter(new FileWriter(file,true));
		//out.newLine();
		out.write(getDateHeaderLog());
		out.newLine();
		out.write(logMessage);
		out.newLine();
		out.write("===================================================================================================================================================================================================================");
		out.newLine();
		out.close();
		//throw new IOException();
	}
	
	private String encrypt(String message) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException{
		// Get the KeyGenerator

//	       KeyGenerator kgen = KeyGenerator.getInstance("AES");
//	       kgen.init(128); // 192 and 256 bits may not be available


	       // Generate the secret key specs.
//	       SecretKey skey = kgen.generateKey();
//	       byte[] raw = skey.getEncoded();

		String key = (String)getUserDefinedAttribute("ENCRYPTION_KEY");
		//System.out.println("key: "+key);
        SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes(), "AES");
        


       // Instantiate the cipher

        Cipher cipher = Cipher.getInstance("AES");

        cipher.init(Cipher.ENCRYPT_MODE, skeySpec);

        byte[] encrypted =cipher.doFinal(message.getBytes());
       
        return Base64Coder.encodeLines(encrypted);
	}
	
    /**
     * Turns array of bytes into string
     *
     * @param buf	Array of bytes to convert to hex string
     * @return	Generated hex string
     */
     private String asHex (byte buf[]) {
      StringBuffer strbuf = new StringBuffer(buf.length * 2);
      int i;

      for (i = 0; i < buf.length; i++) {
       if (((int) buf[i] & 0xff) < 0x10)
	    strbuf.append("0");

       strbuf.append(Long.toString((int) buf[i] & 0xff, 16));
      }

      return strbuf.toString();
     }
	
	
	static{
		Properties envProperties = new Properties();
		Runtime runTime = Runtime.getRuntime();
		String Os = System.getProperty("os.name").toLowerCase();
		System.out.println("OS NAME : "+Os);
		try {
			if(Os.indexOf("windows") > -1){
				//fileSeparator = "\\";
			}else{
				fileSeparator = "/";
			}
		}catch(Exception e){}
	}

}
