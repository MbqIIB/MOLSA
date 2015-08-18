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





 <PAGE_PARAMETER NAME="concernRoleID"/>
 <PAGE_PARAMETER NAME="instructionLineItemID"/>
 <PAGE_PARAMETER NAME="finInstructionID"/>
  <PAGE_PARAMETER NAME="pageDescription"/>




  <ACTION_SET ALIGNMENT="CENTER">


    <ACTION_CONTROL
      IMAGE="SaveButton"
      LABEL="ActionControl.Label.printCheque"
      TYPE="FILE_DOWNLOAD"
    >
     <LINK>
        <CONNECT>
          <SOURCE
            NAME="PAGE"
            PROPERTY="instructionLineItemID"
          />
          <TARGET
            NAME="PAGE"
            PROPERTY="instructionLineItemID"
          />
        </CONNECT>
      </LINK>
    </ACTION_CONTROL>
    <ACTION_CONTROL
      IMAGE="CancelButton"
      LABEL="ActionControl.Label.Cancel"
    />


  </ACTION_SET>


 



  


 

</VIEW>
