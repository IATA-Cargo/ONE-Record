In progress

# Introduction

As of XXX the endorsed ONE Record version includes:

- Ontology 3.3.0
- API 2.3.0

Following IATA governance, this ONE Record release has been endorsed by COTB and by the CSC. 

!!! note
    As of 1st January 2026, the IATA Cargo Services Conference has endorsed ONE Record as the **preferred standard for data sharing** among air cargo stakeholders.

!!! note
    As of 1st January 2026, the IATA Cargo Services Conference has endorsed to put Cargo-XML standard in containment, meaning no new message or versions of messages, no further development of messages.

# General comments

This release of ONE Record standards is the outcome of all the work carried out in 2025 and early 2026 by the various working groups involved in the maintenance and improvement of the standard. It includes the API & Security working group, the Data Model working group, the Data Orchestration Working group and all the ad-hoc sub-groups. Feedbacks from ONE Record hackathons have been a very valuable source of improvements as well as the different pilots and live implementations of ONE Record.

We believe this release, as the previous one, is production-ready.

The working groups mentioned above are still actively operating and all feedbacks and inputs will be highly appreciated to help us improve further the standard.

# Ontology 3.3.0

## Scope of the release

In 2025 and 2026 the Data Model taskforce has continued improving the ONE Record data model based on feedback provided by the industry. 

## Change

Below is an overview of changes on 3.3.0:

- Addition of `StatusUpdateEvent` to simplify the mapping with (X)FSU messages
- Addition of a link between SecurityDeclaration and Shipment
- Adjustments for the mapping with XFWB with addition of data properties at `Waybill` level
- Addition of `otherIdentifiers` to `LogisticsActivity` and `PhysicalLogisitcsObject`

Detailed changelog can be read directly in the following Pull Requests on GitHub or in the Detailed Changelog.

# API 3.3.0

## Highlights
ONE Record API 2.3.0 introduces improvements to scalability, request lifecycle tracking, access delegation, subscription handling, error standardization, and API consistency. This release also clarifies several API behaviours to support more predictable implementations across ONE Record servers.

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