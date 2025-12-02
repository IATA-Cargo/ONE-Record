# OCI line in messaging standards

CIMP standard introduced the OCI line (**O**ther **C**ustoms, Security and Regulatory Control **I**nformation) which was later used by CXML standard. It was later improved with the addition of e-CSD mapping and further customs requirements such as EU ICS2 or US ACAS.

## Structure of the OCI line in Messaging standards

The OCI line is a set of data fields that are used to convey Customs or Security information with messaging standards CIMP and CXML. It is a combination of:

- _ISO Country Code_: Country Code as per ISO Country code list
- _Information Identifier_: An identifier based on Code List 1.19 "Line Identifiers" where only a handful of codes are used for the purpose of OCI information
- _Security and Regulatory Control Information Identifier_: An identifier based on Code List 1.100 "Customs, Security and Regulatory Control Information Identifier"
- _Supplementary Security and Regulatory Control Information_: A free text field containing the details

Within one message multiple OCI segments can be used to convey as enough information as required. 

## Structure of the OCI in ONE Record

In order to simplify the mapping between messaging standards and ONE Record, it was decided that the `CustomsInformation` object replicates the OCI segment structure and can be used to provide **Customs** information. 

### Security information (e-CSD) in ONE Record

With ONE Record all requirements on Security Declaration are already taken care of with the usage of dedicated `SecurityDeclaration` object linked to `Shipment` or `Piece`, more details can be found on the Data Model part of the specifications.

### Customs information in ONE Record

Customs requirements that are not handled by existing LogisticsObjects and their data properties can be provided using the `CustomsInformation` the same way the OCI is used in messaging standads.

The `CustomsInformation` object contains the following data properties (in addition to the ones inherited by the superclass LogisticsObject):

- _ociLineNumber_: integer used to identify the sequence of the object
- _country_: mapped to ISO Country Code
- _subjectCode_: Mapped to Information Identifier
- _contentCode_: Mapped to Security and Regulatory Control Information Identifier
- _otherCustomsInformation_: Mapped to Supplementary Security and Regulatory Control Information

### Purpose of _ociLineNumber_

The order of the OCI line matters in messages. Due to its structure a line can contain only limited information (specific combination of the identifiers and the content). It is sometimes necessary to ensure that two lines are in the right sequence in order to understand the meaning of the information.

The _ociLineNumber_ data property is then used to replicate the order from messages and allow for back and forth conversion between ONE Record and messages.

# OCI Composition Rules table

The OCI Table is available in CXML Toolkit publication as well as published in IATA website [here](https://www.iata.org/contentassets/4bb3450ef9a2447493a132b38fac1d26/oci-composition-rule-table-2023---12-april-2023.pdf).

The OCI Table presents all the recognized combinations of the OCI data properties in order to convey the right information.

## OCI Mapping (Draft)

There is a draft OCI mapping available: [Here](./assets/OCI-Mapping-3.2.xlsx){:download="OCI-Mapping-3.2.xlsx"}. The file contains 2 sheets, one for eCSD and one for Customs.
