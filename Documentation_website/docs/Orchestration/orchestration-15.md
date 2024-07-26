Customs clearance process

# 01. Handover to consignee's appointed Customs broker

External process

# 02. Trigger Customs clearance

External process

# 03. Start Customs clearance

External process

# 04. Customs Clearance completed

**Message:** `(X)FSU` with CCD status
**Milestone:** `TOA` and `CCD`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | Event on Shipment | Create Event: eventFor (Shipment), eventCode (CCD), eventDate, recordingActor |
