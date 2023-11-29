![image](https://user-images.githubusercontent.com/58464775/161543416-699a4907-0034-49dc-b9fa-90dc102b8c4b.png)
# ONE Record Data Model
## Scope extensions



### 1. Introduction
#### 1.1. Purpose of this document
This document has been produced by the ONE Record Data Model expert group, part of the ONE Record Task Force, under the Cargo Services Conference (CSC) governance. It describes how the scope of the data model has been extended based on requirements gathered from experts of various areas.
Note that this document, especially the concepts and objects in it, may evolve with revised versions of the data model in the future and will include feedbacks from the industry and pilot projects.

#### 1.2. The ONE Record data model
The Data Model is an essential part of ONE Record and aims to provide the air cargo industry with a standard data structure for data exchange using JSON-LD that facilitates data integration with existing and new data services.
The data model was first defined to cover the interaction of General Cargo between shippers and freight forwarders as well as between freight forwarders and Airlines, this refers to the Airline Core Ontology.
This document focuses on the expansion of the data model in order to include more specific requirements such as Cargo Distribution or the transport of Dangerous Goods.

The latest progress made on the ONE Record data model, ontology and technical specifications can be found on the dedicated GituHub space:
https://github.com/IATA-Cargo/ONE-Record
 
### 2. Shipper’s letter of instruction (SLI)
#### 2.1. Requirements
The SLI is a document in which the shipper gives handling instructions for the freight forwarder. It also allows the freight forwarder to act on the shipper’s behalf. 
The requirements expressed in this document are based on the XSLI Cargo-XML message, 8th Edition, they can be summarized as follows:

**XSLI Header:**
- Letter of instruction number / customs reference
- Consignor details, including contact information, tax/customs information
- Consignee details, including contact information, tax/customs information
- Freight forwarder details, including contact information, tax/customs information
- Other parties details
- Transport and booking details, including terms of delivery and transport equipment details
- Special handling information, special service request, reference documents
- Currency details


**Packaging detail:**
- Complete packages details, including weights, volumes, etc.

**Commodity details:**
- Complete commodity details, including dangerous goods specific data elements


#### 2.2. Chosen approach in the data model

The Data model already encompasses most of the required information of the SLI, especially, only a few additional data elements are required:
- On the Piece: Declared values for customs and for carriage as well as package marks information.
- On the Shipment: Terms of delivery (expected delivery date and location, incoterms), indicators for Weight valuation and Other charges (Prepaid or Collect).
- On the Transport Movement: Mode Qualifier to indicate Pre-Carriage, Main-Carriage or On-Carriage.

The overall idea is that the SLI document in itself does not exist in the Data Model but can be recreated using existing objects and their data properties. It is then a matter of mapping the right information, essentially:
- Parties are represented by Company objects
- Packaging and handling details are data properties of Pieces and Shipment objects
- Commodity details are data properties of Item and Product objects
- Transport details are data properties of Transport movement linked to the pieces

#### 2.3. Impacts and updates on the data model

As a result of the SLI analysis, a few data properties have been added to the Data Model.
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161543289-2992fd26-4ef5-4e35-aad1-2c9b26b3b9db.png"></p>

### 3. ULD Tracking
#### 3.1. Requirements

The ULD global tracking business requirements (main operational procedures and minimum data elements to be captured) are based on:
- the existing ULD Control Receipt (UCR) (see Cargo Services Conference Recommended Practice 1654 and Cargo-XML Message XUCR)
- the suggested ULD handover requirements between cargo handling agent (in the warehouse) and ramp handling agent taken consideration of UCR/ XUCR and Cargo iQ FIW/FOW events, and
- the reconciliation requirements for aircraft loading/ unloading of ULDs taken into consideration of CPM/ UWS/ UCM messages

For easy understanding, the recommendation looks at ULD tracking in four scenarios with respective data elements required as follows:

- ULD ground transfer: XUCR data elements
- ULD handover between cargo warehouse and ramp: XUCR data elements (recommended) or relevant data elements in Cargo iQ FIW/ FOW events (optional)
- Aircraft Loading/ Departure: relevant data elements in CPM/ UWS/ UCM
- Aircraft Arrival/ Unloading: relevant data elements in CPM/ UWS/ UCM

#### 3.2. Chosen approach in the data model

The ULD tracking requirements can be mainly managed with the usage of proper Events in ONE Record, the chosen approach consists of the following:
o	Addition of new data elements to the ULD objects, related to damage and details of the ULD

For better transparency we propose to split the ground transfer/handover using 2 events. This allows to properly identify the party responsible for the ULD at a given time:
- ULD Transfer: the transferring party creates a “Transfer” Event associated to the ULDs
- ULD Reception: the receiving party creates a “Received” Event associated to the ULDs
With this approach we recommend that events are created on every ULD to ensure proper tracking of the assets.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161543221-16866468-5c07-4e4b-9171-5b7495871cd1.png"></p>

- Aircraft Loading and Unloading are managed through Events associated to the ULDs
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161543170-fba25de5-1358-499e-a723-1af37336c502.png"></p>
 
The Transport movement gives details about the associated flight (flight number, time of departure, etc.).
The loadingPosition field in the Event allows to record the loading position of the ULD in the aircraft (e.g. lower or main deck), it is managed by a EventUld subtype of the Event.

#### 3.3. Impacts and updates on the data model
The ULD tracking requirements have highlighted the need for a few additional data properties on the ULD object as well as the need to create a EventUld subtype of Event to record the loading position.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161543116-b78a7c8b-77ac-499f-b270-9a8c2e2eaf63.png"></p>

### 4. CO2 Emissions
#### 4.1. Requirements
CO2 Emissions transparency is an essential topic in order to move toward a more sustainable industry. IATA has been addressing CO2 Emissions measurement methodology, joint with ICAO, in the Recommended Practice 1678, more details can be found on IATA’s website dedicated page: https://www.iata.org/en/programs/cargo/sustainability/carbon-footprint/  
Our objective is to provide necessary information in the data model to be able to calculate or predict CO2 emissions for transport movements. Required information relate to:
- Typical CO2 coefficient 
- Distance of the transport movement, calculated and measured
- Fuel consumed, calculated and measured
- Method used for calculation of the CO2 emissions
#### 4.2. Chosen approach in the data model
To fulfil these requirements, it has been decided to add relevant data properties in the model on the Transport movement and Transport Means.
Details about the method used for calculation are to be managed outside of the data model. The data model needs to ensure that all required information are recorded and available.
#### 4.3. Impacts and updates on the data model
A few data properties are added on TransportMeans and TransportMovement. A new object CO2Emissions is added as well as depicted below:]

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161542962-673fb079-7f30-44f8-9485-36a519b17e2b.png"></p>
 
