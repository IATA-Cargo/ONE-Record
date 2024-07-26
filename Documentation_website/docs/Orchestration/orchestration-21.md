Final delivery to consignee and proof od delivery

# 01. Deliver to consignee and capture POD

Unloading actions (Actuals) are created between Pieces and the TransportMovement to indicate unloading

An Event is created on Pieces to capture the delivery

**Milestone:** `POD`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Loading (Actual) | Loading action: servedActivity (TM-Truck), loadedPieces (Pieces) and/or loadedUnits (ULDs/Pallets), loadingType (unloading), actionTimeType (actual), onTransportMeans (if relevant at that stage) |
| Shipper or Forwarder | Forwarder | POST | Event on Pieces | Create Event: eventFor (Pieces), eventLocation (Consignee's location), eventName (Pieces delivered to consignee), evetndAte, recordingActor |

# 02. Finalize d2d routemap and validate OTP
# 03. Product discrepancy report with resolution
# 04. Include in reporting to shipper/consignee
