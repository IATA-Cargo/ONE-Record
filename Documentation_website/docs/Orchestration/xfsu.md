# XFSU Purpose

XFSU message is used to provide a Shipment Status update, discrepancy details or sometimes to provide complementary Customs information. It is also used to share Shipment milestones by Cargo-iQ members.

# XFSU Mapping

FSU and XFSU messages are Shipment level messages, the entry point is the AWB number but it can also be used to provide status updates on part or split shipments. 

## Proposed mechanism

### Shipment-level status

In a fully ONE Record environment the information is shared at Piece level. It implies that all Pieces are properly identified and that statuses can be applied on individial pieces within a shipment. This solves the issues with part or split shipments. However it is currently very complicated to have proper Piece level status updates for two main reasons: From a technological point of view the messages (FSU/XFSU) can only convey Shipment level information and from an operations point of view very few stakeholders are fully capable of handling piece level information.

For the sake of XFSU mapping with ONE Record, everything needs to be made at Shipment level, meaning linked to `Shipment` object.

!!! note
    It is essential to note that these guidelines are only effective in the context of mapping between (X)FSU and ONE Record. ONE Record is by design Piece-centric and is ready for Piece level management.

### Types of status updates

The mapping with ONE Record differs based on the kind of Status update. We identify 2 main use cases:

- Shipment status updates (e.g. RCS, FOH, etc.) are based on the usage of `LogisticsEvents` on the Shipment. **(Will most likely be `StatusEvents` or something similar)**
- Providing additional information such as Security or Customs details, reffered to as (X)FSU-OCI. These do not require usage of `LogisticsEvents` but the update of relevant obejcts.

#### Status updates based on `LogisticsEvents`

In case of **full shipment** status update, the `LogisticsEvents` can be added on the Shipment or on all the Pieces. Both scenarios are valid.

 Outer pipes  Cell padding 
No sorting
| Code | Description                                                                                                                                                                               | ONE Record mapping                                                                                                                         |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| DIS  | An apparent error has occurred, on this date at this location, with the handling of the consignment or its documentation, which is further clarified by the accompanying discrepancy code | StatusUpdateEvent on Shipment                                                                                                              |
| AWD  | The arrival documentation has been physically delivered to the consignee or the consignee’s agent on this date at this location                                                           | StatusUpdateEvent on Shipment                                                                                                              |
| AWR  | The arrival documentation has been physically received from a scheduled flight at this location                                                                                           | StatusUpdateEvent on Shipment                                                                                                              |
| NFD  | The consignee or the consignee’s agent has been notified, on this date at this location, of the arrival of the consignment                                                                | StatusUpdateEvent on Shipment                                                                                                              |
| ARR  | The consignment has arrived on a scheduled flight at this location                                                                                                                        | StatusUpdateEvent on Shipment<br>Details of Flight times on the TransportMovement                                                          |
| BKD  | The consignment has been booked for transport between these locations on this scheduled date and this flight                                                                              | StatusUpdateEvent on Shipment or Waybill                                                                                                   |
| CCD  | The consignment has been cleared by the Customs authorities on this date at this location                                                                                                 | StatusUpdateEvent on Shipment                                                                                                              |
| TRM  | The consignment has been manifested and/or will be physically transferred to this carrier at this location                                                                                | StatusUpdateEvent on Shipment                                                                                                              |
| MAN  | The consignment has been manifested for this flight on this scheduled date for transport between these locations                                                                          |                                                                                                                                            |
| DLV  | The consignment has been physically delivered to the consignee or the Consignee’s agent on this date at this location                                                                     | StatusUpdateEvent on Shipment                                                                                                              |
| DDL  | The consignment has been physically delivered to the consignee’s door on this date at this location                                                                                       | StatusUpdateEvent on Shipment                                                                                                              |
| DPU  | The consignment has been physically picked up from the shipper’s door on this date at this location                                                                                       | StatusUpdateEvent on Shipment                                                                                                              |
| RCF  | The consignment has been physically received from a given flight or surface transport of the given airline                                                                                | StatusUpdateEvent on Shipment                                                                                                              |
| RCS  | The consignment has been physically received from the shipper or the shipper’s agent and is considered by the carrier as ready for carriage on this date at this location                 | StatusUpdateEvent on Shipment                                                                                                              |
| RCT  | The consignment has been physically received from this carrier on this date at this location                                                                                              | StatusUpdateEvent on Shipment                                                                                                              |
| TFD  | The consignment has been physically transferred to this carrier on this date at this location                                                                                             | StatusUpdateEvent on Shipment                                                                                                              |
| PRE  | The consignment has been prepared for loading on this flight for transport between these locations on this scheduled date                                                                 | StatusUpdateEvent on Shipment                                                                                                              |
| CRC  | The consignment has been reported to the Customs authorities on this date at this location                                                                                                | StatusUpdateEvent on Shipment                                                                                                              |
| TGC  | The consignment has been transferred to Customs/Government control                                                                                                                        | StatusUpdateEvent on Shipment                                                                                                              |
| DEP  | The consignment has physically departed this location on this scheduled date and flight for transport to the arrival location                                                             | StatusUpdateEvent on Shipment<br>Details of Flight times on the TransportMovement                                                          |
| FOH  | The consignment is on hand on this date at this location pending “ready for carriage” determination                                                                                       | StatusUpdateEvent on Shipment                                                                                                              |
| DOC  | Documents Received by Handling Party                                                                                                                                                      | StatusUpdateEvent on Shipment                                                                                                              |
| FIW  | Freight Into Warehouse Control                                                                                                                                                            | StatusUpdateEvent on Shipment                                                                                                              |
| FOW  | Freight Out of Warehouse Control                                                                                                                                                          | StatusUpdateEvent on Shipment                                                                                                              |
| OSI  | Other Service Information                                                                                                                                                                 |                                                                                                                                            |
| OCI  |                                                                                                                                                                                           | Update of:<br>\- SecurityDeclaration for eCSD information<br>\- CustomsInformation or other relevant data property for Customs information |


