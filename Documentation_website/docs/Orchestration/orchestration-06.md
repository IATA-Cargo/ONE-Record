Process where the Airline and GHA prepare to receive freight from the Forwarder.

# 01. AWB content validation/amendments

If relevant, the Airline updates the Booking with latest data of the Shipment and Pieces.

**Message:** `(X)FHL` and `(X)FWB`

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline | PATCH | Booking | Potential update of Booking data based on latest Waybill, Shipment, Pieces, etc. data |

# 02. Channel forwarder information to GHA where applicable

Airline makes relevant data accessible to GHA (authorized and delegated access).

# 03. Receive (H)AWB electronic data

GHA retrieves or accesses data.

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Shipper or Forwarder | GHA | GET | Waybill, Shipment, Pieces, etc. | - |
