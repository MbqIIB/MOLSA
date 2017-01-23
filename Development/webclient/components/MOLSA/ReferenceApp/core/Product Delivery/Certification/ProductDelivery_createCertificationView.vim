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


  <CLUSTER NUM_COLS="2">
    <FIELD LABEL="Field.Label.From">
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
        <TARGET
          NAME="ACTION"
          PROPERTY="periodToDate"
        />
      </CONNECT>
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
