# Requirements
## Shipper’s certification for Live Animals
The shipper’s certification for Live Animals is an essential document required to transport live animals. The requirements are described in the Live Animals Regulation as published by IATA.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161540521-47f26e6f-8a70-408f-b701-266e4921d97c.png"></p>

## CITES ePermit
The CITES permit is a the key instrument to control the trade in the species it protects. An extensive work has been done in order to define the requirements for the CITES ePermit, including the ePermit Core Component Data Model V2.0.
The details of the ePermit and the associated data model are in the “CITES electronic permitting toolkit Version 2.0” document that can be found here.

# Chosen approach
Requirements have shown that the data model requires new objects to capture the specific information for Live Animals. These objects are:
- **PieceLiveAnimals** object, subtype of the Piece class containing data specific for Live Animals
- **EPermitConsignement** object to reflect the pieces (Animals) contained in a eCITES permit
- **LiveAnimalsEpermit** object to reflect the eCITES permit document requirements and allow for its creation from the ONE Record data model
- **EpermitSignature** object to take into account Signature requirements in the eCITES permit, mainly identifying the signatory and recording the date of signature

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161540428-c0469319-21e4-4a66-b049-e86856366a8a.png"></p>


The mapping with the CITES ePermit data model has been made to ensure all required information are available, it is available in details in the Excel version of the data model on GitHub in the document IATA-1R-DataModel-LiveAnimalsIntegration Nov 2020.

