![image](https://user-images.githubusercontent.com/58464775/161543671-fc444388-04af-4998-8a5a-b2218072af50.png)
# ONE Record Data Model
## ChangeLog - Ontology v3.0.0

In addition to the [Release note](https://github.com/IATA-Cargo/ONE-Record/blob/master/2023-12-standard/Data-Model/IATA-1R-DM-ReleaseNote.md) this provides further details on the changes compared to the previous version of the ontology.
Are included the reference to issues that are fixed with the release as well.

## Changes in the 3.0.0 release

Details on the pull requests can be foudn here:
- [x] https://github.com/IATA-Cargo/ONE-Record/pull/196
- [x] https://github.com/IATA-Cargo/ONE-Record/pull/197
- [x] https://github.com/IATA-Cargo/ONE-Record/pull/199

### Overview of new class structure

#### Services

**LogisticsService** class is added with the following definition:
> A **LogisticsService** is a sequence of Activities provided by one Party to another.

**LogisticsService** class is added. The first Service in our scope is the Booking. More services can be added in the future, stakeholders are allowed to use the structure to define their own services.

#### Activities
**LogisticsActivty** class is added with the following definition:
> A **LogisticsActivity** is a scheduled set of tasks that is executed as part of one or more Services.

The main **LogisticsActivity** is the **TransportMovement** which represents essentially flight movements. Activities can also be about moving or storing goods for instance.

In first iteration a generic activity is defined with common data properties and subtypes are defined when relevant (e.g. TransportMovement, Storing, etc.)

#### Actions
**LogisticsAction** class is added with the following definition:
> A **LogisticsAction** is a specific task with a specific result performed on one or more LOs by one party in the context of a **LogisticsActivity**.

Actions represent the tasks within an Activity and contain the scheduling of the tasks. In order to track properly the potential discrepancy between a planned action and an actual action there should be a *Scheduled* or *Planned* task and an *Actual* task.
For instance if 5 pieces were intended to be loaded onto a flight and only 4 of them are actually loaded this can be easily tracked.

#### Company / Organization
The model for organizations is taken from the W3 model: https://www.w3.org/TR/vocab-org/#description.

#### tbd
tbd


### Detailed changelog
#### 3.0.0 RC4.1:
- Removed duplicate properties from deprecated Company Branch object
- Renamed "locationOfPerformance" and "loactionOfCreation" to "performedAtLocation" and "createdAtLocation" for consistency
- Renamed "forBookingOptions" to "forBookingOption" for consistency
- Added "resultOfCheck" and "usedInCheck" properties as backlinks from CheckTotalResult and CheckTemplate to Check
- Fixed "describedByProduct" Property in Item LO

#### 3.0.0 RC5:
- Fixed missing label and description in subTotal and billingCharges properties
- Changed Shipment from PhysicalLO to LO
- Lifted cardinality restriction from insuredShipment property and changed name and IRI suffix to insuredShipments
- Deprecated nvdindicator for consistency
- Moved weightValuationIndicator and otherChargesIndicator from Shipment to Waybill
- Added slac to LoadingUnit
- Deprecated handlingInstructions property and HandlingInstructions class for properties textualHandlingInstructions (OCI and SSR) and specialHandlingCodes (SPH); added them to Piece, Shipment, BookingShipment 
- Added TACTRateDescription, OtherCharge, TotalCharge classes and respective properties 
- Changed domain of re-used properties to owl:Thing of the abovementioned classes
- Added properties serviceCode, chargesAtDestination and carrierCharge code to Waybill 
- Added tactRateDescriptions, chargeTotals and otherCharges to Waybill to connect with the new LOs
- Moved chargesAtDestination from Waybill to TotalCharge
- Added object property totalCollectCharges with Range Value and added it to TotalCharge
- Added property customsInformation to Shipment 
- Removed propery customsInformation from Piece
- Added property customsInformationOfShipment to CustomsInformation
- Renamed property operatedTransportMovements in operatedTransportMovement
- Added max 1 cardinality restriction to operatedTransportMovement in TransportMeans
- Redesigned UnitComposition, Composing and LoadingUnit to be consistent with TransportMovement, Loading and TransportMeans and to enhance ability to query data (for orchestration)
- Renamed loadingUnit property to onLoadingUnit, changed Domain to owl:Thing
- Added onLoadingUnit property to UnitComposition
- Added property inUnitComposition to LoadingUnit (inverse)
- Added properties subLocations and subLocationOf to model hierarchical relationships between Locations
- Renamed forActions to performedActions to better reflect its inverse property performedAtLocation
- Renamed locationOfPerformance to performedAt to shorten it

#### 3.0.0 RC5f:
- Integrated all cXML-references as proper code lists in the /coreCodeLists/ ontology
- Added CodeListElement class with properties code, codeName, codeLevel, codeListName, codeListVersion and codeListReference as parent class for code lists and to add the ability to transmit codes in a structured way if no rdf code list exist yet
- Renamed category to RegulatedEntityCategory
- Renamed code to locationCode
- Moved slac from LoadingUnit to UnitComposition; changed Domain to owl:Thing
- Added partialEventIndicator to LogisticsEvent for part events
- Added otherIdentifier to LogisticActions to be able to transmit custom identifiers such as Loading/Unloading lists in trucking/milk runs
- Converted remaining properties into object properties with CodeListElements
- Added MCD 2.0 specifications
- Full rework of enums and code lists as NamedIndividuals
- Added core code list ontology containing key codes used in ONE Record in accordance with IATA