### 5. Cargo Distribution
#### 5.1. Requirements
The Modernizing Cargo Distribution working group (MCD) has defined the standardized Sales & Booking process to highlight the business and data requirements of Distribution.
The current Sales & Booking process is the following:
 
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/208693593-3cb14437-a7a1-4346-b190-0ac9c971127d.png"></p>
 
 In addition a specific Cancellation process has been defined:
 
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/208693718-e891685c-915d-43ff-85cf-d602e042488c.png"></p>
 
In this process, the quote request should contain a minimum set of information:
 
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161542864-5186c31b-6751-4077-8576-c6c037c5c4ca.png"></p>
 
The second step, airline presenting booking options, needs to ensure that the following data are included:
 
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161542537-7ba94102-e12d-4a39-b6cd-8361b90b0327.png"></p>

The booking confirmation step ends the Quote & Book process, it should ensure that some data are validated and agreed between the two parties. The data are:
 
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161542478-683d4ade-410f-4602-8505-342320802e79.png"></p>

The technical team of the MCD working group has transcribed the business requirements in four main objects:
- Quote Request
- Quote Response
- Booking Request
- Booking Response

Further discussions with MCD working group members allowed to identify the need to properly track the shipment status and data throughout the shipment lifecycle. Essential shipment data such as Weight can evolve as the Quote & Book process moves forward, the data model and ONE Record specifications need to ensure that this is possible.
The group came up with a proposal for a standard shipment lifecycle as depicted below:
 
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161542328-812adeb3-2b26-4d8b-b3f5-2cbe8e3fad25.png"></p>

