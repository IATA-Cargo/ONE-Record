**Rules and recommendations related to Access Control Lists:**

- No Access Control Lists on property level.
- Accessors MUST be added on LogisticsObject level


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

The location of the acl for a given Logistics Object follows the structure:

> /logistics-objects/{logisticsObjectId}/acl

!!! note
    The absence of an ACL for a resource or the absence of authorization within an ACL for a particular resource means that access is not granted.

## Request

```http
GET /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c/acl HTTP/1.1
Host: 1r.example.com
Accept: application/ld+json
```

Response:

```json
HTTP/1.1 200 OK
Content-Language: en-US
Content-Type: application/ld+json
```

If a resource does not have an individual ACL, this request will return a 404 Not Found.

#### Example of Authorizations

##### Single Authorization

Below is an example ACL resource that describes that Party1 (as identified by its ONE Record Company Identifier https://1r.party1.com) has full access (Read, Write and Control)
to one of their own web resources, located at https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c

```
# Contents of https://1r.party1.com/06ebed0f-b5b2-4abf-b0e5-dc027f5ce6cc/acl

@prefix acl:  <http://www.w3.org/ns/auth/acl#>.

<#authorization1>
    a             acl:Authorization;
    acl:agent     <https://1r.example.com/logistics-objects/957e2622-9d31-493b-8b8f-3c805064dbda>;  # Organization URI in the IoL
    acl:accessTo  <https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c>;
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

In ONE Record, access to resources can be specified by using Access Control Lists (ACLs) associated to specific Logistics Objects.
Each Logistics Object resource possesses a related ACL containing a set of **Authorization** statements that describe:

- **who** has access to that resource;
- **what types** (or **modes**) **of access** they have.

Each Authorization is a single rule for access, such as "entities one and two may write to Logistics Object logisticObjectRef", described with a set of RDF properties.

ONE Record recommends the use of the [ACL ontology](https://www.w3.org/ns/auth/acl) in order to express the Authorizations. As the ACL is specific to each ONE Record Server and it is not a mandatory requirement to make it available to external entities, any other kind of data model/ontology can be used instead.

Example of GET ACL of a Logistics Object

> **Note:** ONE Record Clients can assume that the location of an ACL resource can be derived from a Logistics Object URI.

ONE Record recommends the definition of three types of Authorization:

1. **Single Authorization** – when a single company identifier from the Internet of Logistics has access to the LO;
2. **Group Authorization** – when a group of company identifiers has access to the Logistics Object. The ONE Record Server can define internally groups of access such as Airlines, Ground Handlers, Customs, etc.
3. **Public” Authorization** – when every authenticated company identifier accessing the Logistics Object URI can retrieve the data.

ONE Record specifies three modes of access on LOs:

<!-- <img src="file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image002.png" alt="img" style="zoom: 50%;" /> -->

> **Note:** In a delegation scenario, when delegating access to a resource to a third party, a new Authorization element should be added to the ACL.

## Use case

In this illustrative scenario, the entities would be **Shipper** (which has its own ONE Record Server) and **Forwarder**.

- Shipper creates a Shipment logistics object. Shipper is the owner of the phones, which constitute the Product. Each Product with a series number is an Item.
- Shipper packages the phones on wooden pallets, creates Pieces and handles them to Forwarder.

<!-- ![A screenshot of a social media post Description automatically generated](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image003.png) -->

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

<!-- ![A screenshot of a social media post  Description automatically generated](file:////Users/henkmulder/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image004.png) -->

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

The following HTTP header parameters MUST be present in the request:

| **Header**       | Description                       |
| ---------------- |    ----- |
| **Accept**       | The content type that you want the HTTP response to be formatted in. Valid content types include: ▪ application/x-turtle or text/turtle ▪ application/ld+json |
| **Content-Type** | The content type that is contained with the HTTP body. Valid content types include: ▪ application/x-turtle or text/turtle ▪ application/ld+json               |

#### Response

| Code |     | Description           | Response body |
| -------- | --- |  --- | ----------------- |
| **201**  |     | ACL has been published for a Logistics Object | No response body  |
| **400**  |     | Invalid ACL               | Error       |
| **401**  |     | Not authenticated         | Error       |
| **403**  |     | Not authorized to publish an ACL              | Error       |
| **415**  |     | Unsupported Content Type  | Error       |

## Retrieve ACL for a specific Logistics Object (GET)

#### HTTP Headers

The following HTTP header parameters MUST be present in the request:

| **Header** | Description                       |
| ---------- |    ----- |
| **Accept** | The content type that you want the HTTP response to be formatted in. Valid content types include: ▪ application/x-turtle or text/turtle ▪ application/ld+json |

**Example**

Request:

```http
GET /1a8ded38-1804-467c-a369-81a411416b7c/acl HTTP/1.1
Host: 1r.example.com
Accept-Language: en
Accept: application/ld+json
```

Response:

```json

```

A positive HTTP 200 response is expected to a GET request. The body of the response is expected to be the ACL list in the format that has been requested in the Accept header of the request.

| Code |     | Description                | Response body                     |
| -------- | --- | ------------------------------ | ------------------------------------- |
| **200**  |     | ACL returned successfully      | [ACL](https://www.w3.org/ns/auth/acl) |
| **401**  |     | Not authenticated              | Error             |
| **403**  |     | Not authorized to retrieve ACL | Error             |
| **404**  |     | Logistics Object/ACL not found | Error             |
