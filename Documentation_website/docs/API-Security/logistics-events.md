Logistics events are events related to the management and execution of transport and logistics services and document the occurrence of actions, discrepancies, or status changes. These events can be either internal or external to an organization and can include transportation, warehousing, inventory management, supply chain optimization, and other related activities. Examples of logistics events include the departure of an aircraft or the acceptance of shipments in a warehouse.

**Guidelines for Logistics Events in ONE Record:**

- Logistics Events are immutable. They MUST NOT be changed after creation.
- List of logistics Events attached to Logistics Objects are event stores. This event store is an append-only log. Events CAN be added by using the HTTP POST method (see [Create a Logistics Event](#create-a-logistics-event)) but MUST NOT be changed or deleted.
- Logistics Events are neither logistics objects nor embedded object
- Every Logistics Events MUST an URI, that follows the following structure: 
    - {{baseURL}}/logistics-object/{{logisticsObjectId}}/logistics-events/{{logisticsEventId}} where {{logisticsEventId}} is an identifier which can be globally unique and must be unique in the context of its parent Logistics Object
- A Logistics Event MUST be linked to exactly one Logistics Object
- Every Logistics Event MUST have a property `eventDate (xsd:dateTime)`

# Logistics Events URI

Each Logistics Event MUST have globally unique IRI and MUST have a unique identifier in the context of its parent Logistics Object. The implementor can use the same algorithm as the Logistics Object ids. For more information check the section [Logistics Objects URI](./concepts.md#logistics-object-uri)


# Create a Logistics Event

Logistics Events (also known as status updates) in ONE Record can be added to any Logistics Objects 
by sending a HTTP POST request containing a [LogisticsEvent](https://onerecord.iata.org/ns/cargo#LogisticsEvent) object to the `/logistics-events` endpoint of a LogisticsObject.

As for all API interactions, the ONE Record client must be authenticated and have the access rights to perform this action.

As Logistics Events MUST be associated with a specific Logistics Object, creating Logistics Events requires the existence of a Logistics Object. 

## Endpoint

``` 
 POST {{baseURL}}/logistics-objects/{{logisticsObjectId}}/logistics-events
```

## Request

The following HTTP header parameters MUST be present in the request:

| Request Header   | Description                         | Examples            |
| ---------------- |  --------------------------------- | ------------------- |
| **Accept**       | The content type that the ONE Record client wants the HTTP response to be formatted in.        | application/ld+json |
| **Content-Type** | The content type that is contained with the HTTP body. Valid content types. | application/ld+json |

The HTTP request body must contain a valid [LogisticsEvent](https://onerecord.iata.org/ns/cargo#LogisticsEvent) in the format as specified by the Content-Type in the header.

The LogisticsEvent is a data class of the [ONE Record cargo ontology](https://onerecord.iata.org/ns/cargo).
The properties and relationships to other data classes are visualized in the following class diagram.

```mermaid
classDiagram   
    direction LR   

    class LogisticsObject{                
    }

    class Actor{        
    }  

    class Organization{            
    }  

    class Location{        
    }  

    class ExternalReference{        
    }  
    
    class CodeListElement{        
    }  

    class EventTimeType{   
        <<Enumeration>>
        ACTUAL
        ESTIMATED
        EXPECTED
        PLANNED
        REQUESTED   
    }  

    class LogisticsEvent{
        + partialEventIndicator: xsd:boolean [0..1]
        + creationDate: xsd:dateTime [0..1]
        + eventCode: CodeListElement [0..1]
        + eventDate: xsd:dateTime [0..1]
        + eventName: xsd:string [0..1]
        + eventTimeType: EventTimeType [0..1]
        + externalReferences: ExternalReference 
        + eventFor: LogisticsObject [0..1]
        + eventLocation: Location [0..1]
        + recordingOrganization: Organization [0..1]
        + recordingActor: Actor [0..1]

    }
    LogisticsEvent "1" --> "0..*" ExternalReference
    LogisticsEvent "1" --> "0..1" LogisticsObject
    LogisticsEvent "1" --> "0..1" Location
    LogisticsEvent "1" --> "0..1" Organization
    LogisticsEvent "1" --> "0..1" Actor
    LogisticsEvent "1" --> "0..1" EventTimeType
    LogisticsEvent "1" --> "0..1" CodeListElement
```

## Response

One of the following HTTP response codes MUST be present in the response:

| Code    | Description                             | Response body |
| ------- |  -------------------------------------- | ------------- |
| **201** | Logistics Event has been created            | No content    |
| **400** | Invalid Logistics Event                     | Error         |
| **401** | Not authenticated, invalid or expired token | Error         |
| **403** | Not authorized to perform action            | Error         |
| **404** | Logistics Object not found                  | Error         |
| **415** | Unsupported Content Type                    | Error         |
| **500** | Internal Server Error                       | Error         |


A successful request MUST return a `HTTP/1.1 201 Created` status code and the following HTTP headers parameters MUST be present in the response:

The following HTTP headers parameters MUST be present in the response:

| Response Header | Description     | Examples          |
| --------------- |  ------------- |  ----------------------------------- |
| Location    | The URI of the newly created Logistics Event           | https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b3c/logistics-events/afb4b8cf-288a-459c-97fd-ccd538ec527f |
| Type        | The type of the newly created Logistics Object as a URI | https://onerecord.iata.org/ns/cargo#LogisticsEvent                    |

## Security

To engage with the "Create a Logistics Event" endpoint, a client needs proper authentication and authorization to access the designated resource. If requests lack proper authentication, the ONE Record server should respond with a `401 "Not Authenticated"` status. Conversely, for requests without proper authorization, a `403 "Not Authorized"` response should be provided.

The implementor has the option to allow all authenticated users the capability to create a Logistics Event. This implies that there would be no access control enforced for this particular endpoint.

## Example A1

Request:

```http
POST /logistics-objects/1a8ded38-1804-467c-a369-81a411416b3c/logistics-events HTTP/1.1
Host: 1r.example.com

Content-Type: application/ld+json; version=2.2.0
Accept: application/ld+json; version=2.2.0

--8<-- "API-Security/examples/LogisticsEvent.json"
```

_([LogisticsEvent.json](./examples/LogisticsEvent.json))_

Response:

```bash
HTTP/1.1 201 Created
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b3c/logistics-events/afb4b8cf-288a-459c-97fd-ccd538ec527f
Content-Type: application/ld+json; version=2.2.0
Type: https://onerecord.iata.org/ns/cargo#LogisticsEvent
```

## Example A2

In the following example, a ONE Record client tries to submit a Logistics Event to a non existing Logistics Object.

Request:

```http
POST /logistics-objects/1a8ded38-1804-467c-c369-81a411416b7c/logistics-events HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json; version=2.2.0
Accept: application/ld+json; version=2.2.0

--8<-- "API-Security/examples/LogisticsEvent.json"
```

_([LogisticsEvent.json](./examples/LogisticsEvent.json))_

Response:

```bash
HTTP/1.1 404 Not Found
Content-Language: en-US
Content-Type: application/ld+json; version=2.2.0

--8<-- "API-Security/examples/Error_404.json"
```

_([Error_404.json](./examples/Error_404.json))_

# Create multiple Logistics Events

In some scenarios, the same Logistics Event must be recorded against multiple Logistics Objects simultaneously (e.g., a departure event that applies to a Shipment and all its Pieces). To reduce the number of HTTP calls required and improve efficiency, a ONE Record server MAY support the creation of a single Logistics Event targeting multiple Logistics Objects by sending an HTTP POST request to the root-level /logistics-events endpoint.

In this case, `cargo:eventFor` MUST be provided as an array of Logistics Object references. Each referenced Logistics Object is evaluated independently: the server MUST apply access control checks per individual Logistics Object and MUST create the event for each Logistics Object for which the client is authorized and that exists.

Partial success is explicitly supported. If one or more target Logistics Objects are invalid (not found or unauthorized), the server MUST still process the remaining valid targets and MUST return a 207 Multi-Status response detailing the outcome for each referenced Logistics Object.

!!! note

    Support for this endpoint is OPTIONAL. ONE Record clients SHOULD fall back to individual `POST /logistics-objects/{{logisticsObjectId}}/logistics-events` calls if the server does not advertise support for the multi-target endpoint.

## Endpoint

```
POST {{baseURL}}/logistics-events
```

## Request

The following HTTP header parameters MUST be present in the request:

| Request Header | Description | Examples |
|--|--|--|
| Accept | The content type that the ONE Record client wants the HTTP response to be formatted in. | application/ld+json |
| Content-Type | The content type that is contained with the HTTP body. Valid content types. | application/ld+json |

The HTTP request body MUST contain a valid `LogisticsEvent` in the format specified by the `Content-Type` in the header. The `cargo:eventFor` property MUST be an array containing at least two Logistics Object references. Using a single reference in `cargo:eventFor` is valid but clients SHOULD prefer the existing `POST /logistics-objects/{{logisticsObjectId}}/logistics-events` endpoint in that case.

All other constraints applicable to single-target Logistics Event creation apply equally here: the event MUST have a valid `eventDate`, MUST be immutable after creation, and MUST comply with the ONE Record cargo ontology.

## Response

One of the following HTTP response codes MUST be present in the response:

| Code | Description | Response body |
|--|--|--|
| 207 | Multi-Status: the event was processed against each target individually. The response body contains per-target outcome details. | Multi-Status result |
| 400 | Invalid request body or missing required fields (e.g., missing `eventDate`, empty `cargo:eventFor` array) | Error |
| 401 | Not authenticated, invalid or expired token | Error |
| 415 | Unsupported Content Type | Error |
| 500 | Internal Server Error | Error |

A request to this endpoint MUST return `HTTP/1.1 207 Multi-Status`. Note that `401` and `415` are the only response codes where the entire request fails before per-object evaluation begins. Individual target failures (e.g., `403`, `404`) are reported inside the `207` response body and MUST NOT cause the entire request to fail.

The response body MUST contain a `api:MultiStatusResponse` with one `api:hasCreationResult` entry per referenced Logistics Object. Each entry MUST include:

- `api:hasHTTPStatus` — the HTTP status code for that individual target (`201`, `403`, or `404`)
- `api:hasLogisticsObject` — the URI of the target Logistics Object
- `api:hasLogisticsEvent` — the URI of the newly created Logistics Event (only present when `api:hasHTTPStatus` is `201`)
- `api:hasError` — an `api:ErrorDetail` object (only present when `api:hasHTTPStatus` is `403` or `404`)

```mermaid

    class MultiStatusResponse{
        + hasTotalItems: xsd:nonNegativeInteger  
        + hasTotalFailed: xsd:nonNegativeInteger 
        + hasTotalCreated: xsd:nonNegativeInteger 
        + hasCreationResult: EventCreationResult [1..*]
    }

    class EventCreationResult{
        + hasLogisticsObject: LogisticsObject
        + hasLogisticsEvent[]: LogisticsEvent 
        + hasHTTPStatus: xsd:nonNegativeInteger
    }

    MultiStatusResponse "1" --> "1..*" EventCreationResult
```

The following HTTP header MUST be present in the response:

| Response Header | Description | Examples |
|--|--|--|
| Content-Type | The content type contained in the HTTP body. | application/ld+json; version=2.2.0 |

## Security

To engage with the "Create a Logistics Event for Multiple Logistics Objects" endpoint, a client needs proper authentication. If a request lacks proper authentication, the ONE Record server MUST respond with a `401 "Not Authenticated"` status.

Authorization is evaluated **per Logistics Object**. The `POST_LOGISTICS_EVENT` permission MUST be checked individually for each entry in `cargo:eventFor`. A client that is authorized for some but not all referenced Logistics Objects will receive a `207 Multi-Status` response. Only Logistics Objects for which the client holds the `POST_LOGISTICS_EVENT` permission and which exist on the server MUST result in event creation.

This per-object authorization model ensures that the multi-target endpoint does not bypass the existing access control model defined for individual Logistics Objects.

## Example D1

In the following example, a ONE Record client creates a departure event for a Shipment and two Pieces in a single request. All three targets are found and the client is authorized for all of them.

Request:

```http
POST /logistics-events HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json; version=2.2.0
Accept: application/ld+json; version=2.2.0

--8<-- "API-Security/examples/MultipleEvents_example1.json"
```

_([MultipleEvents.json](./examples/MultipleEvents_example1.json))_

Response:

```bash
HTTP/1.1 207 Multi-Status
Content-Type: application/ld+json; version=2.2.0

--8<-- "API-Security/examples/MultipleEventsResponse_example1.json"
```

_([MultipleEventsResponse.json](./examples/MultipleEventsResponse_example1.json))_

## Example D2

In the following example, a ONE Record client targets three Logistics Objects, but one Piece does not exist (`404`) and the client is not authorized for the other Piece (`403`). The event is successfully created only for the Shipment. The server returns a `207 Multi-Status` reporting the partial outcome.

Request:

```http
POST /logistics-events HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json; version=2.2.0
Accept: application/ld+json; version=2.2.0

--8<-- "API-Security/examples/MultipleEvents_example2.json"
```

_([MultipleEventse_2.json](./examples/MultipleEvents_example2.json))_

Response:

```http
HTTP/1.1 207 Multi-Status
Content-Type: application/ld+json; version=2.2.0

--8<-- "API-Security/examples/MultipleEventsResponse_example2.json"
```

_([MultipleEventsResponse_2.json](./examples/MultipleEventsResponse_example2.json))_

## Example D3

In the following example, a ONE Record client sends a request with a missing `cargo:eventFor` array, which results in a `400 Bad Request`.

Request:

```http
POST /logistics-events HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json; version=2.2.0
Accept: application/ld+json; version=2.2.0

--8<-- "API-Security/examples/MultipleEvents_example3.json"
```

_([MultipleEvents_example3.json](./examples/MultipleEvents_example3.json))_

Response:

```http
HTTP/1.1 400 Bad Request
Content-Language: en-US
Content-Type: application/ld+json; version=2.2.0


--8<-- "API-Security/examples/MultipleEventsResponse_example3.json"
```

_([MultipleEventsResponse_3.json](./examples/MultipleEventsResponse_example3.json))_



# Get a Logistics Event

Each Logistics Event MUST be accessible via its [Logistics Event URI](#logistics-events-uri) using the HTTP GET method.
This enables the Holder of the Logistics Object to manage access on the level of individual Logistics Event (see [Access Control page](./security/access-control.md) for more information).
If the requester is authorized to access this Logistics Event then the response body MUST include the requested Logistics Event.

## Endpoint 

``` 
 GET {{baseURL}}/logistics-objects/{{logisticsObjectId}}/logistics-events/{{logisticsEventId}}
```

## Request

The following HTTP header MUST be present in the request:

| Header    | Description                                  | Examples                |
| ----------------- |    -------------------------------- |   ------------- |
| **Accept**        | The content type that a ONE Record client wants the HTTP response to be formatted in. This SHOULD include the version of the ONE Record API, otherwise the latest supported ONE Record API MAY be applied. | <ul><li>application/ld+json</li><li>application/ld+json; version=2.2.0</li><li>application/ld+json; version=1.2</li></ul> |

## Response

A successful request MUST return a `HTTP/1.1 200 OK` status code. 
The body of the response includes the Logistics Object in the RDF serialization format that has been requested in the `Accept` header of the request.

The following HTTP headers parameters MUST be present in the response:

| Header                | Description                                  | Example   |
| -------------------- |    ---------- | ----------------------------- |
| **Content-Type**     | The content type that is contained with the HTTP body.                               | application/ld+json           |
| **Content-Language** | Describes the language(s) for which the requested resource is intended.              | en-US     |
| **Last-Modified**    | Date and time when the Logistics Object was last time changed. See https://developer.mozilla.org/en-US/docs/Web/               | Tue, 21 Feb 2023 07:28:00 GMT |

The following HTTP status codes MUST be supported:

| Code    | Description              | Response body    |
| ------- |  ---------------------- | ---------------- |
| **200** | The request to retrieve the Logistics Event has been successful     | Logistics Event |
| **301** | The URI of the Logistics Object has permanently changed.            | No response body |
| **302** | The URI of the Logistics Object has temporarily moved.              | No response body |
| **401** | Not authenticated                                                   | Error            |
| **403** | Not authorized to retrieve the Logistics Object                     | Error            |
| **404** | Logistics Object or Logistics Event not found                       | Error            |
| **500** | Internal Server Error                                               | Error            |

## Security

To engage with the "Get a Logistics Event" endpoint, a client needs proper authentication and authorization to access the designated resource. If requests lack proper authentication, the ONE Record server should respond with a `401 "Not Authenticated"` status. Conversely, for requests without proper authorization, a `403 "Not Authorized"` response should be provided.

It's crucial to emphasize that the authorization for logistics events can differ from that of the logistics objects they are associated with. A client might possess access to a logistics event while not having authorization for the corresponding logistics object.

## Example B1

Request:

```http
GET /logistics-objects/1a8ded38-1804-467c-a369-81a411416b3c/logistics-events/afb4b8cf-288a-459c-97fd-ccd538ec527f HTTP/1.1
Host: 1r.example.com
Accept: application/ld+json; version=2.2.0
```

Response:

```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json
Content-Language: en-US
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b3c/logistics-events/afb4b8cf-288a-459c-97fd-ccd538ec527f
Type: https://onerecord.iata.org/ns/cargo#LogisticsEvent
Last-Modified: Tue, 19 Apr 2023 07:28:00 GMT

--8<-- "API-Security/examples/LogisticsEvent_with_id.json"
```

_([LogisticsEvent_with_id.json](./examples/LogisticsEvent_with_id.json))_

## Example B2

In the following example, a ONE Record client tries to get a non-existing Logistics Event

Request:

```http
GET /logistics-objects/1a8ded38-1804-467c-c369-81a411416b7c/logistics-events/afb4b8cf-288a-459c-97fd-ccd538ec527f HTTP/1.1
Host: 1r.example.com
Accept: application/ld+json; version=2.2.0
```

Response:

```bash
HTTP/1.1 404 Not Found
Content-Language: en-US
Content-Type: application/ld+json; version=2.2.0
Type: https://onerecord.iata.org/ns/api#Error

--8<-- "API-Security/examples/Error_404.json"
```

_([Error_404.json](./examples/Error_404.json))_

# Get Logistic Events of a Logistics Object

Logistics events that are linked to a logistics object CAN be retrieved by doing a HTTP GET request to the the `/logistics-events` endpoint of a logistics object.
In addition, only a subset of all linked logistics events can optionally be retrieved by setting filter parameters.

## Endpoint 

``` 
 GET {{baseURL}}/logistics-objects/{{logisticsObjectId}}/logistics-events/
```

## Request

The following HTTP header parameters MUST be present in the request:

| Request Header   | Description                         | Examples            |
| ---------------- |  --------------------------------- | ------------------- |
| **Accept**       | The content type that the ONE Record client wants the HTTP response to be formatted in.        | application/ld+json |
| **Content-Type** | The content type that is contained with the HTTP body. Valid content types. | application/ld+json |

The following HTTP query parameters MUST be supported:

| Query parameter               | Description                                                                           | Valid values                       |
| ----------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------- |
| **event-code** (optional)     | Optional parameter that can be used to filter the logistics events by event code, the values MUST be comma separated | <ul><li>https://onerecord.iata.org/ns/code-lists/StatusCode#FOH or FOH</li><li>https://onerecord.iata.org/ns/code-lists/StatusCode#DEP or DEP</li></ul>  |
| **created-after** (optional)  | Filters the logistics events to only include those created after the specified timestamp                              | <ul><li>20190926T075830Z</li></ul> |
| **created-before** (optional) | Filters the logistics events to only include those created before the specified timestamp                             | <ul><li>20190926T075830Z</li></ul> |
| **occurred-after** (optional) | Filters the logistics events to only include those that occurred after the specified timestamp                        | <ul><li>20190926T075830Z</li></ul> |
| **occurred-before** (optional)| Filters the logistics events to only include those that occurred before the specified timestamp                       | <ul><li>20190926T075830Z</li></ul> |
| **sort** (optional)           | Specifies the sorting order of the logistics events. This parameter expects a timestamp indicating the starting point| <ul><li>ASC-creationDate</li><li>DESC-creationDate</li><li>ASC-eventDate</li><li>DESC-eventDate</li></ul> |
| **limit** (optional)          | Limits the number of logistics events returned. The value is an integer specifying the maximum number of results       | <ul><li>2</li></ul> |
| **skip** (optional)          | Skips a specified number of logistics events before beginning to return results. This is useful for pagination         | <ul><li>5</li></ul> |

!!! note

    The `event-code` query parameter of the API corresponds to the [eventCode](https://onerecord.iata.org/ns/cargo#eventCode) defined in the logistic event class within the [cargo ontology](https://onerecord.iata.org/ns/cargo#). To implement filtering correctly, the implementor MUST retrieve all logistics events where the `@id` of the [eventCode](https://onerecord.iata.org/ns/cargo#eventCode) contains the text specified in the `event-code` query parameter. The `@id` of a code list element is specifically structured to include the code list name and the code itself. For more details on handling code list elements, refer to the [Code Lists page](../Data-Model/code-lists.md).

## Response

A successful request MUST return a `HTTP/1.1 200 OK` status code. 
The response body is formatted accordingly to the format that has been requested in the `Accept` request header.
The body of the response is composed by a [Collection](https://onerecord.iata.org/ns/api#Collection) object containing all [LogisticsEvent](https://onerecord.iata.org/ns/cargo#LogisticsEvent) matching the specified query parameters.

```mermaid
classDiagram   
    direction LR   

    class Collection{    
        + hasItem: LogisticsEvents [0..*]
     	+ hasTotalItems: xsd:nonNegativeInteger [0..1]    
    }
    
    class LogisticsEvent{

    }
    Collection "1" --> "0..*" LogisticsEvent

```


The ONE Record API employs the [Collection](https://onerecord.iata.org/ns/api#Collection) class to return an array of objects. This class encompasses two properties:

- [api:hasItem](https://onerecord.iata.org/ns/api#hasItem) returns the array of objects.
- [api:hasTotalItem](https://onerecord.iata.org/ns/api#hasTotalItem) returns the count of elements for the defined filter without taking into account pagination (i.e. skip or limit parameter).

In this particular case, @id property in the response body MUST be equal to the Endpoint defined in the [Endpoint section](#endpoint_2) (i.e.: https://1r.example.com/logistics-objects/2a7d1338-9033-13xc-b665-81a411418978/logistics-events). 


!!! note

    The ONE Record standard fully adopts the JSON-LD specification, and as a result, the presence of the [api:hasItem](https://onerecord.iata.org/ns/api#hasItem) property of [Collection](https://onerecord.iata.org/ns/api#Collection) is contingent on the number of Logistics Events returned byt the specified query. Specifically:
        
    - If the specified query returns zero Logistics Events, [api:hasItem](https://onerecord.iata.org/ns/api#hasItem) may not appear in the JSON, and [api:hasTotalItem](https://onerecord.iata.org/ns/api#hasTotalItem) must be 0.
    - When the specified query returns exactly one Logistics Event, [api:hasItem](https://onerecord.iata.org/ns/api#hasItem) will directly represent that Logistics Event, and [api:hasTotalItem](https://onerecord.iata.org/ns/api#hasTotalItem) must be 1.
    - In cases where the specified query returns multiple Logistics Events, [api:hasItem](https://onerecord.iata.org/ns/api#hasItem) will be an array containing those Logistics Events, and [api:hasTotalItem](https://onerecord.iata.org/ns/api#hasTotalItem) must be equal to the number of Logistics Events retrieved by the specified query.

    During the implementation phase, it is highly recommended to utilize a JSON-LD library for parsing responses.
    To discover JSON-LD libraries for various programming languages, consult the [implementation guidelines](./implementation-guidelines.md#serialization-and-data-formats).

The following HTTP headers parameters MUST be present in the response:

| Header                | Description                                  | Example   |
| -------------------- |    ---------- | ----------------------------- |
| **Content-Type**     | The content type that is contained with the HTTP body.                               | application/ld+json           |
| **Content-Language** | Describes the language(s) for which the requested resource is intended.              | en-US     |
| **Last-Modified**    | Date and time when the Logistics event list was last time changed. Syntax: `Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT`. See https://developer.mozilla.org/en-US/docs/Web/               | Tue, 21 Feb 2023 07:28:00 GMT |


!!! note

    The `Last-Modified` header included in the response when fetching all logistics events associated with a logistics object MUST be updated each time a new event is added to the collection. This ensures that clients can reliably use the `HEAD` method, as outlined in the [Get Logistics Events metadata](#get-logistics-events-metadata) section, to determine whether the event list has changed and avoid unnecessary downloads.



The following HTTP status codes MUST be supported:

| Code    | Description              | Response body    |
| ------- |  ---------------------- | ---------------- |
| **200** | The request to retrieve all Logistics Events has been successful    | List of Logistics Event |
| **301** | The URI of the Logistics Object has permanently changed.            | No response body |
| **302** | The URI of the Logistics Object has temporarily moved.              | No response body |
| **401** | Not authenticated                                                   | Error            |
| **403** | Not authorized to retrieve the Logistics Object                     | Error            |
| **404** | Logistics Object not found                                          | Error            |
| **500** | Internal Server Error                                               | Error            |


## Security

To engage with the "Get Logistics Events of a Logistics Object" endpoint, a client needs proper authentication and authorization to access the designated resource. If requests lack proper authentication, the ONE Record server should respond with a `401 "Not Authenticated"` status. Conversely, for requests without proper authorization, a `403 "Not Authorized"` response should be provided.

The authorization to access the logistics events should be derived from the logistics objects. However, the implementor of a ONE Record server can decide to separate the control access between a logistics object and its logistics events.

## Example C1

Request:

```http
GET /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c/logistics-events HTTP/1.1
Host: 1r.example.com
Accept: application/ld+json; version=2.2.0
```

Response:

```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json; version=2.2.0
Content-Language: en-US

--8<-- "API-Security/examples/LogisticsEvents_list.json"
```
_([LogisticsEvents_list.json](./examples/LogisticsEvents_list.json))_


## Example C2

Get a filtered list of events. Filtered by event-code that needs to be DEP.

Request:

```http
GET /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c/logistics-events?event-code=DEP HTTP/1.1
Host: 1r.example.com
Accept: application/ld+json; version=2.2.0
```

Response:

```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json; version=2.2.0
Content-Language: en-US

--8<-- "API-Security/examples/LogisticsEvents_filtered_list.json"
```
_([LogisticsEvents_filtered_list.json](./examples/LogisticsEvents_filtered_list.json))_

## Example C3

Get an empty list of events.

Request:

```http
GET /logistics-objects/2a7d1338-9033-13xc-b665-81a411418978/logistics-events HTTP/1.1
Host: 1r.example.com
Accept: application/ld+json; version=2.2.0
```

Response:

```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json; version=2.2.0
Content-Language: en-US

--8<-- "API-Security/examples/LogisticsEvents_empty_list.json"
```
_([LogisticsEvents_empty_list.json](./examples/LogisticsEvents_empty_list.json))_

# Get Logistics Events metadata

A logistics event often contains a substantial amount of data, making a `GET` request inefficient when the sole intention is to check for updates or confirm existence, as it results in transferring the entire payload. To improve efficiency, the `HTTP HEAD` method is supported on logistics event endpoints, allowing clients to access essential metadata without downloading the full event data.

The `HTTP HEAD` method serves as a key optimization for interacting with logistics events by enabling clients to verify event availability and examine headers without incurring the cost of a complete data transfer. This helps reduce network load, improve response times, and support effective cache validation by utilizing headers such as Last-Modified to determine if an event has changed. Since `HEAD` requests return no body, they execute faster and consume fewer server resources—making them particularly useful for high-volume event tracking and periodic update checks.

The `HTTP HEAD` method is available exclusively for retrieving all logistics events associated with a logistics object. For individual logistics events, the method is not applicable, as such events are immutable and their content remains constant over time.

## Endpoint 

``` 
 HEAD {{baseURL}}/logistics-objects/{{logisticsObjectId}}/logistics-events/
```

## Request

The following HTTP header parameters MUST be present in the request:

| Request Header   | Description                         | Examples            |
| ---------------- |  --------------------------------- | ------------------- |
| **Accept**       | The content type that the ONE Record client wants the HTTP response to be formatted in.        | application/ld+json |
| **Content-Type** | The content type that is contained with the HTTP body. Valid content types. | application/ld+json |

The following HTTP query parameters MUST be supported:

| Query parameter               | Description                                                                           | Valid values                       |
| ----------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------- |
| **event-code** (optional)     | Optional parameter that can be used to filter the logistics events by event code, the values MUST be comma separated | <ul><li>https://onerecord.iata.org/ns/code-lists/StatusCode#FOH or FOH</li><li>https://onerecord.iata.org/ns/code-lists/StatusCode#DEP or DEP</li></ul>  |
| **created-after** (optional)  | Filters the logistics events to only include those created after the specified timestamp                              | <ul><li>20190926T075830Z</li></ul> |
| **created-before** (optional) | Filters the logistics events to only include those created before the specified timestamp                             | <ul><li>20190926T075830Z</li></ul> |
| **occurred-after** (optional) | Filters the logistics events to only include those that occurred after the specified timestamp                        | <ul><li>20190926T075830Z</li></ul> |
| **occurred-before** (optional)| Filters the logistics events to only include those that occurred before the specified timestamp                       | <ul><li>20190926T075830Z</li></ul> |
| **sort** (optional)           | Specifies the sorting order of the logistics events. This parameter expects a timestamp indicating the starting point| <ul><li>ASC-creationDate</li><li>DESC-creationDate</li><li>ASC-eventDate</li><li>DESC-eventDate</li></ul> |
| **limit** (optional)          | Limits the number of logistics events returned. The value is an integer specifying the maximum number of results       | <ul><li>2</li></ul> |
| **skip** (optional)          | Skips a specified number of logistics events before beginning to return results. This is useful for pagination         | <ul><li>5</li></ul> |


## Response

A successful request MUST return a `HTTP/1.1 200 OK` status code. 

The following HTTP headers parameters MUST be present in the response:

| Header                | Description                                  | Example   |
| -------------------- |    ---------- | ----------------------------- |
| **Content-Type**     | The content type that is contained with the HTTP body.                               | application/ld+json           |
| **Content-Language** | Describes the language(s) for which the requested resource is intended.              | en-US     |
| **Content-Language** | Describes the language(s) for which the requested resource is intended.              | en-US     |
| **Last-Modified**    | Date and time when the Logistics event list was last time changed. Syntax: `Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT`. See https://developer.mozilla.org/en-US/docs/Web/               | Tue, 21 Feb 2023 07:28:00 GMT |

!!! note

    The `Last-Modified` header included in the response when fetching all logistics events associated with a logistics object MUST be updated each time a new event is added to the collection. This ensures that clients can reliably use the `HEAD` method to determine whether the event list has changed and avoid unnecessary downloads.

The following HTTP status codes MUST be supported:

| Code    | Description              | Response body    |
| ------- |  ---------------------- | ---------------- |
| **200** | The request to retrieve all Logistics Events has been successful    | List of Logistics Event |
| **301** | The URI of the Logistics Object has permanently changed.            | No response body |
| **302** | The URI of the Logistics Object has temporarily moved.              | No response body |
| **401** | Not authenticated                                                   | Error            |
| **403** | Not authorized to retrieve the Logistics Object                     | Error            |
| **404** | Logistics Object not found                                          | Error            |
| **500** | Internal Server Error                                               | Error            |


## Security

To engage with the "Get Logistics Events of a Logistics Object" endpoint, a client needs proper authentication and authorization to access the designated resource. If requests lack proper authentication, the ONE Record server should respond with a `401 "Not Authenticated"` status. Conversely, for requests without proper authorization, a `403 "Not Authorized"` response should be provided.

The authorization to access the logistics events should be derived from the logistics objects. However, the implementor of a ONE Record server can decide to separate the control access between a logistics object and its logistics events.
