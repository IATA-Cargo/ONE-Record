# XFSU Purpose

XFSU message is used to provide a Shipment Status update, discrepancy details or sometimes to provide complementary Customs information. It is also used to share Shipment milestones by Cargo-iQ members.

# XFSU Mapping

FSU and XFSU messages are Shipment level messages, the entry point is the AWB number but it can also be used to provide status updates on part or split shipments.

## Proposed mechanism

### Shipment-level status

With messaging standards, status updates are at Shipment level, even when the update is about a split or part shipment. As a matter of fact it is currently very complicated to have proper Piece level status updates for two main reasons: From a technological point of view the messages (FSU/XFSU) can only convey Shipment level information and from an operations point of view very few stakeholders are fully capable of handling piece level information.

In a fully ONE Record environment the information is shared at Piece level. It implies that all Pieces are properly identified and that statuses can be applied on individual pieces within a shipment. This solves the issues with part or split shipments.

!!! note
    It is essential to note that these guidelines are only effective in the context of mapping between (X)FSU and ONE Record. ONE Record is by design Piece-centric and is ready for Piece level management.

**For the sake of (X)FSU mapping with ONE Record**, statuses are at Shipment level, meaning linked to a `Shipment` object. For that purpose a new type of event has been introduced, called `StatusUpdateEvent`.

### Types of status updates

The mapping with ONE Record differs based on the kind of Status update. We identify 3 main use cases:

- **Shipment status updates** (e.g. RCS, FOH, etc.) use a `StatusUpdateEvent` linked to the `Shipment` object.
- **Booking status** provided with (X)FSU-BKD is in fact a confirmation of Booking, not a real status. 
- **Additional information** such as Security or Customs details, referred to as (X)FSU-OCI, do not require a `LogisticsEvent` but rather the update of the relevant objects directly.

| Code | Description | ONE Record mapping |
| --- | --- | --- |
| ARR | The consignment has arrived on a scheduled flight at this location | `StatusUpdateEvent` on `Shipment`. Details of flight times on the `TransportMovement` |
| AWD | The arrival documentation has been physically delivered to the consignee or the consignee's agent on this date at this location | `StatusUpdateEvent` on `Shipment` |
| AWR | The arrival documentation has been physically received from a scheduled flight at this location | `StatusUpdateEvent` on `Shipment` |
| BKD | The consignment has been booked for transport between these locations on this scheduled date and this flight | The Booking confirmation goes through creation a `Booking` LO including a `BookingShipment` LO to hold the booking parameters pre-FWB. `StatusUpdateEvent` with BKD status on `Shipment` may be added when the `Waybill` and `Shipment` objects are created but it's not necessary |
| CCD | The consignment has been cleared by the Customs authorities on this date at this location | `StatusUpdateEvent` on `Shipment` |
| CRC | The consignment has been reported to the Customs authorities on this date at this location | `StatusUpdateEvent` on `Shipment` |
| DDL | The consignment has been physically delivered to the consignee's door on this date at this location | `StatusUpdateEvent` on `Shipment` |
| DEP | The consignment has physically departed this location on this scheduled date and flight for transport to the arrival location | `StatusUpdateEvent` on `Shipment`. Details of flight times on the `TransportMovement` |
| DIS | An apparent error has occurred, on this date at this location, with the handling of the consignment or its documentation, which is further clarified by the accompanying discrepancy code | `StatusUpdateEvent` on `Shipment` |
| DLV | The consignment has been physically delivered to the consignee or the consignee's agent on this date at this location | `StatusUpdateEvent` on `Shipment` |
| DOC | Documents received by handling party | `StatusUpdateEvent` on `Shipment` |
| DPU | The consignment has been physically picked up from the shipper's door on this date at this location | `StatusUpdateEvent` on `Shipment` |
| FIW | Freight into warehouse control | `StatusUpdateEvent` on `Shipment` |
| FOH | The consignment is on hand on this date at this location pending "ready for carriage" determination | `StatusUpdateEvent` on `Shipment` |
| FOW | Freight out of warehouse control | `StatusUpdateEvent` on `Shipment` |
| MAN | The consignment has been manifested for this flight on this scheduled date for transport between these locations | `StatusUpdateEvent` on `Shipment` |
| NFD | The consignee or the consignee's agent has been notified, on this date at this location, of the arrival of the consignment | `StatusUpdateEvent` on `Shipment` |
| OCI | Other Customs Information | Update of `CustomsInformation` or other relevant data property. See [OCI Mapping detailed page](../orchestration-oci/) |
| OSI | Other Service Information | `StatusUpdateEvent` on `Shipment` |
| PRE | The consignment has been prepared for loading on this flight for transport between these locations on this scheduled date | `StatusUpdateEvent` on `Shipment` |
| RCF | The consignment has been physically received from a given flight or surface transport of the given airline | `StatusUpdateEvent` on `Shipment` |
| RCS | The consignment has been physically received from the shipper or the shipper's agent and is considered by the carrier as ready for carriage on this date at this location | `StatusUpdateEvent` on `Shipment` |
| RCT | The consignment has been physically received from this carrier on this date at this location | `StatusUpdateEvent` on `Shipment` |
| TFD | The consignment has been physically transferred to this carrier on this date at this location | `StatusUpdateEvent` on `Shipment` |
| TGC | The consignment has been transferred to Customs/Government control | `StatusUpdateEvent` on `Shipment` |
| TRM | The consignment has been manifested and/or will be physically transferred to this carrier at this location | `StatusUpdateEvent` on `Shipment` |

