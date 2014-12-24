<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2012. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!-- Copyright 2007-2008, 2010 Curam Software Ltd.                          -->
<!-- All rights reserved.                                                   -->
<!-- This software is the confidential and proprietary information of Curam -->
<!-- Software, Ltd. ("Confidential Information"). You shall not disclose    -->
<!-- such Confidential Information and shall use it only in accordance with -->
<!-- the terms of the license agreement you entered into with Curam         -->
<!-- Software.                                                              -->
<!-- Description                                                            -->
<!-- ===========                                                            -->
<!-- This is the included view used to display a list of Questionnaires for an -->
<!-- integrated case.                                                       -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>
  <SERVER_INTERFACE
    CLASS="QuestionAnswer"
    NAME="QUESTIONNAIRE_DYNAMIC_MENU"
    OPERATION="getQuestionnaireMenuByAssessment"
    PHASE="DISPLAY"
  />
  <CONNECT>
    <SOURCE
      NAME="PAGE"
      PROPERTY="caseID"
    />
    <TARGET
      NAME="QUESTIONNAIRE_DYNAMIC_MENU"
      PROPERTY="key$dtls$dtls$assessmentCaseID"
    />
  </CONNECT>
  <LIST>
    <FIELD
      LABEL="Field.Label.Question"
      WIDTH="50"
    >
      <CONNECT>
        <SOURCE
          NAME="VIEW_QUESTION_ANSWER"
          PROPERTY="result$list$dtls$dtls$questionText"
        />
      </CONNECT>
    </FIELD>
    <FIELD
      LABEL="Field.Label.Answer"
      WIDTH="50"
    >
      <CONNECT>
        <SOURCE
          NAME="VIEW_QUESTION_ANSWER"
          PROPERTY="result$list$dtls$dtls$answer"
        />
      </CONNECT>
    </FIELD>
  </LIST>
</VIEW>
