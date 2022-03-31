# ONE Record Data Model
## ChangeLog - Ontology v2.0.0

Intro

## Issues fixed with this release
In order to allow for a better followup of Github issues and their resolution, below is the list of all issues that were closed in accordance to the release.
 
- https://github.com/IATA-Cargo/ONE-Record/issues/92
- https://github.com/IATA-Cargo/ONE-Record/issues/106
- https://github.com/IATA-Cargo/ONE-Record/issues/116
- https://github.com/IATA-Cargo/ONE-Record/issues/119
- https://github.com/IATA-Cargo/ONE-Record/issues/123
- https://github.com/IATA-Cargo/ONE-Record/issues/124
- https://github.com/IATA-Cargo/ONE-Record/issues/126
- https://github.com/IATA-Cargo/ONE-Record/issues/129
- https://github.com/IATA-Cargo/ONE-Record/issues/130
- https://github.com/IATA-Cargo/ONE-Record/issues/131
- https://github.com/IATA-Cargo/ONE-Record/issues/132
- https://github.com/IATA-Cargo/ONE-Record/issues/133
- https://github.com/IATA-Cargo/ONE-Record/issues/137
- 


### Addition of ScheduledLegs object
At the time of booking, carrier may communicate an expected route with scheduled flight legs. ScheduledLegs object can be used for that purpose.
Note that this applies also to other modes of transport.

![ChangeLog-ScheduledLegs](https://user-images.githubusercontent.com/58464775/161061355-18386241-1013-4e39-9f54-93d25dea660e.PNG)

### Modifications and additions of data properties on Ratings object
In order to be more compliant with AWB requirements and to clarify each data property, some additional properties were added on Ratings object.
- `Ratings:billingChargeIdentifier` used to identify the charge identifier for CASS records purposes. Refers to Code List 1.33 `Billing charge identifiers`
- `Ratings:otherChargeCode` used to identify other charges as per Code List 1.2 `Other charge codes`
- `Ratings:quantity` used if there is an applicable quantity to the rate (e.g. a Time or a Number)
- `Ratings:entitlement` used to identify if the charges are Due Carrier (C) or Due Agent (A). Refers to Code List 1.3 `Entitlement codes`
- `Ratings:chargeCode` description has been changed so that it refers to Code List 1.1 `Charge codes`
- `Ratings:chargeType` description has been changed to remove confusion on what values it should contain. Type of charge that should match the code expressed in either chargeCode, otherChargeCode or billingChargeIndentifier data properties.
- Correction of ratings:chargePaymentType values from (S,P) to (C,P)

### Small changes
- Added missing data properties on BookingTimes
- Removed Piece#product max cardinality
- Added Waybill#originCurrency
- Added Piece#nvdForCarriage and Piece#nvdForCustoms
- Added Insurance#nvdIndicator
- Added Waybill#consignorDeclarationSignature / carrierDeclarationPlace / carrierDeclarationDate / carrierDeclarationSignature
- Renames shipment#containedPiece to shipment#containedPieces
- Removed "&" sign within comments as it was leading to issues
