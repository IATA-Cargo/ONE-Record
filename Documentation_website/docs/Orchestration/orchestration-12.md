Process where the freight arrives at destination airport and is dispatched to warehouse

# 01. On blocks

MovementTimes created on TransportMovement (Flight) to record the on-blocks. Event can be added on TransportMovement as well.

**Message:** `MVT/XTMV`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline | POST | Event on TransportMovement (TM-Flight) | Create Event: eventFor (TM-Flight), eventLocation (Airport), eventCode (AB), eventDate, recordingActor |
| Airline | Airline | POST | Optional - MovementTime on TransportMovement (TM-Flight) | Create MovementTime: movementTimeType (actual), movementMilestone (AB), movementTimestamp |

# 02. Arrive flight at destination

**Message:** `MVT/XTMV` with Arrival
**Milestone:** `ARR`

# 03. Unload flight

Unloading Action (Actual) is created to record the unloading of Pieces/ULDs from the plane via the TransportMovement (flight)

**Message:** `AUS`/`AUE`
**Milestone:** `AUS`/`AUE`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | Unloading (Actual) | Unloading action (actual): servedActivity (TM-Flight), loadedPieces (Pieces) and/or loadingUnits (ULD/Pallet), loadingType (unloading), actionTimeType (actual) |

# 04. Move flight load to appropriate facility

TransportMovement from ramp to warehouse is created.

Loading Action (Actual) is created to link the Pieces/ULDs and the TransportMovement above.

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | TransportMovement (Ramp movement) | Create TM-Ramp: departureLocation and arrivalLocation to be defined |
| Airline | Airline/GHA | POST | Loading (Actual) | Loading action (actual): servedActivity (TM-Ramp), loadedUnits and/or loadedPieces (Pieces/ULDs), loadingType (Loading), actionTimeType (Actual), onTransportMeans (if relevant) |

# 05. Accept flight load at warehouse

Event is added on Pieces/ULDs to indicate FIW milestone

**Message:** `XFSU` with FIW status
**Milestone:** `FIW`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | Event on Pieces/ULDs | Create Event: eventFor (Pieces/ULDs), eventLocation, eventName and/or eventCode (FIW), eventDate, recordingActor |
