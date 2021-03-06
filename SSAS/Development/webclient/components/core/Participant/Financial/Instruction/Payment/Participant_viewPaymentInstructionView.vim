<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright (c) 2009, 2010 Curam Software Ltd.                           -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description -->
<!-- =========== -->
<!-- The included view to display the details of a  financial               -->
<!-- instruction.                                                           -->
<?curam-deprecated Since Curam 6.0, replaced by Financial_viewPaymentInstructionView1.vim?>
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <SERVER_INTERFACE
    CLASS="Financial"
    NAME="DISPLAY"
    OPERATION="readPaymentInstruction1"
  />


  <PAGE_PARAMETER NAME="finInstructionID"/>
  <PAGE_PARAMETER NAME="contextName"/>
  <PAGE_PARAMETER NAME="caseDeductionItemID"/>


  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="finInstructionID"
    />
    <TARGET
      NAME="DISPLAY"
      PROPERTY="key$finInstructionID"
    />
  </CONNECT>


  <CLUSTER
    SHOW_LABELS="false"
    STYLE="outer-cluster-borderless"
  >
    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="processedFlag"
      />
    </CONDITION>


    <CLUSTER
      NUM_COLS="2"
      TITLE="Cluster.Title.Details"
    >


      <CONDITION>
        <IS_FALSE
          NAME="DISPLAY"
          PROPERTY="canceledFlag"
        />
      </CONDITION>
      <FIELD LABEL="Field.Label.Name">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="paymentHeaderDetails$concernRoleName"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.NomineeName">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="nomineeName"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.NomineeAddress">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="nomineeAddress"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.CreationDate">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="datePosted"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.EffectiveDate">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="effectiveDate"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.BankAccountNo">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="bankAccountNumber"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.BankSortCode">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="bankAccountSortCode"
          />
        </CONNECT>
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Organization_viewBankBranch"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="bankBranchID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="bankBranchID"
            />
          </CONNECT>
        </LINK>
      </FIELD>


      <FIELD LABEL="Field.Label.Invalidated">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="invalidatedInd"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.Status">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="paymentHeaderDetails$statusCode"
          />
        </CONNECT>
      </FIELD>


      <CONTAINER LABEL="Field.Label.Amount">
        <FIELD>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="currencyType"
            />
          </CONNECT>
        </FIELD>
        <FIELD>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="amount"
            />
          </CONNECT>
        </FIELD>
      </CONTAINER>


      <FIELD LABEL="Field.Label.ForeignCurrency">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="foreignCurrency"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.PaymentMethod">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="methodOfDelivery"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.CheckNumber">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="chequeNumber"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.VoucherReference">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="voucherNumber"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.LedgerReference">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="ledgerNumber"
          />
        </CONNECT>
      </FIELD>


    </CLUSTER>


    <CLUSTER
      NUM_COLS="2"
      TITLE="Cluster.Title.Details"
    >


      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="canceledFlag"
        />
      </CONDITION>
      <FIELD LABEL="Field.Label.Name">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="paymentHeaderDetails$concernRoleName"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.NomineeName">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="nomineeName"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.NomineeAddress">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="nomineeAddress"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.CreationDate">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="datePosted"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.EffectiveDate">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="effectiveDate"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.BankAccountNo">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="bankAccountNumber"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.BankSortCode">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="bankAccountSortCode"
          />
        </CONNECT>
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Organization_viewBankBranch"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="bankBranchID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="bankBranchID"
            />
          </CONNECT>
        </LINK>
      </FIELD>


      <FIELD LABEL="Field.Label.Invalidated">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="invalidatedInd"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.Status">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="paymentHeaderDetails$statusCode"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.CancelationReason">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="cancelationReasonCode"
          />
        </CONNECT>
      </FIELD>


      <CONTAINER LABEL="Field.Label.Amount">
        <FIELD>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="currencyType"
            />
          </CONNECT>
        </FIELD>
        <FIELD>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="amount"
            />
          </CONNECT>
        </FIELD>
      </CONTAINER>


      <FIELD LABEL="Field.Label.ForeignCurrency">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="foreignCurrency"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.PaymentMethod">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="methodOfDelivery"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.CheckNumber">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="chequeNumber"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.VoucherReference">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="voucherNumber"
          />
        </CONNECT>
      </FIELD>


      <FIELD LABEL="Field.Label.LedgerReference">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="ledgerNumber"
          />
        </CONNECT>
      </FIELD>


    </CLUSTER>


  </CLUSTER>


  <INFORMATIONAL>
    <CONNECT>
      <SOURCE
        NAME="DISPLAY"
        PROPERTY="result$informationalMsgDtlsList$informationalMsgDtlsList$dtls$informationMsgTxt"
      />
    </CONNECT>
  </INFORMATIONAL>


  <LIST>


    <CONDITION>
      <IS_TRUE
        NAME="DISPLAY"
        PROPERTY="processedFlag"
      />
    </CONDITION>


    <DETAILS_ROW>


      <INLINE_PAGE PAGE_ID="Participant_viewLineItem">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="instructionLineItemID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="lineItemID"
          />
        </CONNECT>
      </INLINE_PAGE>


    </DETAILS_ROW>


    <FIELD
      LABEL="Field.Label.ProductName"
      WIDTH="40"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$paymentItemDetails$productName"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="30"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$paymentItemDetails$instructLineItemTypeDescription"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      ALIGNMENT="RIGHT"
      LABEL="Field.Label.Amount"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$paymentItemDetails$debitAmount"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      ALIGNMENT="RIGHT"
      LABEL="Field.Label.Credit"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="dtls$paymentItemDetails$creditAmount"
        />
      </CONNECT>
    </FIELD>


  </LIST>


</VIEW>
