Freight arrives at forwarder branch facility and is prepared for final delivery or picked up by customer directly


## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | TransportMovement (Truck) | Create TM-Truck: departureLocation (forwarder hub), arrivalLocation (consignee location) |
| Forwarder | Forwarder | POST | Loading (Planned) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (loading), actionTimeType (planned), onTransportMeans (if relevant at that stage) |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (loading), actionTimeType (actual), onTransportMeans (if relevant at that stage) |

# 01. Contact customer for handover instructions

Internal process

**Milestone:** `HDP` / `TPN`

# 02. Issue loading list for truck to consignee / load truck

TransportMovement for truck movement delivery to consignee is created/updated.

Loading actions (Planned) are created to link Pieces to the TransportMovement.

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST or PATCH | TransportMovement (Truck) | Create TM-Truck (see steps before) or update based on latest information available |
| Forwarder | Forwarder | POST | Loading (Planned) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (loading), actionTimeType (planned), onTransportMeans (if relevant at that stage) |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (loading), actionTimeType (actual), onTransportMeans (if relevant at that stage) |

# 03. Pick up freight by customer

Event is added on Pieces to indicate that customer has picked up freight

**Milestone:** `SPC`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Shipper or Forwarder | Forwarder | POST | Event on Pieces | Create Event: eventFor (Pieces), eventLocation (forwarder branch facility), eventName (Pieces picked up by customer), evetndAte, recordingActor |
