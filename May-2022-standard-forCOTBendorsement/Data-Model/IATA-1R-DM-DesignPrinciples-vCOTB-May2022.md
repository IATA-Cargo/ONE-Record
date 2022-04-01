# ONE Record Data Model
## Design principles

### Contents
xxx

### 1. Introduction
#### 1.1. Purpuse of this document
This document has been produced by the ONE Record Data Model expert group, part of the ONE Record Task Force, under the Cargo Services Conference (CSC) governance. It describes the design principles that have been defined and applied to produce the ONE Record Data Model on conceptual and logical levels.
The design principles are general rules and cargo industry business rules explaining the way the data model has been defined.
Note that this document, especially the concepts and objects in it, may evolve with revised versions of the data model in the future and will include feedbacks from the industry and pilot projects.

#### 1.2. ONE Record
The vision for ONE Record is an end-to-end digital logistics and transport supply chain where data is easily and transparently exchanged in a digital ecosystem of air cargo stakeholders, communities and data platforms. ONE Record is an open standard for data sharing and creates a single record view of the shipment. This standard defines a common data model for the data that is shared via standardized and secured web API. The standard is based on mature but progressive data sharing technologies that are well aligned with the best practices used by leading airlines. This makes it directly accessible to IT teams and service providers.
ONE Record standard aims to become an essential part of the Internet of Logistics (IoL) data exchange infrastructure that is emerging.
An expert group with stakeholders from the whole logistics and transport chain has been gathered to define the ONE Record data model under IATA’s guidance since 2018.

#### 1.3. The ONE Record Data Model
The Data Model is an essential part of ONE Record and aims to provide the air cargo industry with a standard data structure for data exchange using JSON-LD that facilitates data integration with existing and new data services.
Such a data structure needs to be as simple as possible and needs to be shared and understood by any stakeholder involved. This means that the way data objects are defined is applicable to the relationship between a shipper and a forwarder as well as between a forwarder and a carrier.

<p align="center">
 <img src="https://user-images.githubusercontent.com/58464775/161277988-6dc2a309-8f00-42ad-a0bf-4646804bcee2.png">
</p>
<p align="center"><i>Goals of ONE Record Data Model</i></p>

This document focuses on the Airline Core Ontology referring to the interaction of General Cargo between shippers and freight forwarders as well as between freight forwarders and Airlines. It is designed to be expandable to other types of cargo such as dangerous goods and special cargo with add-ons to cover as well other logistics partners included in the end-to-end transport supply chain of air cargo.

<p align="center">
 <img src="https://user-images.githubusercontent.com/58464775/161279813-559dafa2-1cce-4355-91fb-35d513a4193e.PNG">
</p>
<p align="center"><i>Scope of the data model</i></p>

### 2. Principles
To achieve the data model objectives, four core design principles have been identified as per below:

<p align="center">
 <img src="https://user-images.githubusercontent.com/58464775/161280068-bc5a0f1b-2617-457b-af7d-906b59a4d953.png">
</p>
<p align="center"><i>Core principles</i></p>

#### 2.1. Piece centric
As defined by the IATA Recommended Practice 1689, a piece is a uniquely identified physical single unit. A Piece may form all or a part of a shipment in the logistics supply chain. 
As a basic architectural principle, the ONE Record data model is built around the logistic object “piece”. Having the piece at the center of the data model encourages all parties in the supply chain to deliver detailed data at a high level of granularity.

#### 2.2. Physics oriented
The data model intends to reflect as much as possible the actual operational data, it has been designed around the concept of **Digital Twin**: the main objects of the data model represent either physical assets or the physical journey within the logistics supply chain.
For instance, the objects Item, Pieces or ULD are easily identified in operations and they bear the same meaning in the data model.

#### 2.3. One single source of truth
The ONE Record data model aims at minimizing redundancy of data. In other words, data  should be defined and stored at a single place in the data model. Having data only in a single place has several benefits:
- There’s only one single source of truth, instead of having multiple sources that can have contradicting values
- Ownership of the data is clear and data management is simplified
- Efficiency and performance of the data model are optimized
- Data quality is improved, as there will be no corruption of data due to conversion, trans-mission errors or delayed updates

