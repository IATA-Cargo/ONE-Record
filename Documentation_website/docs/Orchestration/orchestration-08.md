Process where the Airline/GHA  checks the freight and accepts as Ready for Carriage

# 01. Verify shipment has cleared security

A Check object can be created and linked to Pieces/Shipment for RCS data

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | POST | Check | Create Check object with relevant details (up to GHA / Airline) |

# 02. Physical acceptance check

If a Check object is used the Airline/GHA updates it accordingly.

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | PATCH | Check | Update Check data with results |

# 03. Docs acceptance check

An Event is added on Shipment/Pieces to register RCS/RCT event. Note: RCS is only applicable for whole shipment.

If RCT, access delegation needs to be ensured

**Message:** `(X)FSU` with RCS / RCT status
**Milestone:** `RCS` or `RCT`

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | POST | Event on Pieces/Shipment | Create Event: eventFor (Pieces or Shipment), eventLocation (carrier domain tbd), eventcode (RCT or RCS), eventDate, recordingActor |

# 04. File EHCP and trigger resolution process (or workflow)

Event on Shipment or Piece to record the EHCP (CiQ process)

**Message:** `(X)FSU` with FOH status
**Milestone:** `LAT`

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | POST | Event on Pieces/Shipment | Create Event: eventFor (Pieces or Shipment), eventLocation (carrier domain tbd), eventcode (EHCP - xxx), eventDate, recordingActor |
