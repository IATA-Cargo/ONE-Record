Process where the forwarder prepares the transfer fo freight to any downstrean warehouse or directly to carrier domain.

# 01. Confirm information to downstream forwarder warehouse

Forwarder checks that data is available and shared with relevant stakeholder

# 02.  Issue loading list for truck to downstream forwarder warehouse or airline

Forwarder creates TransportMovements for truck movement and Loading (planned) actions to link TransportMovement and Pieces

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | TransportMovement (Truck Movement) | Create TM (Truck): departureLocation, arrivalLocation, modeCode (3?), transportIdentifier |
| Forwarder | Forwarder | POST | Loading (Planned) | Loading action (planned): servedActivity (TM Truck), loadedPieces, onTransportMeans, loadingType (Loading), executionStatus (Planned), actionEndTime |

# 03. Loaded truck departs forwarder branch facility ot hub

Internal process but could be used with Storing action in the future

Loading (actuals) are created and linked with TransportMovement (truck) and Pieces.

Events can be created on the Pieces to inform of the loading into the truck.

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action (actual): servedActivity (TM Truck), loadedPieces, onTransportMeans, loadingType (Loading), executionStatus (Planned), actionEndTime |
| Shipper or Forwarder | Forwarder | POST | Event on Piece | Create Event: eventFor (Piece), eventLocation (if relevant), eventCode or eventName (Loaded in truck), eventDate, recordingActor |
