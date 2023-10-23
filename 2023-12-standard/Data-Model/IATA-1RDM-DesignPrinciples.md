![image](https://user-images.githubusercontent.com/58464775/161543539-42b13949-63e0-410f-ad0c-6d1b7ffd693d.png)
# ONE Record Data Model
## Design principles

/// Work in progress ///

### 1. Introduction
#### 1.1. Purpose of this document
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
- It represents an essential element of the supply chain: physical objects, activities, etc.
- It has its own lifecycle and can have events;
- It can be shared and subscribed to by any stakeholder involved in the logistics supply chain;
The Unique Resource Identifier (URI) of a LO contains its endpoint (c.f. API & Security specifications available on the Github space ONE Record) as well as an identifier that can be an existing unique identifier standardized among the industry (e.g. UPID for pieces or AirWaybill numbers).
Following the design principles defined above, we have defined a semantic data model, or conceptual data model, which focuses on the Logistic Objects of the data model.

<p align="center">
<img src="https://user-images.githubusercontent.com/58464775/208689223-51d79639-dc49-477e-af01-ac5633f15a80.png"></p>
<p align="center"><i>Conceptual Data Model - To update</i></p>

#### 4. LogisticsEvent
The Events are an essential part of the Data Model, they allow to record any update or occuring event linked to a LO. It contains generic data and object properties to cover most requirements and can be derived in subtypes or subclasses if it is relevant.

#### 5. Paper transport documents in ONE Record

The general concept of legal entities like MAWB or HAWB in ONE Record does not differ from the established concepts in term of legal preconditions or validity. All the legal requirements remain in place and must be fulfilled. But because of the architecture of ONE Record, changes in the practical management of data are required. In the context of ONE Record, a legal entity like the AWB has the following characteristics:
- A defined set of data fields, as described in the corresponding Logistics Object

These data fields are either attributes (e.g. type of AWB) or defined as links to other LOs in the data model (e.g. Booking or Shipment). 

- From defined owners

Due to legal requirements, some fields must be provided by the accountable party. E.g. in case of MAWB, the forwarder must be owner of most data fields, although some data fields (like the transport segments with the planned routing) are owned by the carrier, and some are owned by shippers (e.g. the commodity information).

- For a special purpose (“e.g. Master Air Waybill”)

The traditional paper documents fulfil a defined legal purpose. To fulfil this purpose is the only function of the correlating Logistics Object (e.g. “AWB Logistics Object”).

- At a special point in time, consented by two parties (e.g. “Shipper” and “Carrier”)

The data of the LO is intentionally shared by the contractual parties at a defined point in time, to freeze that version of the data set as the one used for the contractual purpose. Data might change afterwards, but the changed revisions will not be taken into consideration, unless a new version of the legal entity is generated and consented on.

##### 5.1. Master AWB
###### 5.1.1 Digital AWB approach

The digital AWB approach follows the four principles of avoiding redundancy, marking outdated data fields as deprecated, removing all data fields without a legal impact and, fourthly, separating all non-legal, physical characteristics in a separate LO (Shipment).

Firstly: remove redundancies with any other data source and data fields covered by ONE Record mechanisms. Most data classically found in the AWB are essential parts of the Booking Option and Booking Option Request as well as the Piece and Shipment objects. As those LOs are created earlier in the logical chain, the data in the booking process is in the lead and referred to in the AWB. Data like WAYBILL_NUMBER, the total gross weight, the origin and destination, or the number of pieces originate from the Booking, not the AWB. Additionally, some information is not required anymore, especially the total-fields, as the mechanism to be used in ONE Record would be to count the correlated items themselves.

Secondly: Mark outdated data fields clearly as deprecated. All the data fields found under the WayBill Lane in the cIMP/cXML data catalogue are considered to be outdated, especially the IATA Rates. The whole architecture of these fields, presenting characteristics of groups of pieces, is already not supported by most carriers nowadays. Additionally, the structure of this LO is not compatible with the principles of ONE Record. 

Thirdly: Remove all data fields that have no legal impact on the AWB. A lot of information was traditionally part of the AWB, as the AWB used to be the major – and often exclusive – source of information on the shipment. With ONE Record, any data can shared in correlation with the AWB number or any other unique ID, but then don’t have to be part of the AWB. This mostly effects fields like the accounting information, the airline product names and codes, or the insurance information. Also, parts of the other charges section not be part of the contract between forwarder and carrier, as the add up during the execution of the AWB.

Fourthly: All physical characteristics of the totality of pieces under one contract can be found in the Shipment LO. This does not include piece-related information, as they are characteristics of pieces themselves, but physical characteristics that are shared by all pieces under that contract. 
The data fields of the AWB LO and owners of each of these fields are better described in the Use Case document for the ONE Record data model (insert reference). 

###### 5.1.2 Pieces / ULDs in AWB wording

The legal terminology for BUPs in the AWB is not consistent, as BUPs don´t count as ULDs, but as pieces. To solve this problem, the following solution is suggested: Whenever a BUP is pre-sented by the forwarder, additionally to the ULD LO, a single Piece LO is created with the dimensions and gross weight of the packed ULD.

###### 5.2. House AWB

The House Waybill is made up from data provided by the Customer in the Shippers Letter of Instruction (SLI) which is then enhanced by the forwarder as necessary to include specific data required by the forwarder, carrier and other authorities. This then provides the door to door route map of the pieces linked to the House Waybill for cIQ transportation plan. 