|Object|Data property|Description|eCITES box|ePermit class|
|---|---|---|---|---|
|Epermit|||||
|Epermit|permitNumber|"The original number is a unique number allocated to|
|each document by the relevant Management|
|Authority."|1|HeaderExchangedDocument-ID|
|Epermit|permitTypeCode|Code specifying the document name.|1|HeaderExchangedDocument-TypeCode|
|Epermit|permitTypeOther|Description if TypeCode is Other|1|HeaderExchangedDocument-Name|
|Epermit|permitCopyIndicator|Indicates if the permit is a copy (true) or an original (false)|1|HeaderExchangedDocument-CopyIndicator|
|Epermit|transactionPurposeText|Purpose of the transaction in free text|5a|HeaderExchangedDocument-Purpose|
|Epermit|transactionPurposeCode|Code indicating the purpose of the transaction|5a|HeaderExchangedDocument-PurposeCode|
|Epermit|specialConditions|Special conditions|5|HeaderExchangedDocument-Information|
|Epermit|permitValidUntil|Permit Valid until|2|HeaderExchangedDocument-ReferenceReferencedDocument-EffectiveSpecifiedPeriod|
|Epermit|permitValidfrom|Permit Valid from||HeaderExchangedDocument-ReferenceReferencedDocument-EffectiveSpecifiedPeriod|
|Epermit|issuingAuthoritySignature|Signature details of the Issuing Authority (box 6)|6|FirstSignatoryDocumentAuthentication|
|Epermit|applicantSignature|Signature details of the Applicant (box 4)|4|SecondSignatoryDocumentAuthentication|
|Epermit|issuerSignature|"Signature details of the Permit issuer (box 13)| includes date of issuance of the permit and associated location"|13|ThirdSignatoryDocumentAuthentication|
|Epermit|examiningSignature|Signature details of the Examining authority (box 14)|14|FourthSignatoryDocumentAuthentication|
|Epermit|consignor|"Consignor company details| including complete name and address (box 4| already in applicantSignaure ?)"|4|SpecifiedSupplyChainConsignment-ConsignorTradeParty|
|Epermit|consignee|"Consignee company details| including complete name and address (box 3)"|3|SpecifiedSupplyChainConsignment-ConsigneeTradeParty|
|Epermit|transportContractTypeCode|Code specifying the transport document name|15|SpecifiedSupplyChainConsignment-TransportContractReferencedDocument-TypeCode|
|Epermit|transportContractId|Reference to the Air Waybill or other transport contract document|15|SpecifiedSupplyChainConsignment-TransportContractReferencedDocument-ID|
|Epermit|consignments|Reference to the pieces and properties linked to the Permit|7 to 12|IncludedSupplychainConsignment|
|EpermitConsignment|||||
|EpermitConsignment|consignementItems|Reference to the pieces|||
|EpermitConsignment|examiningQuantity|Quantity measured by examining authority (box 14)|14|SpecifiedSupplyChainConsignment-ExaminationTransportEvent-UnitQuantity|
|EpermitConsignment|usedToDateQuotaQuantity|total number of specimens exported in the current calendar year and the current annuela quota for the species concerned (box 12b)|11a|IncludedSupplychainConsignmentItem-ApplicableCrossBorderRegulatoryProcedure-UsedToDateQuantity|
|EpermitSignature|||||
|EpermitSignature|signatureTypeCode|"Code specifying a type of government action such asinspection| detention| fumigation| security."||…Signatory…TypeCode|
|EpermitSignature|securityStampId|Security stamp ID|5b|…Signatory…ID|
|EpermitSignature|signatureStatement|Signatory signature authentication text||…Signatory…Statement|
|EpermitSignature|signatoryId|Signatory company name||…Signatory…ProviderTradeParty|
|EpermitSignature|signatoryAddress|Full address of the signatory company||…Signatory…ProviderTradeParty-PostalTradeAddress|
|EpermitSignature|signatoryRepresentant|Name of the official representative person of the Issuing Authority||…Signatory…ProviderTradeParty-SpecifiedRepresentativePerson|
|EpermitSignature|signatureLocation|Place where signature occurred or was registered||…Signatory…IssueLogisticsLocation|
|Piece|||||
|Piece|shippingMarks|(see SLI)|||
|PieceLiveAnimals|||||
|PieceLiveAnimals|originTradeCountry|country of origin (box 12)|12|IncludedSupplychainConsignmentItem-PhysicalLogisticsShippingMarks-OriginTradeCountry|
|PieceLiveAnimals|exportTradeCountry|Country of last re-export (box 12a)|12a|IncludedSupplychainConsignmentItem-PhysicalLogisticsShippingMarks-ExportTradeCountry|
|PieceLiveAnimals|originReferencePermitDatetime|Issuing date for Origin reference permit or re-export reference Certificate (box 12)|12|IncludedSupplychainConsignmentItem-PhysicalLogisticsShippingMarks-AssociatedReferencedDocument-IssueDateTime|
|PieceLiveAnimals|originReferencePermitTypeCode|identifier of Origin reference permit or re-export reference Certificate (box 12/12a)|12/12a|IncludedSupplychainConsignmentItem-PhysicalLogisticsShippingMarks-AssociatedReferencedDocument-TypeCode|
|PieceLiveAnimals|originReferencePermitId|identifier of Origin reference permit or re-export reference Certificate (box 12/12a)|12/12a|IncludedSupplychainConsignmentItem-PhysicalLogisticsShippingMarks-AssociatedReferencedDocument-ID|
|PieceLiveAnimals|quantityAnimals|Quantity including units (box 11)|11|IncludedSupplychainConsignmentItem-PhysicalLogisticsShippingMarks-TransportLogisticsPackage-ItemQuantity|
|PieceLiveAnimals|goodsTypeCode|"Appendix number of the convention (I| II or III) (box 10)"|10|IncludedSupplychainConsignmentItem-IncludedSupplyChainTradeLineItem-TypeCode|
|PieceLiveAnimals|goodsTypeExtensionCode|Source of the appendix number (box 10)|10|IncludedSupplychainConsignmentItem-IncludedSupplyChainTradeLineItem-TypeExtensionCode|
|PieceLiveAnimals|specimenDescription|"Description of specimens| including age and sex if LA (box 9)"|9|IncludedSupplychainConsignmentItem-IncludedSupplyChainTradeLineItem-SpecifiedTradeProduct-Description|
|PieceLiveAnimals|specimenTypeCode|"Description of specimens| CITES type code (box 9)"|9|IncludedSupplychainConsignmentItem-IncludedSupplyChainTradeLineItem-SpecifiedTradeProduct-TypeCode|
|PieceLiveAnimals|speciesCommonName|Species common name (box 8)|8|IncludedSupplychainConsignmentItem-IncludedSupplyChainTradeLineItem-SpecifiedTradeProduct-CommonName|
|PieceLiveAnimals|speciesScientificName|Species scientific name (box 7)|7|IncludedSupplychainConsignmentItem-IncludedSupplyChainTradeLineItem-SpecifiedTradeProduct-ScientificName|
|PieceLiveAnimals|categoryCode|Operations code ID. Refers to the number of the registered captive-breeding or artifical propagation operation (box 12b)|12b|IncludedSupplychainConsignmentItem-ApplicableCrossBorderRegulatoryProcedure-CategoryCode|
|PieceLiveAnimals|acquisitionDatetime|Defined in Resolution Conf. 13.6 and is required for pre-Convention specimens (box 12b)|12b|IncludedSupplychainConsignmentItem-ApplicableCrossBorderRegulatoryProcedure-AcquisitionDateTime|
|PieceLiveAnimals|annualQuotaQuantity|total number of specimens exported in the current calendar year and the current annuela quota for the species concerned (box 11a)|11a|IncludedSupplychainConsignmentItem-ApplicableCrossBorderRegulatoryProcedure-AnnualQuotaQuantity|

# Data model
The objects added for Live Animals integration have been specified, accordingly with the existing models.
 <p align="center">
<img src="https://user-images.githubusercontent.com/58464775/161540369-42550a3b-2609-4975-9142-55264a1b0cb9.png"></p>
