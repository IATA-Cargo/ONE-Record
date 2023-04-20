In ONE Record, parties can grant other parties access to their data (or parts of it). 
The ONE Record standard allows parties to change or revoke these access rights to their data whenever they wish.

Before an organization can access a LogisticsObject of another organization, it needs to be authorized to do so and the server that hosts the logistics objects will determine whether to grant access.
Typically, when an participant in the Internet of Logistics creates a LogisticsObject and makes it available via its ONE Record API, the IoL participant will share the URI of that LogisticsObject with another IoL participant and grant them access by default.

For example, a freight forwarder creates a [Shipment](https://onerecord.iata.org/ns/cargo/3.0.0#Shipment), grants read access to an airline, and then sends the URI of the Logistics Object via a ONE Record Notification or other channel to the airline.
At this point, only the forwarder and the airline can access this specific LogisticsObject, but no one else.

However, if a ground handling agent (GHA) also needs access to this logistics object, two options are considered in ONE Record:

1. the GHA MAY request the access delegation directly from the freight forwarder
2. the airline MAY request an access delegation for the GHA

If, as in this presented scenario, the airline already has a delegation of access to the logistics object, the concept of [Trust Chains](#trust-chains) takes effect.

<!-- <figure>
  <img src="../img/Access-Delegation_overview.png" style="zoom: 70%; border: 1px solid" />
  <figcaption>
  Figure 1: Access Delegation Scenario
  </figcaption>
</figure> -->


!!! note
    The party granting access is referred to as the `Delegator` and the party receiving access is the `Delegate`. 
    The party requesting access is referred to as the `Requestor` who MAY NOT be the same as the `Delegator`.

# Permissions

| Permission                      | Description                                              |
| ------------------------------- |  ------------------------------------------------------- |
| **GET_LOGISTICS_OBJECT**        | Authorized to retrieve the content of a LogisticsObject  |
| **PATCH_LOGISTICS_OBJECT**      | Authorized to request a change of a Logistics Object     |
| **POST_LOGISTICS_EVENT**        | Authorized to add a Logistics Event to a LogisticsEvent  |


# Request Access Delegation

## Request

The following REST API endpoint MUST be implemented:

| Endpoint             | HTTP Method | API function            |
| -------------------- |  ------ |---------------------- |
| /access-delegations  | POST    |Request to delegate access to Logistics Object for a third party |

The following HTTP header parameters MUST be present in the request:

| Header   | Description                         | Examples            |
| ---------------- |  --------------------------------- | ------------------- |
| **Accept**       | The content type that the ONE Record client wants the HTTP response to be formatted in.        | application/ld+json |
| **Content-Type** | The content type that is contained with the HTTP body. Valid content types. | application/ld+json |

The HTTP request body must contain a valid [AccessDelegation](https://onerecord.iata.org/ns/api/2.0.0-dev#AccessDelegation) object in the format as specified by the Content-Type in the header.

The [AccessDelegation](https://onerecord.iata.org/ns/api/2.0.0-dev#AccessDelegation) is a data class of the [ONE Record api ontology](https://onerecord.iata.org/ns/api/2.0.0-dev).
The properties and relationships to other data classes are visualized in the diagram.

```mermaid
classDiagram
    direction LR

    class LogisticsObject{                
    }

    class Organization{        
    }  
    class AccessDelegation{
        + description: xsd:string [0..1]
        + hasPermission[]: Permission [1..*]                
        + isRequestedFor[]: Organization [1..*]
        + hasLogisticsObject[]: LogisticsObject [1..*]        
    }

    AccessDelegation "1" --> "1..*" Permission   
    AccessDelegation "1" --> "1..*" Organization: requestedFor
    AccessDelegation "1" --> "1..*" LogisticsObject

    class Permission{
        <<Enumeration>>
        GET_LOGISTICS_OBJECT
        PATCH_LOGISTICS_OBJECT
        POST_LOGISTICS_EVENT    
    }    
```

## Response

A successful request MUST return a `HTTP/1.1 201 Created` status code and the following HTTP headers parameters MUST be present in the response:

The following HTTP header parameters MUST be present in the request

| Header | Description     | Examples          |
| --------------- |  ------------- |  ----------------------------------- |
| **Location**    | The URI of the newly created AccessDelegationRequest           | https://1r.example.com/action-requests/b6c24b63-405c-5cc3-ac88-9b109bb939ba |
| **Type**        | The type of the newly created AccessDelegationRequest as a URI | https://onerecord.iata.org/ns/api/2.0.0-dev#AccessDelegationRequest |

The following HTTP status codes MUST be supported:

| Code    | Description                                                  | Response body    |
| ------- | ------------------------------------------------------------ | ---------------- |
| **201** | Request for delegation was successful                        | No response body |
| **400** | Invalid Access Delegation object                             | Error            |
| **401** | Not authenticated                                            | Error            |
| **403** | Not authorized to submit Delegation Request                  | Error            |
| **415** | Unsupported Content Type                                     | Error            |

## Example A1

An organization requests an access delegation for itself for the Piece with the URI https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c

Request: 

```http
POST /access-delegations HTTP/1.1
Content-Type: application/ld+json; version=2.0.0-dev
Accept: application/ld+json; version=2.0.0-dev

--8<-- "examples/AccessDelegation_example1.json"
```
_([examples/AccessDelegation_example1.json](examples/AccessDelegation_example1.json))_

Response:
```bash
HTTP/1.1 201 Created
Location: https://1r.example.com/action-requests/b6c24b63-405c-5cc3-ac88-9b109bb939ba
Content-Type: application/ld+json; version=2.0.0-dev
Type: https://onerecord.iata.org/ns/api/2.0.0-dev#AccessDelegationRequest
```

!!! note
    The `Requestor` linked the [isRequestedBy](https://onerecord.iata.org/ns/api#isRequestedBy) property in the created [AccessDelegationRequest](https://onerecord.iata.org/ns/api/2.0.0-dev#AccessDelegationRequest)
    and the `Delegate` linked in the [isRequestedFor](https://onerecord.iata.org/ns/api#isRequestedFor) property in the [AccessDelegation](https://onerecord.iata.org/ns/api/2.0.0-dev#AccessDelegation) are the same.

## Example A2

An organization requests an access delegation for a business partner for the Piece with the URI https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c

Request: 

```http
POST /access-delegations HTTP/1.1
Content-Type: application/ld+json; version=2.0.0-dev
Accept: application/ld+json; version=2.0.0-dev

--8<-- "examples/AccessDelegation_example2.json"
```
_([examples/AccessDelegation_example2.json](examples/AccessDelegation_example2.json))_

Response:
```bash
HTTP/1.1 201 Created
Location: https://1r.example.com/action-requests/1d2d3807-5dd9-5b5b-acb6-26163a6d7411
Content-Type: application/ld+json; version=2.0.0-dev
Type: https://onerecord.iata.org/ns/api/2.0.0-dev#AccessDelegationRequest
```

!!! note
    The `Requestor` linked the [isRequestedBy](https://onerecord.iata.org/ns/api#isRequestedBy) property in the created [AccessDelegationRequest](https://onerecord.iata.org/ns/api/2.0.0-dev#AccessDelegationRequest)
    and the `Delegate` linked in the [isRequestedFor](https://onerecord.iata.org/ns/api#isRequestedFor) property in the [AccessDelegation](https://onerecord.iata.org/ns/api/2.0.0-dev#AccessDelegation) are different.


# Trust Chains

Trust chains are based on business partnerships and trust in the transport chain. 
It ensures that the company who has shared a logistics object on the Internet of Logistics, always knows who MAY access the data and at any time, it can revoke all or part of the chain of trust.

Therefore, the concept described in the previous sections can be used by organizations to delegate access to their partners, which become 3rd parties.
In the example above, the airline can request that the forwarder gives access to their ground handler. 
The forwarder will grant the access on the basis that they trust the airline who trusts their ground handler.

However, if the owner of the logistics object withdraws access delegation to a second party, it MUST be ensured that the third party's access delegation is also withdrawn.

See also the section about [revoking Action Requests](action-requests.md#revoke-action-request).