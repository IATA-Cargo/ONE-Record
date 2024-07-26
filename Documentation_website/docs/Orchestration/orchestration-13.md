Process where the freight and its documents are checked an will be moved to adequate storage location.

# 01. Receive shipments in warehouse

Storing activity is created for Pieces in storage location. Location itself will give details on the type of storage for transit, transfer or import.

ULDs are broken down if required, Decomposing Action is used to break down ULDs and remove the Pieces

**Message:** `(X)FSU` with RCF status
**Milestone:** `RCF`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | Storage | Create Storage activity |
| Airline | Airline/GHA | POST | Storing (actual) | Storing action (actual): servedActivity (Storage), storingtype (STORE_IN). storedObjects (Pieces/ULDs), storagePlaceIdentifier |
| Airline | Airline/GHA | POST | UnitComposition | Create UnitComposition activity |
| Airline | Airline/GHA | POST | Composing (Planned) | Create Composing: servedActivity (UnitComposition), loadingUnit (ULD or Pallet), composedPieces (Pieces), compositionType (Decomposition), actionTimeType (Actual) |
| Forwarder | Airline/GHA | POST | Event on Shipment | Create Event: eventFor (Shipment), eventLocation (Airport), eventCode (RCF), eventDate, recordingActor |

# 02. Docs received from flight

Destination GHA should have access to relevant data from flight

**Message:** `(X)FSU` with AWR status
**Milestone:** `AWR`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Airline/GHA | POST | Event on Shipment | Create Event: eventFor (Shipment), eventLocation (Airport), eventCode (AWR), eventDate, recordingActor |

# 03. Move Transshipment cargo to appropriate location (see process 9)

Relevant TransportMovement for change of storage location can be created

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | TransportMovement (WH movement) | Create TM-WH: departureLocation and arrivalLocation to be defined |

# 04. Move shipments to be transferred to other carrier

TransportMovement for transfer is created with relevant arrivalLocation (other carrier storage place or else)

**Message:** `(X)FSU` with TFD status
**Milestone:** `TFD`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | TransportMovement (transfer movement) | Create TM-Transfer: departureLocation and arrivalLocation to be defined |
| Forwarder | Airline/GHA | POST | Event on Shipment | Create Event: eventFor (Shipment), eventLocation (Airport), eventCode (TFD), eventDate, recordingActor |

# 05. Move import shipment to storage location

TransportMovement times can be updated (departure and arrival) with Events on the pieces to reflect the movement (arrived at storage, etc)

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | Event on TransportMovement (TM-WH) | Create Event: eventFor (TM-WH), eventLocation (WH), eventName (Departure from warehouse), eventDate, recordingActor |
