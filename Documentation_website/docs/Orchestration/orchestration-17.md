Freight is received at forwarder hub and prepared or delivery to a branch facility before final delivery

# 01. Unload truck at forwarder hub

Unloading action (Actual) to record the unloading of the pieces from the truck

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | unLoading (Actual) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (unloading), actionTimeType (actual), onTransportMeans (if relevant at that stage) |

# 02. Deconsolidation
# 03. Check shipment details and physical integrity

Check and/or Events can be created on Pieces to record the physical integrity check results

**Milestone:** `RIW`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Shipper or Forwarder | Forwarder | POST | Event on Pieces | Create Event: eventFor (Pieces), eventLocation (forwarder hub), eventName (Pieces checked at forwarder hub), evetndAte, recordingActor |

# 04. Issue loading list for on carriage or delivery

TransportMovement for truck movement from forwarder warehouse to forwarder branch facility.

Loading actions (Planned) are created to link Pieces to the TransportMovement.

Loading actions (Actuals) are created to link Pieces to the TransportMovement.

## API Interaction


| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | TransportMovement (Truck) | Create TM-Truck: departureLocation (forwarder hub), arrivalLocation (forwarder branch facility) |
| Forwarder | Forwarder | POST | Loading (Planned) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (loading), actionTimeType (planned), onTransportMeans (if relevant at that stage) |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (loading), actionTimeType (actual), onTransportMeans (if relevant at that stage) |