### StatusUpdateEvent

The `StatusUpdateEvent` is a subtype of `LogisticsEvent`, thus it inherits all of `LogisticsEvent` properties and adds specific properties to support FSU-level information at the Shipment level.

As shown in the table above, most status updates can be made via a `StatusUpdateEvent` linked to the `Shipment` object. In case of split or part shipments, the `partial*` properties must be used.

When flight details are required, the corresponding `TransportMovement` must be linked via `transportMovementReference`. It will contain information such as the flight identifier and movement times.

The full list of properties of `StatusUpdateEvent` is as follows:

**Inherited from `LogisticsEvent`:**

| Property | Data type | Description |
| --- | --- | --- |
| eventCode | StatusCode | The FSU/XFSU status code (e.g. RCS, DEP, ARR) |
| eventFor | Shipment | Reference to the `Shipment` this event applies to — `StatusUpdateEvent` can only be attached to a `Shipment` |
| eventLocation | Location | Location where the status event occurred |
| eventTimeType | EventTimeType | Qualifier for the event time (e.g. actual, planned) |
| recordingActor | Actor | The individual actor who recorded the event |
| recordingOrganization | Organization | The organization that recorded the event |
| involvedParties | Party | Other parties involved in the event |
| creationDate | dateTime | Date and time the event record was created |
| eventDate | dateTime | Date and time the status event occurred |
| eventName | string | Free-text name or label for the event |
| partialEventIndicator | boolean | Indicates whether this event concerns only part of the shipment (part or split shipment scenario) |

**New properties specific to `StatusUpdateEvent`:**

| Property | Data type | Description |
| --- | --- | --- |
| recordedPieceCount | int | Number of pieces concerned by this status update |
| recordedWeight | Value | Weight of the pieces concerned by this status update |
| recordedVolume | Value | Volume of the pieces concerned by this status update |
| transferredFrom | Organization | Identifies the organization transferring the shipment — used in particular for RCT and TFD statuses |
| transferredTo | Organization | Identifies the organization receiving the shipment — used in particular for TRM status |
| notifiedOrganization | Organization | Identifies the organization that was notified — used in particular for NFD status |
| transportMovementReference | TransportMovement | Link to the `TransportMovement` to convey flight information (flight number, movement times, etc.) when required |

### Usage of (X)FSU for OCI segment

With current messaging standards, (X)FSU is sometimes used to provide updated Security information or Customs information. With ONE Record it is recommended to update the relevant objects directly (`SecurityDeclaration` or `CustomsInformation`) rather than using a `StatusUpdateEvent`.

More details can be found on the [OCI Mapping detailed page](../orchestration-oci/).