This is an example of a typical shipment lifecycle that should help standardize some of the events and milestones that are required on the business side of the Quote & Book process.
#### 5.2. Chosen approach in the data model
The chosen approach is on multiple levels to make sure that all requirements are met.
##### 5.2.1 Definition of appropriate objects to reflect Distribution
Four main objects have been defined to represent the Distribution:
- Booking Shipment: In the context of Distribution, and only distribution, the **BookingShipment** is a simplified mix between Piece and Shipment to meet a quote request minial requirements.
- Booking Option Request: It refers to the quote request.
- Booking Option: A Booking Option is an offer made by a carrier that is supposed to be bookable.
- Booking Request: It refers to the booking confirmation request, equivalent to (X)FFR message.
- Booking: Used for confirmed bookings, it contains all information that have been agreed between customer and carrier.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/208692176-dbd79115-e340-4567-bcd9-dbd3f79176fc.png"></p>

Along those two main objects, a few simpler objects are added to ensure that all information are available for the Sales & Booking process. It includes **Routing,  ScheduledLegs, BookingTimes, BookingSegment, CarrierProduct, Price, Ratings and Ranges**.

**Ranges** are included to address challenges where cargo tendered to Airline has variance versus the booking option request dimension and/or weight.  

As the Sales & Booking process may occur before actual operations, we have chosen to allow for some data property at **BookingOptionRequest** level that are to be used for the sole purpose of the quote request. Thus the expectedCommodity and requestedHandling data properties are used at an early stage to indicate what the forwarder intends to ship. The **BookingShipment** object, which is still being finalized, is also used for that purpose, with more detailed information on intended shipment.

The expectedCommodity values are to be discussed and decided by the MCD working group, the requestedHandling values shall refer to special handling codes. 
##### 5.2.2 ONE Record mechanisms to ensure keeping track of data throughout the lifecycle
Like all Logistic Objects, **Shipments** can have **Events**. An **Event** can record the state of a shipment (e.g. “Quote Requested, Booking requested, etc.) and reflect the lifecycle.

The Audit Trail specified in ONE Record API can be used to recover older versions of the objects based on, for instance, a specific date and time.

#### 5.3. Impacts and updates on the data model
Details of the objects and their data properties can be found in the Ontology or the PDF version of the data model.

The impacts on the conceptual data model and the way these objects are supposed to interact with each other are quite straightforward and explained in the figure below.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/208690795-fd4ad4d6-ea82-49f9-8104-54a074d36e61.png"></p>
 
### 6. Interactive Cargo 
#### 6.1. Requirements
The Interactive Cargo requirements are still a work in progress however the dedicated taskforce has drafted a Recommended Practice that expresses requirements as to what kind of data should be recorded. The recommended practice follows the guiding principles of ONE Record, meaning that the integration of the requirements are quite straightforward and in line with the existing data model.

The recommended practice highlights:

**IoT Devices:** 
- They are “tangible objects that provide the technological interface to interact with or obtain information about physical and other digital entities in an Internet-of-Things (IoT) ecosystem. The IoT device extends physical entities and allows them to be part of the digital world.”
- IoT devices must contain some information to identify them: manufacturer, model, name, description and serial number.
- IoT devices may include sensors that record measurements

**Sensor:**
- They refer to “a device that senses and reports physical or chemical properties from the physical environment and transforms them into digital data that can be transmitted over a network.”
- Sensors contain information to identify them: name, description, serial number, type
- The type gives information on the type of measurements (property) recorded by the sensor, the RP highlights multiple types of sensors e.g. geolocation, thermometer or humidity. 
- Most observed properties have a datatype double and a unit of measurement. Only the geolocation differs as the geolocation contains a triplet of values latitude, longitude, altitude.

#### 6.2. Chosen approach in the data model
To meet the requirements of the Interactive Cargo RP there **IotDevice, Sensor, and Measurements** objects that have been created. In order to respect the Digital Twin principle and align on the real world, multiple **IotDevice** objects can be linked to any Logistic Object that refers to known physical entities. Such LO can be a **Piece**, a **ULD**, a specific location, etc.

Then an **IotDevice** can be linked to multiple Sensor objects that record a single type Measurements. 
 
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161541172-0009961c-d88d-46d5-99d9-a14f6acb02d5.png"></p>
 
#### 6.3. Impacts and updates on the data model
To take into account the specificity of the Geolocation sensor type, subtypes of Sensor and Measurements have been added to ease the usage of the data model. 

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161541131-3057fb5d-d9a3-49bd-93e7-ce50ff80917a.png"></p>

### 7. Dangerous Goods
#### 7.1. Requirements

