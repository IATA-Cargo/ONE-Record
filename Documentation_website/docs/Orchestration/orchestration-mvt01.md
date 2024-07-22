This part of the process represents the movement from the Shipper's premises to the Forwarder's warehouse.

# 01. Departure from Shipper
Event is added on the Truck TransportMovement indicating departure from shipper's location

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (Truck) | Create Event: eventFor (TM-Truck), eventLocation (shipper's location), eventName (Departure from Shipper's location), eventDate, recordingActor |
| Forwarder | Forwarder | POST | Optional - MovementTime on TransportMovement (Truck) | Create MovementTime: movementTimeType (actual), movementMilestone (AO), movementTimestamp |

# 02. Arrival of freight at forwarder warehouse

Event is added on the Truck TransportMovement indicating arrival at forwarder warehouse.

Unloading (actuals) are created and linked with TransportMovement (truck) and Pieces.

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (Truck) | Create Event: eventFor (TM-Truck), eventLocation (forwarder warehouse), eventName (Arrival at forwarder warehouse), eventDate, recordingActor |
| Forwarder | Forwarder | POST | Optional - MovementTime on TransportMovement (Truck) | Create MovementTime: movementTimeType (actual), movementMilestone (AB), movementTimestamp |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action (Actual): servedActivity (TM Truck), loadedPieces, onTransportMeans, loadingType (Unloading), executionStatus (Actual), actionEndTime |
