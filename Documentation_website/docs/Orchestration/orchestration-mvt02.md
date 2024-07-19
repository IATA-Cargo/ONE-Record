This part of the process represents the movement from the Forwarder's warehouse to one of its hub.

# 01. Departure of truck from forwarder

Event is added on the Truck TransportMovement indicating departure from forwarder's warehouse.

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (Truck) | Create Event: eventFor (TM-Truck), eventLocation (forwarder warehouse), eventName (Departure from forwarder warehouse), eventDate, recordingActor |
| Forwarder | Forwarder | POST | Optional - MovementTime on TransportMovement (Truck) | Create MovementTime: movementTimeType (actual), movementMilestone (AO), movementTimestamp |

# 02. Arrival of truck at forwarder hub

Event is added on the Truck TransportMovement indicating arrival at forwarder hub.

Unloading (actuals) are created and linked with TransportMovement (truck) and Pieces.

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (Truck) | Create Event: eventFor (TM-Truck), eventLocation (forwarder hub), eventName (Arrival at forwarder hub), eventDate, recordingActor |
| Forwarder | Forwarder | POST | Optional - MovementTime on TransportMovement (Truck) | Create MovementTime: movementTimeType (actual), movementMilestone (AA), movementTimestamp |
| Forwarder | Forwarder | POST | Loading (Actual) | Unloading action (actual): servedActivity (TM Truck), loadedPieces, onTransportMeans, loadingType (Unloading), executionStatus (Planned), actionEndTime |
