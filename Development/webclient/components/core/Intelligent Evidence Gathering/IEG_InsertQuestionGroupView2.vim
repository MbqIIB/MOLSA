<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
 
  Copyright IBM Corporation 2012. All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>


  <CLUSTER
    LABEL_WIDTH="20"
    TITLE="Cluster.Title.QuestionGroupDetails"
  >
    <FIELD
      LABEL="Field.Label.QuestionGroupID"
      WIDTH="45"
    >
      <CONNECT>
        <TARGET
          NAME="insertQuestionGroupBean"
          PROPERTY="questionGroupDetails$id"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.QuestionGroupName"
      WIDTH="45"
    >
      <CONNECT>
        <TARGET
          NAME="insertQuestionGroupBean"
          PROPERTY="questionGroupDetails$name"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


  <CLUSTER
    SHOW_LABELS="false"
    TITLE="Cluster.Title.QuestionGroupDescription"
  >
    <FIELD HEIGHT="4">
      <CONNECT>
        <TARGET
          NAME="insertQuestionGroupBean"
          PROPERTY="questionGroupDetails$description"
        />
      </CONNECT>
    </FIELD>
  </CLUSTER>


</VIEW>