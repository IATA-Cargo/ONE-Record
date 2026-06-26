All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# 2.3.0

## ONE Record API Specification

## New and Improved API Capabilities

### Bulk creation of identical Logistics Events
Added support for bulk handling of identical LogisticsEvent payloads across multiple Logistics Objects, reducing the need for repeated POST requests when the same event applies to many objects. This improves efficiency for high-volume use cases such as flight departure events across many pieces. 


### Action Request status timestamp tracking
Improved the ability to determine when an Action Request status changes, such as when a change request is accepted or rejected. This supports better auditability and more accurate reconstruction of Logistics Object history. 


### Clarified Logistics Object type handling
Resolved the inconsistency between the single Type header and multiple @type values in Logistics Object bodies. The preferred approach is identify only the most specific type in the Type Header improving consistency between headers and payloads. 


### Expiration support for Access Delegations
Access Delegations can now include an optional expiration date, allowing access to be granted for a defined period and automatically considered expired afterwards. If no expiration is defined, the delegation is treated as valid until its maximum validity. 


### Consistent status query parameters
Status-related query parameters have been aligned across API endpoints. Where applicable, both fully qualified URI values and shorthand values are supported, improving consistency for Action Requests, audit trail queries, and Logistics Event filtering. 

### Rejection of subscription proposals
Added support for rejecting subscription proposals, making the subscription workflow more complete and explicit when a proposed subscription should not be accepted. 

### Warnings in Verification Requests
Verification Requests now support the communication of warnings in addition to business errors, enabling systems to flag non-blocking issues such as alerts, informational checks, or validation warnings. 


## Access Delegation and Action Request Clarifications

### Restricted Access Delegation request target
api:isRequestedFor on Access Delegation has been restricted from multiple organizations to a single organization. This simplifies revocation, avoids ambiguous cartesian-product access scenarios, and improves chain-of-trust management. 

### Defined behaviour for invalid Action Request revocation
The API now clarifies the expected response when attempting to revoke an Action Request in a state where revocation is not allowed. In such cases, the server should return 422 Unprocessable Entity. 


### Clarified Action Request roles
Terminology around Action Requests has been aligned to use clearer and more consistent roles, such as Data Holder, Requestor, and Requestee, instead of context-specific terms that could cause ambiguity. 


## Error Handling

### Standardized API errors
Introduced a standardized set of common error responses for ONE Record APIs, including consistent error codes, titles, and messages for scenarios such as invalid requests, missing resources, authorization failures, unsupported content types, identifier conflicts, and internal server errors. This improves interoperability and simplifies debugging across implementations. 


## ONE Record API Ontology

### Added

- Add `HasSeverity` to `Error` to indicate the severity.
- Add `Severity` class as named individuals with value `ERROR` and `WARNING`
- Add `hasRequestStatusSince` to `ActionRequest` to indicate since when the current request status applies.
- Add `hasRequestStatusHistory` to optionally expose the status history of an `ActionRequest`.
- Add `RequestStatusEntry` class to contain a specific request status. Please check the Class diagram for more information about this class
- Add `expiresAt` to `AccessDelegationRequest`
- Add `usesOrchestration` as metadata for the Logistics Object
- Add `MultiStatusResponse` class to handle multple occurence creation. Please check the Class diagram for more information about this class
- Add `EventCreationResult` class to handle a single logistics event creation in a multiple event creation. Please check the Class diagram for more information about this class

### Changed

- In `AccessDelegationRequest` the property `isRequestedFor` cardinality has been changed to 1.


# 2.2.0

## ONE Record API Specification

### Added

- Support for HTTP HEAD methods on logistics objects, action requests and list of logistics events
- Add hasLogisticsEvent in notification
- Add two new type of notifications: LOGISTICS_OBJECT_AVAILABLE and LOGISTICS_OBJECT_ACCESS_GRANTED

### Changed

- State diagram for Subscription and Access delegation requests. Now a REQUEST_ACCEPTED can move to REQUEST_REVOKED but only in case of subscription and access delegation requests.
- Reviewed all examples according to the API ontology

## ONE Record API Ontology

### Added
- Add hasLogisticsEvent in notification
- Add LOGISTICS_OBJECT_AVAILABLE and LOGISTICS_OBJECT_ACCESS_GRANTED as notification types

# 2.1.0

## ONE Record API Specification

### Changed

- Align documentation and ontology using always hasErrorDetail/ErrorDetail.
- Align LogisticsEvent filtering option to Kebab case
- Rename eventType into event-code for LogisticsEvent filtering option

### Added

- Sort, limit and skip parameters in Get logistics events of a logistics object 
- hasRevision and hasLastRevision for each logistics object body
- Verification request to signal error or anomalies in a logistics object

### Removed

- overview of data classes and properties as CSV file to supporting documents, all information can be found in the ontology or in the data model page

## ONE Record API Ontology

### Changed

- in the AuditTrail, the AuditTrail#hasChangeRequest changes to AuditTrail#hasActionRequest


### Added 

- hasActionRequest object property
- hasVerificationRequest object property
- ChangeRequest has an additional opetion property hasVerificationRequest
- Verification class
- VerificationRequest class
- hasVerification object property

# 2.0.0

---

## ONE Record API Specification

### Changed

- restructured Introduction section
- use Logistics Object instead of its abbreviation LO 
- use Logistics Object URI / Organization URI for the complete URI of a Logistics Object, i.e. https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c
- use logisticsObjectID for the unique identifier part of the URI, i.e. 1a8ded38-1804-467c-a369-81a411416b7c
- use Data Holder instead of Data Onwer
- redesign the Update Action Requests section
- use the Collection object to return a list of Logistics Events


