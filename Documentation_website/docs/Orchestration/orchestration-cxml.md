[//]: ![image](https://user-images.githubusercontent.com/58464775/161543622-0c3ea890-b331-4a6b-86b7-fd41b08370eb.png)

# Mapping CXML messages with ONE Record

## Introduction
We dedicate this section to the mapping between CXML messages (as per the last version on CXMl Toolkit Edition 12) and ONE Record standard (as per last version endorsed by COTB - Data Model 3.2.0)

### Objectives
The transition from EDI to Data Sharing is highly dependent on the mapping between messages and ONE Record. Messaging standards (Cargo IMP and then Cargo XML) have been used extensively for the past decades by the industry. However messages in their current form have shown to be limited in terms of scalability with regards to upcoming regulations such as ACI/PLACI regimes.

In the mapping between CXML messages and ONE Record, two main aspects need to be considered:

- Mechanism: Some guidelines are usually required to understand how a message can be converted to ONE Record and vice versa. Some use cases and business rules cannot be directly translated as we need to consider a shift of mindset between EDI and Data sharing as well as a transition to Piece level tracking that ONE Record allows.
- Data field mapping: A direct mapping between CXML fields and ONE Record data model is inevitable, it goes with the Mechanism part to properly understand what objects are impacted.

### Messages selected
As CIMP standard has been sunset since 31st December 2024, we focus on CXML messages in their latest version (currently CXML Toolkit Edition 12)
The selected messages for mapping are the following:

| Message | Message name | Message version | Comments |
| --- | --- | --- | --- |
| XFWB | XML Waybill Message [Download here](./assets/XFWB-5.0.0-mapping-3.2.xlsx){:download="XFWB-5.0.0-mapping-3.2.xlsx"} | 5.00 | 1st version |
| XFZB | XML HouseWaybill Message [Download here](./assets/XFZB-4.0.0-mapping-3.2.xlsx){:download="XFZB-4.0.0-mapping-3.2.xlsx"} | 4.00 | 1st version |
| XFHL | XML House Manifest Message [Download here](./assets/XFHL-3.0.0-mapping-3.2.xlsx){:download="XFHL-3.0.0-mapping-3.2.xlsx"} | 3.00 | 1st version |
| XSDG | XML Shippers' Declaration for Dangerous Goods Message | 6.00 | To be assessed |
| XFSU | XML Status Message | 6.00 | Ongoing |
| XFFM | XML Flight Manifest Message | 4.00 | Ongoing |
| XFBL | XML Freight Booked List Message | 3.00 | Ongoing |
| XTMV | XML Transport Movement Message | 2.00 | To be assessed |

## General conversion guidelines

### Note on data types and patterns

Data elements as defined in CIMP and CXML have:

- **Length recommendations** usually based on business rules such as the Waybill number
- Limited **data types** based on business rules or common sense

When CXML was created, most restrictions were inherited from CIMP even though XML format allows to bypass technical limitations of CIMP, especially in number of occurences, field lengths or allowed characters.

When first versions of ONE Record data model were created, restrictions **coming from business rules** were usually adapted in ONE Record using the `pattern` in the ontology.

### General guidelines

- 01 - Business rules and local regulatory requirements prevail over data properties technical restrictions (data length, pattern) expressed in the ontology if relevant.
- 02 - When converting from ONE Record to CXML the general rule is to truncate data to fit CXML length restrictions. In CXML to CIMP conversion, the rules is expressed in CXML toolkit.
- 03 - In ONE Record there is no restrictions regarding the number of decimals that can be used (E.g. for Weight). When there is such a restriction with CXML (business recommendation or technical restriction) it is common practice to **round up** number to the nearer decimal allowed. From an operation perspective it also makes no sense to have data with too many decimals, e.g. a weight with more than 4 decimals.
- 04 - In ONE Record we try to avoid duplicate data as much as possible, especially **totals** are usually not in ONE Record data model if all detailed data are already available. This applies for instance for the total or summary values of charges.

## XFWB Mapping

See dedicated page on XFWB mapping.

## XFZB Mapping
In its essence, XFZB is very similar to XFWB. `Waybill` object is the main focus and many details are from the `Shipment`(s) linked to it as well as the `TransportMovement`.

The major distinction in the `Waybill` object for XFZB is the usage of `Waybill#waybillType = House`.

Another major distinction with XFWB is that for the time being we recommend a mapping of the `TransportMovement` through the `Loading` action with a Planned or Scheduled state. Since the `Booking` object has been mainly designed for the Carrier to Freight Forwarder contractual agreement, there is no specific `LogisticsService` reflecting the House Waybill contractual agreement yet.

## XFHL Mapping
XFHL message is used to communicate the list of House Waybills associated to a Master Waybill. This message is not focused on details at House level, only high level information is shared.

### Proposed mechanism
The starting point is a Master `Waybill` and we are interested in all the House `Waybill`(s) linked to the Master via the `Waybill#houseWaybills` object property. 

![image](https://github.com/user-attachments/assets/b05edd3e-13d1-48bb-9c6b-dab457b47106)

## XSDG Mapping
XSDG specifications, aligned with the Dangerous Goods Declaration (DGD) requirements have been integrated into ONE Record, the details can be found on the Data Model section, under "Dangerous Goods".

The need for a proper XDSG mapping still needs to be assessed.

## XFSU Mapping
### Proposed mechanism
XFSU message is used to provide a Shipment Status update, discrepancy details or sometimes to provide complementary Customs information.
In most cases, the Status updates is based on the usage of `LogisticsEvents` on the Shipment and/or the Pieces. The XFSU data fields are then a mix of Waybill, Shipment, Pieces and LogisticsEvent data in ONE Record realm.

In case of **full shipment** status update, the `LogisticsEvents` can be added on the Shipment or on all the Pieces. Both scenarios are valid.

#### Specific case of split shipment:
With messaging standard, it is possible to transmit status update on a split shipment without the need to identify properly the pieces impacted. In this case the data transmitted can only be kept at Shipment level, however this pratice is contradictory with the piece level management design principle of ONE Record.
To cope with that there are multiple possibilities to map XFSU with ONE Record, depending on stakeholder's capabilities on the operations side to identify impacted pieces of a shipment.

- If pieces **cannot be** properly identified, recommendation would be to use `LogisticsEvent` on the Shipment, using the *LogisticsEvent#partialEventIndicator* to notify it applies to a split shipment. In this scenario it becomes complicated to provide the right level of information at the "AssociatedStatusConsignment" level as per the XFSU schema.
- If pieces **can be** properly identified, it is recommended to use `LogisticsEvent` on the identified Pieces. The *LogisticsEvent#partialEventIndicator* can be used to notify it applies only to selected pieces and not to the whole shipment but all details at "AssociatedStatusConsignment" level are at Piece level in ONE Record realm.

#### Involved parties
When using XFSU, depending on the Status Code some parties need to be identified. By default the `LogisticsEvent` has the *recordActor*/*recordingOrganization* data object to identify the party creating the `LogisticsEvent`.

With Ontology 3.2.0 an *involvedParty* data object (data type: `Party`) has been added to `LogisticsEvent` to allow for a proper mapping.

Let's have a look at the various parties required for XFSU status codes and the proposed mapping:

- Transferring party: usage of *recordActor*/*recordingOrganization*
- receivingParty: usage of *involedParty* with *PartyRole* = "FX" (Current receiver)
- notifiedParty: usage of *involedParty* with *PartyRole* = "NI" (Notify party)
- deliveredToParty: usage of *involedParty* with *PartyRole* = "ST" (Ship to)

Note that the Code List used refers to the [UN/CEFACT Party Role Code List](https://vocabulary.uncefact.org/PartyRoleCodeList).

The mapping of XFSU message still needs to be fine tuned to take into account multiple scenarios.

## XFFM Mapping
The Flight Manifest represents an essential set of data that is today either a Paper document or a message (FFM or XFFM). It contains the details of cargo that is transported.

ONE Record by essence contains all the required data, Flight details, Piece and ULD details and so on.

Multi-destination usecases will require the aggregation of data starting form multiple `TransportMovement` objects if required for the generation of an XFFM equivalent.

### Proposed mechanism
The `starting point` of the manifest is the flight, or the `TransportMovement` in ONE Record. The Manifest requires information from `Piece`, `ULD`, `Shipment` and `Waybill` objects mainly.

`Piece` details are central and from the `TransportMovement` there are two possiblities:

- ULDs are used: `ULD` objects is linked to the `TransportMovement` via a `Loading` action. Then the ULD is loaded with Pieces, the linkage is made through the `UnitComposition` activity and the respective `Composing` action.
- Cargo is bulk (BLK): `Piece` objects are directly linked to the `TransportMovement` via a `Loading` action.

In the end, `Shipment` and `Waybill` accessed via the `Piece` objects.

![image](https://github.com/user-attachments/assets/a493192c-163e-4b90-a9c6-adc370911de4)

## XFBL Mapping
### Definition from CXML toolkit

To supply a complete list of consignments for which space has been reserved in a particular flight, including details of the agent/airline from which the consignments will be received and, if known, inward flight details as well.

When a carrier is controlling his own flight but the physical handling of consignments is carried out by a handling party (agent/airline), the former will issue an XFBL message to the latter to provide him with a complete list of consignments for which space has been booked and any other relevant information

### Proposed mechanism

The XFBL data requirements are similar to XFFM however the mapping changes as XFBL refers to freight **booked** on a flight while XFFM refers to freight **loaded** on a flight.

There are two possible mapping depending on the usage of ONE Record by the Airline/GHA.

- 1 - The airlines uses the `Loading` Action with the `actionTimeType` = Planned, then the mapping is similar to XFFM with a difference `Loading` action.
- 2 - The airline doesn't use the `Loading` action with the `actionTimeType` = Planned, then the mapping will follow the path: `TransportMovement` >> `Booking` >> `Waybill` >> `Shipment` >> `Piece`.

## XTMV Mapping
The XTMV message is intended to dispatch departure and arrival notification in XML immediately after departure or arrival of a surface transportation. Delay, cancellation and diversion of an aircraft will also be dispatched using XTMV as soon as it is known. (cf. Cargo-XML Toolkit definition).

The need to do a full mapping of XTMV message with ONE Record needs to be properly assessed based on the necessity and the actual usage of the message currently.

### Proposed mechanism
XTMV is structured in two main parts:

- Transport Movement Header contains information about Origin and Destination, Type of Transport, Transport Means and Operator details. These details are available with usage of `TransportMovement`, `TransportMeans` and `TransportMovement#operatingParties` objects.
- Transport Movement Details contains infrmation about the type of time reported (Movement Indicator based on Code List 1.92) and a few additional fields if there is a delay, cancellation or diversion. For that purpose we have the `MovementTime` object linked to `TransportMovement`, it can be complemented with a `LogisticsEvent` in case of delay or cancellation/diversion to provide more details or the `MovementTime` can be extended (to be discussed)
