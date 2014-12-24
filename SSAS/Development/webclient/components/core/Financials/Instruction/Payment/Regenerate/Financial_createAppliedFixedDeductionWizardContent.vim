<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2013. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Create a fixed applied deduction for a product delivery.               -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <SERVER_INTERFACE
    ACTION_ID_PROPERTY="actionString"
    CLASS="Financial"
    NAME="ACTION"
    OPERATION="createFixedDeductionWizard"
    PHASE="ACTION"
  />
  <SERVER_INTERFACE
    CLASS="Financial"
    NAME="DISPLAYWIZARD"
    OPERATION="readAppliedDeductionWizardDetails"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="ProductDelivery"
    NAME="DEDUCTIONHEADER"
    OPERATION="readDeductionLiabilityDetails"
  />
  <SERVER_INTERFACE
    CLASS="ProductDelivery"
    NAME="DISPLAYAMOUNT"
    OPERATION="getDefaultAmountForDeduction"
    PHASE="DISPLAY"
  />
  <SERVER_INTERFACE
    CLASS="Financial"
    NAME="DISPLAYNOMINEE"
    OPERATION="readPaymentInstruction1"
    PHASE="DISPLAY"
  />


  <SERVER_INTERFACE
    CLASS="ProductDelivery"
    NAME="DISPLAYDN"
    OPERATION="listAppliedDeductionName"
  />


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedCaseID"
    />
    <TARGET
      NAME="DEDUCTIONHEADER"
      PROPERTY="caseID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAYDN"
      PROPERTY="caseID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="deductionDetails$caseID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="DISPLAYNOMINEE"
      PROPERTY="caseNomineeID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="nomineeID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedCaseID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="relatedCaseID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="finInstructionID"
    />
    <TARGET
      NAME="ACTION"
      PROPERTY="finInstructionID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="finInstructionID"
    />
    <TARGET
      NAME="DISPLAYNOMINEE"
      PROPERTY="finInstructionID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="CONSTANT"
      PROPERTY="appliedDeductionCategory"
    />
    <TARGET
      NAME="DISPLAYAMOUNT"
      PROPERTY="category"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="finInstructionID"
    />
    <TARGET
      NAME="DISPLAYAMOUNT"
      PROPERTY="finInstructionID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="wizardStateID"
    />
    <TARGET
      NAME="DISPLAYAMOUNT"
      PROPERTY="wizardStateID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAYAMOUNT"
      PROPERTY="caseID"
    />
  </CONNECT>
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="relatedCaseID"
    />
    <TARGET
      NAME="DISPLAYAMOUNT"
      PROPERTY="relatedCaseID"
    />
  </CONNECT>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="wizardStateID"
    />
    <TARGET
      NAME="DISPLAYWIZARD"
      PROPERTY="wizardStateID$wizardStateID"
    />
  </CONNECT>


  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <FIELD LABEL="Field.Label.LiabilityParticipant">
      <CONNECT>
        <SOURCE
          NAME="DEDUCTIONHEADER"
          PROPERTY="liabilityParticipantName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.Liability">
      <CONNECT>
        <SOURCE
          NAME="DEDUCTIONHEADER"
          PROPERTY="liabilityNameReference"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <FIELD LABEL="Field.Label.Nominee">
      <CONNECT>
        <SOURCE
          NAME="DISPLAYNOMINEE"
          PROPERTY="nomineeName"
        />
      </CONNECT>
    </FIELD>
    <FIELD LABEL="Field.Label.OutstandingLiability">
      <CONNECT>
        <SOURCE
          NAME="DEDUCTIONHEADER"
          PROPERTY="outstandingLiabilityAmt"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <FIELD LABEL="Field.Label.OriginalLiability">
      <CONNECT>
        <SOURCE
          NAME="DEDUCTIONHEADER"
          PROPERTY="originalLiabilityAmt"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Amount"
      WIDTH="50"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAYAMOUNT"
          PROPERTY="result$deductionAmount"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="amount"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
  >
    <FIELD
      LABEL="Field.Label.DeductionName"
      USE_BLANK="true"
      WIDTH="75"
    >
      <CONNECT>
        <INITIAL
          HIDDEN_PROPERTY="deductionName"
          NAME="DISPLAYDN"
          PROPERTY="dtls$deductionName"
        />
      </CONNECT>
      <CONNECT>
        <SOURCE
          NAME="DISPLAYWIZARD"
          PROPERTY="deductionName"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="deductionName"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>