### Removed

- removed Memento (incl. TimeGate, Timemap)
- removed implicit endpoints; define URI structure of Logistics Objects
- removed Link HTTP header, because URI and endpoint structure is defined
- removed required ttl/turtle as supported content-type
- removed acl endpoint

  
### Added

- added UTF-8 as default content encoding
- added 1 as default revision number for AuditTrail and LogisticsObjects
- added class diagram as supporting document
- added overview of data classes and properties as CSV file to supporting documents,
- added two reference OpenAPI specifications as supporting documents (minimum = to be ONE Record server compliant; recommended = for comfort features)
- added `Implementation Guidelines` section to reduce ambiguity
- added JSON files with examples mentioned in the API specification
- added overview of permissions for Access Delegation
- added ActionEnum to class diagram
- added Authentication and Authorization with OpenID Connect
- added security and endpoint information for all APIs
- added allow subscription for third parties
- added list of JSON-LD libraries in the `Implementation Guidelines`


---

## ONE Record API Ontology

### Changed 

- changed IRI structure to follow best practice
- renamed CompanyInformation to ServerInformation, because it mainly contains meta information about the ONE Record API and its configuration
- replaced ServerInformation#company and ServerInformation#companyId (formerly CompanyInformation) with ServerInformation#dataOwner
- merged PatchRequest into ChangeRequest
- renamed Operation#op enums to UPPERCASE, e.g. changed del to DELETE
- renamed Details to ErrorDetail
- renamed ChangeRequest#requestingParty to ChangeRequest#requestedBy
- renamed ChangeRequest#timestamp to ChangeRequest#requestedAt
- changed ChangeRequest#requestingParty<Branch> to ChangeRequest#requestedBy (https://onerecord.iata.org/ns/cargo#Organization)
- renamed ErrorDetail#attribute to ErrorDetail#property
- renamed ServerInformation#supportedLogisticsObjects to ServerInformation#supportedLogisticsObjectTypes
- changed property type of Notification#topic, Notification#changedProperties, OperationObject#datatype, ServerInformation#serverEndpoint, ServerInformation#supportedLogisticsObjects, ErrorDetail#property, ErrorDetail#resource, Subscription#callbackUrl, Subscription#topic, Subscription#subscribedTo
- renamed Subscription#myCompanyIdentifier to Subscription#subscriber
- changed Subscription#cacheFor (xsd:int) to Subscription#expiresAt (xsd:dateTime)
- renamed DelegationRequest#operations to DelegationRequest#permissions
- renamed api#status (used in SubscriptionRequest, ChangeRequest DelegationRequest) to api#requestStatus
- renamed ServerInformation#hasDataOnwer into ServerInformation#hasDataHolder
- changed Subscription#notifyRequestStatusChange from mandatory to optional 
- changed Change#notifyRequestStatusChange from mandatory to optional
- changed AccessDelegation#notifyRequestStatusChange from mandatory to optional


### Removed

- removed not used classes, data properties, object properties
- removed Memento (classes, data properties, object properties)
- removed ServerInformation#companyId
- removed AuditTrail#errors
- removed AuditTrail#loInitialSnapshot
- removed ChangeRequest#requestorCompanyIdentifier
- removed ServerInformation#errors
- removed Subscription#subscribedTo
- replaced LogisticsObjectRef data class and use https://onerecord.iata.org/ns/cargo#LogisticsObject instead
- removed Subscription#secret
- removed DelegationRequest#action
- removed Subscription#callbackUrl
- removed cargo ontology data classes
- removed ServerInformation#hasSupportedLogisticsObjectType
- removed Subscription#subscribeToLogisticsEvents

### Added

- added Notification#changedProperties
- added further enums to notification#eventType, i.e. LOGISTICS_EVENT_RECEIVED, CHANGE_REQUEST_ACCEPTED, CHANGE_REQUEST_FAILED, CHANGE_REQUEST_PENDING, CHANGE_REQUEST_REJECTED, DELEGATION_REQUEST_PENDING, DELEGATION_REQUEST_ACCEPTED, DELEGATION_REQUEST_REJECTED, DELEGATION_REQUEST_FAILED, SUBSCRIPTION_REQUEST_PENDING, SUBSCRIPTION_REQUEST_ACCEPTED, SUBSCRIPTION_REQUEST_REJECTED, SUBSCRIPTION_REQUEST_FAILED
- added PENDING enum to ChangeRequest#requestStatus
- added Operation#s to enable updating not only properties of primitive types, e.g. int, string, but also embedded objects, e.g. Shipment#totalGrossWeight<Value> in LogisticsObjects
- added Notification#triggeringChangeRequest
- added SubscriptionRequest. Subscription is the response for the scenario where publisher initiates the Subscription and asks the subscribers for their Subscription information. SubscriptionRequest is used for scenario where the subscriber initiates a SubscriptionRequest towards the Publisher.
- added Subscription#topicType to indicate if topic is a LogisticsObject type or a specific LogisticsObjectIdentifier
- added ServerInformation#supportedApiVersion
- added ActionRequest as superclass for SubscriptionRequest, ChangeRequest, and DelegationRequest
- added providesNotificationsEndpoint (xsd:boolean) to ServerInformation
- added AccessDelegation and Change for ActionRequests
- import cargo ontology with `owl:imports cargo`
- changed min/max cardinalities to exact cardinalities (`qualifiedCardinality`)
- introduced Named Individuals to represent ENUMs
- added Notification#hasLogisticsObjectType
- added Subscription#includeSubscriptionEventType 
- added enumeration SubscriptionEventType
- added Collection class 