### Specific case of split shipment:
With messaging standard, it is possible to transmit status update on a split shipment without the need to identify properly the pieces impacted. In this case the data transmitted can only be kept at Shipment level, however this pratice is contradictory with the piece level management design principle of ONE Record.
To cope with that there are multiple possibilities to map XFSU with ONE Record, depending on stakeholder's capabilities on the operations side to identify impacted pieces of a shipment.

- If pieces **cannot be** properly identified, recommendation would be to use `LogisticsEvent` on the Shipment, using the *LogisticsEvent#partialEventIndicator* to notify it applies to a split shipment. In this scenario it becomes complicated to provide the right level of information at the "AssociatedStatusConsignment" level as per the XFSU schema.
- If pieces **can be** properly identified, it is recommended to use `LogisticsEvent` on the identified Pieces. The *LogisticsEvent#partialEventIndicator* can be used to notify it applies only to selected pieces and not to the whole shipment but all details at "AssociatedStatusConsignment" level are at Piece level in ONE Record realm.

### Involved parties
When using XFSU, depending on the Status Code some parties need to be identified. By default the `LogisticsEvent` has the *recordActor*/*recordingOrganization* data object to identify the party creating the `LogisticsEvent`.

With Ontology 3.2.0 an *involvedParty* data object (data type: `Party`) has been added to `LogisticsEvent` to allow for a proper mapping.

Let's have a look at the various parties required for XFSU status codes and the proposed mapping:

- Transferring party: usage of *recordActor*/*recordingOrganization*
- receivingParty: usage of *involedParty* with *PartyRole* = "FX" (Current receiver)
- notifiedParty: usage of *involedParty* with *PartyRole* = "NI" (Notify party)
- deliveredToParty: usage of *involedParty* with *PartyRole* = "ST" (Ship to)

Note that the Code List used refers to the [UN/CEFACT Party Role Code List](https://vocabulary.uncefact.org/PartyRoleCodeList).

The mapping of XFSU message still needs to be fine tuned to take into account multiple scenarios.
