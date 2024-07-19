This part of the process represents the movement from the Forwarder's warehouse to Carrier domain.

# 01. Depart truck from forwarder to carrier domain

Loading (actuals) are created and linked with TransportMovement (truck) and Pieces.

Events can be created on the Pieces to inform of the loading into the truck.

Event is added on the Truck TransportMovement indicating departure from warehouse.

**Milestone:** `DEW`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action (actual): servedActivity (TM Truck), loadedPieces, onTransportMeans, loadingType (Loading), executionStatus (Planned), actionEndTime |
| Shipper or Forwarder | Forwarder | POST | Event on Piece | Create Event: eventFor (Piece), eventLocation (if relevant), eventCode or eventName (Loaded in truck), eventDate, recordingActor |
| Shipper or Forwarder | Forwarder | POST | Event on TransportMovement (Truck) | Create Event: eventFor (TM-Truck), eventLocation (forwarder warehouse), eventName (Departure from forwarder warehouse), eventDate, recordingActor |

# 02. Arrival of truck at carrier domain

Event is added on the Truck TransportMovement indicating arrival at carrier domain.

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (Truck) | Create Event: eventFor (TM-Truck), eventLocation (carrier domain tbd), eventName (Arrival at carrier domain), eventDate, recordingActor |
