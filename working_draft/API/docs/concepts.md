## Internet of Logistics (IoL)

The overall objective is to create the foundation for a global industry data architecture that allows all participants in the logistics and transport industry to exchange data necessary for the planning and execution of their logistics activities.
This global ecosystem for logistics and transportation data is called the `Internet of Logistics` and is expected to offer countless opportunities for digital transformation and innovation.

## ONE Record API

The ONE Record API specifies the interface and interactions via standardized Web Application Programming Interface (API), which allows all participants in the Internet of Logistics to connect their IT systems to the IT systems of their partners, using state of the art web technologies.
To achieve this, the ONE Record API specifies how data exchange between logistics and transport stakeholders can be achieved over HTTP.
The ONE Record API specification is associated with the [ONE Record Data Model](#one-record-data-model) that specifies the models and relationships within the transport and logistics data domain as common *"language"* between all stakeholders.

## ONE Record Data Model

The ONE Record data model is specified as an ontology which is also referred to as a semantic model. The ONE Record standard consists of two ontologies: the `ONE Record cargo ontology` and the `ONE Record API ontology`

The `ONE Record cargo ontology` contains industry concepts, their properties, and their relationships between them. This ontology can be used by analysts, developers, and users to understand the data classes in ONE Record and their relationship to each other.

The `ONE Record API ontology` contains the data classes and their relationship used for the ONE Record Web API.

Both ontologies are maintained on [GitHub](https://github.com/IATA-Cargo/ONE-Record). 
Furthermore, an online documentation based on the ontology can be found in the Tools section on the [ONE Record Developer Portal](https://onerecord.iata.org/).

## Internet of Logistics Node (IoL Node)

Each Internet of Logistics participant is technically represented as an Internet of Logistics Node (IoL Node) (also called ONE Record node). 
Such an IoL node can have capabilities of a [ONE Record server](#one-record-server) and/or a [ONE Record client](#one-record-client).

Typically, an IoL node represents a single organization. 
However, there might exist scenarios where an IoL node is shared between (sub-)organizations.

A single organization can also operate multiple IoL nodes, such as IoT devices that implement ONE Record clients to transmit data to ONE Record servers using the ONE Record standard.

## ONE Record Server

A ONE Record server - also called a `ONE Record REST API implementation` - is a web server that provides some or all of the specified ONE Record REST API endpoints and some or all of the data model specifications.
Technically, it could be just a simple HTTP web server or existing Web API. Therefore, the ONE Record API and data model specifications may be added to existing (server) software implementations that also provide other web services.

In this document, the term ONE Record server is used when referring to an actual software implementation of the ONE Record REST API specification that responds to HTTP requests from a [ONE Record client](#one-record-client).

## ONE Record Client

A ONE Record client is a technical representation of a stakeholder using ONE Record to exchange data in the Internet of Logistics. 
Unlike a ONE Record server that responses to API requests, a ONE Record Client initiates interaction with a ONE Record server. 

Each ONE Record server can also include a ONE Record client implementation in order to interact with other ONE Record server, i.e. by sending HTTP requests.

However, not every ONE Record client MUST contain a ONE Record server implementation. 
Nevertheless, it is useful for [pub-sub interactions](subscriptions.md), for example.

In this document, the term ONE Record client is used when referring to an software program that sends HTTP requests to a [ONE Record server](#one-record-server).

## Logistics Objects

The ONE Record cargo ontology is organized as a set of data classes that represent real world concepts in transport and logistics, also referred to as digital twins.
These generic data classes are referred to as `Logistics Objects` in the world of ONE Record.
Each digital twin is an instance of a data classes that inherits from the Logistics Object data class.
The data exchange that is facilitated by the ONE Record API is mainly the exchange of Logistics Objects.
This is transition from the traditional logistics and transport EDI systems that only exchanged messages and documents.
The concept of Logistics Objects is far more extensive since Logistics Objects can be more granular and have very specific usage in different use cases within the logistics and transport domain.
Examples of a Logistics Object are a [Piece](https://onerecord.iata.org/ns/cargo/3.0.0#Piece), an [IotDevice](https://onerecord.iata.org/ns/cargo/3.0.0#IotDevice), a [Sensor](https://onerecord.iata.org/ns/cargo/3.0.0#Sensor) or a [BookingOptionRequest](https://onerecord.iata.org/ns/cargo/3.0.0#BookingOptionRequest) and [many more](https://onerecord.iata.org/ns/cargo/3.0.0).

### **Owner of a Logistics Object**

The owner of a Logistics Object is the one who created it and thus has control over it. The owner may also control the ONE Record server on which the Logistics Object is accessible via HTTP requests, but this is not a requirement.
Instead, the owner may use a 3rd party IT solution provider that implements, operates, and provisions the ONE Record API and will provide suitable access to the owner to manage and control the Logistics Objects, including its creation, any changes, authorization and access rights, etc.

_In a publisher-subscriber scenario, the owner of a Logistics Object is also referred to as `Publisher`._ <br/>
_In an access delegation scenario, the owner of a Logistics Object is also referred to as the `Delegator`._

!!! note
    In this ONE Record API specification document, the term owner is used to describe a technical owner of a logistics object data object.
    This does not include legal topics such as data governance, ownership, data stewardship or data custodian.

### **User of a Logistics Object**

A user of a Logistics Object is anyone other than the owner and who has an interest in the Logistics Object.
Most likely the user will have a role in the logistics and transport of a shipment.
The user of a Logistics Objet MAY be from another organization than the owner or from the same organization but with a different function within that organization.

_In a publisher-subscriber scenario, the user of a Logistics Object is also referred to as `Requestor` or `Subscriber`._ <br/>
_In an access delegation scenario, the user of a Logistics Object is also referred to as the `Requestor` or `Delegate`._ <br/>
_In a PATCH scenario, the user of a Logistics Object is also referred to as the `Requestor`._

### **Logistics Object URI**

Every Logistics Object MUST have a globally unique identifier, a so-called Uniform Resource Identifier (URI). This Logistics Object URI MUST NOT be changed as it is the permanent identifier of a specific Logistics Object.

The actual generation of Logistics Object URIs and thus the design of a unique URI structure is left to each ONE Record API implementer as long as it complies with the valid Logistics Object URI. A valid Logistics Object URI MUST follow [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) and MUST look like:

```
{scheme}://{host}[:port]/[basePath]/logistics-objects/{logisticsObjectId}
```

The URI components are described below:

| URI Component | Description | Examples |
| ------------- | ----------- | -------- |
| scheme        | Transfer protocol used by the API | <ul><li>http</li><li>https</li></ul> |
| host          | Host name, domain name or IP address (and port) of the host that serves the ONE Record API | <ul><li>127.0.0.1:8080</li><li>1r.example.com</li><li>api.airline.com</li></ul> |
| basePath      | Optional URL prefix for all API paths, relative to the host root. The basePath is NOT mandatory. | <ul><li>/tenants/</li><li>/api/</li><li>/onerecord/</li><li>/rest/public/</li></ul> |
| logisticsObjectId | An identifier for the Logistics Object that is unique for this ONE Record server (and thus globally). This logisticsObjectId to identify the Logistics Object may be meaningful or obscure. A meaningful logisticsObjectId might include a reference to the type of the Logistics Object itself. An obscure logisticsObjectId could be a UUID. | <ul><li>e17502db-9b2d-46cc-a06c-efb24aeca49b</li><li>waybill-123-12345678</li></ul>   |

**Examples of valid Logistics Object URIs:**

```
https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c
https://api.airline.com/handling/onerecord/logistics-objects/waybill-123-12345678-1
https://onerecordcloud.com/organizations/airline/logistics-objects/6596bb81-f5a0-46d0-81be-c4d39531fc6a
https://api.airline.com/rest/public/onerecord/logistics-objects/6596bb81-f5a0-46d0-81be-c4d39531fc6a
```

### Organization URI

In ONE Record, each party in the Internet of Logistics, e.g., a shipper, airline, or public authorities like customs that acts as an owner or user of Logistics Objects, requires a globally unique identifier, a so-called `Organization URI`.
This MUST have a URI that points to a data object that inherits from [Organization](https://onerecord.iata.org/ns/cargo/3.0.0#Organization) which inherits from [LogisticsObject](https://onerecord.iata.org/ns/cargo/3.0.0#LogisticsObject). Therefore, the same URI structure as for Logistics Objects MUST be applied.

This data object can be a [Company](https://onerecord.iata.org/ns/cargo/3.0.0#Company), a [Carrier](https://onerecord.iata.org/ns/cargo/3.0.0#Carrier), or a [PublicAuthority](https://onerecord.iata.org/ns/cargo/3.0.0#PublicAuthority).
It MUST uniquely identifies an organization in its data exchanges with other organizations that use ONE Record.
As shown below, this Organization URI MAY share the same structure as a Logistics Object URI:

**Examples of valid Organization URIs:**

```
https://1r.example.com/logistics-objects/957e2622-9d31-493b-8b8f-3c805064dbda
https://1r.example.com/onerecord/logistics-objects/24a8a9f0-92c1-4405-8dfb-71875e8cde0a
https://1r.example.com/rest/public/onerecord/logistics-objects/24a8a9f0-92c1-4405-8dfb-71875e8cde0a
https://1r.platform.com/organizations/airline/logistics-objects/airline
```

## Plug & Play Connectivity

The implementation of ONE Record implies the implementation of Web APIs that comply with the ONE Record API and data model.
Consequently, any compliant ONE Record client/server can connect and exchange data with any other ONE Record client/server by simply accessing each other's endpoints via URIs.

## Linked Data

A central approach of ONE Record is to enable the creation of a comprehensive network of
data, i.e. data related to specific consignments and shipments are accessible as a
unique and single shipment record, i.e. "one record" in that network of linked data. To achieve this, the ONE Record data model is based on a ONE Record cargo industry ontology using the Resource Description Framework (RDF) format.

**Used Namespace Prefixes in ONE Record Context**

| Prefix | Namespace                    | Description         |
| ------ |  -------------------------- |  ------------------------------------- |
| cargo  | [https://onerecord.iata.org/ns/cargo/3.0.0](https://onerecord.iata.org/ns/cargo/3.0.0) | This refers to the ONE Record cargo ontology.          |
| api    | [https://onerecord.iata.org/ns/api/2.0.0-dev#](https://onerecord.iata.org/ns/api/2.0.0-dev#)     | This refers to the ONE Record API ontology.            |
| xsd    | [http://www.w3.org/2001/XMLSchema](http://www.w3.org/2001/XMLSchema) | W3C vocabulary, primarily used for primitive data types (e.g. string, dateTime) |
| acl    | [http://www.w3.org/ns/auth/acl](http://www.w3.org/ns/auth/acl) | Ontology for WebAccessControl with Access Control Lists (ACL)                   |

**JSON for Linking Data (JSON-LD)**

The ONE Record API specification defines `JSON for Linking Data (JSON-LD)` as the default RDF serialization. Other RDF serializations MAY also be used, because they are interchangeable, e.g. [Terse RDF Triple Language (TTL)](https://www.w3.org/TeamSubmission/turtle/).

To fully understand the syntax of RDF and JSON-LD, a deep dive into RDF is required. For the purpose of this document, it is sufficient to understand the example below that represents a Logistics Object of type `Sensor`

RDF and JSON-LD have different forms to format data that are all equivalent.
For example, JSON-LD defines different types of transformations that can be applied to structure the data output.
Therefore, the same `Sensor` object can be formatted as extended (see example 1) - where the URIs of the properties are explicit - or formatted as compressed (see example 2).

**Example 1:**

```json title="examples/Sensor.expanded.json"
{
  "@type": "https://onerecord.iata.org/ns/cargo/3.0.0#Sensor",
  "@id": "http://1r.example.com/logistics-objects/11ccfb7c-3643-41db-8098-740fccd97c93",
  "https://onerecord.iata.org/ns/cargo/3.0.0#sensorDescription": "A data logger with a temperature sensor.",
  "https://onerecord.iata.org/ns/cargo/3.0.0#sensorName": "TPx14-a",
  "https://onerecord.iata.org/ns/cargo/3.0.0#sensorSerialNumber": "142NL",
  "https://onerecord.iata.org/ns/cargo/3.0.0#sensorType": "Thermometer"
}
```

(see [examples/Sensor.expanded.json](examples/Sensor.expanded.json))

**Example 2:**

```json title="examples/Sensor.compacted.json"
{
  "@context": {
    "cargo": "https://onerecord.iata.org/ns/cargo/3.0.0#"
  },
  "@id": "http://1r.example.com/logistics-objects/11ccfb7c-3643-41db-8098-740fccd97c93",
  "@type": "cargo:Sensor",
  "cargo:sensorDescription": "A data logger with a temperature sensor.",
  "cargo:sensorName": "TPx14-a",
  "cargo:sensorSerialNumber": "142NL",
  "cargo:sensorType": "Thermometer"
}
```

(see [examples/Sensor.compacted.json](examples/Sensor.compacted.json))

There are more forms that are equal to the example above. Copy and paste the first example on the [JSON-LD Playground](https://json-ld.org/playground/) to see this different forms.

A full specification of the JSON-LD 1.1 standard can be found [here](https://www.w3.org/TR/json-ld11/)