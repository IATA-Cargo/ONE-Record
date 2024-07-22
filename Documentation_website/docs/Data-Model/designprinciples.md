## ONE Record Vision
The vision for ONE Record is an end-to-end digital logistics and transport supply chain where data is easily and transparently exchanged in a digital ecosystem of air cargo stakeholders, communities and data platforms. ONE Record is an open standard for data sharing and creates a single record view of the shipment. This standard defines a common data model for the data that is shared via standardized and secured web API. The standard is based on mature but progressive data sharing technologies that are well aligned with the best practices used by leading airlines. This makes it directly accessible to IT teams and service providers.
ONE Record standard aims to become an essential part of the Internet of Logistics (IoL) data exchange infrastructure that is emerging.
An expert group with stakeholders from the whole logistics and transport chain has been gathered to define the ONE Record data model under IATA’s guidance since 2018.

## The ONE Record Data Model
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

## Principles
To achieve the data model objectives, four core design principles have been identified as per below:

<p align="center">
 <img src="https://user-images.githubusercontent.com/58464775/161280068-bc5a0f1b-2617-457b-af7d-906b59a4d953.png">
</p>
<p align="center"><i>Core principles</i></p>

### Piece centric
As defined by the IATA Recommended Practice 1689, a piece is a uniquely identified physical single unit. A Piece may form all or a part of a shipment in the logistics supply chain.
As a basic architectural principle, the ONE Record data model is built around the logistic object “piece”. Having the piece at the center of the data model encourages all parties in the supply chain to deliver detailed data at a high level of granularity.

### Physics oriented
The data model intends to reflect as much as possible the actual operational data, it has been designed around the concept of **Digital Twin**: the main objects of the data model represent either physical assets or the physical journey within the logistics supply chain.
For instance, the objects Item, Pieces or ULD are easily identified in operations and they bear the same meaning in the data model.

### One single source of truth
The ONE Record data model aims at minimizing redundancy of data. In other words, data  should be defined and stored at a single place in the data model. Having data only in a single place has several benefits:
- There’s only one single source of truth, instead of having multiple sources that can have contradicting values
- Ownership of the data is clear and data management is simplified
- Efficiency and performance of the data model are optimized
- Data quality is improved, as there will be no corruption of data due to conversion, trans-mission errors or delayed updates

### Data driven
#### A data-driven data model
Cargo industry of today relies on many documents that are sent from stakeholder to stakeholder, some of them being legally binding. The ONE Record data model aims to be **data-driven, not document-driven.**
As documents remain essential for the legal side of logistics, the data model aims to be exhaustive enough to make sure that all required information is captured. Any stakeholder who has access to the proper information should be able to create or re-create any document he needs for operations purposes.

#### Semantic web and linked data
As Tim Berners-Lee, inventor of the World Wide Web, describes it, “the Semantic Web isn’t just about putting data on the web. It is about making links, so that a person or machine can explore the web of data.  With linked data, when you have some of it, you can find other, related, data.”
With the correct usage of web technologies and standard mechanisms, as defined and de-scribed in the API & Security specifications of ONE Record, the linked data enables to connect and query data from different sources.
This gives the flexibility for every stakeholder to choose if they want to host their data and make it available to others or use a common platform, from another stakeholder or an IT service provider.
The ontology, defined in the Turtle syntax, is the faithful transcription of the logical data model in a machine-readable format.
In the ONE Record data model this principle also allows to:
- **Keep the relation between objects simple**
- **Avoid redundancy of links and information**

For instance, if a Product is linked to a Piece and a Piece is linked to a Shipment, an explicit link between Product and Shipment is not required.

#### Events
The status of a Logistic Object is a key element of the transparency and tracking possibilities that ONE Record wants to provide. The **generic object Event** enables to capture the evolution of all objects in the logistics and transport supply chain.
Events can, for instance, be used to monitor Cargo iQ milestones, the state of physical assets or the status of transport segments such as Departed, Arrived, etc. This includes the planned events as per the routemap as well. 
