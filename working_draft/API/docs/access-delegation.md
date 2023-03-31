In ONE Record parties are enabled to grant other parties access to (parts of) their data.
The standard allows parties to modify or withdraw these access rights to their data, whenever they wish.

Before a company can access a logistics object of another company, it needs to be authorized to do so and the server that hosts the logistics objects will determine whether to grant access.
Typically, when a company creates a Logistics Object and makes it available via its ONE Record API, the company will share the URI of that Logistics Object with another company and grant them access by default.

For example, a forwarder creates a [Shipment](https://onerecord.iata.org/ns/cargo/3.0.0#Shipment), grants read access to an airline, and then sends the URI of the Logistics Object via a ONE Record Notification or other channel to the airline.
At this point, only the forwarder and the airline can access this specific LogisticsObject, but no one else.

However, the airline wants an interline partner - a ground handling agent (GHA) - to have access to this Logistics Object. Therefore, the airline send an access delegation request to the forwarder.

<figure>
  <img src="/img/Access-Delegation_overview.png" style="zoom: 70%; border: 1px solid" />
  <figcaption>
  Figure 1: Access Delegation Scenario
  </figcaption>
</figure>


The party granting access is referred to as the `Delegator` and the party receiving access is the `Delegate`.

## Permissions

| Permission     | Description             |
| -------------- |  --------------------- |
| **GET**        | Authorized to retrieve the content of a resource                    |
| **PATCH**      | Authorized to accept/reject a ChangeRequest     |
| **POST_EVENT** | Authorized to add a resources to a list, e.g. append LogisticsEvent |




| Endpoint             | API function             |
| -------------------- |  ---------------------- |
| /access-delegations | Request to delegate access to Logistics Object for a third party |

**Request**

```http
POST /access-delegations
Host: 1r.example.com
Accept: application/ld+json
Content-Type: application/ld+json
```

**HTTP Headers**

The following HTTP header parameters MUST be present in the request:

| **Header**       | Description                       |
| ---------------- |    ----- |
| **Accept**       | The content type that you want the HTTP response to be formatted in. Valid content types include: ▪ application/x-turtle or text/turtle ▪ application/ld+json |
| **Content-Type** | The content type that is contained with the HTTP body. Valid content types include: ▪ application/x-turtle or text/turtle ▪ application/ld+json               |

**Request**

| <u>DelegationRequest</u>  | Description                       | Required | Class                  |
| ------------------------- |  ------------------------------- | -------- | ---------------------- |
| **targetLogisticsObject** | The reference to the logistics object to which the access is requested    | y        | api:LogisticsObjectRef |
| **targetCompany**         | The party that will receive the delegated rights      | y        | api:CompanyInformation |
| **action**                | The action to perform: REVOKE or DELEGATE             | y        | "REVOKE","DELEGATE"    |
| **operations**            | The API operations to which the access is requested: GET, PATCH, or both. | y        | "GET", "PATCH"         |

Response:

| Code |     | Description         | Response body |
| -------- | --- | ------------------------------------------- | ----------------- |
| **204**  |     | Request for delegation was successful       | No response body  |
| **401**  |     | Not authenticated       | Error model       |
| **403**  |     | Not authorized to send a Delegation request | Error model       |

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
        "iata-cargo": "https://onerecord.iata.org/ns/cargo/3.0.0#",
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
          "api:LogisticsObjectRef#logisticsObjectType": "https://onerecord.iata.org/ns/cargo/3.0.0#Sensor#sensorType"
      	},
        {
          "@type": "api:LogisticsObjectRef",
          "api:LogisticsObjectRef#logisticsObjectId": "lo-host:Sensor_165371",
          "api:LogisticsObjectRef#logisticsObjectType": "https://onerecord.iata.org/ns/cargo/3.0.0#Sensor#sensorType"
      }

  ]
}


```

In the following use cases, we consider three parties: **1st party**, **2nd party** and **3rd party**.

## Use Case 1: delegate & 3rd party pubsub

2nd party request 1st party access to a Logistics Object for 3rd party. 1st party then sets up a PubSub with 3rd party.

<!-- <img src="/Users/henkmulder/Library/Application Support/typora-user-images/image-20220404104936690.png" alt="image-20220404104936690" style="zoom:80%;" /> -->

#### Delegation Scenario 1

**Step 1 – Publish & Subscribe flow between 1st party and 2nd party**

First step contains a Publish & Subscribe flow between 1st party and 2nd party for a Logistics Object with is created on the 1st party ONE Record Server.

**Step 2 – 2nd party requests delegation access to Logistics Object for 3rd party**

The 2nd party sends a delegation request to the 1st party in order to grant 3rd party access to Logistics Object (GET, PATCH or both).

**Step 3 – Publish & subscribe flow between 1st Party and 3rd Party**

If 1st party decides to grant 3rd party access to Logistics Object, then it initiates a Publish & Subscribe flow that would allow 3rd party get notifications related to Logistics Object.

## Use Case 2: delegate & access Logistics Object directly

2nd party request 1st party access to a Logistics Object for 3rd party. ThirsParty then accesses the Logistics Object on 1st party directly. In this scenario, 3rd party didn't set up a pub/sub but received the URI of the from their partner, 2nd party.

<!-- <img src="/Users/henkmulder/Library/Application Support/typora-user-images/image-20220404105103059.png" alt="image-20220404105103059" style="zoom:80%;" /> -->

#### Delegation Scenario 2

**Step 1 – Publish & Subscribe flow between 1st party and 2nd party**

First step contains a Publish & Subscribe flow between 1st party and 2nd party for a Logistics Object with is created on the 1st party ONE Record Server.

**Step 2 – 2nd party requests delegation access to Logistics Object for 3rd party**

The 2nd party sends a delegation request to the 1st party in order to grant 3rd party access to Logistics Object (GET, PATCH or both).

Same Request/Response as in [Step 2 – 2nd party requests delegation access to Logistics Object for 3rd party](#_Step_2_–).

**Step 3 – 3rd party effectuates a GET or PATCH request on Logistics Object to 1st party**

If 1st party decides to grant 3rd party access to LO, then 3rd party can perform a GET or PATCH request on the Logistics Object to 1st party.

## Trust Chains

The concept of companies requesting a delegation of access to their partners can also be used by these partners themselves, who are now third parties. In the example below, the interline partner can request that the forwarder gives access to their ground handler. The forwarder will grant the access on the basis that they trust the airline who has trusted their interline partner who trusts their ground handler.

<!-- <img src="/Users/henkmulder/Library/Application Support/typora-user-images/image-20220404110048479.png" alt="image-20220404110048479" style="zoom:50%;" /> -->

These chains of trust are based on business partnerships and trust in the transport chain. It ensures that the company who has shared a logistics object on a server, always knows who may access this and at any time, it can revoke all or part of the chain of trust.

