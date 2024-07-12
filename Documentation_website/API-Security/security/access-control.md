In ONE Record, access to resources can be specified by using Access Control Lists (ACLs) associated to specific Logistics Objects.
Each Logistics Object resource possesses a related ACL containing a set of **Authorization** statements that describe:

- **who** has access to that resource;
- **what types** (or **modes**) **of access** they have.

Each Authorization is a single rule for access, such as "entities one and two may write to Logistics Object logisticObjectRef", described with a set of RDF properties.

ONE Record recommends the use of the [ACL ontology](https://www.w3.org/ns/auth/acl) in order to express the Authorizations. As the ACL is specific to each ONE Record Server and it is not a mandatory requirement to make it available to external entities, any other kind of data model/ontology can be used instead.

# Permissions

| Permission                      | Description                                                  |
| ------------------------------- |  ----------------------------------------------------------- |
| **GET_LOGISTICS_OBJECT**        | Authorized to retrieve the content of a LogisticsObject      |
| **PATCH_LOGISTICS_OBJECT**      | Authorized to request a change of a Logistics Object         |
| **POST_LOGISTICS_EVENT**        | Authorized to add a Logistics Event to a LogisticsObject     |
| **GET_LOGISTICS_EVENT**         | Authorized to retrieve the details of a LogisticsEvent       |

**Rules and recommendations related to Access Control:**

- No Access Control Lists on property level
- Access Control MUST be on Logistics Object level
- Every ONE Record server MUST support at least the following permissions: [GET_LOGISTICS_OBJECT](https://onerecord.iata.org/ns/api#GET_LOGISTICS_OBJECT), [PATCH_LOGISTICS_OBJECT](https://onerecord.iata.org/ns/api#PATCH_LOGISTICS_OBJECT), [POST_LOGISTICS_EVENT](https://onerecord.iata.org/ns/api#POST_LOGISTICS_EVENT), [GET_LOGISTICS_EVENT](https://onerecord.iata.org/ns/api#GET_LOGISTICS_EVENT)
- Each ONE Server MUST deny access to certain operations by default. Therefore, if an access permission is not explicitly set, a requesting ONE Record client MUST NOT be allowed to perform the respective operations until the permission is granted. If an operation is attempted to be performed and the permissions for that operation have not been granted, the ONE Record server MUST return a `403 Forbidden` HTTP error.
- The ONE Record API specification does not define a specific model for ACL, but suggests the utilization of [Access Control Ontology defined by W3C](https://www.w3.org/ns/auth/acl).

Authenticated access is similar to public access, but it is not anonymous. 
Therefore, access is granted only to ONE Record clients that have authenticated and have an organizational URI to be identifiable. 
In this way, a ONE Record server can track resource access and usage.

In ONE Record, access to resources MAY be handled by using Access Control Lists (ACLs) stored in the backend systems of the ONE Record Servers and defined using the [Web Access Control standard from W3C](https://www.w3.org/wiki/WebAccessControl).

## Web Access Control and Access Control List (ACL)

According to W3C specifications, Web Access Control it is a standard that enforces access control based on the Access Control List (ACL) RDF resource associated with the requested resource. 
It's concerned with giving access to agents (users, groups and more) to perform various kinds of operations (read, write, append, etc) on resources. 
In Web Access Control, an ACL consists of a set of **Authorizations**. 
Each Authorization is a single rule for access, such as "entities A and B may write to resource C", described with a set of RDF properties.

In the context of ONE Record, three types of authorization can be identified:

1. **Single Authorization** – when a single organization (identified by its Organization URI) from the ONE Record network has access to a Logistics Object.
2. **Group Authorization** – when a group of organizations has access to the Logistics Object. The ONE Record Server can define internally groups of access such as Airlines, Ground Handlers, Customs, etc.
3. **Public Authorization** – when every authenticated organization can access the Logistics Object URI can retrieve the data.

The implementor of ONE Record server MUST implement **Single Authorization** and **Public Authorization** while **Group Authorization** is RECOMMENDED.


