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
  
  
 
  <SERVER_INTERFACE OPERATION="createInformationRequest" CLASS="MOLSAInformationProvider"
		NAME="ACTION" PHASE="ACTION" />

<PAGE_PARAMETER NAME="caseParticipantRoleID" />
  <CONNECT>
		<SOURCE PROPERTY="caseParticipantRoleID" NAME="PAGE" />
		<TARGET PROPERTY="caseParticipantRoleID" NAME="ACTION" />
 </CONNECT>
 <CONNECT>
		<SOURCE PROPERTY="informationType" NAME="TEXT" />
		<TARGET PROPERTY="requestDetails$informationProvider" NAME="ACTION" />
 </CONNECT>
 
  <PAGE_PARAMETER NAME="name" />
  <CLUSTER 
      NUM_COLS="2">
      <FIELD LABEL="Field.Lable.Name">
			<CONNECT>
				<SOURCE PROPERTY="name" NAME="PAGE" />
			</CONNECT>
		</FIELD>
   </CLUSTER>
  

<CLUSTER
NUM_COLS="1"
      SHOW_LABELS="false"
    >
      <FIELD
       
        CONFIG="CT_DISPLAY_LABELS"
        CONTROL="CT_HIERARCHY_VERTICAL"
        USE_BLANK="true"
        USE_DEFAULT="false"
        WIDTH="100"
      >
		
			<CONNECT>
				<TARGET PROPERTY="informationType" NAME="ACTION" />
			</CONNECT>
		</FIELD>
		</CLUSTER>
		
		<CLUSTER 
      NUM_COLS="2">
		
		<FIELD LABEL="Field.Lable.StartDate" USE_BLANK="true" USE_DEFAULT="false">
			<CONNECT>
				<TARGET PROPERTY="startDate" NAME="ACTION" />
			</CONNECT>
		</FIELD>
		
		
		
		<FIELD LABEL="Field.Lable.EndDate" USE_BLANK="true" USE_DEFAULT="false">
			<CONNECT>
				<TARGET PROPERTY="endDate" NAME="ACTION" />
			</CONNECT>
		</FIELD>
		
	</CLUSTER>
 	
</VIEW>
