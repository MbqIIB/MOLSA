<?xml version="1.0" encoding="UTF-8"?>

<!-- This page displays search criteria for a Person.                       -->
<VIEW
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="file://Curam/UIMSchema.xsd"
>

  <SERVER_INTERFACE
    CLASS="Person"
    NAME="DISPLAY"
    OPERATION="readSearchWithNicknamesIndicator"
  />

  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
    TITLE="Cluster.Title.SearchCriteria"
  >

    <!-- BEGIN, CR00341856, PB -->
    <FIELD LABEL="Cluster.Field.Label.ReferenceNumber">
      <!-- END, CR00341856 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$referenceNumber"
        />
      </CONNECT>
    </FIELD>

    <FIELD LABEL="Cluster.Field.Label.PhoneNumber">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$phoneNumber"
        />
      </CONNECT>
    </FIELD>

  </CLUSTER>

  <CLUSTER
    LABEL_WIDTH="40"
    NUM_COLS="2"
    TITLE="Cluster.Title.AdditionalSearchCriteria"
  >

   <FIELD LABEL="Cluster.Field.Label.FullName">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$fullName"
        />
      </CONNECT>
    </FIELD>

    <FIELD
      LABEL="Field.Label.DateOfBirth"
      USE_DEFAULT="false"
    >
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$dateOfBirth"
        />
      </CONNECT>
    </FIELD>

    <!-- BEGIN, CR00341856, PB -->
    <FIELD LABEL="Cluster.Field.Label.AddressLineOne">
      <!-- END, CR00341856 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$addressDtls$addressLine1"
        />
      </CONNECT>
    </FIELD>

    <!-- BEGIN, CR00341856, PB -->
    <FIELD LABEL="Cluster.Field.Label.City">
      <!-- END, CR00341856 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$addressDtls$city"
        />
      </CONNECT>
    </FIELD>

    <FIELD LABEL="Field.Label.Nickname">
      <CONNECT>
        <SOURCE
          NAME="DISPLAY"
          PROPERTY="result$dtls$searchWithNicknamesInd"
        />
      </CONNECT>
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$nicknameInd"
        />
      </CONNECT>
    </FIELD>

    <FIELD LABEL="Field.Label.DoubleMetaphone">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$soundsLikeInd"
        />
      </CONNECT>
    </FIELD>

    <!-- BEGIN, CR00341856, PB -->
    <FIELD
      LABEL="Cluster.Field.Label.Gender"
      USE_BLANK="true"
      USE_DEFAULT="false"
      WIDTH="35"
    >
      <!-- END, CR00341856 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$gender"
        />
      </CONNECT>
    </FIELD>

    <FIELD LABEL="Field.Label.AddressLineTwo">
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$addressDtls$addressLine2"
        />
      </CONNECT>
    </FIELD>

    <!-- BEGIN, CR00341856, PB -->
    <FIELD LABEL="Cluster.Field.Label.BirthLastName">
      <!-- END, CR00341856 -->
      <CONNECT>
        <TARGET
          NAME="ACTION"
          PROPERTY="key$birthSurname"
        />
      </CONNECT>
    </FIELD>

  </CLUSTER>

</VIEW>
