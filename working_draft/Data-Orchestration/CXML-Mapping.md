![image](https://user-images.githubusercontent.com/58464775/161543622-0c3ea890-b331-4a6b-86b7-fd41b08370eb.png)
# ONE Record Data Orchestration
## Focus on CXML mapping with ONE Record

## 1. Introduction
We dedicate this section to the mapping between CXML messages (as per the last version on CXMl Toolkit Edition 12) and ONE Record standard (as per last version endorsed by COTB - Data Model 3.0.0)

### 1.1. Objectives
The transition from EDI to Data Sharing is highly dependent on the mapping between messages and ONE Record. 
Two main aspects need to be considered:
* Mechanism: Some guidelines may be required to understand how a message can be converted to ONE Record and vice versa.
* Data field mapping: A direct mapping between CXML fields and ONE Record data model is inevitable, it goes with the Mechanism part to properly understand what objects are impacted

### 1.2. Messages selected
As CIMP standard has been sunset since 31st December 2024, we focus on CXML messages in their latest version (currently CXML Toolkit Edition 12)
The selected messages for mapping are the following:
| Message | Message name | Message version | Comments |
| --- | --- | --- | --- |
| XFWB | XML Waybill Message | 5.00 | 1st draft available |
| XFZB | XML HouseWaybill Message | 4.00 | - |
| XFHL | XML House Manifest Message | 3.00 | - |
| XSDG | XML Shippers' Declaration for Dangerous Goods Message | 6.00 | - |
| XFSU | XML Status Message | 6.00 | Ongoing |
| XFFM | XML Flight Manifest Message | 4.00 | - |
| XFBL | XML Freight Booked List Message | 3.00 | - |
| XTMV | XML Transport Movement Message | 2.00 | ? |

## 2. XFWB Mapping
### 2.1. Proposed mechanism
XFWB data fields are mostly a mix of `Waybill`, `WaybillLineItem`, `Shipment`, `Pieces` and `TransportMovement` data in ONE Record realm.

[Auth, Security in progress]

### 2.2. Usage of WaybillLineItem object
At first it was proposed to use the `Shipment` and `Piece` objects to populate the Waybill line items. However examples have shown that the line items do not necessarily correlate to actual Pieces transported, for instance Dry Ice can be interpreted as a specific line item due to a specific rate while on the operations the package, containing dry ice and transported goods, are equivalent to one `Piece`.

It was decided to introduce the `WaybillLineItem` object to properly share rate data as required in the Air Waybill. The `WaybillLineItem` has a n-to-1 relationship with a `Waybill` object and represents the different line items on the paper waybill with all their specifities based on the type of rating used.

It is important to note that the `WaybillLineItem` has been added **only in the context of sharing Air Waybill data**. When looking at Operations, digital twins shall be used (`Piece`, `Item`, `Product`, etc.)

## 3. XFZB Mapping

## 4. XFHL Mapping

## 5. XSDG Mapping

## 6. XFSU Mapping
### 6.1. Proposed mechanism
XFSU message is mostly used to provide a Shipment Status update, discrepancy details or sometimes to provide complementary Customs information.
In most cases, the Status updates is based on the usage of LogisticsEvents on the Shipment and/or the Pieces. The XFSU data fields are then a mix of Waybill, Shipment, Pieces and LogisticsEvent data in ONE Record realm.

In case of **full shipment** status update, the LogisticsEvents can be added on the Shipment or on all the Pieces. Both scenarios are valid.

**Specific case of split shipment**:
With messaging standard, it is possible to transmit status update on a split shipment without the need to identify properly the pieces impacted. In this case the data transmitted can only be kept at Shipment level, however this pratice is contradictory with the piece level management design principle of ONE Record.
To cope with that there are multiple possibilities to map XFSU with ONE Record, depending on stakeholder's capabilities on the operations side to identify impacted pieces of a shipment.
* If pieces cannot be properly identified, recommendation would be to use LogisticsEvent on the Shipment, using the *LogisticsEvent#partialEventIndicator* to notify it applies to a split shipment. In this scenario it becomes complicated to provide the right level of information at the "AssociatedStatusConsignment" level as per the XFSU schema. (dig deeper on that aspect).
* If pieces can be properly identified, it is recommended to use LogisticsEvent on the identified Pieces. The *LogisticsEvent#partialEventIndicator* can be used to notify it applies only to selected pieces and not to the whole shipment but all details at "AssociatedStatusConsignment" level are at Piece level in ONE Record realm.

## 7. XFFM Mapping

## 8. XFBL Mapping

## 9. XTMV Mapping
(To be discussed)