#### 2.4. Data driven
##### 2.4.1. A data-driven data model
Cargo industry of today relies on many documents that are sent from stakeholder to stakeholder, some of them being legally binding. The ONE Record data model aims to be **data-driven, not document-driven.** 
As documents remain essential for the legal side of logistics, the data model aims to be exhaustive enough to make sure that all required information is captured. Any stakeholder who has access to the proper information should be able to create or re-create any document he needs for operations purposes.

##### 2.4.2. Semantic web and linked data
As Tim Berners-Lee, inventor of the World Wide Web, describes it, “the Semantic Web isn’t just about putting data on the web. It is about making links, so that a person or machine can explore the web of data.  With linked data, when you have some of it, you can find other, related, data.”
With the correct usage of web technologies and standard mechanisms, as defined and de-scribed in the API & Security specifications of ONE Record, the linked data enables to connect and query data from different sources.
This gives the flexibility for every stakeholder to choose if they want to host their data and make it available to others or use a common platform, from another stakeholder or an IT service provider.
The ontology, defined in the Turtle syntax, is the faithful transcription of the logical data model in a machine-readable format.
In the ONE Record data model this principle also allows to:
- **Keep the relation between objects simple**
- **Avoid redundancy of links and information**

For instance, if a Product is linked to a Piece and a Piece is linked to a Shipment, an explicit link between Product and Shipment is not required.

##### 2.4.3. Events
The status of a Logistic Object is a key element of the transparency and tracking possibilities that ONE Record wants to provide. The **generic object Event** enables to capture the evolution of all objects in the logistics and transport supply chain.
Events can, for instance, be used to monitor Cargo iQ milestones, the state of physical assets or the status of transport segments such as Departed, Arrived, etc. This includes the planned events as per the routemap as well. 

### 3. The Logistic objects
As part of the Internet of Logistics, the ONE Record data model is using Logistic Objects (LO). In the ONE Record context a LO can be defined as follows:
- It represents an essential element of the supply chain: physical objects, legal documents, etc.
- It has its own lifecycle and can have statuses or events;
- It can be shared and subscribed to by any stakeholder involved in the logistics supply chain;
- As a digital twin of a physical object, a LO can have IoT data. 
The Unique Resource Identifier (URI) of a LO contains its endpoint (c.f. API & Security specifications available on the Github space ONE Record) as well as an identifier that can be an existing unique identifier standardized among the industry (e.g. UPID for pieces or AirWaybill numbers).
Following the design principles defined above, we have defined a semantic data model, or conceptual data model, which focuses on the Logistic Objects of the data model.

<p align="center">
 <img src="https://user-images.githubusercontent.com/58464775/161281541-d7157b58-ed92-4ad4-a4c0-f8caae9d7e14.PNG">
</p>
<p align="center"><i>Conceptual Data Model</i></p>

In this part we will define the Logistic Objects that are at the center of the ONE Record data model. The following paragraphs will focus on:
- Defining the concept behind each LO 
- Providing relevant governance and business rules around the LO

#### 3.1. Piece
**Definition**
> A piece is a uniquely identified physical single unit. A Piece may form all or a part of a shipment in the logistics supply.

During handling or transportation, pieces can be physically and logically bundled and packaged together. In this case, a new piece is created. Therefore, pieces can be hierarchically linked to other pieces. There can be several levels, depending on the operational process.

Pieces are identified by a Unique Piece Identifier (UPID) that is defined as recommended in the IATA Recommended Practice 1689. Although the industry has the aim to become piece-centric, as of today in many cases data is only available at shipment level. To make sure that ONE Record covers all cases (piece or shipment-centric supply chains), the concept of virtual pieces has been introduced. Based on the shipment information and ‘piece-count’ that is currently mandatory, a virtual piece can be created in ONE Record for every piece that is part of a shipment. By using the virtual pieces, the ONE Record mechanism where pieces can be assigned to e.g. ULD’s and transport segments can be applied even without detailed piece information. 

At any point of time, if a party creates, groups or reshuffles existing pieces into a new piece, of which he will be the owner, that will be linked to the actual pieces as tendered by the shipper to the forwarder.

