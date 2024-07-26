Process where the Airline/GHA prepares the freight for it transportation

# 01. Move shipments from warehouse to hold area for ramp transport

TransportMovement for in-warehouse movement created with Loading (storage location, actuals) and Unloading (hold area, actuals) actions to link Pieces/ULDs and TransportMovement.

Events can be added on Pieces/ULDs to communicate FOW milestone and for pickup

**Message:** `(X)FSU` with FOW status
**Milestone:** `FOW`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Airline / GHA | POST | TransportMovement (WH mouvement) | Create TM-WH: departureLocation and arrivalLocation to be defined |
| Airline | Airline / GHA | POST | Loading (Actual) | Loading action (actual): servedActivity (TM-WH), loadedUnits and/or loadedPieces (Pieces/ULDs), loadingType (Loading), actionTimeType (Actual), onTransportMeans (if relevant) |
| Airline | Airline / GHA | POST | Unloading (Actual) | Unloading action (actual): servedActivity (TM-WH), loadedUnits and/or loadedPieces (Pieces/ULDs), loadingType (Unloading), actionTimeType (Actual), onTransportMeans (if relevant) |
| Airline | Airline / GHA | POST | Event on Pieces/ULDs | Create Event: eventFor (Pieces/ULDs), eventLocation, eventName and/or eventCode (FOW), eventDate, recordingActor |


# 02. Move shipments from hold area to parking position

TransportMovement from hold area to parking position created with Loading (actuals) and Unloading (actuals) actions to link Pieces/ULDs and TransportMovement

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Airline / GHA | POST | TransportMovement (Ramp movement) | Create TM-Ramp: departureLocation and arrivalLocation to be defined |
| Airline | Airline / GHA | POST | Loading (Actual) | Loading action (actual): servedActivity (TM-Ramp), loadedUnits and/or loadedPieces (Pieces/ULDs), loadingType (Loading), actionTimeType (Actual), onTransportMeans (if relevant) |
| Forwarder | Airline / GHA | POST | Unloading (Actual) | Unloading action (actual): servedActivity (TM-Ramp), loadedUnits and/or loadedPieces (Pieces/ULDs), loadingType (Unloading), actionTimeType (Actual), onTransportMeans (if relevant) |

# 03. Load Aircraft as per Load Plan

Loading Action (Actuals) is created to link Pieces/ULD and TransportMeans (Aircraft) via the TransportMovement (flight) (c.f. 9.5)

**Milestone:** `ALS` / `ALE`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | POST | Loading (Actual) | Loading action (actual): servedActivity (TM-Flight), loadedPieces (Pieces) and/or loadingUnits (ULD/Pallet), loadingType (loading), actionTimeType (actual) |
| Forwarder | Airline / GHA | POST | Event on Pieces/ULDs | Create Event: eventFor (Pieces/ULDs), eventLocation, eventName and/or eventCode (Loaded in aircraft), eventDate, recordingActor |

# 04. Create Final Load Report to load control (LIR)

Creation of the Final Load Report.

# 05. Off blocks

MovementTimes created on TransportMovement (Flight) to record the Off blocks. Event can be added on TransportMovement as well.

**Message:** `MVT/XTMV`
**Milestone:** `OFB`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline | POST | Event on TransportMovement (Truck) | Create Event: eventFor (TM-Flight), eventLocation (Airport), eventCode (AO), eventDate, recordingActor |
| Airline | Airline | POST | Optional - MovementTime on TransportMovement (TM-Flight) | Create MovementTime: movementTimeType (actual), movementMilestone (AO), movementTimestamp |

# 06. Depart flight

DEP milestone is more or less the combination of Flight Manifest data and Off blocks. Equivalent of XFFM data are shared between GHA and Airline, at this stage Airline makes sure all XFFM data are there (cf. mapping)

**Message:** `(X)FFM` and `MVT/XTMV` for Departure (DEP)
**Milestone:** `DEP`
