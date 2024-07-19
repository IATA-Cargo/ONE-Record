Process where all preparations are made on Shipper's end and on Forwarder's end to handover the shipment to Forwarder.

# 01. Arrange Pick up or Self Delivery of Freight

Forwarder validates data of the TransportMovement, a PATCH can be done if necessary.

# 02. Commercial invoice and packing lists and any certificates

# 03. Labelling freight

Human action, can be done by the shipper, by the trucker on pickup or by the forwarder on arrival at warehouse. UPID is defined for each piece.

# 04. Associate unique piece level information with forwarding order

Piece are udpated with UPID information and any additional details

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Shipper or Forwarder | Forwarder | PATCH | Piece | Update UPID property on Piece |
| Shipper  | Forwarder | POST | Event on Piece | Create Event: eventFor (Piece), eventLocation (if relevant), eventCode or eventName, eventDate, recordingActor |

# 05. Pick up freight
Loading (actuals) are created and linked with TransportMovement (truck) and Pieces.

Events can be created on the Pieces to inform of the loading into the truck

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action (Actual): servedActivity (TM Truck), loadedPieces, onTransportMeans, loadingType (Loading), executionStatus (Actual), actionEndTime |
| Shipper  | Forwarder | POST | Event on Piece | Create Event: eventFor (Piece), eventLocation (if relevant), eventCode or eventName, eventDate, recordingActor |
