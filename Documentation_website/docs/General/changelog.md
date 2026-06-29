# Data Model Ontology 3.3.0

All changes have been tracked on GitHub via issues and have been linked to the Pull-Requests.

## Detailed Changelog

Detailed changelog can be found in the associated GitHub commits:

### Pull Request [#394](https://github.com/IATA-Cargo/ONE-Record/pull/394): 

**Additions:**

- Added securityDeclarations to Shipment ([#346](https://github.com/IATA-Cargo/ONE-Record/issues/346))
- Added issuedForShipment to SecurityDeclaration ([#344](https://github.com/IATA-Cargo/ONE-Record/issues/344) & [#346](https://github.com/IATA-Cargo/ONE-Record/issues/346))
- Added totalVolume to Shipment ([#347](https://github.com/IATA-Cargo/ONE-Record/issues/347))
- Added contactDetails to Organization ([#347](https://github.com/IATA-Cargo/ONE-Record/issues/347))
- Added agentReference to Waybill ([#347](https://github.com/IATA-Cargo/ONE-Record/issues/347))
- Added otherIdentifiers to Waybill ([#347](https://github.com/IATA-Cargo/ONE-Record/issues/347) & [#353](https://github.com/IATA-Cargo/ONE-Record/issues/353))
- Added StatusUpdateEvent as subclass of LogisticsEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added recordedPieceCount to StatusUpdateEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added recordedWeight to StatusUpdateEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added recordedVolume to StatusUpdateEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added notifiedOrganization to StatusUpdateEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added transferredTo to StatusUpdateEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added transferredFrom to StatusUpdateEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added notifiedOrganization to StatusUpdateEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added restriction for eventFor to Shipment to StatusUpdateEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added restriction for eventCode to StatusCode to StatusUpdateEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added transportMovementReference to StatusUpdateEvent ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350))
- Added valuationCharge to Waybill ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/364))
- Added otherIdentifiers to LogisticsActivity ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/353))
- Added otherIdentifiers to PhysicalLogisticsObject ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/353))
- Added regulatedEntitiesReceivedFrom to SecurityDeclaration ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/361))

Removals:

- Deprecated totalDimensions ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/350)))
- Deprecated receivedFrom ([#350](https://github.com/IATA-Cargo/ONE-Record/issues/361)))

Bugfixes:

- Fixed vis_element datatype from string to literal
- Fixed erratic owl:comment axioms to rdfs:comment for :AccountNumber and :handlingServiceFor


# API 2.3.0

For this release, all changes have been tracked using GitHub project view: [API Changes](https://github.com/users/IATA-Cargo/projects/4).

## Detailed changelog
Below is the detailed changelog:

- [Bulk endpoint for identical LogisticsEvents](https://github.com/IATA-Cargo/ONE-Record/issues/311)
- [Unable to determine the acceptance date of a change request](https://github.com/IATA-Cargo/ONE-Record/issues/315)
- [Only 1 Type in LO header possible, but multiple @type in LO bodies](https://github.com/IATA-Cargo/ONE-Record/issues/331)
- [Expiration on AccessDelegations](https://github.com/IATA-Cargo/ONE-Record/issues/396)
- [Inconsistencies in Status Query Parameters](https://github.com/IATA-Cargo/ONE-Record/issues/380)
- [Allow rejection of subscription proposals](https://github.com/IATA-Cargo/ONE-Record/issues/397)
- [Mechanism to communicate warnings within Verification Requests](https://github.com/IATA-Cargo/ONE-Record/issues/317)
- [Access Delegation: Restrict api:isRequestedFor from n to 1](https://github.com/IATA-Cargo/ONE-Record/issues/337)
- [Clarify and Define API Behavior for Revoking ActionRequests in Invalid States](https://github.com/IATA-Cargo/ONE-Record/issues/373)
- [Unclear Roles in Action Requests](https://github.com/IATA-Cargo/ONE-Record/issues/381)
- [Add standard errors to ONE Record specifications](https://github.com/IATA-Cargo/ONE-Record/issues/327)

More information can be found in the [API Changelog page](../API-Security/changelog.md) or directly on the change page.
