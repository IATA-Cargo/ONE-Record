Process where the freight is handed over to the forwarder.

# 01. Arrange truck for deliver

TransportMovement for truck movement from carrier domain to forwarder hub is created.

Loading actions (Planned) are created to link Pieces to the TransportMovement.

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | TransportMovement (Truck) | Create TM-Truck: departureLocation (carrier domain), arrivalLocation (forwarder hub) |
| Forwarder | Forwarder | POST | Loading (Planned) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (loading), actionTimeType (planned), onTransportMeans (if relevant at that stage) |

# 02. Registration of AWB / truck driver to obtain loading dock

External process

# 03. Check customs release status

Check or Event can be added at that stage if required

# 04. Assign loading dock and timeslot for trucker

TransportMovement of the Truck is updated with accurate drop off location.

An event DOC can be added on the Truck TransoprtMovement to reflect the registration at the dock.

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | TransportMovement (Truck) | Update arrivalLocation with accurate drop-off location |
| Forwarder | Forwarder | POST | Event on TM-Truck | Create Event: eventFor (TM-Truck), eventCode (DOC), eventDate, recordingActor |

# 05. Prepare freight for handover

Storage out action (actual) is created to record the movement of the pieces from storage.

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | Storage | Create Storage activty |
| Airline | Airline/GHA | POST | Storing (actual) | Storing action (actual): servedActivity (Storage), storingtype (STORE_OUT). storedObjects (Pieces/ULDs), storagePlaceIdentifier |

# 06. Handover freight to forwarder

Loading action (actual) is created to link Pieces and TransportMovement (Truck).

Event is added on Pieces and/or Shipment to record DLV milestone.

**Message:** `(X)FSU` with DLV status
**Milestone:** `DLV`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (loading), actionTimeType (actual), onTransportMeans (if relevant at that stage) |
| Forwarder | Forwarder | POST | Event on Pieces or Shipment | Create Event: eventFor (Pieces or Shipment), eventCode (DLV), eventDate, recordingActor |
