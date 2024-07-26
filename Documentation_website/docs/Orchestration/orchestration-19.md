Freight arrives at forwarder branch facility and is prepared for final delivery

# 01. Unload truck at forwarder warehouse

Unloading actions (Actuals) are created between Pieces and the TransportMovement to indicate unloading

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (unloading), actionTimeType (actual), onTransportMeans (if relevant at that stage) |

# 02. Check shipment details and physical integrity

Check and/or Events can be created on Pieces to record the physical integrity check results

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Shipper or Forwarder | Forwarder | POST | Event on Pieces | Create Event: eventFor (Pieces), eventLocation (forwarder hub), eventName (Pieces checked at forwarder hub), evetndAte, recordingActor |

# 03. Issue loading list for on carriage or delivery

TransportMovement for truck movement from forwarder branch facility to consignee.

Loading actions (Planned) are created to link Pieces to the TransportMovement.

Loading actions (Actuals) are created to link Pieces to the TransportMovement.

**Milestone:** `RIW`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | TransportMovement (Truck) | Create TM-Truck: departureLocation (forwarder hub), arrivalLocation (consignee location) |
| Forwarder | Forwarder | POST | Loading (Planned) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (loading), actionTimeType (planned), onTransportMeans (if relevant at that stage) |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (loading), actionTimeType (actual), onTransportMeans (if relevant at that stage) |