#### 3.2. Shipment
**Definition**
> A shipment is one or more pieces accepted or to be accepted under the terms of a single/correlating transportation contract. The shipment is therefore a physical object, where e.g. the weight refers to the actual weight of the total set of pieces that are linked to the shipment. 

The shipment contains essential information related to the goods to be transported that are required for the booking, directly as an attribute or through its link with the contained pieces. 

#### 3.3. Item
**Definition**
> An Item is a specific physical unit of a product that can be individually identified and is relevant for a specific load on one or more transport segments. The item can be identified by custom assigned identifiers or by available standards depending on requirements. The item cannot change over the course of one booking.

For instance, a smartphone with an IMEI or Serial Number is considered an Item, the Product can be the smartphone model.

Stakeholders have the possibility to decide on the depth of the item definition. For instance, it certainly makes more sense to identify the item “pencil” by a batch of N pencils, with the same lot number or batch number, than identifying each pencil on its own. On the contrary with the example above, a smartphone needs to be identified and traced by its IMEI number. In the end, whether items need standardization or not will be up to the regulators, manufacturers or shippers based on their tracking needs in the logistics supply chain.

#### 3.4. Product
**Definition**
> The product is the generic description of one or more items of same properties and regulatory rules for transport and if applicable, export and import. It contains information such as commodity information, measurements, pricing, and other regulatory related information that are essential to the transport.

Some of the information required would be according to standards and mandatory fields, others could be optional. A product can either be linked to items or to pieces directly when no items are defined for very specific cargo for instance. At this stage the product is not standardized. 

#### 3.5. Unit Load Device (ULD)
**Definition**
> A ULD is any type of container or pallet, as defined in Rule 3.10.2. on or in which pieces can be transported, whether a container is considered as aircraft equipment. ICAO defines a ULD as any type of freight container, aircraft container, aircraft pallet with a net, or air-craft pallet with a net over an igloo. 

ULD’s have the specific purpose facilitate the transportation of shipments or parts of the shipment (pieces) on an aircraft. ULD’s interface directly with a means of transportation’s loading and restraint system. 

ULD’s, as physical units, have an owner. This owner is often the carrier but can also be another party such as an asset management company. 

The ULD high level information should be accessible to any party involved in the transport of the goods it contains.

#### 3.6. Transport Movement
**Definition**
> A transport movement describes the physical movement of entities and can also represent times without movement such as warehouse times. Contrary to a milestone, a movement describes a timespan with a defined starting and ending time. 
> 
The current concept of Transport movement shall be used to only represent the physical movements, including warehouse rest times for instance.

In case of warehouse resting times, the means of transportation would be the major local physical means of transportation, e.g. Forklifts.

At the current stage, additional higher and lower levels of transportation segments are possible, e.g. covering an end-to-end supply chain schema or micro-movements like from warehouse to build up. These levels are not standardized yet and are not properly included in the data model yet. The transport segment does not only provide information on the current status of the entities, but also about future planned movements. In this capacity, the transport segment reflects the cIQ transportation plan.

The segments at a contractual level, e.g. transportation information at AirWaybill level, are recorded into a separate object called BookingSegment. This BookingSegment shall be used to capture minimal required information such as Departure/Arrival locations and preferred transport identifier (i.e. flight number for Air).

#### 3.7. Booking Option Request
**Definition** 
> A booking option request refers to both a quote request for the transportation of goods or the booking confirmation request. It leads to a booking option and is part of the Quote & Book process as defined in the Distribution part of the Data Model.

#### 3.8. Booking Option
**Definition**
> A booking option refers to the quotes made or the arrangement that is made between two parties regarding a shipment. It can be between a shipper and a forwarder or between a forwarder/shipper and a carrier. At this stage of the Data Model, the booking option refers to the arrangement between the forwarder/shipper and the carrier only.

In the case of a booking between a forwarder/shipper and a carrier, the booking option is the result of the Quote & Book process as defined in the Distribution part of the Data Model. It contains the agreed conditions between the two parties including the overall movement (origin and destination), the price information, the carrier product, services, etc. 

#### 3.9. Waybill
**Definition**
> The Waybill can represent the House Waybill between a shipper and a forwarder as well as the Master Waybill between a forwarder and a carrier.

