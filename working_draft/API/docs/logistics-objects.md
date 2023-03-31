# Create a Logistics Object

This API action is used to create a Logistics Object on a ONE Record server using the POST HTTP method.
This particular Logistics Object MUST be a type of Logistics Object, i.e. data classes that inherit from the class Logistics Object, that is specified in the ONE Record data model.
A list of all possible data classes that inherit from Logistics Object can be found [here](https://onerecord.iata.org/ns/cargo/3.0.0#LogisticsObject).

> **Note:** Although the creation of a Logistics Object is specified in the ONE Record API specification, it is not required to expose an API endpoint for this API action to be compliant with the ONE Record standard. 
The reason for this is that _only the owner of the logistics object_ MAY create a logistics object with any business logic or technology. 
However, it is important that the Logistics Object is created with a [Logistics Object URI](#logistics-object-uri) that is accessible on the logistics Internet.

> Nevertheless, this API action specification is included for reference, because in many cases, the use of HTTP POST is the preferred solution to create resources with REST APIs.

As for all API interactions, the ONE Record client must be authenticated and have the access rights to perform this action.

### Request

The following HTTP header parameters MUST be present in the request

| Header   | Description                         | Examples            |
| ---------------- |  --------------------------------- | ------------------- |
| Accept       | The content type that the ONE Record client wants the HTTP response to be formatted in.        | application/ld+json |
| Content-Type | The content type that is contained with the HTTP body. Valid content types. | application/ld+json |

The HTTP body must contain a valid Logistics Object in the format as specified by the Content-Type in the header.

### Response

A successful request MUST return a `HTTP/1.1 201 Created` status code and the following HTTP headers parameters MUST be present in the response:

| Header | Description     | Examples          |
| --------------- |  ------------- |  ----------------------------------- |
| **Location**    | The URI of the newly created Logistics Object           | https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c |
| **Type**        | The type of the newly created Logistics Object as a URI | https://onerecord.iata.org/ns/cargo/3.0.0#Piece                    |



The following HTTP status codes MUST be supported:

| Code    | Description                                                  | Response body    |
| ------- | ------------------------------------------------------------ | ---------------- |
| **201** | Logistics Object has been created                            | No response body |
| **400** | Invalid Logistics Object                                     | Error            |
| **401** | Not authenticated                                            | Error            |
| **403** | Not authorized to publish the Logistics Object to the server | Error            |
| **415** | Unsupported Content Type                                     | Error            |

### Example 1

Creating a [LogisticsObject](https://onerecord.iata.org/ns/cargo/3.0.0#LogisticsObject) of type [Piece](https://onerecord.iata.org/ns/cargo/3.0.0#Piece)

Request:

```http
POST /logistics-objects HTTP/1.1
Host: 1r.example.com

Content-Type: application/ld+json; version=2.0.0-dev
Accept: application/ld+json; version=2.0.0-dev
--8<-- "examples/Piece.json"
```

_([examples/Piece.json](examples/Piece.json))_

Response:

```bash
HTTP/1.1 201 Created
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c
Content-Type: application/ld+json; version=2.0.0-dev
Type: https://onerecord.iata.org/ns/cargo/3.0.0#Piece
```

### Example 2

Creating a [LogisticsObject](https://onerecord.iata.org/ns/cargo/3.0.0#LogisticsObject) of type [Company](https://onerecord.iata.org/ns/cargo/3.0.0#Company)

Request:

```http
POST /logistics-objects HTTP/1.1
Host: 1r.example.com

Content-Type: application/ld+json; version=2.0.0-dev
Accept: application/ld+json; version=2.0.0-dev

--8<-- "examples/Company.json"
```

_([examples/Company.json](examples/Company.json))_

Response:

```bash
HTTP/1.1 201 Created
Location: https://1r.example.com/logistics-objects/957e2622-9d31-493b-8b8f-3c805064dbda
Content-Type: application/ld+json; version=2.0.0-dev
Type: https://onerecord.iata.org/ns/cargo/3.0.0#Company
```

### Example 3

Creating a [LogisticsObject](https://onerecord.iata.org/ns/cargo/3.0.0#LogisticsObject) of type [Shipment](https://onerecord.iata.org/ns/cargo/3.0.0#Shipment) that links the previously created Piece (see [Example 1](#example-1))

Request:

```http
POST /logistics-objects HTTP/1.1
Host: 1r.example.com

Content-Type: application/ld+json; version=2.0.0-dev
Accept: application/ld+json; version=2.0.0-dev

{
    "@context": {
        "cargo": "https://onerecord.iata.org/ns/cargo/3.0.0#"
    },
    "@type": "cargo:Shipment",
    "cargo:goodsDescription": "Lots of awesome ONE Record information materials",
    "cargo:containedPieces": [{
        "@type": "cargo:Piece",
        "@id": "https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c"
    }]
}
```

_([examples/Shipment.json](examples/Shipment_with_Piece.json))_

Response:

```bash
HTTP/1.1 201 Created
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b3c
Content-Type: application/ld+json; version=2.0.0-dev
Type: https://onerecord.iata.org/ns/cargo/3.0.0#Shipment
```

Three different logistics objects have been published, i.e. they have been created and are accessible via their URIs:

- Piece with the [Logistics Object URI](#logistics-object-uri-louri) `https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c`
- Shipment with the [Logistics Object URI](#logistics-object-uri-louri) `https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b3c`, 
- Company with the [Organization URI](#organization-uri) `https://1r.example.com/logistics-objects/957e2622-9d31-493b-8b8f-3c805064dbda`

This Logistics Objects will be used for the following examples.

# Get a Logistics Object

Each Logistics Object in the Internet of Logistics MUST be accessed via its [Logistics Objects URI](concepts.md#logistics-object-uri) using the HTTP GET method.
This enables the Owner of the Logistics Object to manage access on the level of individual Logistics Objects (see [#access-control] for more information).
If the requester is authorized to access this Logistics Object then the response body MUST include the requested Logistics Object.

If not a historical version is explicitly requested (see [(Retrieve a historical Logistics Object](#retrieve-a-historical-logistics-object)),
the ONE Record server MUST return the latest version of the requested Logistics Object.

Because of Linked Data as a core concept of ONE Record, it could be possible that the requested Logistics Object contains links to other Logistics Object (see Shipment in [Example 3](#example-3)),
If the User of the Logistics Object is interested in this linked data objects (which not necessary have to be on the same ONE Record server) and has the necessary access permissions,
the User of the Logistics Object CAN request those Logistics Objects via their linked Logistics Object URIs.

Although linking logistics objects instead of embedding logistics objects is the preferred and RECOMMENDED approach,
to reduce the number of GET requests, it CAN be helpful to request an embedded version of a Logistics Object by setting the optional query parameter `embedded=true`. 
The ONE Record server SHOULD then replace the linked Logistics Objects with the actual Logistics Objects by resolving the Logistics Object URIs (see [Example 6](#example-6)).

> **Note:** The ONE Record server CAN only resolve and replace linked Logistics Objects that are published  on the same ONE Record server.

## Request

The following query parameters MUST be supported:

| Query parameter   | Description                         | Valid values        |
| ----------------- |    -------------------------------- |   ------------- |
| **embedded** (optional)      | Optional parameter that can be used to request an embedded version of a Logistics Object, if the parameter is not set, a linked version of the Logistics Object is returned  | <ul><li>true</li><li>false</li></ul> |
| **at** (optional)      | Optional parameter that can be used to request a historical version of Logistics Object, if the parameter is not set,   | - |


The following HTTP header MUST be present in the request:

| Header    | Description                                  | Examples                |
| ----------------- |    -------------------------------- |   ------------- |
| **Accept**        | The content type that a ONE Record client wants the HTTP response to be formatted in. This SHOULD include the version of the ONE Record API, otherwise the latest supported ONE Record API MAY be applied. | <ul><li>application/ld+json</li><li>application/ld+json; version=2.0.0-dev</li><li>application/ld+json; version=1.2</li></ul> |



## Response

A successful request MUST return a `HTTP/1.1 200 OK` status code. 
The body of the response includes the Logistics Object in the RDF serialization format that has been requested in the `Accept` header of the request.

The following HTTP headers parameters MUST be present in the response:
| Header      | Description                                  | Example   |
| -------------------- |    --- ------- | ----------------------------- |
| **Content-Type**     | The content type that is contained with the HTTP body.                               | application/ld+json           |
| **Content-Language** | Describes the language(s) for which the requested resource is intended.              | en-US     |
| **Revision**         | The revision of the requested Logistics Object as a non-negative numerical value. This is particularly relevant if the query parameter `at=` is set to request a historical version of the Logistics Object. | 3         |
| **Latest-Revision**  | The latest revision number of the Logistics Object as non-negative numerical value.                      | 3         |
| **Last-Modified**    | Date and time when the Logistics Object was last time changed. See https://developer.mozilla.org/en-US/docs/Web/               | Tue, 21 Feb 2023 07:28:00 GMT |

The following HTTP status codes MUST be supported:

| Code    | Description              | Response body    |
| ------- |  ---------------------- | ---------------- |
| **200** | The request to retrieve the Logistics Object has been successful | Logistics Object |
| **301** | The URI of the Logistics Object has permanently changed.           | No response body |
| **302** | The URI of the Logistics Object has temporarily moved.             | No response body |
| **401** | Not authenticated        | Error            |
| **403** | Not authorized to retrieve the Logistics Object                  | Error            |
| **404** | Logistics Object not found                   | Error            |

## Example 4

Request:

```http
GET /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c HTTP/1.1
Host: 1r.example.com
Accept: application/ld+json; version=2.0.0-dev
```

Response:

```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json
Content-Language: en-US
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c
Type: https://onerecord.iata.org/ns/cargo/3.0.0#Piece
Revision: 1
Latest-Revision: 1

{
   "@context": {
     "api": "https://onerecord.iata.org/api/",
     "@language": "en-US"
   },
    "@type": "https://onerecord.iata.org/ns/cargo/3.0.0#Piece",
    "@id": " https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c",
    "https://onerecord.iata.org/ns/cargo/3.0.0#Piece#goodsDescription": "ONE Record Advertisement Materials",
    "https://onerecord.iata.org/ns/cargo/3.0.0#Piece#handlingInstructions": [
        {
            "@type": "https://onerecord.iata.org/ns/cargo/3.0.0#HandlingInstructions",
            "https://onerecord.iata.org/ns/cargo/3.0.0#HandlingInstructions#serviceType": "SPH",
            "https://onerecord.iata.org/ns/cargo/3.0.0#HandlingInstructions#serviceDescription": "Valuable Cargo",
            "https://onerecord.iata.org/ns/cargo/3.0.0#HandlingInstructions#serviceTypeCode": "VAL"
        }
    ]
}
```

_(cf. [examples/Piece_with_id.json](examples/Piece_with_id.json))_

## Example 5
This is an example for an unsuccessful HTTP GET request that results in an error.

Request:

```http
GET /logistics-objects/11ccfb7c-3643-41db-8098-740fccd97c93 HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json
Accept: application/ld+json
```

Response:

```bash
HTTP/1.1 403 Forbidden
Content-Language: en-US
Content-Type: application/ld+json

--8<-- "examples/Error_403.json"
```

_(cf. [examples/Error_403.json](examples/Error_403.json))_

## Example 6

This is an example for a HTTP GET request that asks the ONE Record server to embed the linked Logistics Objects.

Request:

```http
GET /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c?embedded=true HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json
Accept: application/ld+json
```

Response:

```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json
Content-Language: en-US
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c
Type: https://onerecord.iata.org/ns/cargo/3.0.0#Piece
Revision: 1
Latest-Revision: 1

--8<-- "examples/Piece_with_id.json"
```

_(cf. [examples/Piece.json](examples/Piece_with_id.json))_

# Update a Logistics Object

==b:b0 has to be replaced and generated by the server==

==check if datatype if not is LogisticsObject and is part of cargo ontology==
==



In ONE Record, Logistics Objects CAN be updated.

In ONE Record, only the `Owner of the Logistics Object` can make changes.

However, `Users of the Logistics Object` can submit so-called `ChangeRequests` to the owner, which follow a structure described in this section.

In ONE Record, the HTTP PATCH method is used to update a logistics object.
As per W3C HTTP standard, PATCH is used for partial changes to a resource.
This differs from the HTTP PUT method that is used for the complete replacement of a resource.

Logistics Objects MUST have a revision number, which is a non negative integer to be incremented after every applied change.
The audit trail contains a field latestRevision which defines the latest revision of the Logistics Object.



**Linked Data PATCH Format**

Although ONE Record API specification does not put much emphasis on the use of [RDF](https://www.iata.org/contentassets/a1b5532e38bf4d6284c4bf4760646d4e/one_record_tech_insight_the_power_of_ontologies.pdf),
it is important that the specification of RDF is fully respected to ensure that ONE Record remains compatible with RDF technologies, such as the use of graph queries.

W3C has developed the [Linked Data PATCH Format](https://www.w3.org/TR/ldpatch/) for describing changes to Linked Data.
It defines a list of operations to be performed against a Linked Data resource, namely the addition or removal of RDF triples in a graph representation of the resource.

This Linked Data PATCH Format provides many options for updating RDF but since ONE Record uses JSON-LD as the RDF Serialization,
the ONE Record API specification follows the [JSON-LD PATCH](https://github.com/digibib/ls.ext/wiki/JSON-LD-PATCH) specification and limits the options for changing Logistics Objects to two actions only: delete and add.

The combination of delete and add is equivalent to replace.
Thus, any property in a Logistics Object can be _deleted_, _added_, or _replaced_.

**Rules and recommendations related to updating Logistics Objects:**

- Only the Owner of a Logistics Object MAY make the change to the data.
- Any User of a Logistics Object CAN request a change on the Logistics Object, which is referred to as `ChangeRequest`
- The Owner of a Logistics Object CAN apply the `ChangeRequest` to the Logistics Object changes unless there is a business or technical reason to reject it.
- Evaluation of a `ChangeRequest` occurs as a single (atomic) event. Operations are sorted and processed as two groups of (1) delete operations and (2) add operations until all operations are applied, or else the entire PATCH fails.
- If the PATCH is successful, the revision number of a Logistics Object's `AuditTrail` is incremented and the changes are recorded in the Audit Trail. Please refer to the sections on [Historical Logistics Objects](#historical-logistics-object) and [Audit Trail of Logistics Objects](#audit-trail-of-logistics-object) for more details.
- It is RECOMMENDED to get the latest version of Logistics Object before creating a `ChangeRequest` to ensure that the change is made to the latest version of the Logistics Object.
- If a `ChangeRequest` is rejected by the Owner of the Logistics Object, the revision number of the Logistics Object is not incremented but the requests is added to the Audit Trail of this Logistics Object, marked with the status `REJECTED`.
- Application of a ChangeRequest MUST occur as a single event. Operations are sorted and processed as groups of delete and then add operations until the operations are applied, or the entire PATCH fails. Meaning that if a field update fails, the whole PATCH request is unsuccessful. No partial updates should be accepted.
- Rejected ChangeRequests are kept in the AuditTrail of the Logistics Object.
- After a ChangeRequest is accepted, other PENDING ChangeRequests that affect the same revision MUST be rejected.

The ChangeRequest is a data class of the [ONE Record API ontology](assets/ONE-Record-API-Ontology.ttl).
The properties and relationships to other data classes in visualized in the following class diagram.

```mermaid
classDiagram
    direction LR

    class LogisticsObject{
    }

    class Organization{
    }

    class ChangeRequest{
        + affectedLogisticsObject:LogisticsObject
        + callbackUrl: xsd:anyURI [0..1]
        + description: xsd:string [0..1]
        + errors[]: Error [*]
        + operations[]: Operation [1..*]
        + requestedAt: xsd:dateTime
        + requestedBy: Organization
        + revision: xsd:nonNegativeInteger
        + status: RequestStatus = PENDING
    }
    ChangeRequest "1" --> "*" Error
    ChangeRequest "1" --> "*" LogisticsObject
    ChangeRequest "1" --> "1..*" Operation
    ChangeRequest "1" --> "*" Organization
    ChangeRequest --> RequestStatus

    class Error{
        + details[]: ErrorDetails [1..*]
        + title: xsd:string
    }
    Error "1" --> "*" ErrorDetails

    class ErrorDetails{
        + code: xsd:string
        + message: xsd:string [0..1]
        + property: xsd:anyURI [0..1]
        + resource: xsd:anyURI [0..1]
    }

    class Operation{
        + o: OperationObject
        + op: OperationEnum
        + p: xsd:anyURI
        + s: xsd:string
    }
    Operation "1" --> "1" OperationObject
    Operation --> OperationEnum

    class OperationObject{
        + datatype: xsd:anyURI
        + value: xsd:string
    }

     class RequestStatus{
        <<Enumeration>>
        PENDING
        ACCEPTED
        REJECTED
    }

    class OperationEnum{
        <<Enumeration>>
        ADD
        DEL
    }
```

## Request

The following HTTP header parameters MUST be present in the PATCH request:

| Request Header   | Description                  | Examples            |
| ---------------- |  -------------------------- | ------------------- |
| **Accept**       | The content type that you want the HTTP response to be formatted in. | application/ld+json |
| **Content-Type** | The content type that is contained with the HTTP body.               | application/ld+json |

## Response

A successful PATCH request has no content as response body. However, meta information about the submitted ChangeRequest is returned.
The following HTTP header parameters MUST be present in the response:

| HTTP Response Header | Description                 | Example                |
| -------------------- |  ----- |   -------------------------------- |
| **Location**         | The URI of the submitted ChangeRequest          | https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c/audit-trail/change-requests/6b948f9b-b812-46ed-be39-4501453da99b |
| **Type**             | The type of the newly created resource as a URI | https://onerecord.iata.org/api/ChangeRequest                   |

Otherwise, an `Error` object with `ErrorDetails` as response body MUST be returned with the following HTTP headers:

| HTTP Response Header | Description                     | Example             |
| -------------------- |  ----------------------------- | ------------------- |
| **Content-Type**     | The content type that is contained with the HTTP body.                  | application/ld+json |
| **Content-Language** | Describes the language(s) for which the requested resource is intended. | en-US               |

The following HTTP status codes MUST be supported:

| Code    | Description | Response body    |
| ------- | ----------- | ---------------- |
| **204** | The update has been successful | No body required |
| **400** | The update request body is invalid                             | Error            |
| **401** | Not authenticated                          | Error            |
| **403** | Not authorized to update the Logistics Object                  | Error            |
| **404** | Logistics Object not found                 | Error            |
| **415** | Unsupported Content Type, response when the client sends a PATCH document format that the server does not support for the resource identified by the Request-URI.  | Error            |
| **422** | Unprocessable request, when the server understands the PATCH document and the syntax of the PATCH document appears to be valid, but the server is incapable of processing the request. | Error            |

==TODO: Deny off adding new Logistics Objects==
==TODO: Deny the creation of Logistics Objet with a PATCH Request==

## Example 7

In the example below, a [Piece](https://onerecord.iata.org/ns/cargo/3.0.0#Piece) is modified by setting the property [goodsDescription](https://onerecord.iata.org/ns/cargo/3.0.0#goodsDescription) to `"BOOKS"` and change the property [coload](https://onerecord.iata.org/ns/cargo/3.0.0#coload) from `TRUE` to `FALSE`.
This results in the following operations that MUST to be part of the [ChangeRequest](https://onerecord.iata.org/api#ChangeRequest):

1. add the value `"BOOKS"` (xsd:string) to the property [goodsDescription](https://onerecord.iata.org/ns/cargo/3.0.0#goodsDescription) of [Piece](https://onerecord.iata.org/ns/cargo/3.0.0#Piece)
2. delete the value `TRUE` (xsd:boolean) from property [coload](https://onerecord.iata.org/ns/cargo/3.0.0#coload) of [Piece](https://onerecord.iata.org/ns/cargo/3.0.0#Piece)
3. add the value `FALSE` (xsd:boolean) to property [coload](https://onerecord.iata.org/ns/cargo/3.0.0#coload) of [Piece](https://onerecord.iata.org/ns/cargo/3.0.0#Piece)

Request:

```http
PATCH /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json
Accept: application/ld+json

--8<-- "examples/ChangeRequest_example1.json"
```

_([examples/ChangeRequest_example1.json](examples/ChangeRequest_example1.json))_

Response:

```bash
HTTP/1.1 204 No Content
Content-Type: application/ld+json
Type: https://onerecord.iata.org/api/ChangeRequest
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c/audit-trail/change-requests/6b948f9b-b812-46ed-be39-4501453da99b
```

## Example 8

In the example below, Piece#grossWeight is added.
This results in the following operations that MUST to be part of the ChangeRequest:

1. add the embedded object [Value](https://onerecord.iata.org/ns/cargo/3.0.0#Value)(unit="KGM", value=20.0) to the property Piece#grossWeight

Request:

```http
PATCH /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json
Accept: application/ld+json

--8<-- "examples/ChangeRequest_example2.json"
```

_([examples/ChangeRequest_example2.json](examples/ChangeRequest_example2.json))_

Response:

```bash
HTTP/1.1 204 No Content
Content-Type: application/ld+json
Type: https://onerecord.iata.org/api/ChangeRequest
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c/audit-trail/change-requests/6b948f9b-b812-46ed-be39-4501453da99c
```

## Example 9

In the example below, Piece#grossWeight is deleted.
This results in the following operations that MUST to be part of the ChangeRequest:

1. delete the embedded object [Value](https://onerecord.iata.org/ns/cargo/3.0.0#Value)(unit="KGM", value=20.0) from the property Piece#grossWeight

Request:

```http
PATCH /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json
Accept: application/ld+json

--8<-- "examples/ChangeRequest_example3.json"
```

_([examples/ChangeRequest_example3.json](examples/ChangeRequest_example3.json))_

Response:

```bash
HTTP/1.1 204 No Content
Content-Type: application/ld+json
Type: https://onerecord.iata.org/api/ChangeRequest
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c/audit-trail/change-requests/6b948f9b-b812-46ed-be39-4501453da99d
```

## Example 10

In the example below, CustomsInformations are added to Piece#customsInfo.
This results in following the workflow:

**1. Create two [CustomsInformation](https://onerecord.iata.org/ns/cargo/3.0.0#CustomsInformation) objects (see [Create a Logistics Object](#create-a-logistics-object))**

Request:

```http
POST /logistics-objects HTTP/1.1
Host: 1r.example.com

Content-Type: application/ld+json; version=2.0.0-dev
Accept: application/ld+json; version=2.0.0-dev

--8<-- "examples/CustomsInformation.json"
```

_([examples/CustomsInformation.json](examples/CustomsInformation.json))_

Response:

```bash
HTTP/1.1 201 Created
Location: https://1r.example.com/logistics-objects/4d73acf0-3073-4ec9-8aee-b82d64ba3805
Content-Type: application/ld+json; version=2.0.0-dev
Type: https://onerecord.iata.org/ns/cargo/3.0.0#CustomsInformation
```

Request:

```http
POST /logistics-objects HTTP/1.1
Host: 1r.example.com

Content-Type: application/ld+json; version=2.0.0-dev
Accept: application/ld+json; version=2.0.0-dev

--8<-- "examples/CustomsInformation_2.json"
```

_([examples/CustomsInformation_2.json](examples/CustomsInformation_2.json))_

Response:

```bash
HTTP/1.1 201 Created
Location: https://1r.example.com/logistics-objects/ba1c2194-2442-400b-b26b-466a01dda8b5
Content-Type: application/ld+json; version=2.0.0-dev
Type: https://onerecord.iata.org/ns/cargo/3.0.0#CustomsInformation
```

**2. Add the URI of the newly created CustomsInformation objects to the property Piece#customsInfos**
Request:

```http
PATCH /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json
Accept: application/ld+json

--8<-- "examples/ChangeRequest_example4.json"
```

_([examples/ChangeRequest_example4.json](examples/ChangeRequest_example4.json))_

Response:

```bash
HTTP/1.1 204 No Content
Content-Type: application/ld+json
Type: https://onerecord.iata.org/api/ChangeRequest
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c/audit-trail/change-requests/6b948f9b-b812-46ed-be39-4501453da99e
```


==TODO: Add example for changing property in bNode==

!!! note
    Removing a bNode, the ONE Record server implementors should handle the cleansing of the triples.
    ONE Record allows the cutting of branches.
    If you want to delete the whole object.

# Get Audit Trail of a Logistics Object

Every time a Logistics Object is requested to be updated as described in the previous section, the details of this request are added to an AuditTrail of a Logistics Object. 
When a ChangeRequest is processed by the owner of a Logistics Object, the status of the ChangeRequest MUST be changed from `PENDING` to `ACCEPTED` or `REJECTED`.

The ChangeRequest data class object details about the success or failure of this request, e.g. timestamps, any errors that occurred, in addition to the operations to be applied to a LogisticsObject.

The AuditTrail is a data class of the [ONE Record API ontology](assets/ONE-Record-API-Ontology.ttl).
The properties and relationships to other data classes in visualized in the following class diagram.

```mermaid
classDiagram
    direction LR

    class LogisticsObject{
    }

    class Organization{
    }

    class AuditTrail{        
        + changeRequests[]: ChangeRequest [*]        
        + latestRevision: xsd:nonNegativeInteger        
        + logisticsObject: LogisticsObject
    }

    AuditTrail "1" --> "1" LogisticsObject
    AuditTrail "1" --> "*" ChangeRequest

    class ChangeRequest{
        + affectedLogisticsObject:LogisticsObject
        + callbackUrl: xsd:anyURI [0..1]
        + description: xsd:string [0..1]
        + errors[]: Error [*]
        + operations[]: Operation [1..*]
        + requestedAt: xsd:dateTime
        + requestedBy: Organization
        + revision: xsd:nonNegativeInteger
        + status: RequestStatus = PENDING
    }
    ChangeRequest "1" --> "*" Error
    ChangeRequest "1" --> "*" LogisticsObject
    ChangeRequest "1" --> "1..*" Operation
    ChangeRequest "1" --> "*" Organization
    ChangeRequest --> RequestStatus

    class Error{
        + details[]: ErrorDetails [1..*]
        + title: xsd:string
    }
    Error "1" --> "*" ErrorDetails

    class ErrorDetails{
        + code: xsd:string
        + message: xsd:string [0..1]
        + property: xsd:anyURI [0..1]
        + resource: xsd:anyURI [0..1]
    }

    class Operation{
        + o: OperationObject
        + op: OperationEnum
        + p: xsd:anyURI
        + s: xsd:string
    }
    Operation "1" --> "1" OperationObject
    Operation --> OperationEnum

    class OperationObject{
        + datatype: xsd:anyURI
        + value: xsd:string
    }

     class RequestStatus{
        <<Enumeration>>
        PENDING
        ACCEPTED
        REJECTED
    }

    class OperationEnum{
        <<Enumeration>>
        ADD
        DEL
    }
```

> **Note:** Only the owner of the Logistics Object is responsible for updating the AuditTrail.
> The users of the Logistics Object CAN only retrieve the Audit Trail. 

The ONE Record client CAN specify a date-time window.

The AuditTrail of a Logistics Object can be retrieved by performing a GET request to the Logistics Object URI appended by: "/audit-trail", e.g.
[https://1r.example.com/logistics-objects/11ccfb7c-3643-41db-8098-740fccd97c93/audit-trail](https://1r.example.com/logistics-objects/11ccfb7c-3643-41db-8098-740fccd97c93/audit-trail)

In order to retrieve the history of a Logistics Object between two dates, a query parameter should be added to the request URL as follows: "?updated-from=YYYYMMDDThhmmssZ&updated-to=YYYYMMDDThhmmssZ"

## Request

The following query parameters MUST be supported:

| Query parameter   | Description | Valid values |
| ------------------| ----------- | ------------ |
| **updated-from**  |             |              | 
| updated-to        |             |              |
| **status** (optional) |             | <ul><li>PENDING</li><li>ACCEPTED</li><li>REJECTED</li> |


The following HTTP header parameters MUST be present in the request:

| **Request Header**       | Description                       |
| ---------------- |    ----- |
| **Accept**       | The content type that you want the HTTP response to be formatted in. Valid content types include: ▪ application/x-turtle or text/turtle ▪ application/ld+json |
| **Content-Type** | The content type that is contained with the HTTP body. Valid content types include: ▪ application/x-turtle or text/turtle ▪ application/ld+json               |

## Response

A successful GET request MUST return the following response body.

The response body follows the API AuditTrail class structure.

| AuditTrail | Description                           | Required | Class                 |
| ---------------------------- |  --- ---------- | -------- | --------------------- |
| **affectedLogisticsObject**  | Logistics Object that is affected by ChangeRequests in AuditTrail              | y        | cargo:LogisticsObject |
| **changeRequests**           | List of change requests that were sent as PATCH for a Logistics Object        | y        | api:ChangeRequest     |
| - requestedBy                | The party that has requested the change request, i.e. the person or department within the company | y        | cargo:Organization    |
| - status                     | PENDING or ACCEPTED or REJECTED       | y        | Enumeration           |
| - requestedAt                | Timestamp of the change request       | y        | w3c:DateTime          |
| - affectedLogisticsObject    | Logistics Object that is affected by ChangeRequests        | y        | cargo:LogisticsObject |
| - operations                 | Logistics Object that is affected by ChangeRequests        | y        | api:Operation         |
| **errors**                   | Mandatory only if patchRequest was rejected. Otherwise Optional               | y/n      | api:Error             |
| - title  | Brief description of the error        | y        | w3c:String            |
| - details                    | error details                         | n        | api:ErrorDetails      |
| -- attribute                 | Field of the object for which the error applies           | n        | vw3c:String           |
| -- code  | Error code        | y        | w3c:String            |
| -- message                   | Detailed error message                | n        | w3c:String            |
| -- resource                  | Object for which the error applies                        | n        | w3c:String            |

## Example 11

The following example shows an AuditTrail response. 
For clarity, the main elements of the changeRequest object are collapsed.

Examples for a ChangeRequest itself is shown below this AuditTrail example

Request:

```http
GET /logistics-objects/11ccfb7c-3643-41db-8098-740fccd97c93/audit-trail?updated-from=20200905T000000Z&updated-to=20200909T000000Z HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json
Accept: application/ld+json
```

Response:

```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json
Content-Language: en-US

{    
  "@type": "api:AuditTrail",
  "@context": {
    "cargo": "https://onerecord.iata.org/ns/cargo/3.0.0#",
    "api": "https://onerecord.iata.org/api/",
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
      "api:AuditTrail#errors": [...This field contains errors if any were found when processing the change request....],
      "api:AuditTrail#logisticsObjectRef": {...}
    }  ]
}


```

An example of an AuditTrail with ChangeRequests with Errors is shown in the next section.

> 🚧🚧🚧 TODO 🚧🚧🚧

# Retrieve a historical Logistics Object

In ONE Record, data is updated in real time and every time a ChangeRequest is applied successfully, a new version of the Logistics Object and only the latest content is available via its URI.
However, there is a need to retrieve a specific version of a data object at a specific point in time, for example the [Master Air Waybill (MAWB)](https://onerecord.iata.org/ns/cargo/3.0.0#Waybill).

> Note: Reverting to a previous version of a Logistics Object with PATCH is not supported as out of scope of ONE Record.

An ONE Record server MUST enable the ONE Record client to request an historical version of a Logistics Object using the `?at=` query parameter of the Logistics Object GET endpoint.
This `?at=` parameter MUST accept past datetime strings in ISO 8601 UTC using the following format: `YYYYMMDDThhmmssZ`

Example: [https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c?at=20190926T075830Z](https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c?at=20190926T075830Z)

This datetime value MUST be in the past.
If this parameter is before the creation date of the Logistics Object, `404 Not Found` is returned.
If this parameter is in the future, `400 Bad Request` is returned.

To ensure consistency when following the linked objects in a response, all linked Logistics Object in the response body MUST also contain the `?at=`query parameter with the same provided datetime value.

## Example 12

Request:

```http
GET /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c?at=20190926T075830Z HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json
Accept: application/ld+json
```

Response:

```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json
Content-Language: en-US
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c?at=20190926T075830Z
Type: https://onerecord.iata.org/ns/cargo/3.0.0#Piece
Revision: 3
Latest-Revision: 4

{
    "@context": {
        "cargo": "https://onerecord.iata.org/ns/cargo/3.0.0#",
        "@language": "en-US"
    },
    "@type": "https://onerecord.iata.org/ns/cargo/3.0.0#Piece",
    "@id": " https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c?at=20190926T075830Z",
    "https://onerecord.iata.org/ns/cargo/3.0.0#Piece#goodsDescription": "ONE Record Advertisement Materials",
    "https://onerecord.iata.org/ns/cargo/3.0.0#Piece#handlingInstructions": [
        {
            "@type": "https://onerecord.iata.org/ns/cargo/3.0.0#HandlingInstructions",
            "https://onerecord.iata.org/ns/cargo/3.0.0#HandlingInstructions#serviceType": "SPH",
            "https://onerecord.iata.org/ns/cargo/3.0.0#HandlingInstructions#serviceDescription": "Valuable Cargo",
            "https://onerecord.iata.org/ns/cargo/3.0.0#HandlingInstructions#serviceTypeCode": "VAL"
        }
    ],
    "https://onerecord.iata.org/ns/cargo/3.0.0#Piece#customsInfos": [
        {
            "@type": "https://onerecord.iata.org/ns/cargo/3.0.0#CustomsInformation",
            "@id": "https://1r.example.com/logistics-objects/4d73acf0-3073-4ec9-8aee-b82d64ba3805?at=20190926T075830Z"
        },
        {
            "@type": "https://onerecord.iata.org/ns/cargo/3.0.0#CustomsInformation",
            "@id": "https://1r.example.com/logistics-objects/ba1c2194-2442-400b-b26b-466a01dda8b5?at=20190926T075830Z"
        }
    ]
}
```

_([examples/Piece_with_id.json](examples/Piece_with_id.rev3.json))_


!!! note

    301 and 302 and 307 HTTP Status Code
