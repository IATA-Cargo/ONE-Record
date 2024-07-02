All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# 2.1.0-dev

## Ideas
- Sorting/Pagination Logistics Events list
- Add filters/triggers to Subscription information for server-side Notifications filtering

## ONE Record API Specification

### Changed
- Align documentation and ontology using always hasErrorDetail/ErrorDetail.

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
