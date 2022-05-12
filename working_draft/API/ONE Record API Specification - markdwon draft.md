# ONE Record API Specification
#### Version 1.1

Draft: not yet approved by the COTB / CSC.

## Introduction

#### Internet of Logistics

ONE Record specifies the API for logistics and transport data exchange over HTTP. This API specification is associated with the ONE Record data model that specifies the models and relationships within the transport and logistics data domain. This creates the foundation for a global industry data architecture that allows all participants in the logistics and transport process to exchange data necessary for the planning and execution of their activities. We refer to this global logistics and transport data exchange as the Internet of Logistics.

#### Plug & play API connectivity

The implementation of ONE Record implies the implementation of web servers that comply with the API and data model. Having done so, each of these ONE Record Servers can connect and exchange data with any other ONE Record Server simply by accessing eachothers endpoints via URIs.

#### Global network of data through "linked data"

The ONE Record data model is based on an industry ontology using the RDF format. Specifically, the ONE Record API specifies the use of JSON-LD as the RDF serialization. JSON-LD provides for Linked Data and allows the creation of a comprehensive network of data and that is the thinking behind ONE Record, i.e. data related to specific consignments and shipments are accessible as a unique and single record, i.e. "one record" in that network of linked data. 

Other RDF serializations may also be used since they are interchangeable. The ONE Record API specification also allows the Terse RDF Triple Language (TTL)

#### Logistics Objects

