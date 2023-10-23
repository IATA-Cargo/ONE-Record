![image](https://user-images.githubusercontent.com/58464775/161543539-42b13949-63e0-410f-ad0c-6d1b7ffd693d.png)
# ONE Record Data Model
## ONE Record Objects structure

/// Work in progress ///

### 1. Introduction
#### 1.1. Purpose of this document
This document has been produced by the ONE Record Data Model expert group, part of the ONE Record Task Force, under the Cargo Services Conference (CSC) governance. It describes the Objects structure of ONE Record Data Model and gives an insight on the Ontology structural choices that have been made.


### 2. The object structure
Following design principles of the ONE Record Data Model, the object structure was designed to be easy to understand and to allow for great flexibility in its usage. The overall structure is as follows:

<p align="center">
<img src="https://github.com/IATA-Cargo/ONE-Record/assets/58464775/0995dfc0-a023-4d22-a24d-3ddb58e0249f"></p>
<p align="center"><i>Object structure</i></p>

#### 2.1 The Logistic objects
As part of the Internet of Logistics, the ONE Record data model is using Logistic Objects (LO). In the ONE Record context a LO can be defined as follows:
- It represents an essential element of the supply chain: physical objects, activities, etc.
- It has its own lifecycle and can have events;
- It can be shared and subscribed to by any stakeholder involved in the logistics supply chain;
The Unique Resource Identifier (URI) of a LO contains its endpoint (c.f. API & Security specifications available on the Github space ONE Record) as well as an identifier that can be an existing unique identifier standardized among the industry (e.g. UPID for pieces or AirWaybill numbers).
Following the design principles, we have defined a semantic data model, or conceptual data model, which focuses on the Logistic Objects of the data model.

<p align="center">
<img src="https://user-images.githubusercontent.com/58464775/208689223-51d79639-dc49-477e-af01-ac5633f15a80.png"></p>
<p align="center"><i>Conceptual Data Model - To update</i></p>

##### 2.1.1 LogisticsService
> A **LogisticsService** is a sequence of Activities provided by one Party to another.

The Services usually represent an agreement between two or more parties. The first Service in our scope is the Booking. Current Service structure is very generic, more services can be added in the future, stakeholders are allowed to use the structure to define their own services.

##### 2.1.2. LogisticsActivity
> A **LogisticsActivity** is a scheduled set of tasks that is executed as part of one or more Services.

An Activity can be either one main task or a set of tasks. The LogisticsActivity object is generic with common data properties, stakeholders can define their own subtypes or propose improvements to the standard. The **TransportMovement** activity is essential for the supply chain and a few major activites have been defined as well (Storing, Loading, etc.).

##### 2.1.3. LogisticsAction
> A **LogisticsAction** is a specific task with a specific result performed on one or more LOs by one party in the context of a **LogisticsActivity**.

Actions represent the tasks within an Activity and contain the scheduling of the tasks. In order to track properly the potential discrepancy between a planned action and an actual action there should be a *Scheduled* or *Planned* task and an *Actual* task.
For instance if 5 pieces were intended to be loaded onto a flight and only 4 of them are actually loaded this can be easily tracked.

##### 2.1.4. PhysicalLogisticsObject
The Physical LO are what we refer to as Digital Twin in the core principles. Are included Pieces, ULDs, Transport Means and so on. They should be easily identifiable and relatable with their physical counter part.

PhysicalLogisticsObject play a critical role in the Data Model as they are an essential part of the supply chain. 

##### 2.1.5. LogisticAgent
The LogisticAgent structure is derived from the W3C model of organizations: https://www.w3.org/TR/vocab-org/#description We define the Organization/companies as well as Actors/Persons with relations between the different objects.

#### 3. LogisticsEvent
The Events are an essential part of the Data Model, they allow to record any update or occurring event linked to a LO. It contains generic data and object properties to cover most requirements and can be derived in subtypes or subclasses if it is relevant.

From a technical perspective the LogisticsEvent have a dedicated endpoint (see API specifications)

#### 4. Common objects
Some objects do no fall under main categories described above, they mainly exist in the context of a LO and are not meant to have their own lifecycle. For instance an Address usually only has meaning in the context of a Location to further describe the Location. 

Common objects can be, by implementation, **embedded** onto LOs to simplify the data management or they can be independent objects.

#### 5. Code List elements
##### 5.1. Purpose of code lists
Code lists allow to restrict the values of specific data properties. They are part of IATA EDI standards (CIMP, CXML) but are also defined by other entities such as ISO code lists, UN/ECE code lists, etc.

##### 5.2. Code lists in ONE Record Ontology
Relevant code lists defined in EDI standards are passed on the ONE Record ontology either directly in the Core ontology or in a dedicated ontology to allow for a simpler change management (CCL ontology - link).

Lists defined in the dedicated ontology usually refer to industry standards to be strictly used (e.g. charge codes in Waybills or Commodity values defined by the MCD working group) while common lists (e.g. units, salutation titles) are directly within the Core ontology.

To allow for flexibility, some lists remain "open" meaning that stakeholders can add their own values, for instance the Special Handling Codes are set by IATA but it is possible that carriers add their own SHC on top.

A specific *CodeListElement* has been defined as an embedded object transmit codes from non-RDF code lists in 1R in a semi-structured way. If a code is present in RDF-form as Named Individual (like in the 1R core code lists ontology), it suffices to put in its IRI.

A *CodeListElement* has generic properties defined in the Core ontology: code, codeDescription, codeLevel, codeListName, codeListReference, codeListVersion. All of the above are described in the ontology.
