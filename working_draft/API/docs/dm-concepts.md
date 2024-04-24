## ONE Record Data Model Ontologies

The ONE Record data model is specified as an ontology which is also referred to as a semantic model. The ONE Record data model consists of two ontologies: the `ONE Record cargo ontology` and the `ONE Record core code lists ontology`

The `ONE Record cargo ontology` contains industry concepts, their properties, and their relationships between them. This ontology can be used by analysts, developers, and users to understand the data classes in ONE Record and their relationship to each other.

The `ONE Record core code lists ontology` contains industry code lists as named individuals.

Both ontologies are maintained on [GitHub](https://github.com/IATA-Cargo/ONE-Record). 

## Logistics Objects

The ONE Record cargo ontology is organized as a set of data classes that represent real world concepts in transport and logistics, also referred to as digital twins.
These generic data classes are referred to as `Logistics Objects` in the world of ONE Record.
Each digital twin is an instance of a data classes that inherits from the Logistics Object data class.
The data exchange that is facilitated by the ONE Record API is mainly the exchange of Logistics Objects.
This is transition from the traditional logistics and transport EDI systems that only exchanged messages and documents.
The concept of Logistics Objects is far more extensive since Logistics Objects can be more granular and have very specific usage in different use cases within the logistics and transport domain.
Examples of a Logistics Object are a [Piece](https://onerecord.iata.org/ns/cargo#Piece), an [IotDevice](https://onerecord.iata.org/ns/cargo#IotDevice), a [Sensor](https://onerecord.iata.org/ns/cargo#Sensor) or a [BookingOptionRequest](https://onerecord.iata.org/ns/cargo#BookingOptionRequest) and [many more](https://onerecord.iata.org/ns/cargo).

## Linked Data

A central approach of ONE Record is to enable the creation of a comprehensive network of
data, i.e. data related to specific consignments and shipments are accessible as a
unique and single shipment record, i.e. "one record" in that network of linked data. To achieve this, the ONE Record data model is based on a ONE Record cargo industry ontology using the Resource Description Framework (RDF) format.

**Used Namespace Prefixes in ONE Record Context**

| Prefix | Namespace                    | Description         |
| ------ |  -------------------------- |  ------------------------------------- |
| cargo  | [https://onerecord.iata.org/ns/cargo](https://onerecord.iata.org/ns/cargo) | This refers to the ONE Record cargo ontology.          |
| ccodes | [https://onerecord.iata.org/ns/coreCodeLists](https://onerecord.iata.org/ns/coreCodeLists) | This refers to the ONE Record core code lists ontology.          |
| api    | [https://onerecord.iata.org/ns/api](https://onerecord.iata.org/ns/api)     | This refers to the ONE Record API ontology.            |
| xsd    | [http://www.w3.org/2001/XMLSchema](http://www.w3.org/2001/XMLSchema) | W3C vocabulary, primarily used for primitive data types (e.g. string, dateTime) |