The ONE Record data model is organized as a set of data objects that represent realworld concepts in logistics and transport, also know as digital twins. These data objects are referred to as "Logistics Objects" in the world of ONE Record. The data exchange that is facilitated by the ONE Record API is mainly the exchange of Logistics Objects, often shorted to LO. This is a departure from the traditional logistics and transport EDI systems that only exchanged documents. The concept of Logistics Objects is far more extensive since Logistics Objects can be more granular and have very specific usage in different use cases within the logistics and transport domain. An example of a Logistics Object would be an IoT **Sensor** or an **Address** or a **BookingRequest** and [many more](https://onerecord.iata.org/cargo).

#### Main API features

The following features summarize all of the API features

**Create an LO** - Anyone can create a new Logistics Object based on the data model specification. Once created the LO is associated with a unique URI that becomes is API endpoint.

**Read a LO** - LO's can be retrieved by access the URI of that Logistics Object. Access rights to that URI is managed by the owner of that Logistics Object.

**Update a LO** - As a fundamental principle, *only* the owner of an Logistics Object can make changes to it. Therefore, changes required by other parties are expressed as change request that will be executed by the actual owner.

**Subcribe to a LO for updates** - Once an Logistics Object has been created, the owner can propose subscriptions to other parties who will then be notified of any changes. Other parties may also request such a subscription at the discretion of the owner.

**Associate an event to a LO** - Events like "arrival", "acceptance" etc. are central in the management of logistics and transports. Any type of event may be associated with any type of logistics objects. The series of events associated with an Logistics Object may be queried as well.

**Manage access to a LO** - Another fundamental principle is that owners of Logistics Objects fully control access rights to that Logistics Object. This also extends to *how* access is implemented. Even so, the API specification includes a proposal for implementation as one of the options.

**Delegate access to a LO to a third party** - By default, most Logistics Objects are not openly accessible. Most of the time, access is  granted to specific parties. Should these parties need to delegate access to their own stakeholders, then there is a mechanism for requesting such access to the owner of the Logistics Object.

**Manage and access versions of LOs** - Whenever an Logistics Object is updated with some change in the data of any element, that change is recorded in an audit trail. This automatically creates a new version of the Logistics  Object. Any version of that may be found and retrieved.

**API security** - Although not strictly an API feature, ONE Record specifies security measures for implementation on web servers such that access to the server may be identified, authenticated and authorized.

#### Note: implicit API endpoints

Many API's specify endpoints for specific API actions. In ONE Record, these endpoints are not explicitely defined. As mentioned, each Logistics Object has a unique URI and that URI is also the endpoint for that Logistics Object for all API actions. As long as a party has a URI for a Logistics Object that they need, then they can access all aspects of that Logistics Object, i.e. it's data, the possibility of requesting changes, associating events, browsing version history etc directly on that Logistics Object URI.

As such, the *only* endpoint that needs to be known of a ONE Record compatible server is an endpoint where new Logistics Objects may be sent. This would act like a generic "mailbox" where new Logistics Object are received. In subsequent exchanges, URI's will be exchanged as required.

This may seem odd at first but it is entirely compatible with RDF technologies where data is accessed via queries and by following  links within the data itself. The main entry point for such servers is trivial.

## Index

[TOC]



## Definitions

| **Term<div></div> **        | **Description**                                              |      |
| --------------------------- | ------------------------------------------------------------ | ---- |
| COTB                        | Cargo Operations & Technology Board (COTB) reports to the Cargo Services Conference (CSC) at the International Air Transport Association. The COTB has authority over the ONE Record specifications. COTB decisions are formally endorsed by the CSC. |      |
| ONE Record Server           | A ONE Record Server is a web server that implemenst the ONE Record API and some or all of the data model specifications. Technically, it is just a HTTP web server.  The ONE Record API and data model specifications may be added to existing servers that also provide other services. |      |
| Logistics Object LO         | Logistics Object is a data object that represents a real world object in transport & logiscs, also referred to as a digital twin. In the data model this is represented by a generic class "Logistics Objects" and each digital twin inherits from this Logistics Objects class. |      |
| Owner of a Logistics Object | - The Owner of a Logistics Object is the party that has created it and has control over it. <br /><br />The Owner may also control the server on which the Logistics Object is accessible via HTTP but this is not a requirement. Instead, the Owner may use a third party that implements the HTTP service and will provide suitable access to the Owner to manage and control the Logistics Object, include it's creation, any changes, authoprization and access rights and more. |      |
| User of a Logistics  Object | A User of a Logistics Object is anyone other than the Owner and who has access to the Logistics Object. Most likely the User will have a role in the logistics & transport of the consignment. The User may be external, from another company than the Owner, or internal from the same company but with a different function within that company. |      |
|                             |                                                              |      |
|                             |                                                              |      |

Namespaces used in this document

| Prefix | Namespace<div></div><div></div>          | Description                                                  |
| ------ | ---------------------------------------- | ------------------------------------------------------------ |
| cargo  | https://onerecord.iata.org/              | This refers to the IATA ONE Record cargo ontology. Refer also to the ONE Record [Developer Portal](https://onerecord.iata.org/) |
| api    | https://onerecord.iata.org/api/          | This refers to the IATA ONE Record API ontology. Refer also to the ONE Record [Developer Portal](https://onerecord.iata.org/) |
| w3c    | http://www.w3.org/2001/XMLSchema         | W3C primitive data types (primarily String and DateTime)     |
| host   | https://{Server Domain}/{license plate}/ | prefix that represents a ONE Record server in the examples below. In these examples, this corresponds to the Company Identifier: |



## ONE Record API Versioning

The versioning for the ONE Record API is done through **route versioning**:

The version is incremented when API specifications are endorsed by the IATA Cargo Operations Technology Board

First version of the standard (Aug 2020) - Endorsed version in Mar2020 = 1.0

If no version is specified, the latest should be returned and bind to a specific version of the API

When a version is obsolete or not supported anymore, the client should be redirected to the latest API version, through the **Location** header and 302 HTTP redirection status.

<!--- is route versioning still the preferred choice? Is it actually being implemented? -->

### Logistics Object Identifier

Every Logistics Object is identified by a **Logistics Objects ID**. A Logistics Object ID (LOID) can be any URL that is unique. 

An example of a LOID could be for example:

https://{Server Domain}/{license plate}/{unique id to identify Logistics Objects }

| Identifier                   | URI structure                                                |
| ---------------------------- | ------------------------------------------------------------ |
| Logistics Objects Identifier | http://{Server Domain}/{license plate}/{unique id to identify Logistics Objects } |

 The URI fields are defined below:

| **Field**<div></div>         | **Description**                                              |
| ---------------------------- | ------------------------------------------------------------ |
| **Server Domain**            | The domain name  associated with the ONE Record Server e.g. onerecordcargo.org |
| **License plate**            | The company  identifier for this ONE Record Server, e.g. my-airline |
| **Unique ID to identify LO** | An identifier for  the Logistics Object that is unique for this server (and thus extension globally).  <br /><br />The ID to identify the Logistics Object may be meaningful or obscure. A meaningful ID might include a reference to  the LO itself. For example “waybill_123-12345678”. An obscure ID could include  a UUID like: 6596bb81-f5a0-46d0-81be-c4d39531fc6a  <br /><br />So examples of valid  LOIDs are:   <br />https://airlinexyz.org/xyz/waybill_123-12345678  <br />https://airlinexyz.org/xyz/6596bb81-f5a0-46d0-81be-c4d39531fc6a  <br /><br />The LOID should be  URL friendly, i.e. avoid unsafe characters that include the blank/empty  spaces and " < > # % { } \| \ ^ ~ [ ] `. |



### Company Identifier

The ONE Record Company Identifier is a URI that uniquely identifies a company in its exchanges with other companies that uses ONE Record servers. As shown below, this Company Identifider URI shares the same base as a Logistics Object Identifier (LOID)

| Identifier         | URI structure                             |
| ------------------ | ----------------------------------------- |
| Company Identifier | http:// {Server Domain} / {license plate} |

 For clarity, the URI fields of the Company Identifier are shown below.

| **Field**         | **Description**                                        |
| ----------------- | ------------------------------------------------------ |
| **Server Domain** | The domain name  associated with the ONE Record Server |
| **License plate** | The company  identifier for this ONE Record Server     |

An example of a valid company identifier is shown below.

```
https://www.myhost.com/myairline
```

## ONE Record data model

The ONE Record data model is specified as an ontology which is also referred to as a semantic model. For clarity:

<!--- include a diagram -->

### 

| ONE Record:<div></div> | **Description**                                              |
| ---------------------- | ------------------------------------------------------------ |
| Ontology               | An ontology that defines the representation, formal naming, and definition of the categories, properties, and relations between the concepts, data, and entities in the air transport domain. |
| Semantic Data Model    | A semantic data model, like the ontology, defines the naming, relationships between concepts etc but for the purpose of implementation in a data model |
| Data Model             | A data model is that which is implemented in a computer system. In this context it is derived from the semantic data model which in turn is derived from the ontology. |
| JSON-LD                | JSON-LD is an RDF Linked Data format that is an implementation of elements of the Data Model, i.e. the ontology. With ONE Record, the JSON-LD documents are automatically generated from the ontology. |
| json data exchange     | In practice, ONE Record servers exchange JSON-LD documents and the users of these documents do not need an explicit undertstanding of ontologies or semantic data models. These are 'just' json files. To understand the meaning of these json files, the analyst or user does need to study the ONE Record data model, which is specified as an ontology. |

For reference, the ontology is maintained in [GitHub](https://github.com/IATA-Cargo/ONE-Record)

An online documentation based on the ontology is on the [ONE Record Developer Portal](https://onerecord.iata.org/) (under tools)

##### JSON-LD format

JSON-LD is one of the RDF serializations and to fully understand its syntax, requires a deep dive into RDF. For the purpose of this document, it is enough to understand the example below. This is a JSON-LD file that specifies a Sensor LO. A few points to note:

- In a JSON-LD file, every data elements has a full URI associated with each data element
- A JSON-LD file can include an @context that namespaces, vocabularies and more that facilitate the remainder of the data elements. In this context, there is a specification of two ontologies: the ONE Record data model (cargo) and the ONE Record API data model (api). 
- A JSON-LD file can also include an @type that specifies the type of the data object, i.e. the ONE Record Logistics Object class (Sensor here).

```json
{
  "@context": {
    "cargo": "https://onerecord.iata.org/",
    "api": "https://onerecord.iata.org/api/"
  },
  "@type": "cargo:Sensor",
  "api:Sensor#sensorDescription": "temperature-tracker",
  "api:Sensor#sensorName":"TPx14-a",
  "api:Sensor#sensorSerialNumber": "142NL",
  "api:Sensor#sensorType": "Temperature"
}
```

RDF (and JSON-LD) has different forms that are all equivalent. The same object can be formatted as below where the uri's are explicit. This is less readable but often the server responses will be explicit like this.

```json
{
  "@type": "https://onerecord.iata.org/Sensor",
  "https://onerecord.iata.org/api/Sensor#sensorDescription": "temperature-tracker",
  "https://onerecord.iata.org/api/Sensor#sensorName": "TPx14-a",
  "https://onerecord.iata.org/api/Sensor#sensorSerialNumber": "142NL",
  "https://onerecord.iata.org/api/Sensor#sensorType": "Temperature"
}
```

There are more forms that are equal to the example above. Copy and paste the first example on the [jsonld playground](https://json-ld.org/playground/) to see this different forms.

## Create a Logistics Object

This API action creates a Logistics Object as a new HTTP resource on a ONE Record server using the POST method. This can be any type of Logistics Object that is specified in the ONE Record data model. A list is found [here](https://onerecord.iata.org/cargo#LogisticsObject).

Although the creation of a Logistics Object is the API action specified here, technically it falls outside the specification of ONE Record. The reason is that *only the data owner of the Logistics Object* is allowed to create this Logistics Object and they may use any process or technology of their choosing. The only thing that matters is that the Logistics Object gets created with a LOID and available on a server with a dedicated URI. 

This Create a Logistic Object action is included for reference since in many cases, the use of HTTP POST will be used.

As for all API interactions, the user must be authenticated and have the access rights to perform this action.

#### HTTP Request

HTTP Request type: **POST**

#### HTTP Request Header

The following HTTP header parameters MUST be present in the POST request:



| **Header**       | **Description**                                              |
| ---------------- | ------------------------------------------------------------ |
| **Accept**       | The content  type that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |
| **Content-Type** | The  content type that is contained with the HTTP body. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

<!--- do we want to retain the TTL mime type in the specifation for make it optional? -->

#### HTTP Request Body

The HTTP body must contain a valid LO in the format as specified by the Content-Type in the header. 

#### Http Response Header

The following HTTP headers parameters must be present in the POST response:

| **Header**   | **Description**                                 |
| ------------ | ----------------------------------------------- |
| **Location** | The URI of the newly created Logistics  Object  |
| **LO-Type**  | The type of the newly created Logistics  Object |

#### HTTP Response codes

| **Code** | **Description**                                              | **Response body** |
| -------- | ------------------------------------------------------------ | ----------------- |
| **201**  | Logistics Object has been created                            | No body  required |
| **400**  | Invalid  Logistics Object                                    | Error model       |
| **401**  | Not authenticated                                            | Error model       |
| **403**  | Not authorized  to publish the Logistics Object to the server | Error model       |
| **415**  | Unsupported  Content Type                                    | Error model       |

#### Example of a Logistics Object creation

```
Request header:
POST mycompany HTTP/1.1
Host: wwww.myhost.com

Content-Type: application/ld+json
Accept: application/ld+json

Request body:
{
  "@context": {
    "cargo": "https://onerecord.iata.org/",
    "api": "https://onerecord.iata.org/api/"
  },
  "@type": "cargo:Sensor",
  "api:Sensor#sensorDescription": "temperature-tracker",
  "api:Sensor#sensorName":"TPx14-a",
  "api:Sensor#sensorSerialNumber": "142NL",
  "api:Sensor#sensorType": "Temperature"
}

Response header:
201 Created
Location: http://wwww.myhost.com/mycompany/Sensor_715823
Content-Type: application/ld+json
LO-type: https://onerecord.iata.org/Sensor
```



## Read Logistics Object (GET)

Each Logistics Object is accessed via its URI using the HTTP Get method. If the requester is authorized to access this Logistics Object then the response body will include that Logistics Object. 

It is possible that the Logistics Object requested contains URI links to other Logistics Object for some of the data elements, rather than explicitly include that data. In this case the requester can read those URI's if they are authorized to do so. This gives the owner of the Logistics Object the possibility to manage access even within the Logistics Object and only return relevant and authorized data.

#### Http Request

HTTP Request type: **GET**

The request URL should contain the Logistics Objects ID to be retrieved.

#### HTTP Headers

The following HTTP header parameters MUST be present in the GET request:

| **Header** | **Description**                                              |
| ---------- | ------------------------------------------------------------ |
| **Accept** | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

<!--- do we want to retain the TTL mime type in the specifation for make it optional? --> 

### Response

A positive HTTP 200 response is expected to a GET request. The body of the response includes the Logistics Object in the format that has been requested in the Accept header of the request.

GET request could also return a Link Header with the location of the Access Control List (see [Access Control List Resources](#_Access_Control_List)). If the Logistics Object does not have an individual ACL (and therefore relies on an implicit ACL from a parent), this link header will still be present, but will return a 404. Returning this header is not mandatory.

**Link: <**http://my-server/my-airline/logistics-object**/acl>; rel="acl"**

<!--- why return this if the acl API signature is always xxx/acl ? --> 

GET request could also return a Link Header with the location of the TimeMap for the Logistics Object (see [Versioning](#_Versioning). Returning this header is not mandatory.

**Link: <**http://my-server/my-airline/logistics-object**/timemap>; rel="timemap"**

<!--- why return this if the timemap API signature is always xxx/timemap ? --> 

GET request should also return a Latest-Revision Header containing the latest revision of the Logistics Object. Returning this header is mandatory.

**Latest-Revision: 3**

| **Code** | **Description**                                              | **Response body** |
| -------- | ------------------------------------------------------------ | ----------------- |
| **200**  | The request to  retrieve the Logistics Object has been successful | Logistics  Object |
| **401**  | Not  authenticated                                           | Error model       |
| **403**  | Not authorized  to retrieve the Logistics Object             | Error model       |
| **404**  | Logistics  Object not found                                  | Error model       |

#### Example retrieval of a Logistics Object 

```

Request header:
GET /mycompany/Sensor_715823 HTTP/1.1
Host: wwww.myhost.com
Content-Type: application/ld+json
Accept: application/ld+json

Response body:
{
    "@id": "http://localhost:8080/companies/test/los/Sensor_715823",
    "@type": [
        "https://onerecord.iata.org/Sensor",
        "https://onerecord.iata.org/LogisticsObject"
    ],
    "https://onerecord.iata.org/api/Sensor#sensorSerialNumber": "142NL",
    "https://onerecord.iata.org/api/Sensor#sensorType": "Temperature",
    "https://onerecord.iata.org/api/Sensor#sensorDescription": "temperature-tracker",
    "https://onerecord.iata.org/api/Sensor#sensorName": "TPx14-a"
}

Response header:
200 OK
Link: http://wwww.myhost.com/mycompany/Sensor_715823/acl ;rel="acl"
Link: http://wwww.myhost.com/mycompany/Sensor_7158233/timemap ;rel="timemap"
Revision-Header: d94763ef-f119-4eb0-ae66-4eb09a2d717b
Content-Type: application/ld+json
Location: http://wwww.myhost.com/mycompany/Sensor_715823
LO-type: https://onerecord.iata.org/Sensor
```



## Update Logistics Object (PATCH)

To update a data element in a Logistics Object, the HTTP PATCH method is used.  As per W3C HTTP standard, PATCH is used for partial changes to a resource. This differs from the HTTP PUT method that is used for the complete replacement of a resource.

In ONE Record, only the owner of the Logistics Object can make changes. However, users of the Logistics Object can make change requests to the owner, following a presecribed syntay that is described in this section.

One challenge with making changes to a Logistics Object is that the changes need to be approvable by the owner of the Logistics Object and the changes need to be traceable.

### Linked Data PATCH Format

Although in the specification of the ONE Record API there is not much focus on the context and use of [RDF](https://www.iata.org/contentassets/a1b5532e38bf4d6284c4bf4760646d4e/one_record_tech_insight_the_power_of_ontologies.pdf), it is important that the specification of RDF is fully respected to ensure that ONE Record remains compatible with RDF technologies, such as the use of graph queries. 

W3C has developed the [Linked Data PATCH Format](https://www.w3.org/TR/ldpatch/), a format for describing changes to apply to Linked Data. It defines a list of operations to be performed against a Linked Data resource, namely the addition or removal of RDF triples in a graph representing the resource. 

This Linked Data PATCH Format provides many options for updating RDF but since ONE Record uses JSON-LD as the RDF Serialization, the ONE Record API specification follows the  [JSON-LD PATCH](https://github.com/digibib/ls.ext/wiki/JSON-LD-PATCH) specification and limits the options for changing Logistics Objects to two actions only: delete and add. 

The combination of delete and add equates to replace. So effectively, any data element in a Logistics Object can be **deleted**, **added** or **replaced**.

### PATCH in ONE Record

Some rules and recommendations related to updating Logistics Objects:

- Only owner of a Logistics Object can make the change to the data.
- A user of the Logistics Object can request a change on the Logistics Object.
- The owner will make the Logistics Object changes unless there is a business or technical reason to reject it.
- Evaluation of a PATCH document occurs as a single (atomic) event. Operations are sorted and processed as groups of delete and then add operations until the operations are applied, or else the entire PATCH fails. 
- If the PATCH is succesful, the Revision Number is incremented and the change is logged in the Audit Trail. Please refer to the sections on Versioning and Audit Trail for more details.
- As a best practice, a GET Logistics object should be performed before requesting a PATCH in order to make sure that the change is made towards the latest version of the object.
- If a change request is rejected, the revision number of the Logistics Object is not incremented but the requests is added to the audit trail of this Logistics Object.

### Request

HTTP Request type: **PATCH**

The request URL should contain the Logistics Objects ID to be updated.

#### HTTP Request Header

The following HTTP header parameters must be present in the PATCH request:

| **Header**       | **Description**                                              |
| ---------------- | ------------------------------------------------------------ |
| **Accept**       | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |
| **Content-Type** | The content type  that is contained with the HTTP body. Valid content types include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

#### HTTP Request Body

The HTTP body MUST be a valid array of objects; each object represents a single operation to be applied to a target linked data resource. The format should be as specified by the Content-Type in the header. The following is an example of supported PATCH request body:

The PatchRequest is a class in the API Ontology. This defines the data that needs to be included in the request body:

PatchRequest body is defined below. Please also refer to the example below for more clarity

| <u>PatchRequest</u>            | Description                                                  | Required | Class                  |
| ------------------------------ | ------------------------------------------------------------ | -------- | ---------------------- |
| **description**                | Reason for the change                                        | n        | w3c:String             |
| **logisticsObjectRef**         | Logistics Object referred to                                 | y        | api:LogisticsObjectRef |
| - logisticsObjectId            | LOID of the Logistics Object being changed                   | y        | w3c:String             |
| - logisticsObjectType          | Type (class) of the Logistics Object being changed           | y        | w3c:String             |
| **operations**                 | to be performed on this Logistics Object                     | y        | api:Operation          |
| - o                            | the "object" that is being changed                           | y        | w3c:String             |
| - op                           | the operation required, i.e. "del" or "add                   | y        | w3c:String             |
| - p                            | predicate" refers to the type of the element being changed   | y        | w3c:String             |
| **requestorCompanyIdentifier** | the company identifier of the entity that is requesting the change request | y        | w3c:String             |
| **revision**                   | Revision number of the Logistics Object (incremented from the previous number) | n        | w3c:String             |

#### HTTP Response Body

The response body has no content.

#### HTTP Response code

| **Code** | **Description**                                              | **Response body** |
| -------- | ------------------------------------------------------------ | ----------------- |
| **204**  | The update has  been successful                              | No body  required |
| **400**  | The update  request body is invalid                          | Error model       |
| **401**  | Not  authenticated                                           | Error model       |
| **403**  | Not authorized  to update the Logistics Object               | Error model       |
| **404**  | Logistics  Object not found                                  | Error model       |
| **415**  | Unsupported  Content Type, response when the client sends a PATCH document format that the server does not support for the resource  identified by the Request-URI. | Error model       |
| **422**  | Unprocessable  request, when the server understands the PATCH document and the syntax of the PATCH document appears to be valid, but the server is incapable of  processing the request. | Error model       |

 

#### Example PATCH of a Logistics Object 

In the example below, the "total piece and ULD count" is updated from 10 to 11 and a date is added to a Waybill. The process is as follows:

1) Delete the value 10 from the "totalPieceAndULDCount" from the Waybill object
2) Add the value 11 to the "totalPieceAndULDCount"
3) Add a date "2022-03-21".

In the "@context" the namespace prefixes for cargo and api ontologies are referenced and this allows for the shortened URI's in the body of this PatchRequest.  

This also points at the ontologies themselves that define all of the classes and object & data properties used in this change request.

```
Request header:
PATCH /mycompany/Sensor_715823 HTTP/1.1
Host: http://wwww.myhost.com
Content-Type: application/ld+json
Accept: application/ld+json

Request body:
{
    "@type": "api:PatchRequest",
    "@context": {
        "cargo": "https://onerecord.iata.org/",
        "api": "https://onerecord.iata.org/api/",
        "host": "http://wwww.myhost.com/"
    },
    "api:PatchRequest#description": "Change sensor type",
    "api:PatchRequest#logisticsObjectRef": [
        {
            "@type": "api:LogisticsObjectRef",
            "api:LogisticsObjectRef#logisticsObjectId": "host:Sensor_715823",
            "api:LogisticsObjectRef#logisticsObjectType": "cargo:Sensor"
        }
    ],
    "api:PatchRequest#operations": [
        {
            "@type": "api:Operation",
            "api:Operation#o": [
                {
                    "@type": "api:OperationObject",
                    "api:OperationObject#datatype": "https://www.w3.org/2001/XMLSchema#string",
                    "api:OperationObject#value": "142NL"
                }
            ],
            "api:Operation#op": "del",
            "api:Operation#p": "cargo:Sensor#sensorSerialNumber"
        },
        {
            "@type": "api:Operation",
            "api:Operation#o": [
                {
                    "@type": "api:OperationObject",
                    "api:OperationObject#datatype": "https://www.w3.org/2001/XMLSchema#string",
                    "api:OperationObject#value": "231NL"
                }
            ],
            "api:Operation#op": "add",
            "api:Operation#p": "cargo:Sensor#sensorSerialNumber"
        }
    ],
    "api:PatchRequest#requestorCompanyIdentifier": "myCompany",
    "api:PatchRequest#revision": "1"
}
 

Response header:
204 (No Content)
Content-Type: application/ld+json
```

## Audit trail of Logistics Object

Every time a Logistics Object is changed through a PatchRequest, as described in the previous section, the details of this request are added to an audit trail. When a PatchRequest is processed by the Logistics Object owner, this is referred to as a Change Request. 

The class ChangeRequest includes the full PatchRequest as well as details about the success or failure of this request, the date and time, any errors that may have occured as well as an initial Memento (which is described later in this specification. 

Note that the Logistics Object owner is responsible for adding Change Requests (following Patch Requests by Logistics Object user). 

Logistics Object users can only request to retrieve the Audit Trail. The user can specifify a date-time window.

#### HTTP Request

HTTP Request type: **GET**

A Logistics Object audit trail can be retrieved by performing a GET request to the URI appended by: "/audit-trail"

In order to retrieve the history of a Logistics Object between two dates, a query parameter should be added to the request URL as follows: "?updated-from=YYYYMMDDThhmmssZ&updated-to=YYYYMMDDThhmmssZ" 

#### HTTP Request Header

The following HTTP header parameters MUST be present in the PATCH request:

| **Header**       | **Description**                                              |
| ---------------- | ------------------------------------------------------------ |
| **Accept**       | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |
| **Content-Type** | The content type  that is contained with the HTTP body. Valid content types include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

#### HTTP Response Body

The response body follows the API AuditTrail class structure.

| <div><u>AuditTrail</u></div> | Description                                                  | Required | Class                  |
| ---------------------------- | ------------------------------------------------------------ | -------- | ---------------------- |
| **changeRequests**           | List of change requests that were sent as PATCH on for a Logistics Object | y        | api:ChangeRequest      |
| - companyId                  | Company that made the patch request                          | y        | w3c:String             |
| - patchRequest               | PATCH body of a change request sent for a specific Logistics Object (described in the previous section) | y        | api:PatchRequest       |
| - requestingParty            | The party that has requested the change request, i.e. the person or department within the company | y        | cargo:CompanyBranch    |
| - status                     | ACCEPTED or REJECTED                                         | y        | Enumeration            |
| - timestamp                  | Timestamp of the change request                              | y        | w3c:DateTime           |
| **errors**                   | Mandatory only if patchRequest was rejected. Otherwise Optional | y/n      | api:Error              |
| - details                    | error details                                                | n        | api:Details            |
| -- attribute                 | Field of the object for which the error applies              | n        | vw3c:String            |
| -- code                      | Error code                                                   | y        | w3c:String             |
| -- message                   | Detailed error message                                       | n        | w3c:String             |
| -- resource                  | Object for which the error applies                           | n        | w3c:String             |
| - title                      | Brief description of the error                               | y        | w3c:String             |
| **loInitialSnapshot**        | Initial content of the Logistics Object at the creation moment, represented via a Memento | y        | api:LoInitialSnapshot  |
| - created                    | Date and time of the memento creation                        | Y        | w3c:String             |
| - createdBy                  | Name of the memento creator                                  | Y        | w3c:String             |
| - label                      | Label describing the memento                                 | n        | w3c:String             |
| - original                   | First version of the Logistics Object                        | y        | w3c:String             |
| **logisticsObjectRef**       | Logistics Object referred to                                 | y        | api:LogisticsObjectRef |
| - logisticsObjectId          | LOID of the Logistics Object being changed                   | y        | w3c:String             |
| - logisticsObjectType        | Type (class) of the Logistics Object being changed           | y        | w3c:String             |

#### Example Audit Trail response for a Logistics Object 

The example below shows an audit trail response body. For claity the main elements of the changeRequest object are collapsed.

Examples for the a changeRequest itself is shown below this AuditTrail example

```
Request header:
GET /mycompany/Sensor_715823/audit-trail?updated-from=20200905T000000Z&updated-to=20200909T000000Z HTTP/1.1
Host: http://wwww.myhost.com
Content-Type: application/ld+json
Accept: application/ld+json

Response body
{
  "@type": "api:AuditTrail",
  "@context": {
    "cargo": "https://onerecord.iata.org/cargo/",
    "api": "https://onerecord.iata.org/api/",
    "host": "http://myhost/"
  },
  "api:AuditTrail#latestRevision": "2",
  "api:AuditTrail#changeRequests": [
    {
      "@type": "api:ChangeRequest",
      "api:ChangeRequest#patchRequest": {...this contains a complete PatchRequest...},
      "api:ChangeRequest#companyId": "myCompany",
      "api:ChangeRequest#status": "ACCEPTED",
      "api:ChangeRequest#timestamp": "2020-09-07T11:55:45.768Z",
      "api:AuditTrail#loInitialSnapshot": {...this contains memento details (described in this doc...},
      "api:AuditTrail#errors": [...this contains errors that may have occured in the change request...],
      "api:AuditTrail#logisticsObjectRef": {...}
    },
    {
      "@type": "api:ChangeRequest",
      "api:ChangeRequest#patchRequest": {...this contains a complete PatchRequest...},
      "api:ChangeRequest#companyId": "myCompany",
      "api:ChangeRequest#status": "ACCEPTED",
      "api:ChangeRequest#timestamp": "2020-09-06T05:33:12.123Z",
      "api:AuditTrail#loInitialSnapshot": {...this contains memento details (described in this doc...},
      "api:AuditTrail#errors": [...this contains errors that may have occured in the change request...],
      "api:AuditTrail#logisticsObjectRef": {...}
    }  ]
}

Response header:
200 (OK)
Content-Type: application/ld+json
```

An example of a **api:AuditTrail#patchRequest** is shown in the previous section (Patch Request)

Example of an **api:AuditTrail#loInitialSnapshot** (of type Memento)

```
"api:AuditTrail#loInitialSnapshot": {
  "@type": "api:Memento",
  "api:Memento#created": "2021-03-03T17:12:01.913Z",
  "api:Memento#createdBy": "Andrew Cythe, Operations Manager, ZXZ Forwarding, Boston MA",
  "api:Memento#label": "Added a new tracking device to the shipment",
  "api:Memento#original": "host:mycompany/Sensor_715823"
},
```

An example of a **api:AuditTrail#logisticsObjectRef** (of type logisticsObjectRef)

```
"api:AuditTrail#logisticsObjectRef": {
  "@type": "api:LogisticsObjectRef",
  "api:LogisticsObjectRef#logisticsObjectId": "http://wwww.myhost.com/Sensor_715823",
  "api:LogisticsObjectRef#logisticsObjectType": "cargo:Sensor#sensorType"
}
```

An example of an **api:AuditTrail#errors** element (of type Error) is shown in the next section

## Error model

This section describes the datatype definitions used within the ONE Record API for error handling.

#### Response HTTP Status Codes

The API response will includes standard HTTP Status Codes in it's reponse.

#### Response Body

The error response should contain the following fields:

| **Error**<div></div> | **Description**                                              | **Required** | Class       |
| -------------------- | ------------------------------------------------------------ | ------------ | ----------- |
| **title**            | a short summary of the problem                               | y            | w3c:String  |
| **details**          | details of the error                                         | n            | api:Details |
| - code               | a ONE Record application-specific  error code expressed as a string value. | n            | w3c:String  |
| - attribute          | data element to which the error applies                      | n            | w3c:String  |
| - resource           | URI of the object concerned                                  | n            | w3c:Strin   |
| - message            | Explanation specific to this problem                         | n            | w3c:String  |

#### Example error response body

Since errors are always part of another response object, below is an example of an **api:AuditTrail#errors** element (of type Error). Note that is a list and there may be multiple errors reports.

```
"api:AuditTrail#errors": [
  {
    "@type":"api:Error",
    "api:Error#title": "Unknown sensor type",
    "api:Error#details": [
      {
        "@type":"api:Details",
        "api:Details#attribute": "cargo:Sensor#sensorType",
        "api:Details#code": "Invalid Device Type",
        "api:Details#message": "Sensor type 'ionization coil' is not a known option. ",
        "api:Details#resource": "http://wwww.myhost.com/Sensor_715823"
      }
    ]
  }
]
```

 

# Publish & Subscribe with ONE Record

ONE Record proposes a Publish & Subscribe pattern to allow for a distributed network of ONE Record compliant platforms. 

This chapter describes the Publish & Subscribe model, its implementation and the requirements of a Client Subscription API which a company must implement to receive Logistics Objects from ONE Record Servers through subscriptions.

![img](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image001.png)

## Publish & Subscribe model

### Publish/subscribe topics and guaranteed delivery queue

Data is exchanged between applications using a notion of topics and delivery queues. While in transit, data is kept in message queues that ensure integrity and availability of the system. Should a subscribing application go down, messages are safely retained until the recipient is ready to read them again.

For each subscriber and each topic, a message queue is maintained automatically by the publisher to keep data in until the subscriber confirms it has received a particular object.

Two scenarios were identified for initiating the publish/subscribe process. For simplicity reasons, the security part was not detailed in the following diagrams.

### Scenario 1 – Publisher/Subscriber initiated by the Publisher

In the first and most usual use case, the subscription process is initiated by the publisher.

The following steps describe how publish and subscribe is proposed to be implemented in the ONE Record Internet of Logistics (**webhook model with dynamic subscription**):

#### **Step 1 - Publish a Logistics Object**

The publish action occurs when a Logistics Object is created on a ONE Record Server. At this stage the Logistics Object is accessible via the Server API to authorized companies.

#### **Step 2 - Retrieve Subscription information from companies that you want to give access to**

The second step is retrieving the subscription information from the companies you want to give access to this Logistics Object. To achieve this, the company publishing the Logistics Object must check with each of the companies it wants to give access to, whether they subscribe to these types of Logistics Objects. If they do, they provide the details of the endpoint where the Logistics Objects should be pushed to. 

The prerequisite to this is that the companies must know each other through a previous exchanged Company Identifier so that the machines can ask this question during operation. These Company Identifiers may also be retrieved from common or local directories.

#### **Step 3 - Push to the company’s ONE Record Clients**

Once the subscription information is received the publisher would push the Logistics Object to the intended ONE Record Client using the details provided. If Client Subscription API (server) was not available at the time, then the publisher would need to queue and retry to publish the Logistics Object over a certain time.

**Note**: In Publish & Subscribe, publishing parties need to save a list of all the parties subscribed to their Logistics Objects in their backend systems. One of the possibilities would be that the list of subscribers is embedded in the body of the Logistics Object.

![A screenshot of a cell phone  Description automatically generated](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image002.png)

 

Publish & Subscribe Sequence Diagram – Scenario 1

### Scenario 2 – Publisher/Subscriber initiated by the Subscriber

In the second scenario, the subscriber initiates the subscription process by pulling the publisher in order to verify if there are any logistics objects/updates of a given topic to which it can subscribe to.

![A picture containing screenshot  Description automatically generated](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image003.png)

Publish & Subscribe Sequence Diagram – Scenario 2

## Retrieve Company Information

Retrieves company information about ONE Record capabilities, including details about the company and the logistics objects types it supports and the data formats it can use.

#### Request

HTTP Request type: **GET**

#### HTTP Headers

The following HTTP header parameters MUST be present in the GET company information request:

| **Header** | **Value**                                                    |
| ---------- | ------------------------------------------------------------ |
| **Accept** | The content  type that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

#### Response Body

The Response Body includes the following data elements.

| Company Identifier           | Description                                             | Required |                              |
| ---------------------------- | ------------------------------------------------------- | -------- | ---------------------------- |
| **company**                  | company details                                         | y        | cargo:Company                |
| **companyId**                | company ID, for example airline code                    | y        | w3c:String                   |
| **errors**                   | errors related to this request (other than HTTP errors) |          | api:Error                    |
| **serverEndpoint**           | URI of the company identifier                           | y        | w3c:URI                      |
| **supportedContentTypes**    | HTTP content types supported by this server             | y        | w3c:String (list)            |
| **supportedLogisticsObject** | logistics object types supported by this server         | y        | cargo:LogisticsObject (list) |

#### Example of retrieving Company Identifier 

```
Request header:
GET /airlinexyz
Host: http://wwww.myhost.com
Content-Type: application/ld+json
Accept: application/ld+json

{
  "@id": "host:airlinexyz",
  "@type": "api:CompanyInformation",
  "@context": {
    "cargo": "https://onerecord.iata.org/cargo/",
    "api": "https://onerecord.iata.org/api/",
    "host": "http://myhost/"
  },
  "api:CompanyInformation#company": {...company object...}
  "api:CompanyInformation#companyId": "host:airlinexyz",
  "api:CompanyInformation#errors": [...any non-HTTP errors associated with this request...],
  "api:CompanyInformation#serverEndpoint": "host",
  "api:CompanyInformation#supportedContentTypes": [
  	"application/ld+json"
  	],
  "api:CompanyInformation#supportedLogisticsObjects": [
    "cargo:WayBill"
    "cargo:Booking", 
    "cargo:BookingOption",
    "cargo:BookingOptionRequest",
    "cargo:Schedule", 
    "cargo:Request", 
    "cargo:Product", 
    "cargo:Piece", 
    "cargo:Price", 
    "cargo:Product",
    "cargo:Ranges",
    "cargo:Ratings",
    "cargo:Request",
    "cargo:Routing",
  ]
}

Response header:
200 (OK)
Content-Type: application/ld+json
```

## Publisher proposes a subscription 

When the ownerm, the "publisher", of a Logistics Objects wants to actively share this with a user, the ""subscriber", they can request the user to provide subscription data. To do so, the  publisher does a GET to the Company Identifier URI of the user with the proposed topic by appending the request URI with "/topic={Logistics Object type}"

#### Http Request

HTTP Request type: GET 

#### HTTP Request Headers

The following HTTP header parameters must be present in the GET subscription information request:

| **Header** | **Value**                                                    |
| ---------- | ------------------------------------------------------------ |
| **Accept** | The content  type that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

####  HTTP Response Body

The response body includes the following elements:

| Subscription             | Description                                                  | Required                     |                              |
| ------------------------ | ------------------------------------------------------------ | ---------------------------- | ---------------------------- |
| contentTypes             | content types that the subscriber wants to receive in the notifications | n                            | w3c:String                   |
| cacheFor                 | duration of the period to cache the subscription information in seconds | n                            | w3c:Integer                  |
| callbackUrl              | callback URL of the Client Subscription API where the subscriber wants to receive Logistics Objects | y                            |                              |
| errors                   | any non HTTP errors related to this request                  | no, unless there is an error |                              |
| myCompanyIdentifier      | company identifier of the subscriber                         | y                            | w3c:URI                      |
| secret                   | a secret string or API Key that ensures that only companies with this secret information can POST to the subscriber callback endpoint | n                            | w3c:String                   |
| sendLogisticsObjectBody  | Flag specifying if the publisher should send the whole Logistics Object or only the Logistics Object URI in the notification object | n                            | w3c:Boolean                  |
| subscribeToStatusUpdates | Flag specifying if the subscriber wants to receive updates for a Logistics Object | n                            | w3c:Boolean                  |
| subscribedTo             | Company Identifier of the company the subscriber wants to subscribe to (used delegation scenario). | y                            | w3c:URI                      |
| topic                    | The Logistics Object type to which the subscriber wants subscribe to | y                            | cargo:LogisticsObject (list) |



#### Example of a response to a subscription proposal from a publisher to a subscriber 

```
Request header:
GET /mycompany?topic=https://onerecord.iata.org/cargo/WayBill HTTP/1.1
Host: http://wwww.myhost.com
Content-Type: application/ld+json
Accept: application/ld+json

Response Body
{
  "@type": "api:Subscription",
  "@context": {
    "cargo": "https://onerecord.iata.org/cargo/",
    "api": "api:",
    "publisher": "http://publisher-server",
    "subscriber": "http://subscriber-server"
  },
  "api:Subscription#contentTypes": " application/ld+json ",
  "api:Subscription#cacheFor": "86400",
  "api:Subscription#callbackUrl": "subscriber/callback",
  "api:Subscription#errors": ["...non HTTP errors related to this request..."],
  "api:Subscription#myCompanyIdentifier": "subscriber",
  "api:Subscription#secret": "C89583BA9B1FEEAB25F715A3BA2F3",
  "api:Subscription#sendLogisticsObjectBody": true,
  "api:Subscription#subscribeToStatusUpdates": true,
  "api:Subscription#subscribedTo": "publisher",
  "api:Subscription#topic": "cargo:WayBill"
}

Response header:
200 (OK)
Content-Type: application/ld+json
```

<!--- Further development proposal: A subscriber could also send specific field filter to which it wants to subscribe to. (e.g. destination countries).  -->

### 

| **Code** |      | **Description**                                              | **Response body** |
| -------- | ---- | ------------------------------------------------------------ | ----------------- |
| **200**  |      | The request to retrieve the Subscription Information has been  successful | Subscription      |
| **204**  |      | Request has been successful, but the server does not subscribe | No response body  |
| **401**  |      | Not authenticated                                            | Error model       |
| **403**  |      | Not authorized to retrieve the Subscription Information      | Error model       |
| **404**  |      | Subscription Information not found                           | Error model       |



# Delegation

In ONE Record parties are enabled to grant other parties access to (parts of) their data. The standard allows parties to modify or withdraw these access rights to their data, whenever they wish.

Before a company can access a logistics object of another company, it needs to be authorized to do so and the server that hosts the logistics objects will determine whether to grant access. Typically, when a company creates a logistics object on a server, it will share the URI of that logistics object with another company and grant them access by default. For example, a forwarder creates a logistics object for a booking request and then sends the URI to the airline. When the airline then accesses the logistics object, the forwarder will usually grant access to the airline but only to that airline and no one else. 

The party granting access is referred to as the delegator and the party receiving the access is the delegate. 



<img src="/Users/henkmulder/Library/Application Support/typora-user-images/image-20220404114548771.png" alt="image-20220404114548771" style="zoom:60%;" />

### Delegation endpoint

Delegation has a specifix endpoint:

| API function                                       | Endpoint                                          |
| -------------------------------------------------- | ------------------------------------------------- |
| Request to delegate access to LO for a third party | http://{Server Domain}/{license plate}/delegation |

## 

##### Request

HTTP Request type: POST

POST /delegation

Host: http://wwww.logistics-object-host.com/

Accept: application/ld+json

 

##### HTTP Headers

The following HTTP header parameters MUST be present in the POST request:

| **Header**       | **Description**                                              |
| ---------------- | ------------------------------------------------------------ |
| **Accept**       | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |
| **Content-Type** | The content type  that is contained with the HTTP body. Valid content types include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

#####   Request body

| <u>DelegationRequest</u>  | Description                                                  | Required | Class                  |
| ------------------------- | ------------------------------------------------------------ | -------- | ---------------------- |
| **targetLogisticsObject** | The reference to  the logistics object to which the access is requested | y        | api:LogisticsObjectRef |
| **targetCompany**         | The party that  will receive the delegated rights            | y        | api:CompanyInformation |
| **action**                | The action to perform: REVOKE or DELEGATE                    | y        | "REVOKE","DELEGATE"    |
| **operations**            | The API  operations to which the access is requested: GET,  PATCH, or both. | y        | "GET", "PATCH"         |

##### Response

| **Code** |      | **Description**                              | **Response body** |
| -------- | ---- | -------------------------------------------- | ----------------- |
| **204**  |      | Request for  delegation was successful       | No response  body |
| **401**  |      | Not  authenticated                           | Error model       |
| **403**  |      | Not authorized  to send a Delegation request | Error model       |

 Example of a delegation request for GET access to two sensor logistics objects a company that has a ONE Record with URL http://www.delegatedserver.com/.

```json
Request header:
POST /delegation
Host: myonerecordserver.com
Content-Type: application/ld+json
Accept: application/ld+json

{ 
    "@type": "iata-api:DelegationRequest",
    "@context": {
        "iata-cargo": "https://onerecord.iata.org/cargo/",
        "iata-api": "https://onerecord.iata.org/api/",
        "delegated-server": "http://www.delegatedserver.com/",
      	"lo-host": "http://wwww.logistics-object-host.com/"
    },
    "iata-api:DelegationRequest#action": "DELEGATE",
    "iata-api:DelegationRequest#operations": ["GET"],
    "iata-api:DelegationRequest#targetCompanies": [
        "delegated-server:CompanyInformation"
    ],
    "iata-api:DelegationRequest#targetLogisticsObjects": [
        {
          "@type": "api:LogisticsObjectRef",
          "api:LogisticsObjectRef#logisticsObjectId": "lo-host:Sensor_715823",
          "api:LogisticsObjectRef#logisticsObjectType": "cargo:Sensor#sensorType"
      	},	  
        {
          "@type": "api:LogisticsObjectRef",
          "api:LogisticsObjectRef#logisticsObjectId": "lo-host:Sensor_165371",
          "api:LogisticsObjectRef#logisticsObjectType": "cargo:Sensor#sensorType"
      }  

  ]
}


```



 

In the following use cases, we consider three parties: **FirstParty**, **SecondParty** and **ThirdParty**.

## Use Case 1: delegate & 3rd party pubsub

SecondParty request FirstParty access to an LO for Thirdparty. FirstParty then sets up a PubSub with ThirdParty.

<img src="/Users/henkmulder/Library/Application Support/typora-user-images/image-20220404104936690.png" alt="image-20220404104936690" style="zoom:80%;" />

#### Delegation Scenario 1

#### Step 1 – Publish & Subscribe flow between FirstParty and SecondParty

First step contains a Publish & Subscribe flow between FirstParty and SecondParty for a Logistics Object LO with is created on the FirstParty ONE Record Server.

#### Step 2 – SecondParty requests delegation access to LO for ThirdParty 

The SecondParty sends a delegation request to the FirstParty in order to grant ThirdParty access to LO (GET, PATCH or both).

#### Step 3 – Publish & subscribe flow between FirstParty and ThirdParty

If FirstParty decides to grant ThirdParty access to LO, then it initiates a Publish & Subscribe flow that would allow ThirdParty get notifications related to LO.

## Use Case 2: delegate & access LO directly

SecondParty request FirstParty access to an LO for Thirdparty. ThirsParty then accesses the LO on FirstParty directly. In this scenario, ThirdParty didn't set up a pub/sub but received the URI of the from their partner, SecondParty.



<img src="/Users/henkmulder/Library/Application Support/typora-user-images/image-20220404105103059.png" alt="image-20220404105103059" style="zoom:80%;" />

#### Delegation Scenario 2

#### Step 1 – Publish & Subscribe flow between FirstParty and SecondParty

First step contains a Publish & Subscribe flow between FirstParty and SecondParty for a Logistics Object LO with is created on the FirstParty ONE Record Server.

#### Step 2 – SecondParty requests delegation access to LO for ThirdParty 

The SecondParty sends a delegation request to the FirstParty in order to grant ThirdParty access to LO (GET, PATCH or both).

Same Request/Response as in [Step 2 – SecondParty requests delegation access to LO for ThirdParty](#_Step_2_–).

#### Step 3 – ThirdParty effectuates a GET or PATCH request on LO to FirstParty

If FirstParty decides to grant ThirdParty access to LO, then ThirdParty can perform a GET or PATCH request on the LO to FirstParty.

## Trust Chains

The concept of companies requesting a delegation of access to their partners can also be used by these partners themselves, who are now third parties. In the example below, the interline partner can request that the forwarder gives access to their ground handler. The forwarder will grant the access on the basis that they trust the airline who has trusted their interline partner who trusts their ground handler.

<img src="/Users/henkmulder/Library/Application Support/typora-user-images/image-20220404110048479.png" alt="image-20220404110048479" style="zoom:50%;" />

These chains of trust are based on business partnerships and trust in the transport chain. It ensures that the company who has shared a logistics object on a server, always knows who may access this and at any time, it can revoke all or part of the chain of trust. 



# Events (status update)

Status updates in ONE Record can be added to Logistics Objects bying posting an Event object to a dedicated Events endpoint. 

Any Logistics Object can be assigned new events. 

## Events endpoint

| API function                                    | Endpoint                         |
| ----------------------------------------------- | -------------------------------- |
| Create or retrieve events to a Logistics Object | {URI of logisticsObject }/events |

## Create event (POST)

#### Request

HTTP Request type: POST

POST logisticsObjectURI/events

Host: myonerecordserver.net

Accept: application/ld+json

#### HTTP Header

The following HTTP header parameters MUST be present in the POST request:

| **Header**       | **Description**                                              |
| ---------------- | ------------------------------------------------------------ |
| **Accept**       | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |
| **Content-Type** | The content type  that is contained with the HTTP body. Valid content types include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

#### Request body

| <u>Event</u>           | Description                                                  | Required | Class          |
| ---------------------- | ------------------------------------------------------------ | -------- | -------------- |
| **linkedObject**       | Logistics object the event applies to                        | y        | w3c:String     |
| **performedBy**        | Company that is adding the event                             | y        | cargo:Company  |
| **eventCode**          | Movement or milestone code. Refer CXML Code List 1.18, e.g. DEP, ARR, FOH, RCS | y        | w3c:String     |
| **eventName**          | If no EventCode provided, event name - e.g. Security clearance | y        | w3c:String     |
| **eventTypeIndicator** | Type of event being created:  "Actual" , "Expected" , "Planned" or "Requested" | y        | w3c:String     |
| **dateTime**           | Date and time when  the event occurred                       | y        | w3c:DateTime   |
| **location**           | Location of where  the event occurred                        | y        | Cargo:Location |

#### Response

| **Code** |      | **Description**                                              | **Response body** |
| -------- | ---- | ------------------------------------------------------------ | ----------------- |
| **201**  |      | Event has been published to  the Internet of Logistics.      | No response  body |
| **400**  |      | Invalid Event                                                | Error model       |
| **401**  |      | Not  authenticated                                           | Error model       |
| **403**  |      | Not authorized  to publish an event update to the Internet of Logistics | Error model       |
| **415**  |      | Unsupported  Content Type                                    | Error model       |

  

```
{
  "@type": "iata-api:Event",
  "@context": {
     "iata-cargo": "https://onerecord.iata.org/cargo/",
     "iata-api": "https://onerecord.iata.org/api/",
  },
  "iata-api:Event#dateTime": "2020-08-25T13:44:49.399Z",
  "iata-api:Event#eventCode": "DEP",
  "iata-api:Event#eventName": "Flight departure",
  "iata-api:Event#eventTypeIndicator": "Actual",
  "iata-api:Event#location": {"...Location object..."}
  "iata-api:Event#linkedObject": "http://wwww.myhost.com/Sensor_715823",
  "iata-api:Event#performedBy": {"...Company object..."}
  "id": "string"
}
```



## Retrieve events (GET)

#### Request

HTTP Request type: GET

GET logistics-object-URI/events 

Host: myonerecordserver.net

Accept: application/ld+json 

#### HTTP Headers

The following HTTP header parameters MUST be present in the GET request:

| **Header** | **Description**                                              |
| ---------- | ------------------------------------------------------------ |
| **Accept** | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

#### Response

A positive HTTP 200 response is expected to a GET request. The body of the response is expected to be the events list in the format that has been requested in the Accept header of the request.

| **Code** |      | **Description**                    | **Response body** |
| -------- | ---- | ---------------------------------- | ----------------- |
| **200**  |      | Events retrieved  successfully     | Event             |
| **401**  |      | Not  authenticated                 | Error model       |
| **403**  |      | Not authorized  to retrieve Events | Error model       |
| **404**  |      | Logistics  Object Not Found        | Error model       |

 

# Access Control

In ONE Record, access to resources could be handled by using Access Control Lists (ACLs) stored in the backend systems of the ONE Record Servers and defined using the [Web Access Control standard from W3C](https://www.w3.org/wiki/WebAccessControl).

## Web Access Control

According to W3C specifications, Web Access Control it is a standard that enforces access control based on the Access Control List (ACL) RDF resource associated with the requested resource. It's concerned with giving access to agents (users, groups and more) to perform various kinds of operations (read, write, append, etc) on resources. In Web Access Control, an ACL consists of a set of **Authorizations**. Each Authorization is a single rule for access, such as "entities one and two may write to resource someresource", described with a set of RDF properties. 

#### Access Control List Resources

In a system that uses Web Access Control, each web resource has a set of **Authorization** statements describing:

1. Who has access to that resource (that is, who the authorized **agents** are).
2. What types (or **modes**) of access they have.

These Authorizations are either explicitly set for an individual resource, or (more often) inherited from that resource's parent folder or container. In either case, the Authorization statements are placed into separate WAC documents called Access Control List Resources (or simply ACLs).

An Authorization is written as a series of RDF triples, with the Authorization resource as the subject for each of these triples. The Authorization resource URI is a hash URI, because of the requirement for potentially multiple, distinct Authorizations to be included in a single ACL resource and it has an rdf: type of http://www.w3.org/ns/auth/acl#Authorization.

The complete WAC ontology can be found [here](https://www.w3.org/ns/auth/acl).

The location of the acl for a given resource may be discovered via a Link header with relation rel=”acl”. Given a URL for an individual resource or logistics object, a client can discover the location of its corresponding ACL by performing a GET request and parsing the rel=”acl” link relation.

Example:

GET  http://myServer/my-airline/logistics-object would return:

HTTP/1.1 200 OK

Link: <http://myServer/my-airline/logistics-object/acl>; rel="acl"

If a resource does not have an individual ACL (and therefore relies on an implicit ACL from a parent), this link header will still be present, but will return a 404.

**Clients MUST NOT assume that the location of an ACL resource can be deterministically derived from a document's URL.** 

#### Example of Authorizations

##### Single Authorization

Below is an example ACL resource that specifies that Party1 (as identified by its ONE Record Company Identifier https://party1.server.com/company) has full access (Read, Write and Control) to one of its web resources, located at https://party1.server.com/company/logistics-object.

```
# Contents of https://party1.server.com/company/logistics-object/acl
@prefix acl:  <http://www.w3.org/ns/auth/acl#>.
 
<#authorization1>
    a             acl:Authorization;
    acl:agent     <https://party1.server.com/company>;  # Company Identifier in the IoL
    acl:accessTo  <https://party1.server.com/company/logistics-object>;
    acl:mode      acl:Read, 
                  acl:Write, 
                  acl:Control.
```



 

Agent = Company Identifier in the Internet of Logistics

In this case, Party1 is the Owner of the Logistics Object. Owners are agents that have Read, Write and Control permissions.

##### Group Authorization

```
# Group authorization, giving Read/Write access to two groups, which are
# specified in the 'work-groups' document.
<#authorization2>
    a               acl:Authorization;
    acl:accessTo    <https://party1.server.com/company/logistics-object2>;
    acl:mode        acl:Read,
                    acl:Write;
    acl:agentGroup  <https://party1.server.com/company/groups#Accounting>;
    acl:agentGroup  <https://party1.server.com/company/groups#Management>.
```

 

Corresponding work-groups Group Listing document:

```
# Contents of https://party1.server.com/company/groups
@prefix    acl:  <http://www.w3.org/ns/auth/acl#>.
@prefix     dc:  <http://purl.org/dc/elements/1.1/>.
@prefix  vcard:  <http://www.w3.org/2006/vcard/ns#>.
@prefix    xsd:  <http://www.w3.org/2001/XMLSchema#>.
 
<#Accounting>
    a                vcard:Group;
    vcard:hasUID     <urn:uuid:8831CBAD-1111-2222-8563-F0F4787E5398:ABGroup>;
    dc:created       "2018-09-11T07:18:19+0000"^^xsd:dateTime;
    dc:modified      "2019-08-08T14:45:15+0000"^^xsd:dateTime;
 
    # Accounting group members:
    vcard:hasMember  <https://party2.server.com/company5>;
    vcard:hasMember  <https://party3.server.com/company7>.
 
<#Management>
    a                vcard:Group;
    vcard:hasUID     <urn:uuid:8831CBAD-3333-4444-8563-F0F4787E5398:ABGroup>;
 
    # Management group members:
    vcard:hasMember  <https://party4.server.com/company1>.
```

 

##### Authenticated Agents (Default)

Authenticated access is a bit like public access, but it is not anonymous. Access is only given to clients who have logged on and provided a specific Company Identifier. This allows the server to track the entities who have used the resource.

```
@prefix   acl:  <http://www.w3.org/ns/auth/acl#>.
 
<#authorization2>
    a               acl:Authorization;
    acl:agentClass  acl:AuthenticatedAgent;                   
    acl:mode        acl:Read;                                 
    acl:accessTo    <https://party1.server.com/company/logistics-object>.
```

 

An application of this feature is to throw a resource open to all authenticated parties for a specific amount of time, accumulate the list of those who case as a group, and then later restrict access to that group, to prevent spam.

#### Modes of Access

The `acl:mode` predicate denotes a class of operations that the agents can perform on a resource.

**`acl:Read`**

This includes access to HTTP verb GET. 

##### `acl:Write`

This includes` `POST, and PATCH. (PUT and DELETE are out of scope of ONE Record).

##### `acl:Control`

All methods, if the request URI is an ACL.

###### `Out of scope of ONE Record`

##### `acl:Append`

gives a more limited ability to write to a resource - Append-Only. 

#### Inheritance

Use `acl:default`.

If you use `acl:accessTo` to protect a container, and add an `acl:default` predicate, that authorization rule by default will also apply to any of that container's children, unless that child has its own ACL.

The second is to use the `acl:accessToClass` property to state that the authorization rule applies to any resource with the named RDF type. 

#### Delegation

When delegating access to a resource to a third party, a new Authorization element should be added to the ACL.

## Access Control in ONE Record

In ONE Record, access to resources can be specified by using Access Control Lists (ACLs) associated to specific Logistics Objects (LOs). Each LO resource possesses a related ACL containing a set of **Authorization** statements that describe:

- **who** has access to that resource;
- **what types** (or **modes**) **of access** they have. 

Each Authorization is a single rule for access, such as "entities one and two may write to LO logisticObjectRef", described with a set of RDF properties. 

ONE Record recommends the use of the [ACL ontology](https://www.w3.org/ns/auth/acl) in order to express the Authorizations. As the ACL is specific to each ONE Record Server and it is not a mandatory requirement to make it available to external entities, any other kind of data model/ontology can be used instead.

Given an URI for an individual LO, a ONE Record Client can discover the location of its corresponding ACL by performing a GET request and parsing the rel=”acl” **Link** header. 

​                             ![Text Box: GET  http://myServer/my-airline/logistics-object would return the headers: HTTP/1.1 200 OK Link: <http://my-server/my-airline/logistics-object/acl>; rel="acl" ](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image001.png)

Example of GET LO returning an ACL

**Note**: ONE Record Clients must not assume that the location of an ACL resource can be derived from an LO’s URI. 

ONE Record recommends the definition of three types of Authorization:

1. **Single Authorization** – when a single company identifier from the Internet of Logistics has access to the LO;
2. **Group Authorization** – when a group of company identifiers has access to the LO. The ONE Record Server can define internally groups of access such as Airlines, Ground Handlers, Customs, etc.
3. **Public” Authorization** – when every authenticated company identifier accessing the LO URI can retrieve the data.

ONE Record specifies three modes of access on LOs:

<img src="file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image002.png" alt="img" style="zoom: 50%;" />

**Note**: In a delegation scenario, when delegating access to a resource to a third party, a new Authorization element should be added to the ACL.

## Use case

In this illustrative scenario, the entities would be **Shipper** (which has its own ONE Record Server) and **Forwarder**.

- Shipper creates a Shipment logistics object. Shipper is the owner of the phones, which constitute the Product. Each Product with a series number is an Item.
- Shipper packages the phones on wooden pallets, creates Pieces and handles them to Forwarder. 

![A screenshot of a social media post  Description automatically generated](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image003.png)

 

- Forwarder is responsible to create/update Transport Segment data for each Piece. 

```
# Contents of https://shipperserver.com/company/shipment.acl
@prefix acl:  <http://www.w3.org/ns/auth/acl#>.
 
<#authorization1>
    a             acl:Authorization;
    acl:agent     <https://forwarderserver.com/company>;  # Forwarder Identifier in the IoL
    acl:accessTo  <https://shipperserver.com/company/shipment/transportSegment>;
    acl:mode      acl:Read, 
                  acl:Write, 
                  acl:Control.
```

 

- Each Piece contains other information such as Goods Description which is only created/updated by Shipper. 

```
# Contents of https://shipperserver.com/company/shipment.acl
@prefix acl:  <http://www.w3.org/ns/auth/acl#>.
 
<#authorization1>
    a             acl:Authorization;
    acl:agent     <https://shipperserver.com/company>;  # Shipper Identifier in the IoL
    acl:accessTo  <https://shipperserver.com/company/shipment/goodDescription>;
    acl:mode      acl:Read, 
                  acl:Write, 
                  acl:Control.
 
```

 

- UPID information inside Piece could either be created by Shipper, in which case Shipper would be the owner of this data element. However, Shipper could handle the UPID creation/update to Forwarder, in which case Forwarder would be the owner of this data, meaning that only Forwarder could update this information. 

```
# Contents of https://shipperserver.com/company/shipment.acl
@prefix acl:  <http://www.w3.org/ns/auth/acl#>.
 
<#authorization1>
    a             acl:Authorization;
    acl:agent     <https://forwarder.com/company>;  # Forwarder Identifier in the IoL
    acl:accessTo  <https://shipperserver.com/company/shipment/UPID>;
    acl:mode      acl:Read, 
                  acl:Write, 
                  acl:Control.
```

 

- Same principle as UPID could apply for Total Weight element inside Piece.

```
# Contents of https://shipperserver.com/company/shipment.acl
@prefix acl:  <http://www.w3.org/ns/auth/acl#>.
 
<#authorization1>
    a             acl:Authorization;
    acl:agent     <https://forwarder.com/company>;  # Forwarder Identifier in the IoL
    acl:accessTo  <https://shipperserver.com/company/shipment/totalWeight>;
    acl:mode      acl:Read, 
                  acl:Write, 
                  acl:Control.
```

![A screenshot of a social media post  Description automatically generated](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image004.png)

## Create ACL (POST)

#### Request

HTTP Request type: POST

POST logistics-object-URI/acl

Host: myonerecordserver.net

Accept: application/ld+json

 

Example:

**POST** https://www.onerecordcargo.org/my_airline/shipment_123456/acl

 

ONE Record does not define a specific model for ACL, but suggests the utilization of [Access Control Ontology defined by W3C](https://www.w3.org/ns/auth/acl).

 

#### HTTP Headers

The following HTTP header parameters MUST be present in the POST request:

| **Header**       | **Description**                                              |
| ---------------- | ------------------------------------------------------------ |
| **Accept**       | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |
| **Content-Type** | The content type  that is contained with the HTTP body. Valid content types include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

 

#### Response

| **Code** |      | **Description**                                | **Response body** |
| -------- | ---- | ---------------------------------------------- | ----------------- |
| **201**  |      | ACL has been published for  a Logistics Object | No response  body |
| **400**  |      | Invalid ACL                                    | Error model       |
| **401**  |      | Not  authenticated                             | Error model       |
| **403**  |      | Not authorized  to publish an ACL              | Error model       |
| **415**  |      | Unsupported  Content Type                      | Error model       |

 

## Retrieve ACL (GET)

#### Request

HTTP Request type: GET

GET logistics-object-URI/acl 

Host: myonerecordserver.net

Accept: application/ld+json

 

Example:

**GET** https://www.onerecordcargo.org/my_airline/shipment_123456/acl

 

#### HTTP Headers

The following HTTP header parameters MUST be present in the GET request:

| **Header** | **Description**                                              |
| ---------- | ------------------------------------------------------------ |
| **Accept** | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

 

#### Response

A positive HTTP 200 response is expected to a GET request. The body of the response is expected to be the ACL list in the format that has been requested in the Accept header of the request.

| **Code** |      | **Description**                 | **Response body**                     |
| -------- | ---- | ------------------------------- | ------------------------------------- |
| **200**  |      | ACL returned successfully       | [ACL](https://www.w3.org/ns/auth/acl) |
| **401**  |      | Not  authenticated              | Error model                           |
| **403**  |      | Not authorized  to retrieve ACL | Error model                           |
| **404**  |      | Logistics  Object/ACL Not Found | Error model                           |

 

#### Bibliography

- Access Control Ontology: https://www.w3.org/ns/auth/acl
- Web Access Control Specification from W3: https://www.w3.org/wiki/WebAccessControl
- Web Access Control specifications by Solid project: https://github.com/solid/web-access-control-spec
- Fedora project: https://wiki.lyrasis.org/display/FEDORA51/WebAC+Authorizations
- Access Control in Linked Data Using WebID: https://arxiv.org/pdf/1611.03019.pdf
- VCard ontology: [https://www.w3.org/2006/vcard/ns#%3E](https://www.w3.org/2006/vcard/ns#>)
- Context-Aware Access Control and Presentation of Linked Data: https://tel.archives-ouvertes.fr/tel-00934617/document 

# Versioning

In ONE Record, data is updated in real time. There is a need to snapshot a version of a document, for example MAWB, and we need to know which version of data was used for that snapshot. 

Every time a transaction/update is committed successfully, a new version entry is created by the versioning service. 

Note: Revert to a previous memento (version) of a Logistics Object with PATCH and Deleting a previous memento (version) of a Logistics Object with DELETE are not supported as out of scope of ONE Record. 

## Memento Protocol

The [Memento Protocol](http://mementoweb.org/) defines four concepts:

- **Original Resource**: A Web resource that exists or used to exist on the live Web for which we want to find a prior version. By prior version is meant a Web resource that encapsulates what the Original Resource was like at some time in past.
- **Memento**: A Web resource that is a prior version of the Original Resource, i.e. that encapsulates what the Original Resource was like at some time in the past.
- **TimeGate**: A Web resource that “decides” on the basis of a given datetime, which Memento best matches what the Original Resource was like around that given datetime.
- **TimeMap**: A TimeMap for an Original Resource is a resource from which a list of URIs of Mementos of the Original Resource is available.

Memento decides between **resources** (URI-R), **timemap** (URI-T), **timegates** (URI-G) and **mementos** (URI-Mx).![A picture containing clock, meter  Description automatically generated](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image001.png)

 

## Retrieve available versions of a Logistics Object – TimeMap (GET)

A **TimeMap** (URI-T) for an Original Resource (URI-R) is a machine-readable document that lists the Original Resource itself, its TimeGate, and its Mementos as well as associated metadata such as archival datetime for Mementos. TimeMaps are exposed by systems that host prior versions of Original Resources and allow for batch discovery of Mementos.

 

As explained [before](#_Response), the existing versions (**TimeMap**) endpoint URL can be returned in the HTTP Link header when performing a GET request on a Logistics Object. 

Example:

GET https://www.onerecordcargo.org/my_airline/shipment_123456/

Would return as one of the headers:

**Link: <** https://www.onerecordcargo.org/my_airline/shipment_123456/**timemap>; rel="timemap"**

It would be then possible to get the version history of an object by appending "/**timemap**" to its base URL. Each memento will be listed, with the memento label as the title.

#### Request

HTTP Request type: GET

GET logistics-object-URI/timemap 

Host: myonerecordserver.net

Accept: application/ld+json

 

Example:

GET https://www.onerecordcargo.org/my_airline/shipment_123456/timemap

 

#### HTTP Headers

The following HTTP header parameters MUST be present in the GET request:

| **Header** | **Description**                                              |
| ---------- | ------------------------------------------------------------ |
| **Accept** | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

 

#### Response

A positive HTTP 200 response is expected to a GET request. The body of the response is expected to be the TimeMap in the format that has been requested in the Accept header of the request.

```json
{
   "@id":"https://www.onerecordcargo.org/my_airline/shipment_123456/timemap",
   "@type":"iata-api:Timemap",
    "@context": {
     "iata-cargo": "https://onerecord.iata.org/cargo/",
     "iata-api": "iata-api:"
    },
   "iata-api:Timemap#mementos":{
      "@type":"iata-api:Mementos",
      "iata-api:Mementos#firstMemento":"https://www.onerecordcargo.org/my_airline/shipment_123456/mementos/677b715e-3b46-492b-93df-bf9cc059a111",
      "iata-api:Mementos#lastMemento":"https://www.onerecordcargo.org/my_airline/shipment_123456/mementos/677b715e-3b46-492b-93df-bf9cc059a111",
      "iata-api:Mementos#list":{
         "@type":[
            "iata-api:MementoList"
         ],
         "iata-api:MementoList#mementoEntry":[
            {
               "@type":[
                  "iata-api:MementoEntry"
               ],
               "iata-api:MementoEntry#datetime":"2020-09-07T12:00:00.183Z",
               "iata-api:MementoEntry#label":"v1",
               "iata-api:MementoEntry#memento":{
                  "@type":[
                     "iata-api:Memento"
                  ],
                  "iata-api:Memento#created":"2021-03-03T17:16:41.501Z",
                  "iata-api:Memento#createdBy":"admin",
                  "iata-api:Memento#label":"Snapshot 1",
                  "iata-api:Memento#original":" https://www.onerecordcargo.org/my_airline/shipment_123456",
                  "id":"https://www.onerecordcargo.org/my_airline/shipment_123456/mementos/677b715e-3b46-492b-93df-bf9cc059a111"
               }
            }
         ]
      }
   },
   "iata-api:Timemap#original":" https://www.onerecordcargo.org/my_airline/shipment_123456",
   "iata-api:Timemap#timegate":"https://www.onerecordcargo.org/my_airline/shipment_123456/timegate"
}
```

| **Code** |      | **Description**                     | **Response body** |
| -------- | ---- | ----------------------------------- | ----------------- |
| **200**  |      | TimeMap returned  successfully      | TimeMap model     |
| **401**  |      | Not  authenticated                  | Error model       |
| **403**  |      | Not authorized  to retrieve TimeMap | Error model       |
| **404**  |      | Logistics  Object/TimeMap Not Found | Error model       |

 

## Retrieve a version of a Logistics Object at a certain moment in time – TimeGate (GET)

A **TimeGate** supports content negotiation in the datetime dimension. When negotiating with the TimeGate, the HTTP client uses an Accept-Datetime header to express the desired datetime of a prior/archived version of URI-R (original resource). The TimeGate responds with the location of a matching version, named a Memento (URI-M1 or URI-M2), allowing the HTTP client to access it. Using the Memento-Datetime header, Mementos express their version/archival datetime.

GET TimeGate request should contain an Accept-Datetime header and the response will contain a Link header to a previous version of the original resource (Memento) closest to the date sent in the header**.** 

#### Request

HTTP Request type: GET

GET logisticsObjectURI/timegate 

Host: myonerecordserver.net

Accept: application/ld+json

Accept-Datetime: 2020-04-21T10:36:42+00:00

 

Example:

**GET** https://www.onerecordcargo.org/my_airline/shipment_123456/timegate

 

#### HTTP Headers

The following HTTP header parameters MUST be present in the GET request:

| **Header**          | **Description**                                              |
| ------------------- | ------------------------------------------------------------ |
| **Accept**          | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |
| **Accept-Datetime** | A date for which we  would want to know the closest Memento  |

 

#### Response

A positive HTTP 204 response is expected to a GET Timegate request. No response body is expected.

Link and Memento-Datetime headers should be returned in the response:

**Link: <** [https://www.onerecordcargo.org/my_airline/shipment_123456/mementos/addd87ed-f208-4e8a-8b69-d7cf698c8d4e](https://www.onerecordcargo.org/my_airline/shipment_123456/versions/addd87ed-f208-4e8a-8b69-d7cf698c8d4e)**>; rel="memento"**

Memento-Datetime: 2020-04-21T11:00:42+00:00

| **Code** |      | **Description**                      | **Response body** |
| -------- | ---- | ------------------------------------ | ----------------- |
| **204**  |      | Timegate Link returned  correctly    | No content        |
| **401**  |      | Not  authenticated                   | Error model       |
| **403**  |      | Not authorized  to retrieve Timegate | Error model       |
| **404**  |      | Logistics  Object/Timegate Not Found | Error model       |

 

## Retrieve a Memento of a Logistics Object (GET)

#### Request

HTTP Request type: GET

GET logisticsObjectURI/mementos/mementoId 

Host: myonerecordserver.net

Accept: application/ld+json

 

Example:

**GET** https://www.onerecordcargo.org/my_airline/shipment_123456/mementos/addd87ed-f208-4e8a-8b69-d7cf698c8d4e

 

#### HTTP Headers

The following HTTP header parameters MUST be present in the GET request:

| **Header** | **Description**                                              |
| ---------- | ------------------------------------------------------------ |
| **Accept** | The content type  that you want the HTTP response to be formatted in. Valid content types  include:  ▪ application/x-turtle  or text/turtle  ▪ application/ld+json |

 

#### Response

A positive HTTP 200 response is expected to a GET request. The body of the response is expected to be the Memento in the format that has been requested in the Accept header of the request.

```
{
   "@id":"https://www.onerecordcargo.org/my_airline/shipment_123456/mementos/addd87ed-f208-4e8a-8b69-d7cf698c8d4e",
   "@type":"iata-api:Memento",
   "@context": {
     "iata-cargo": "https://onerecord.iata.org/cargo/",
     "iata-api": "iata-api:"
   },
   "iata-api:Memento#created":"2020-09-07T11:57:42.597Z",
   "iata-api:Memento#createdBy":"admin",
   "iata-api:Memento#label":"v1",
   "iata-api:Memento#data":"Content of the Logistics Object",
   "iata-api:Memento#original":" https://www.onerecordcargo.org/my_airline/shipment_123456"
}
```

| **Code** |      | **Description**                     | **Response body** |
| -------- | ---- | ----------------------------------- | ----------------- |
| **200**  |      | Memento returned  successfully      | Memento model     |
| **401**  |      | Not  authenticated                  | Error model       |
| **403**  |      | Not authorized  to retrieve Memento | Error model       |
| **404**  |      | Logistics  Object/Memento Not Found | Error model       |

 

## Create a Memento

The creation of a Memento for a Logistics Object should be an internal process of the ONE Record Server. Making available a POST endpoint for the external parties to use is not mandatory.

 

#### Bibliography

- Memento Protocol: http://mementoweb.org/
- Apache Marmotta: http://marmotta.apache.org/platform/versioning-module.html
- HTTP Framework for Time-Based Access to Resource States – Memento: https://tools.ietf.org/html/rfc7089
- https://www.slideshare.net/hvdsomp/an-httpbased-versioning-mechanism-for-linked-data

# Internationalization (i18n)

Internationalization (abbreviated i18n) enable companies to request and return data in a given language.

i18n support is particularly needed when getting Company information: the address could be written in Chinese or in English for example. If a Chinese Shipper provides information only with Chinese characters, maybe a European company won’t be able to use this information, therefore the need to specify the language in which the data is returned.

#### Request

In order to retrieve the data in a desired language, the ONE Record client should send the following query parameter in the request: ?lang=language_code, where:

| **Query  Parameter** | **Description**                                              |
| -------------------- | ------------------------------------------------------------ |
| **lang**             | Standard  language code. See list [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). |

 

Example:

**GET** https://www.onerecordcargo.org/my_airline/shipment_123456?lang=en 

 

#### Response

In JSON-LD, the language can be set in the [context](https://www.w3.org/TR/json-ld11/#dfn-context) using the language key whose value must be a [string](https://infra.spec.whatwg.org/#javascript-string) representing a [BCP47](https://www.w3.org/TR/json-ld11/#bib-bcp47) language code or `null`.

Example of response:

 {
   "language":"en",
   "@context": {
     "iata-api": "https://onerecord.iata.org/api/"
   },
   "@type":"iata-api:Error",

   "iata-api:Error#details":[
      {
         "@type":"iata-api:Details",
         "iata-api:Details#attribute":".WayBillNumber ",
         "iata-api:Details#code":"1234",
         "iata-api:Details#message":"Waybill number  could not be dereferenced, an error occurred",
         "iata-api:Details#resource":"[iata-api:Waybill](https://onerecord.iata.org/Waybill)"
      }
   ],
   "iata-api:Error#title":"Request  contains invalid field"
}

# Security in ONE Record 

This section discusses the security options for the ONE Record API that governs the connectivity between ONE Record clients and servers on the Internet of Logistics. 

## Background

When exchanging data, each party needs to know with certainty the true identity of the other party and that they have the authority to receive or share the data. They also need to be certain that the data being shared is private, secured and confidential and cannot be intercepted or changed by any unauthorized third party. The ONE Record security framework works globally and for all stakeholders in the full logistics and transport supply chain, and in compliance with corporate and local data security requirements.

<img src="file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image001.png" alt="img" style="zoom:150%;" />

IT and business experts from the industry  from ONE Record Task Force have explored and discussed the different connectivity configurations within the Internet of Logistics and two models – possibly complementary – were retained. This section presents these models and showcases the implications and benefits that they bring to the air cargo industry.

## IoL Nodes

The connectivity between clients and servers on the Internet of Logistics (IoL) is governed by the ONE Record API and Security specifications. Since the IoL is proposed to include end-to-end transport and logistics chain connectivity, there are many configurations for interaction between stakeholders and their systems, both large and small, that may include all types such as shippers, forwarders, airlines, ground handlers, airports, customers as well as entities from other modes. The following non-exhaustive list of IoL Nodes types have been identified: 

\1. Single Node: A node that can receive and transmit data via the ONE Record API. It can act **both as a Client & Server** or as **a Client only**. Typically, a Single Node is operated by a single company.

\2. Multi-Company Node: A node that may be shared by **multiple companies** and is operated by a **“ONE Record as a Service”** service provider. This allows small and medium sized companies to exchange data without the need to implement their own node.

\3. Multi-User Node: A node that is shared by **many users**, possibly from different companies. Typically, this would be an app server that allows users to interact via an mobile app and retrieve or send data via ONE Record.

\4. Multi-Device Node: In addition to multi-company and multi-user nodes, there will be nodes that regroup **devices** such as **trackers** and that may connect via ONE Record.

Together these are referred to as **IoL Nodes**.

<img src="file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image002.png" alt="img" style="zoom:40%;" />

IoL Nodes 

Below is an example of a small IoL network where the different types of IoL Nodes interact using the ONE Record API and Security specifications. 

![img](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image003.png)

From an IoL perspective, these are all clients and services but, in the Multi-User, Multi-Company and Multi-Device cases, the actual IoL API is shared between multiple companies and/or users which impacts the identification, authentication and authorization models for ONE Record. 

## Definitions and Acronyms

Here are some definitions and acronyms used in the following sections:

![img](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image004.png)

## Practical implementation of a first ONE Record Security working concept

ONE Record Security specifications are built around two concepts: **mutual TLS** (short for Transport Layer Security) and **OAuth2** (an authorization protocol). Mutual TLS secures all the Node-to-Node channels whereas OAuth2 adds an extra security layer for identification and authentication.

IATA has conceptualized a first practical implementation, which is promoted as the official security model for ONE Record. This implementation is split in two modules:

- **TLS authentication** **support**, including the definition of certificate profiles and practical use of digital certificates for client and server certificates;
- **Token-based authentication support**, including a practical implementation using OAuth2 as authorization protocol, based on the concept of a “Trusted Identity Provider”.

The next sections provide more detailed descriptions on the chosen security models and common use cases.

### TLS Authentication Model

The first ONE Record Security layer is based on Mutual TLS (with TLS1.2), where the Nodes identify themselves via digital certificates (X509) issued by Certificate Authorities (CA) that are recognized by the ONE Record community. Therefore, there is a prerequisite that the ONE Record Community operates and manages one or more CAs that meets the registration and issuance requirements of the Internet of Logistics. 

![img](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image005.png)

TLS in ONE Record

#### Digital Certificates and PKI

- **Digital Certificates** enable to:
- **Identify the entities** (persons, applications or objects) connecting to an application;
- **Encrypt** the data, to ensure the **confidentiality**, either during the communication, or permanently;
- **Digitally sign** the data, to ensure both:
  - the **authenticity**, and
  - the **integrity** of the data.

#### TLS Overview

TLS defines a handshake procedure to authenticate the parties and encrypt the communication channel.

Key points to consider:

- TLS Authentication can be used with certificates for server side only, or for both client and server-side authentication;
- A certificate can allow an application to act as client or as a server;
- The same certificate can be used for other purposes, like digitally signing the messages;
- TLS is standardized and supports common server applications and development frameworks.

#### TLS in ONE Record

IATA defines two digital certificate profiles:

- **Client Certificate**. This certificate can authenticate a 1R-Client, and it includes one or more “ONE Record IDs” in the form of URI, that represent the endpoints that are authorized for the 1R-Client, to receive ONE Record responses. These ONE Record IDs are included in the certificate as SAN URI extensions. IATA recommends that these certificates are issued by a publicly trusted CA that is operating according to the PKI industry regulations and that is conforming to a WebTrust or equivalent independent audit criteria.

- **Server Certificate**. This is valid for server authentication and it is similar to common TLS certificates used to protect web sites. The main particularity and requirement are that, to cover the needs of Multi-Company Nodes, the Server Certificate must contain all the internet domains that can be extracted from the list of authorized 1R-IDs.

Please see the [section below](#_PKI_Compliance) for more details about the client and server certificates requirements.

#### Use-Case: TLS Client/Server Authentication

The 1R-Client needs to establish a secure connection to the 1R-Server, and both parties need to authenticate the other, so both will be required to present a valid digital certificate to establish the connection.

<img src="file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image006.png" alt="img" style="zoom:45%;" />

It is important to note that ONE Record uses a Publish/Subscribe approach, therefore:

- The 1R-Client sends a request to the 1R-Server and includes a callback URL;
- The 1R-Server will process asynchronously the request and will send a notification to the 1R-Client using the callback URL.

This means that when the response from the 1R-Server is ready, it will be sent to the 1R-Client as a new TLS flow, initiated by the 1R-Server, but it is now acting as a TLS client as it pushes data back to the 1R-Client. This means that both entities will operate alternatively as both client and server.

Traffic flow:

- The 1R-Client Initiates the request using HTTPS, i.e to an SSL server.

- The 1R-Server presents its certificate, and requests a Client certificate.

- The TLS connection is established if the 1R-Server and 1R-Client are properly configured to require TLS authentication with Client certificate, and the CA issuing the certificate is included in the CA list of the 1R-Server.

- The 1R-Client Accepts the connection if:

  - the Server certificate comes from a Trusted CA and

  - it is not expired or revoked

- The 1R-Server Accepts the connection if:

  - the Client certificate comes from a Trusted Source and

  - it is not expired or revoked, and 

  - the Client certificate contains a 1R-ID that is allowed to make 1R requests.

<img src="file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image007.png" alt="img" style="zoom:40%;" />



### OAuth2 Authorization model

#### Overview 

The mutual TLS model proposed for Node-to-Node data exchange is not enough to ensure identification for the Multi-Company/User/Device configurations. 

Mutual TLS can only identify the owner of the digital certificate. When that server is shared by multiple companies and/or multiple users, this is insufficient for guaranteed identification of such companies and/or users for a 3rd party IoL node to apply its authorization and access policies. 

Although Multi-Company/User/Device Nodes could obtain a digital certificate for each of its platform users (i.e. companies) and ensure their identity as such using the mutual TLS model, the ONE Record Task Force proposes an complementary identification and authentication approach. 

<img src="file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image008.png" alt="img" style="zoom:55%;" />

It is proposed to use the services of one or more Identity & Authentication Provider/s (IAP) that can register companies, users and other entities such as devices based on policies agreed by the ONE Record community. These IAPs provide authentication and validation as requested.

This second security model intends to cover the use cases where a multi-company/user/device client application is connecting to a ONE Record service, and the server needs to take an authorization decision based on the identity of the end client making the request. This authorization will be based on the use of claims-based technology, in particular:

- The end client is authenticated by a trusted identity provider who has a digital certificate issued by a ONE Record CA;
- The client can attach to the request an authorization token issued by the trusted identity provider;
- The server application can extract from the token the identity of the end client and can also ensure that his identity is endorsed by a trusted identity provider.

![img](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image009.png)

Using OAuth2 Tokens

#### Calling ONE Record API over TLS and OAuth2

- 1R API requires TLS mutual authentication;
- 1R API requires OAuth2 authentication using OpenID Connect Code Flow;
- 1R API validates TLS client authentication;
- 1R API validates ID token to check if the token is signed by a trusted IAP.

#### OAuth2 Auth - OpenID Connect Code Flow

1. Client prepares an authentication request containing the desired request parameters.
2. Client sends the request to the authorization server.
3. Authorization server authenticates the end-user.
4. Authorization server obtains end-user consent/authorization.
5. Authorization server sends the end-user back to the client with an authorization code.Client requests a response using the authorization code at the token endpoint.
6. Client receives a response that contains an ID token and access token in the response body.
7. Client validates the ID token and retrieves the end-user's subject identifier.

#### Token Validation Process

The security model enforces the concept of “trusted identity provider”, this implies that the server must ensure that the token is issued by a trusted party. This validation implies these steps:

- Parsing;
- Loading IAP’s public key;
- Validate signature;
- TRUST IAP validation through by doing validate if the public key linked with a trusted certificate.

## Federated trust centres

### PKI Compliance

Mutual TLS requires the use of digital certificates that were issued by trusted Certificate Authorities (CAs). It is proposed that trusted organizations like IATA and/or other industry bodies provide such CA services to their IoL stakeholders. 

It is essential that all these IoL CAs operate on the same basis, i.e. that they implement the same registration and operational policies. It is therefore proposed that these CA’s federate under a common agreement that they jointly develop, sign and maintain. 

#### Certificate profile 1 – Client 

It is recommended to use client certificates with only the clientAuthentication EKU, in order to simplify the issuance process and reduce audit complexity. Example of ONE Record Client Certificate:

<img src="file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image010.png" alt="img" style="zoom:33%;" />

#### Certificate profile 2 – Server 

It is recommended to use TLS server certificates of type “Domain Validated”, that don’t contain company name or other identity attributes, in order to simplify the issuance process and reduce audit complexity. Example of ONE Record Server Certificate:

<img src="file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image011.png" alt="img" style="zoom: 33%;" />



#### Requirements for Certificate Authorities (CAs)

- Issue and authenticate valid ONE Record certificates
- Must be internationally accredited to issue public certificates
- Meets ONE Record requirements for registration and service levels
- Is federated with other certificate authorities and identity & authentication services

![img](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image012.png)

CA Requirements

### Trusted IAP

Similarly, the OAuth2 security model requires that Identity and Authentication Providers provide a service to their stakeholders that must also be operated on the same basis, i.e. using the same registration and operational policies.

It is therefore proposed that both CAs and IAPs operate under the same ONE Record and IoL data security agreement that allows CAs and IAPs to offer a federated trust environment to the transport and logistics industry.

Although ONE Record and IoL are open initiatives and aim to create a global network for data sharing and connectivity, these CA’s and IAPs’ will incur cost that they may pass on to the registrants. This should be considered the cost of security. It is very well possible that as the IoL grows, that the CA’s and IAP’s find business models that would allow them to provide these security services for free to their stakeholders.

#### Trusted IAP validation

 

![img](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image013.png) 

## Resources available for interested parties

With the purposes of implementing this security concept in pilot or real projects, IATA has made available to all interested parties a platform that provides the necessary services for:

- Issuing Client and Server Digital Certificates, for TLS Authentication. This will facilitate to obtain certificates conforming to the profiles defined by IATA and issued out of a publicly trusted certification authority;
- Obtaining digital identities compatible with OpenID Connect and OAuth2, for token-based authorization purposes.

Additionally, IATA can deliver guidelines and sample code that illustrate the processes for client and server authentication, using TLS and/or OAuth2 methods. 

# Glossary 

| **Term**                               | **Description**                                              |      |      |
| -------------------------------------- | ------------------------------------------------------------ | ---- | ---- |
| **ACL**                                | Access Control  List                                         |      |      |
| **Authentication**                     | A process that validates  the identity of IoL participant    |      |      |
| **Authorization**                      | A process that  determines whether a IoL participant is allowed to access a specific  Logistics Object |      |      |
| **Identity & Authentication Provider** | A service that  allows Internet of Logistics participants register and obtain an Public Key  encrypted token identify themselves with ONE Record Servers and get access to  Logistics Objects |      |      |
| **Internet of Logistics (IoL)**        | A network of ONE  Record Clients and Servers that can share Logistics Objects over the internet  using the ONE Record standard data model, APIs and security |      |      |
| **JSON-LD**                            | JSON-LD is a  lightweight Linked Data format. It is easy for humans to read and write. It  is based on the already successful JSON format and provides a way to help  JSON data interoperate at Web-scale. JSON-LD is an ideal data format for  programming environments, REST Web services, and unstructured databases such  as CouchDB and MongoDB. |      |      |
| **Json Web Token (JWT)**               | JSON specification for a token format that includes a user defined  payload and the option for encryption. |      |      |
| **Linked Data**                        | Linked Data empowers people that publish and use information on the  Web. It is a way to create a network of standards-based, machine-readable  data across Web sites. It allows an application to start at one piece of  Linked Data and follow embedded links to other pieces of Linked Data that are  hosted on different sites across the Web. |      |      |
| **Logistics Object**                   | A data object  that represents a meaningful entity in the logistics business. These may represent  documents like air waybills but may also be more granular such as company  details or a transport segment description. Logistics Objects are specified  in a common data model by IATA and transport and logistics partners. |      |      |
| **OAuth2**                             | A protocol for delegation of authentication in a network of secure  systems |      |      |
| **ONE Record Client**                  | A system that can access Logistics Objects on a ONE Record Server.  This system may also have a ONE Record Subscriber API. |      |      |
| **ONE Record Server**                  | The platform that  hosts Logistics Objects on a web server on behalf of one or more companies |      |      |
| **ONE Record Subscriber API**          | A ONE Record  Client API that has dedicated endpoint(s) for receiving Logistics Objects via  a subscription |      |      |
| **Participant**                        | Server that  access or shares data via the Internet of Logistics and that has registered  with an Accredited Identity Provider and has possession of a valid  certificate to prove this |      |      |
| **Publisher**                          | The Party that  makes their Logistics Objects available through a ONE Record Server |      |      |
| **Subscriber**                         | The Party that  subscribes to Logistics Objects in order to receive updates automatically |      |      |
| **URI**                                | In the web  context, this is a URL that uniquely identifies a Logistics Object and a Host |      |      |
| **WAC**                                | Web Access  Control                                          |      |      |

 

  
