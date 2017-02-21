<?xml version="1.0" encoding="UTF-8"?>

<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <PAGE_TITLE>
    <CONNECT>
      <SOURCE
        NAME="TEXT"
        PROPERTY="PageTitle.StaticText1"
      />
    </CONNECT>
  </PAGE_TITLE>

  <!-- Begin: CR 2.1 --> 
  <SERVER_INTERFACE
    CLASS="MOLSACalcCertDateRange"
    NAME="DISPLAY"
    OPERATION="calcCertificationDates"
  />
  <!-- End: CR 2.1 -->
  
  <SERVER_INTERFACE
    CLASS="MOLSAProductDelivery"
    NAME="ACTION"
    OPERATION="createCertification"
    PHASE="ACTION"
  />


  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="ACTION"
        PROPERTY="informationMsgTxt"
      />
    </CONNECT>
  </INFORMATIONAL>
 
  <PAGE_PARAMETER NAME="caseID"/>
  <PAGE_PARAMETER NAME="pageDescription"/>
  <PAGE_PARAMETER NAME="certPeriod"/>

  <!-- Begin: CR 2.1 -->  
  <CONNECT>
     <SOURCE
       NAME="PAGE"
       PROPERTY="caseID"
     />
     <TARGET
       NAME="DISPLAY"
       PROPERTY="key$caseID"
     />
   </CONNECT>
   <CONNECT>
     <SOURCE
       NAME="PAGE"
       PROPERTY="certPeriod"
     />
     <TARGET
       NAME="DISPLAY"
       PROPERTY="key$certPeriodCode"
     />
   </CONNECT>  
   <!-- End: CR 2.1 -->
  
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="caseID"
    />
  </CONNECT>


   <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$fromDate"
        />
       <TARGET
          NAME="ACTION"
          PROPERTY="periodFromDate"
        />        
      </CONNECT>       
    
     <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$toDate"
        />
       <TARGET
          NAME="ACTION"
          PROPERTY="periodToDate"
        />        
      </CONNECT>   

  <CLUSTER NUM_COLS="2">
 
	<CONDITION>
		<IS_TRUE
            NAME="DISPLAY"
            PROPERTY="result$modifiableInd"
          />
	</CONDITION>
             
    <FIELD LABEL="Field.Label.From">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$fromDate"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="periodFromDate"
        />
      </CONNECT>          
    </FIELD>

    <FIELD LABEL="Field.Label.Received">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="certificationReceivedDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.DocumentRefNumber">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="documentRefNumber"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.To"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$toDate"
        />
      </CONNECT> 
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="periodToDate"
        />
      </CONNECT>            
    </FIELD>
    <!--  
    <FIELD
      LABEL="Field.Label.CertPeriod"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$certPeriodCode"
        />
      </CONNECT>
       <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="certPeriodCode"
        />
      </CONNECT>             
    </FIELD> 
    -->   

    <FIELD LABEL="Field.Label.FileRefNumber">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="fileRefNumber"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>

  <CLUSTER NUM_COLS="2">

	<CONDITION>
		<IS_FALSE
            NAME="DISPLAY"
            PROPERTY="result$modifiableInd"
          />
	</CONDITION>
	      
    <FIELD LABEL="Field.Label.From">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$fromDate"
        />
      </CONNECT>        
    </FIELD>

    <FIELD LABEL="Field.Label.Received">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="certificationReceivedDate"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.DocumentRefNumber">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="documentRefNumber"
        />
      </CONNECT>
    </FIELD>
     
    <FIELD
      LABEL="Field.Label.To"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$toDate"
        />
      </CONNECT>               
    </FIELD>

    <FIELD
      LABEL="Field.Label.CertPeriod"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$certPeriodCode"
        />
      </CONNECT>
       <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="certPeriodCode"
        />
      </CONNECT> 
      <SCRIPT EVENT="ONCHANGE" ACTION="reloadForm(this)" SCRIPT_FILE="MOLSACertPeriodSelection.js"/>
    </FIELD>   
           
    <FIELD LABEL="Field.Label.FileRefNumber">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="fileRefNumber"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
  
  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.Comments"
  >
    <!-- BEGIN, CR00406866, VT -->
    <FIELD HEIGHT="4" LABEL="Field.Label.Comments">
      <!-- END, CR00406866 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="comments"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
