<?xml version="1.0" encoding="UTF-8"?>
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- Included view used to submit a product delivery for approval.          -->
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
    OPERATION="submitPDCForApproval"
    PHASE="ACTION"
  />
  <ACTION_SET
    ALIGNMENT="CENTER"
    TOP="false"
  >
    <ACTION_CONTROL
      IMAGE="YesButton"
      LABEL="ActionControl.Label.Yes"
      TYPE="SUBMIT"
    />
    <ACTION_CONTROL
      IMAGE="NoButton"
      LABEL="ActionControl.Label.No"
    />
  </ACTION_SET>
  <PAGE_PARAMETER NAME="caseID"/>
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
  <CLUSTER
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >

    <FIELD LABEL="Field.Label.SubmitCaseText">
      <CONNECT>
        <SOURCE
          NAME="TEXT"
          PROPERTY="Field.StaticText.SubmitCase"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>
</VIEW>
