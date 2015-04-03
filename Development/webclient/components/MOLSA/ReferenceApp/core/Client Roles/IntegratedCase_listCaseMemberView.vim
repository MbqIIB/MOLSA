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
    CLASS="IntegratedCase"
    NAME="DISPLAY"
    OPERATION="listCaseMembers1"
  />


  
  <SERVER_INTERFACE
    CLASS="IntegratedCase"
    NAME="DISPLAY1"
    OPERATION="readTranslatorRequiredForMember"
  />
 
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="DISPLAY1"
      PROPERTY="key$caseID"
    />
  </CONNECT>
 
  <ACTION_SET BOTTOM="false">


    <ACTION_CONTROL
      IMAGE="NewButton"
      LABEL="ActionControl.Label.New"
    >
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Case_createCaseMember"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageDescription"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
 
    <ACTION_CONTROL
      IMAGE="NewButton"
      LABEL="ActionControl.Label.AddRelatedMembers"
    >
      <CONDITION>
        <IS_TRUE
          NAME="DISPLAY"
          PROPERTY="relatedNonMembersInd"
        />
      </CONDITION>
      <LINK
        OPEN_MODAL="true"
        PAGE_ID="Case_createCaseRelatedMember"
      >
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="caseID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="caseID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageDescription"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>


  </ACTION_SET>


  <PAGE_PARAMETER NAME="caseID"/>


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


  <LIST>


    <DETAILS_ROW>
      <INLINE_PAGE PAGE_ID="Case_viewCaseMember">
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="caseParticipantRoleID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="concernCaseRoleID"
          />
        </CONNECT>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="description"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="pageDescription"
          />
        </CONNECT>
      </INLINE_PAGE>
    </DETAILS_ROW>


    <ACTION_SET TYPE="LIST_ROW_MENU">
      <ACTION_CONTROL LABEL="ActionControl.Label.Edit">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Case_modifyCaseMemberFromList"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="caseParticipantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernCaseRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
      
      <ACTION_CONTROL LABEL="ActionControl.Label.AddInfoRequest">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="MOLSA_createInformationRequest"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="caseParticipantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="caseParticipantRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="participantList$name"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="name"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.SpecifyTranslatorRequired">
        <CONDITION>
          <IS_FALSE
            NAME="DISPLAY1"
            PROPERTY="translationRequiredInd"
          />
        </CONDITION>
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IntegratedCase_confirmTranslatorRequired"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="caseParticipantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernCaseRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


      <ACTION_CONTROL LABEL="ActionControl.Label.SpecifyTranslatorNotRequired">
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY1"
            PROPERTY="translationRequiredInd"
          />
        </CONDITION>
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="IntegratedCase_confirmTranslatorNotRequired"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="caseParticipantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernCaseRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>


     
      <ACTION_CONTROL LABEL="ActionControl.Label.Delete">
        <LINK
          OPEN_MODAL="true"
          PAGE_ID="Case_cancelCaseMember"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="caseParticipantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernCaseRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="description"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="pageDescription"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </ACTION_SET>


    <CONTAINER
      LABEL="Field.Label.Name"
      WIDTH="31"
    >
      <FIELD>
        <CONNECT>
          <SOURCE
            NAME="DISPLAY"
            PROPERTY="participantList$name"
          />
        </CONNECT>
        
        <LINK PAGE_ID="Participant_resolve">
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="participantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernRoleID"
            />
          </CONNECT>
        </LINK>
       
      </FIELD>
      <ACTION_CONTROL IMAGE="SpecialCautionDefaultIcon">
        <CONDITION>
          <IS_TRUE
            NAME="DISPLAY"
            PROPERTY="result$participantList$specialCautionInd"
          />
        </CONDITION>
        <LINK
          OPEN_MODAL="TRUE"
          PAGE_ID="SpecialCaution_listFromCase"
        >
          <CONNECT>
            <SOURCE
              NAME="DISPLAY"
              PROPERTY="result$participantList$participantRoleID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="concernRoleID"
            />
          </CONNECT>
          <CONNECT>
            <SOURCE
              NAME="PAGE"
              PROPERTY="caseID"
            />
            <TARGET
              NAME="PAGE"
              PROPERTY="caseID"
            />
          </CONNECT>
        </LINK>
      </ACTION_CONTROL>
    </CONTAINER>


    <FIELD
      LABEL="Field.Label.Type"
      WIDTH="15"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="typeCode"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.StartDate"
      WIDTH="12"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="fromDate"
        />
      </CONNECT>
    </FIELD>


    <FIELD
      LABEL="Field.Label.EndDate"
      WIDTH="12"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="toDate"
        />
      </CONNECT>
    </FIELD>


   
    <FIELD
      LABEL="Field.Label.EndReason"
      WIDTH="20"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="endReason"
        />
      </CONNECT>
    </FIELD>
   


    <FIELD
      LABEL="Field.Label.Status"
      WIDTH="10"
    >
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="participantList$recordStatus"
        />
      </CONNECT>
    </FIELD>
  </LIST>


</VIEW>
