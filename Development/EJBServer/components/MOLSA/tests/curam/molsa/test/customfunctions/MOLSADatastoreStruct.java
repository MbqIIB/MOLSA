package curam.molsa.test.customfunctions;

/**
 * 
 *Class containing datastoreID and xml
 *
 */
public final class MOLSADatastoreStruct {
  /**
   * @return the datastoreID
   */
  public long getDatastoreID() {
    return datastoreID;
  }
  /**
   * @param datastoreID the datastoreID to set
   */
  
  public void setDatastoreID(long datastoreID) {
    this.datastoreID = datastoreID;
  }
  /**
   * @return the xml
   */
  public String getXml() {
    return xml;
  }
  /**
   * @param xml the xml to set
   */
  public void setXml(String xml) {
    this.xml = xml;
  }
  private long datastoreID;
  private String xml;}