The requirements for Dangerous Goods are strongly based on the Cargo-XML message xSDG that contains all required information for the transport of dangerous goods. The details of the information can be found in the Cargo-XML toolkit and thus will not be fully transcribed in this document.

#### 7.2. Chosen approach in the data model
The different data required in the xSDG message are split among objects **Piece, Product, Item** and some dedicated objects: **DgProductRadioactive, DgRadioactiveIsotope and DgDeclaration**. A focus is made on making sure that all legal data required are within ONE Record data model.

As Dangerous Goods cargo require specific data, **ProductDg, ItemDg and PieceDg** objects are added to simplify the data model, they are subtypes of Product, Item and Piece objects.

In details information related to the packaging concept of Dangerous Goods is added on the PieceDg object to fully integrate these requirements.

**DgProductRadioactive and DgRadioactiveIsotope** objects contain specific data related to radioactive products and are linked to ProductDg object.

**DgDeclaration** object is used to contain data related to the existing Dangerous Goods Declaration, it is linked to one or many **PieceDg** objects. 

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161540859-0dc548e5-2bc4-4088-87ce-79252e835cba.png"></p>

 
#### 7.3. Impacts and updates on the data model
All Dangerous Goods requirements result in the creation of new subtypes or objects, they are described in details below.
 
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161540819-4143145e-5957-493c-96fd-2d2e398f58d4.png"></p>
 
