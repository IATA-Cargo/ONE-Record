Process where the Forwarder prepares export shipments

# 01. Create (M)AWB shipment record and consolidation manifest

Forwarder creates or updates the MAWB with latest details.

Consolidation manifest data should be included in 1R already but a check by the Forwarder can be done, with potential updates of relevant objects.

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | PATCH | Shipment, Waybill, etc. | Potential update on the MAWB details if relevant |

# 02. Send freight picking instructions to warehouse

Forwarder creates TransportMovements for truck movement from warehouse to carrier domain and Loading (planned) actions to link TransportMovement and Pieces/ULDs.

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | TransportMovement (Truck Movement) | Create TM (Truck): departureLocation, arrivalLocation, modeCode (3?), transportIdentifier |
| Forwarder | Forwarder | POST | Loading (Planned) | Loading action (planned): servedActivity (TM Truck), loadedPieces, onTransportMeans, loadingType (Loading), executionStatus (Planned), actionEndTime |

# 03. Transmit (H)AWB electronic data to carrier/customs/AVSEC

Make sure data is accessible by stakeholders, Events are created on HAWB and MAWB that data is ready to be fetched.

eCSD data should be available as well, meaning SecurityDeclaration should be checked/updated. An Event on Piece could be used to mention that eCSD is OK to be retrieved.

**Milestone:** `FHL` `FWB`
**Message:** `(X)FHL` and `(X)FWB`

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on Waybill (MAWB and HAWB when relevant) | Create Event: eventFor (Waybill), eventName (Waybill data ready), eventDate, recordingActor |
| Shipper or Forwarder | Forwarder | POST | Event on Pieces | Create Event: eventFor (Pieces), eventName (eCSD data OK), eventDate, recordingActor |

# 04. Prepare shipment for export

Internal process
