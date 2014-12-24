<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed Materials - Property of IBM
  
  Copyright IBM Corporation 2013. All Rights Reserved.
  
  US Government Users Restricted Rights - Use, duplication or disclosure 
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>    
    <LIST DESCRIPTION="List.Description">
        <FIELD LABEL="Field.Title.Application">
            <CONNECT>
                <SOURCE NAME="DISPLAY" PROPERTY="screeningDtls$applicationName" />
            </CONNECT>
        </FIELD>
        <FIELD LABEL="Field.Title.DateCreated">
            <CONNECT>
                <SOURCE NAME="DISPLAY" PROPERTY="screeningDtls$startDate" />
            </CONNECT>
        </FIELD>
        <FIELD LABEL="Field.Title.LastUpdated">
            <CONNECT>
                <SOURCE NAME="DISPLAY" PROPERTY="screeningDtls$lastUpdated" />
            </CONNECT>
        </FIELD>
        <FIELD>
            <CONNECT>
                <SOURCE NAME="DISPLAY" PROPERTY="screeningDtls$resumeScreeningURL" />
            </CONNECT>
        </FIELD>
    </LIST>
</VIEW>