### 8. Pharmaceutical products
#### 8.1. Requirements
The requirements for pharmaceutical shipments may differ depending on the parties involved. We have highlighted two cases.

 ![image](https://user-images.githubusercontent.com/58464775/161540717-d8822fe8-98be-4706-8dd2-95921ddbc4cb.png)
 **From Shipper to forwarder:**
- Product Temperature Range: the shipper express the temperature range the shipment need to handled. The requirement is expressed in free format.
- Packaging Technology: passive or active technology
- Packaging Type: packaging type as per chapter 6.3.7 of the TCR
- Unit Loading Device: information related to the ULD (exemple: uldTypeCode, serialNumber, ownerCode, ataDesignator)


![image](https://user-images.githubusercontent.com/58464775/161540770-fe4db666-d382-45a7-b899-1410a1c4e8e4.png)
  **From forwarder to carrier:**
- Product Temperature Range: Special handling code (COL, CRT, ERT, FRO)
- Packaging Technology: Special handling code (ACT, PIP)
- Packaging Type: as per chapter 6.3.7
- Unit Loading Device: see ULD data elements from ONE Record data model

#### 8.2. Chosen approach in the data model
The current data model covers the pharmaceutical shipments requirements using the **ULD, Piece, ServiceRequest and SpecialHandling** objects.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161540599-509917bb-17f7-453f-b111-afe3e20b5d77.png"></p>


1.	The ULD object capture all the information related to the ULD used by the shipper/forwarder
2.	The information is captured at Piece level. The Piece object enables to capture all the required information, including goods description, product information, ULD information, handling information, packaging type as per chapter 6.3.7 of the TCR. If accompany certificate are required, they can be digitalized (if acceptable) in PDF format for example and the link to the PDF document can be inserted using the externalReference data property. 
3.	The SpecialRequest object is used to capture the shipper requirements. Either the special handling code can be inserted (if known), or the requirement can be inserted in full text using the statementText attribute. Requirements may include:
- Active or Passive packaging
- Product temperature range


4.	The SpecialHandling object aims to capture all the special handling codes. For pharma product, the use of the below codes have been identified:
- PIL: Pharmaceuticals
- ACT: Active Temperature Controlled System
- PIP: Passive Insulated Packaging 
- COL: between +2°C to +8°C
- CRT: between +15°C to +25°C
- ERT: between +2°C to +25°C
- FRO: below -18°C

#### 8.3. Impacts and updates on the data model
As a result there are no impacts on the data model for the integration of pharmaceutical shipments.
 
### 9. Live Animals
#### 9.1. Requirements
##### 9.1.1 Shipper’s certification for Live Animals
The shipper’s certification for Live Animals is an essential document required to transport live animals. The requirements are described in the Live Animals Regulation as published by IATA.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161540521-47f26e6f-8a70-408f-b701-266e4921d97c.png"></p>
 
##### 9.1.2 CITES ePermit
The CITES permit is a the key instrument to control the trade in the species it protects. An extensive work has been done in order to define the requirements for the CITES ePermit, including the ePermit Core Component Data Model V2.0.
The details of the ePermit and the associated data model are in the “CITES electronic permitting toolkit Version 2.0” document that can be found here.

#### 9.2. Chosen approach in the data model
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

#### 9.3. Impacts and updates on the data model
The objects added for Live Animals integration have been specified, accordingly with the existing models.
 <p align="center">
<img src="https://user-images.githubusercontent.com/58464775/161540369-42550a3b-2609-4975-9142-55264a1b0cb9.png"></p>

 
### 10. Air Waybill
#### 10.1. Requirements
The Air Waybill document’s requirements are expressed in multiple forms: the Air Waybill paper document as described in the Cargo Services Conference Resolutions Manual (CSCRM) in Resolution 600a and various Cargo XML messages, especially the XFWB and XFZB.
 
 <p align="center">
<img src="https://user-images.githubusercontent.com/58464775/161540275-fd1d910c-4c5e-420c-a47a-be118ee1ab2e.png"></p>

 
#### 10.2. Chosen approach in the data model
The analysis has shown that some information were missing in the data model, they were removed when the Waybill object was drastically reduced early 2020. We expect some potential changes in the approach and impacts on the data model in the future, based on feedbacks we may receive from pilots and first implementations of ONE Record.

A mapping has been done to highlight the missing information, in green in the tables below.



|box|Air Waybill requirements|Description/Comment|Data Model mapping|
|---|---|---|---|
|1a|Airline Code Number||in Waybill/waybillPrefix|
|1b|Serial Number||in Waybill/waybillNumber|
|1|Airport of departure||in TransportSegment|
|1c|Issuing Carrier's name and address||in Company details of Carrier|
|1d|Reference to originals|not to be completed||
|1e|Reference to conditions of contracts|up to carrier||
|2|Shipper's name and address||in Company details of Shipper|
|3|Shipper's account number|up to carrier||
|4|Consignee's name and address||in Company details of Consignee|
|5|Consignee's account number|up to carrier||
|6|Issuing Carrier's Agent name and city|Issuing carrier's IATA Cargo Agent |in Company details of Carrier's agent|
|7|Agent's IATA code|IATA code of Cargo Agent. 7-digit IATA code or 7-digit IATA code followed by 3-digit CASS address code and check digit.|in Company details of Carrier's agent|
|8|Account number|up to carrier||
|9|Airport of departure and requested routing||"in TransportSegment| duplicate with 1 "|
|11a|To (by 1st carrier)|IATA 3-letter code of aiport of destination or first transfer point|in TransportSegment/arrivalLocation|
|11b|By 1st carrier|"Name of 1st carrier| full name or IATA 2-character code"|in Company details of Carrier|
|11c|To (by 2nd carrier)|IATA 3-letter code of aiport of destination or second transfer point|in TransportSegment/arrivalLocation|
|11d|By 2nd carrier|"Name of 2nd carrier| full name or IATA 2-character code"|in Company details of Carrier|
|11e|To (by 3rd carrier)|IATA 3-letter code of aiport of destination or third transfer point|in TransportSegment/arrivalLocation|
|11f|By 3rd carrier|"Name of 3rd carrier| full name or IATA 2-character code"|in Company details of Carrier|
|18|Airport of destination|Airport of destination of the last carrier|in Contractual level TransportSegment/arrivalLocation|
|19a/19b|Requested Flight/Date||in Contractual level TransportSegment/transportIdentifier|
|10|Accounting information|Only accounting information required by carriers||
|12|Currency|ISO 3-letter currency code of country of departure|in Price/grandTotal as Unit|
|13|Charge codes - Carrier|Charges codes for carrier|in Price/carrierChargeCode|
|14a/14b|Weight/Valuation charges|Prepaid or Collect|in Shipment/weightValuationIndicator|
|15a/15b|Other charges at Origin|Prepaid or Collect|in Shipment/otherChargesIndicator|
|16|Declared Value for Carriage||in Piece/declaredValueForCarriage|
|17|Declared Value for Customs||in Piece/declaredValueForCustoms|
|20|Insurance||in Shipment/Insurance|
|21|Handling information||"Covered by SpecialHandling| DGD| Live Animals certification| etc."|
|21a|Special Customs Information (SCI)||To be integrated in OCI discussion|
|22a|Number of pieces||derived from Piece|
|22a|Rate combination point (RCP)|IATA 3-letter code of the RCP|Deprecated|
|22b|Gross weight||in Piece/grossWeight|
|22c|kg/lb||in Piece/grossWeight|
|22z|Service Code|up to carrier||
|22d|Rate class||in Ranges/rateClassCode|
|22e|Commodity Item number||in Product/commodityItemNumber|
|22f|Chargeable weight||in Piece/volumetricWeight or Shipment/volumetricWeight|
|22g|Rate/Charge|Applicable rate or charge|in Ranges/amount|
|22h|Total charge|Total charge or discount for each line entry|Calculated value|
|22i|Nature and quantity of goods||"Derived from Piece| Product| Item| or special cargo objects"|
|22j|Total number of pieces||Derived from Piece|
|22k|Total gross weight||Derived from Piece|
|22l|Total||Derived from Piece|
|23|Other charges||in Ratings|
|24a|Prepaid weight charge|"Weight/Volume charge| should correspond to total in 22h or 22l"|Derived from total charge|
|25a|Prepaid valuation charge|Assessment of a valuation charge is dependent on the value declared for carriage|in Ratings|
|26a|Prepaid Tax||in Ratings|
|27a|Due Agent|Used only if agreed locally||
|28a|Due Carrier|Total of prepaid other charges du to carrier||
|29a|Untitled box|||
|30a|Total prepaid|Total of all the prepaid charges above||
|24b|Collect weight charge|"Weight/Volume charge| should correspond to total in 22h or 22l"|Derived/calculated value|
|25b|Collect valuation charge|Assessment of a valuation chargeis dependent on the value declared for carriage|in Ratings|
|26b|Collect Tax||in Ratings|
|27b|Collect charges Due Agent|Total disbursements due to agent|in Ratings|
|28b|Collect charges Due Carrier|Total disbursements due to carrier|in Ratings|
|29b|Untitled box|||
|30b|Total collect|Total of all collect charges above||
|31|Shipper's certification box|"Signature of the shipper (printed| signed or stamped)"|?|
|32a|Carrier executed on|Date of execution of the air waybill |in Waybill Event - Waybill execution (+ Memento trigger)|
|32b|Carrier executed at|Name of the place of execution (airport or city) of the air waybill|in Waybill Event - Waybill execution (+ Memento trigger)|
|32c|Signature of Issuing carrier or its agent|||
|33|For carriers use only at destination|||
|33a|Collect charges in destination current - currency conversion code||in Waybill/destinationCurrencyCode|
|33a|Collect charges in destination current - currency conversion rate||in Waybill/destinationCurrencyRate|
|33b|Collect charges in destination current - amount|"Amount from 30b| converted in destination currency"|Derived from 30b and converted|
|33c|Charges at destination|Charges levied at destination accruing to the last carrier in destination currency|in Waybill/destinationCharges|
|33d|Total collect charges|Sum of 33b and 33c|Sum of other charges|
|34a|Optional shipping information - Reference number|Reference number as per shipper/agent/issuing carrier agreement|in Waybill/optionalShippingRefNb|
|34b|Optional shipping information - Untitled box|up to carrier|in Waybill/optionalShippingInfo|
|34c|Optional shipping information - Untitled box|up to carrier||

The overall chosen approach for the Air Waybill is to attach each data property to the proper logistic object. We allow for a **Waybill** object but it contains very few data property to avoid redundancy in the data model.

The Air Waybill document can be re-created at any moment as all required information are within the data model and can be retrieved using the linked data (see the conceptual data model in the Design Principles documentation).

To “record” the signature of the Waybill, we use the Memento protocol as specified in the ONE Record API & Security specifications. Joint with the creation of a dedicated **Event** linked to the **Waybill**, it allows to ensure that the data used for the Waybill signature is properly recorded and can be retrieved at any time.
 
 <p align="center">
 <img src="https://user-images.githubusercontent.com/58464775/161540123-7ca41e43-775d-4f1e-a31f-e7c2ae79551b.png">
</p>

 
#### 10.3. Impacts and updates on the data model

At this stage the analysis leads to small impacts on the data model, on the Waybill and Price objects.
 <p align="center">
 <img src="https://user-images.githubusercontent.com/58464775/161539974-d3ca502d-3c27-4878-b2e4-b1d933c61621.png">
 </p>