The Waybill does not contain many data elements as most of the legal information that the MAWB and HAWB contain are already defined on other LOs such as Booking and Shipment. The linked data principle allows to reconstitute the legal documents. A mapping between the document and the Data Model has been done and is available in the ONE Record documentation.

### 4. Paper transport documents in ONE Record

The general concept of legal entities like MAWB or HAWB in ONE Record does not differ from the established concepts in term of legal preconditions or validity. All the legal requirements remain in place and must be fulfilled. But because of the architecture of ONE Record, changes in the practical management of data are required. In the context of ONE Record, a legal entity like the AWB has the following characteristics:
- A defined set of data fields, as described in the corresponding Logistics Object

These data fields are either attributes (e.g. type of AWB) or defined as links to other LOs in the data model (e.g. Booking or Shipment). 

- From defined owners

Due to legal requirements, some fields must be provided by the accountable party. E.g. in case of MAWB, the forwarder must be owner of most data fields, although some data fields (like the transport segments with the planned routing) are owned by the carrier, and some are owned by shippers (e.g. the commodity information).

- For a special purpose (“e.g. Master Air Waybill”)

The traditional paper documents fulfil a defined legal purpose. To fulfil this purpose is the only function of the correlating Logistics Object (e.g. “AWB Logistics Object”).

- At a special point in time, consented by two parties (e.g. “Shipper” and “Carrier”)

The data of the LO is intentionally shared by the contractual parties at a defined point in time, to freeze that version of the data set as the one used for the contractual purpose. Data might change afterwards, but the changed revisions will not be taken into consideration, unless a new version of the legal entity is generated and consented on.

#### 4.1. Master AWB
##### 4.1.1 Digital AWB approach

The digital AWB approach follows the four principles of avoiding redundancy, marking outdated data fields as deprecated, removing all data fields without a legal impact and, fourthly, separating all non-legal, physical characteristics in a separate LO (Shipment).

Firstly: remove redundancies with any other data source and data fields covered by ONE Record mechanisms. Most data classically found in the AWB are essential parts of the Booking Option and Booking Option Request as well as the Piece and Shipment objects. As those LOs are created earlier in the logical chain, the data in the booking process is in the lead and referred to in the AWB. Data like WAYBILL_NUMBER, the total gross weight, the origin and destination, or the number of pieces originate from the Booking, not the AWB. Additionally, some information is not required anymore, especially the total-fields, as the mechanism to be used in ONE Record would be to count the correlated items themselves.

Secondly: Mark outdated data fields clearly as deprecated. All the data fields found under the WayBill Lane in the cIMP/cXML data catalogue are considered to be outdated, especially the IATA Rates. The whole architecture of these fields, presenting characteristics of groups of pieces, is already not supported by most carriers nowadays. Additionally, the structure of this LO is not compatible with the principles of ONE Record. 

Thirdly: Remove all data fields that have no legal impact on the AWB. A lot of information was traditionally part of the AWB, as the AWB used to be the major – and often exclusive – source of information on the shipment. With ONE Record, any data can shared in correlation with the AWB number or any other unique ID, but then don’t have to be part of the AWB. This mostly effects fields like the accounting information, the airline product names and codes, or the insurance information. Also, parts of the other charges section not be part of the contract between forwarder and carrier, as the add up during the execution of the AWB.

Fourthly: All physical characteristics of the totality of pieces under one contract can be found in the Shipment LO. This does not include piece-related information, as they are characteristics of pieces themselves, but physical characteristics that are shared by all pieces under that contract. 
The data fields of the AWB LO and owners of each of these fields are better described in the Use Case document for the ONE Record data model (insert reference). 

##### 4.1.2 Pieces / ULDs in AWB wording

The legal terminology for BUPs in the AWB is not consistent, as BUPs don´t count as ULDs, but as pieces. To solve this problem, the following solution is suggested: Whenever a BUP is pre-sented by the forwarder, additionally to the ULD LO, a single Piece LO is created with the dimensions and gross weight of the packed ULD.

##### 4.2. House AWB

The House Waybill is made up from data provided by the Customer in the Shippers Letter of Instruction (SLI) which is then enhanced by the forwarder as necessary to include specific data required by the forwarder, carrier and other authorities. This then provides the door to door route map of the pieces linked to the House Waybill for cIQ transportation plan. 
