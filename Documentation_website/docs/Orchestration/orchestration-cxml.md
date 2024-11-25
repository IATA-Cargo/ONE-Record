[//]: ![image](https://user-images.githubusercontent.com/58464775/161543622-0c3ea890-b331-4a6b-86b7-fd41b08370eb.png)

# Mapping CXML messages with ONE Record

## Introduction
We dedicate this section to the mapping between CXML messages (as per the last version on CXMl Toolkit Edition 12) and ONE Record standard (as per last version endorsed by COTB - Data Model 3.0.0)

### Objectives
The transition from EDI to Data Sharing is highly dependent on the mapping between messages and ONE Record. Messaging standards (Cargo IMP and then Cargo XML) have been used extensively for the past decades by the industry. However messages in their current form have shown to be limited in terms of scalability with regards to upcoming regulations such as ACI/PLACI regimes.

In the mapping between CXML messages and ONE Record, two main aspects need to be considered:
* Mechanism: Some guidelines are usually required to understand how a message can be converted to ONE Record and vice versa. Some use cases and business rules cannot be directly translated as we need to consider a shift of mindset between EDI and Data sharing as well as a transition to Piece level tracking that ONE Record allows.
* Data field mapping: A direct mapping between CXML fields and ONE Record data model is inevitable, it goes with the Mechanism part to properly understand what objects are impacted.

### Messages selected
As CIMP standard has been sunset since 31st December 2024, we focus on CXML messages in their latest version (currently CXML Toolkit Edition 12)
The selected messages for mapping are the following:

| Message | Message name | Message version | Comments |
| --- | --- | --- | --- |
| XFWB | XML Waybill Message | 5.00 | 1st version |
| XFZB | XML HouseWaybill Message | 4.00 | 1st version |
| XFHL | XML House Manifest Message | 3.00 | 1st draft |
| XSDG | XML Shippers' Declaration for Dangerous Goods Message | 6.00 | - |
| XFSU | XML Status Message | 6.00 | Ongoing |
| XFFM | XML Flight Manifest Message | 4.00 | 1st draft |
| XFBL | XML Freight Booked List Message | 3.00 | - |
| XTMV | XML Transport Movement Message | 2.00 | ? |

## General conversion guidelines

### Note on data types and patterns

Data elements as defined in CIMP have:

- **Length recommendations** usually based on business rules such as the Waybill number
- Limited **data types** based on business rules or common sense

When CXML was created, most restrictions were inherited from CIMP even though XML format allows to bypass technical limitations of CIMP, especially in number of occurences, field lengths or allowed characters.

When first versions of ONE Record data model were created, restrictions **coming from business rules** were usually adapted in ONE Record using the `pattern` in the ontology.

### General guidelines

- 01 - Business rules and local regulatory requirements prevail over data properties technical restrictions (data length, pattern) expressed in the ontology if relevant.
- 02 - When converting from ONE Record to CXML/CIMP there is no specific general guideline on the truncation of data properties. In CXML to CIMP conversion, such rules are expressed in IATA CXML Toolkit.
- 03 - In ONE Record we try to avoid duplicate data as much as possible, especially **totals** are usually not in ONE Record data model if all detailed data are already available. This applies for instance for the total or summary values of charges.

## XFWB Mapping
### Proposed mechanism
XFWB data fields are mostly a mix of `Waybill`, `WaybillLineItem`, `Shipment`, `Pieces` and `TransportMovement` data in ONE Record realm.

### Usage of WaybillLineItem object
The `WaybillLineItem` object was introduced to properly share rate data as required in the Air Waybill. The `WaybillLineItem` has a n-to-1 relationship with a `Waybill` object and represents the different line items on the paper waybill with all their specifities based on the type of rating used. In order to stick to reality as much as possible, some data at line item level are taken from `Pieces` and `LoadingUnits` directly (dimensions, volume, ...). The `WaybillLineItem` object itself shall only contain **rate** specific data.

It is important to note that the `WaybillLineItem` has been added **only in the context of sharing Air Waybill data**. When looking at Operations, digital twins shall be used (`Piece`, `Item`, `Product`, etc.)

### Usage of OtherCharge object
The `OtherCharge` object is used to record all charges, it refers to `<ram:ApplicableLogisticsAllowanceCharge>` grouping in XFWB message. Code List 1.2 "Other Charge Code" is used to properly identify the charges associated with the Prepaid/Collect indicator.

Totals are not directly recorded in ONE Record as they can be directly calculated based on the existing data (e.g. filtering by type of charge and prepaid/collect indicator).

### Other specific mapping guidelines

- `DensityGroupCode` field will be linked to Distribution phase as the feedback received from the industry shows that it's not an operational data but used for the Sales & Booking process part. It is then found on the `BookingShipment` object if required.

- `Special Service Request` and `Other Shipping Instructions` code fields are not in ONE Record as there is no evidence of an actual referential and standard used for those. Moreover it seems stakeholders use SSR or OSI for the same purposes. Thus we have merged into `textualHandlingInstructions` property in ONE Record.

- In the `ApplicableRating` grouping, the `TypeCode` field is set to F (Facial) by default as it is the only value used with CXML.

- In the `ApplicalbeFreightRateServiceCharge` grouping, the `AppliedAmount` is not directly mapped as it is a total that needs to be derived from either the **Rate** or the multiplication of **Rate** and **Chargeable weight** depending on the type of charge. Refer to CSC Resolution 600a for further explanations.

## XFZB Mapping
In its essence, XFZB is very similar to XFWB. The major distinction is the usage of `Waybill#waybillType = House`.

## XFHL Mapping
To be done

## XSDG Mapping
XSDG specifications, aligned with the Dangerous Goods Declaration (DGD) requirements have been integrated into ONE Record, the details can be found on the Data Model section, under "Dangerous Goods".

Fro the time being, there seems to be no need to map XSDG considering its implementation within the industry.

## XFSU Mapping
### Proposed mechanism
XFSU message is mostly used to provide a Shipment Status update, discrepancy details or sometimes to provide complementary Customs information.
In most cases, the Status updates is based on the usage of `LogisticsEvents` on the Shipment and/or the Pieces. The XFSU data fields are then a mix of Waybill, Shipment, Pieces and LogisticsEvent data in ONE Record realm.

In case of **full shipment** status update, the `LogisticsEvents` can be added on the Shipment or on all the Pieces. Both scenarios are valid.

**Specific case of split shipment**:
With messaging standard, it is possible to transmit status update on a split shipment without the need to identify properly the pieces impacted. In this case the data transmitted can only be kept at Shipment level, however this pratice is contradictory with the piece level management design principle of ONE Record.
To cope with that there are multiple possibilities to map XFSU with ONE Record, depending on stakeholder's capabilities on the operations side to identify impacted pieces of a shipment.
* If pieces cannot be properly identified, recommendation would be to use `LogisticsEvent` on the Shipment, using the *LogisticsEvent#partialEventIndicator* to notify it applies to a split shipment. In this scenario it becomes complicated to provide the right level of information at the "AssociatedStatusConsignment" level as per the XFSU schema. (dig deeper on that aspect).
* If pieces can be properly identified, it is recommended to use `LogisticsEvent` on the identified Pieces. The *LogisticsEvent#partialEventIndicator* can be used to notify it applies only to selected pieces and not to the whole shipment but all details at "AssociatedStatusConsignment" level are at Piece level in ONE Record realm.

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
(To be discussed)

## XTMV Mapping
The XTMV message is intended to dispatch departure and arrival notification in XML immediately after departure or arrival of a surface transportation. Delay, cancellation and diversion of an aircraft will also be dispatched using XTMV as soon as it is known. (cf. Cargo-XML Toolkit definition).

The need to do a full mapping of XTMV message with ONE Record needs to be properly assessed based on the necessity and the actual usage of the message currently.

### Proposed mechanism
XTMV is structured in two main parts:

- Transport Movement Header contains information about Origin and Destination, Type of Transport, Transport Means and Operator details. These details are available with usage of `TransportMovement`, `TransportMeans` and `TransportMovement#operatingParties` objects.
- Transport Movement Details contains infrmation about the type of time reported (Movement Indicator based on Code List 1.92) and a few additional fields if there is a delay, cancellation or diversion. For that purpose we have the `MovementTime` object linked to `TransportMovement`, it can be complemented with a `LogisticsEvent` in case of delay or cancellation/diversion to provide more details or the `MovementTime` can be extended (to be discussed)
